#include <GL/glut.h>
#include <cmath>
#include <vector>
#include <cstdlib>
#include <ctime>
#include <iostream>
#include <algorithm>

#ifndef M_PI
#define M_PI 3.14159265358979323846
#endif

// --- Global Variables ---
// Camera
float angleX = 20.0f;
float angleY = -150.0f;
float dist = 25.0f;
int lastMouseX, lastMouseY;
bool leftMouseDown = false;
bool rightMouseDown = false;

// Jet State
enum JetState { IDLE, TAXI, TAKEOFF, FLYING };
JetState currentState = IDLE;

float jetX = 0.0f, jetY = 0.0f, jetZ = 50.0f;
float jetSpeed = 0.0f;
float jetPitch = 0.0f;

// Textures
GLuint jetTextureId;
GLuint groundTextureId;

// Environment
struct EnvObject { float x, z; int type; float scale; };
std::vector<EnvObject> envObjects;

// --- PARTICLE SYSTEM (SOLID AFTERBURNER BEAM) ---
struct Particle {
    float x, y, z;
    float vx, vy, vz;
    float r, g, b, a;
    float life, decay, size;
};

// High particle count is required for the "Solid Beam" look
const int MAX_PARTICLES = 10000;
std::vector<Particle> particles;

float randomFloat(float min, float max) {
    return min + static_cast<float>(rand()) / (static_cast<float>(RAND_MAX / (max - min)));
}

void spawnParticle(Particle& p, bool leftEngine) {
    float localX = leftEngine ? -0.5f : 0.5f;
    float localY = 0.0f;
    float localZ = 3.5f; // Emitter position

    float radPitch = jetPitch * M_PI / 180.0f;
    float rotY = localY * cos(radPitch) - localZ * sin(radPitch);
    float rotZ = localY * sin(radPitch) + localZ * cos(radPitch);

    // TIGHT EMISSION: Very small random offset to keep the beam solid
    p.x = jetX + localX + randomFloat(-0.06f, 0.06f);
    p.y = jetY + rotY + randomFloat(-0.06f, 0.06f);
    p.z = jetZ + rotZ;

    // VELOCITY: Fast backward thrust
    float thrust = 0.7f;
    p.vx = randomFloat(-0.01f, 0.01f);
    p.vy = randomFloat(-0.01f, 0.01f) - sin(radPitch) * thrust;
    p.vz = cos(radPitch) * thrust;

    // COLOR: Start Bright White-Yellow (Hot Core)
    p.r = 1.0f;
    p.g = 1.0f; // High Green + High Red = Yellow
    p.b = 0.8f; // High Blue makes it look White/Hot
    p.a = 1.0f;

    p.life = 1.0f;
    p.decay = randomFloat(0.04f, 0.06f); // Short life to prevent trail from getting too messy
    p.size = randomFloat(7.0f, 10.0f);   // Large size to overlap and create solid look
}

void initParticles() {
    particles.resize(MAX_PARTICLES);
    for (int i = 0; i < MAX_PARTICLES; ++i) particles[i].life = -1.0f;
}

void updateParticles() {
    for (int i = 0; i < MAX_PARTICLES; ++i) {
        Particle& p = particles[i];
        if (p.life > 0.0f) {
            p.life -= p.decay;
            p.x += p.vx; p.y += p.vy; p.z += p.vz;

            // --- COLOR TRANSITION LOGIC ---
            // Life 1.0 -> 0.7: White/Yellow (Hot)
            // Life 0.7 -> 0.4: Orange
            // Life 0.4 -> 0.0: Red/Transparent

            if (p.life < 0.8f) {
                p.b = 0.0f; // Remove blue (becomes pure yellow)
            }
            if (p.life < 0.6f) {
                p.g -= 0.1f; // Reduce green (becomes orange)
                if(p.g < 0.0f) p.g = 0.0f;
            }
            if (p.life < 0.3f) {
                p.r = 0.8f; // Darken red
                p.a = p.life; // Fade out transparency
            }

            p.size *= 0.95f; // Shrink slightly at the tip
        }
    }

    if (currentState != IDLE) {
        // SPAWN RATE: High number per frame (50) fills the gaps
        int particlesPerFrame = 50;
        int spawnedCount = 0;
        for (int i = 0; i < MAX_PARTICLES && spawnedCount < particlesPerFrame; ++i) {
            if (particles[i].life <= 0.0f) {
                spawnParticle(particles[i], (spawnedCount % 2 == 0));
                spawnedCount++;
            }
        }
    }
}

// --- TEXTURE GENERATION ---
#define TEX_SIZE 64
GLubyte jetTexData[TEX_SIZE][TEX_SIZE][3];
GLubyte groundTexData[TEX_SIZE][TEX_SIZE][3];

void generateTextures() {
    // Colors slightly adjusted to pop against blue sky
    GLubyte colors[3][3] = {
        {40, 40, 45},    // Dark Grey
        {90, 95, 100},   // Medium Grey
        {160, 165, 175}  // Light Blue-Grey
    };

    for (int i = 0; i < TEX_SIZE; i++) {
        for (int j = 0; j < TEX_SIZE; j++) {
            float n1 = sin(i * 0.07f) + cos(j * 0.11f) + sin((i+j)*0.04f);
            float n2 = cos(i * 0.13f) + sin(j * 0.06f) - cos((i-j)*0.08f);

            int colorIndex = 1;
            if (n1 > 0.9f) { colorIndex = 0; }
            else if (n2 < -0.6f && n1 < 0.3f) { colorIndex = 2; }
            else if (n1 < -1.1f) { colorIndex = 0; }
            else if (n2 > 1.2f) { colorIndex = 2; }

            jetTexData[i][j][0] = colors[colorIndex][0];
            jetTexData[i][j][1] = colors[colorIndex][1];
            jetTexData[i][j][2] = colors[colorIndex][2];

            int noise = rand() % 10 - 5;
            for(int k=0; k<3; k++)
                jetTexData[i][j][k] = (GLubyte)std::max(0, std::min(255, (int)jetTexData[i][j][k] + noise));
        }
    }

    // Ground
    for (int i = 0; i < TEX_SIZE; i++) {
        for (int j = 0; j < TEX_SIZE; j++) {
            int n = rand() % 30;
            groundTexData[i][j][0] = 30 + n;
            groundTexData[i][j][1] = 80 + n;
            groundTexData[i][j][2] = 30 + n;
        }
    }
}

void initTextures() {
    generateTextures();
    glGenTextures(1, &jetTextureId); glBindTexture(GL_TEXTURE_2D, jetTextureId);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
    glTexImage2D(GL_TEXTURE_2D, 0, GL_RGB, TEX_SIZE, TEX_SIZE, 0, GL_RGB, GL_UNSIGNED_BYTE, jetTexData);

    glGenTextures(1, &groundTextureId); glBindTexture(GL_TEXTURE_2D, groundTextureId);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
    glTexImage2D(GL_TEXTURE_2D, 0, GL_RGB, TEX_SIZE, TEX_SIZE, 0, GL_RGB, GL_UNSIGNED_BYTE, groundTexData);
}

void initEnvObjects() {
    for (int i = 0; i < 80; i++) {
        EnvObject obj;
        do { obj.x = randomFloat(-150.0f, 150.0f); } while (obj.x > -25.0f && obj.x < 25.0f);
        obj.z = randomFloat(-400.0f, 200.0f);
        obj.type = rand() % 2;
        obj.scale = randomFloat(1.0f, 2.0f);
        envObjects.push_back(obj);
    }
}

void initRendering() {
    glEnable(GL_DEPTH_TEST);
    glEnable(GL_COLOR_MATERIAL);
    glEnable(GL_LIGHTING); glEnable(GL_LIGHT0); glEnable(GL_NORMALIZE);

    GLfloat lightPos[] = { 100.0f, 300.0f, 100.0f, 0.0f };
    GLfloat lightColor[] = { 1.0f, 1.0f, 1.0f, 1.0f };
    GLfloat ambient[] = { 0.4f, 0.4f, 0.45f, 1.0f };
    glLightfv(GL_LIGHT0, GL_POSITION, lightPos);
    glLightfv(GL_LIGHT0, GL_DIFFUSE, lightColor);
    glLightfv(GL_LIGHT0, GL_AMBIENT, ambient);

    glEnable(GL_POINT_SMOOTH);
    glHint(GL_POINT_SMOOTH_HINT, GL_NICEST);

    srand(static_cast<unsigned>(time(0)));
    initParticles();
    initTextures();
    initEnvObjects();
}

// --- DRAWING HELPERS ---
void drawCone(float length, float baseRadius) {
    int segments = 32; float angleStep = 2.0f * M_PI / segments;
    glEnable(GL_TEXTURE_2D); glBindTexture(GL_TEXTURE_2D, jetTextureId);
    glBegin(GL_TRIANGLES);
    for (int i = 0; i < segments; i++) {
        float a1 = i * angleStep; float a2 = (i + 1) * angleStep;
        float x1 = baseRadius * cos(a1), y1 = baseRadius * sin(a1);
        float x2 = baseRadius * cos(a2), y2 = baseRadius * sin(a2);
        glNormal3f(cos((a1+a2)/2), sin((a1+a2)/2), 0.2f);
        glTexCoord2f(0.5f, 0.9f); glVertex3f(0.0f, 0.0f, length);
        glTexCoord2f(a1/(2*M_PI), 0.1f); glVertex3f(x2, y2, 0.0f);
        glTexCoord2f(a2/(2*M_PI), 0.1f); glVertex3f(x1, y1, 0.0f);
    }
    glEnd(); glDisable(GL_TEXTURE_2D);
}

void drawTexturedBox(float w, float h, float l) {
    w *= 0.5f; h *= 0.5f; l *= 0.5f;
    glEnable(GL_TEXTURE_2D); glBindTexture(GL_TEXTURE_2D, jetTextureId);
    glBegin(GL_QUADS);
    glNormal3f(0, 1, 0); glTexCoord2f(0,0); glVertex3f(-w,h,-l); glTexCoord2f(1,0); glVertex3f(w,h,-l); glTexCoord2f(1,1); glVertex3f(w,h,l); glTexCoord2f(0,1); glVertex3f(-w,h,l);
    glNormal3f(0,-1, 0); glTexCoord2f(0,0); glVertex3f(-w,-h,-l); glTexCoord2f(1,0); glVertex3f(w,-h,-l); glTexCoord2f(1,1); glVertex3f(w,-h,l); glTexCoord2f(0,1); glVertex3f(-w,-h,l);
    glNormal3f(0, 0, 1); glTexCoord2f(0,0); glVertex3f(-w,-h,l); glTexCoord2f(1,0); glVertex3f(w,-h,l); glTexCoord2f(1,1); glVertex3f(w,h,l); glTexCoord2f(0,1); glVertex3f(-w,h,l);
    glNormal3f(0, 0,-1); glTexCoord2f(0,0); glVertex3f(-w,-h,-l); glTexCoord2f(1,0); glVertex3f(w,-h,-l); glTexCoord2f(1,1); glVertex3f(w,h,-l); glTexCoord2f(0,1); glVertex3f(-w,h,-l);
    glNormal3f(1, 0, 0); glTexCoord2f(0,0); glVertex3f(w,-h,-l); glTexCoord2f(1,0); glVertex3f(w,h,-l); glTexCoord2f(1,1); glVertex3f(w,h,l); glTexCoord2f(0,1); glVertex3f(w,-h,l);
    glNormal3f(-1,0, 0); glTexCoord2f(0,0); glVertex3f(-w,-h,-l); glTexCoord2f(1,0); glVertex3f(-w,h,-l); glTexCoord2f(1,1); glVertex3f(-w,h,l); glTexCoord2f(0,1); glVertex3f(-w,-h,l);
    glEnd(); glDisable(GL_TEXTURE_2D);
}

void drawHalfCylinder(float length, float radius, bool top) {
    int segments = 24; float angleStep = M_PI / segments;
    glEnable(GL_TEXTURE_2D); glBindTexture(GL_TEXTURE_2D, jetTextureId);
    glBegin(GL_QUAD_STRIP);
    for (int i = 0; i <= segments; i++) {
        float angle = i * angleStep; if (!top) angle = -angle;
        float x = radius * cos(angle); float y = radius * sin(angle);
        glNormal3f(cos(angle), sin(angle), 0.0f);
        glTexCoord2f((float)i/segments, 0.0f); glVertex3f(x, y, 0.0f);
        glTexCoord2f((float)i/segments, 1.0f); glVertex3f(x, y, length);
    }
    glEnd(); glDisable(GL_TEXTURE_2D);
}

// --- F-22 JET ---
void drawF22() {
    glDisable(GL_BLEND);
    glColor4f(1.0f, 1.0f, 1.0f, 1.0f);

    float joinZ = -1.5f;
    float bodyRadius = 0.90f;
    float flatnessY = 0.35f;

    // NOSE
    glPushMatrix(); glTranslatef(0.0f, 0.0f, joinZ); glRotatef(180, 0, 1, 0); glScalef(1.0f, flatnessY, 0.9f); drawCone(3.8f, bodyRadius); glPopMatrix();
    // SPINE
    glPushMatrix(); glTranslatef(0.0f, 0.0f, joinZ); glScalef(1.0f, flatnessY, 1.11f); drawHalfCylinder(4.2f, bodyRadius, true); glPopMatrix();
    // BELLY
    glPushMatrix(); glTranslatef(0.0f, 0.0f, joinZ); glScalef(1.0f, flatnessY, 1.11f); drawHalfCylinder(4.2f, bodyRadius, false); glPopMatrix();

    // WINGS
    glPushMatrix(); glTranslatef(0.5f, 0.0f, -0.4f); glRotatef(-60, 0, 1, 0); glScalef(1.0f, 0.12f, 1.0f); drawCone(5.5f, 2.2f); glPopMatrix();
    glPushMatrix(); glTranslatef(-0.5f, 0.0f, -0.4f); glRotatef(60, 0, 1, 0); glScalef(1.0f, 0.12f, 1.0f); drawCone(5.5f, 2.2f); glPopMatrix();

    // FINS
    glPushMatrix(); glTranslatef(0.8f, 0.1f, 2.2f); glRotatef(-25, 0, 0, 1); glRotatef(-85, 1, 0, 0); glScalef(0.08f, 1.0f, 1.0f); drawCone(3.0f, 1.3f); glPopMatrix();
    glPushMatrix(); glTranslatef(-0.8f, 0.1f, 2.2f); glRotatef(25, 0, 0, 1); glRotatef(-85, 1, 0, 0); glScalef(0.08f, 1.0f, 1.0f); drawCone(3.0f, 1.3f); glPopMatrix();

    // REAR STABS
    glPushMatrix(); glTranslatef(0.9f, 0.0f, 2.0f); glRotatef(-35, 0, 1, 0); glScalef(1.0f, 0.06f, 1.0f); drawCone(2.5f, 1.2f); glPopMatrix();
    glPushMatrix(); glTranslatef(-0.9f, 0.0f, 2.0f); glRotatef(35, 0, 1, 0); glScalef(1.0f, 0.06f, 1.0f); drawCone(2.5f, 1.2f); glPopMatrix();

    // ENGINES
    glColor3f(0.2f, 0.2f, 0.25f);
    glPushMatrix(); glTranslatef(-0.5f, 0.0f, 3.0f); drawTexturedBox(0.6f, 0.35f, 0.8f); glPopMatrix();
    glPushMatrix(); glTranslatef(0.5f, 0.0f, 3.0f); drawTexturedBox(0.6f, 0.35f, 0.8f); glPopMatrix();

    // COCKPIT
    glEnable(GL_BLEND);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
    glColor4f(0.1f, 0.4f, 0.8f, 0.7f);
    glPushMatrix(); glTranslatef(0.0f, 0.17f, -2.5f); glScalef(0.25f, 0.25f, 0.9f); glutSolidSphere(1.0, 30, 30); glPopMatrix();
    glDisable(GL_BLEND);
}

void drawEnvironment() {
    if (jetY > 100.0f) return;

    glEnable(GL_TEXTURE_2D); glBindTexture(GL_TEXTURE_2D, groundTextureId);
    glBegin(GL_QUADS);
    glNormal3f(0, 1, 0);
    glTexCoord2f(0, 0); glVertex3f(-300, -2.0f, 300);
    glTexCoord2f(30, 0); glVertex3f(300, -2.0f, 300);
    glTexCoord2f(30, 30); glVertex3f(300, -2.0f, -500);
    glTexCoord2f(0, 30); glVertex3f(-300, -2.0f, -500);
    glEnd();
    glDisable(GL_TEXTURE_2D);

    glColor3f(0.2f, 0.2f, 0.2f);
    glBegin(GL_QUADS);
    glVertex3f(-15, -1.9f, 300); glVertex3f(15, -1.9f, 300);
    glVertex3f(15, -1.9f, -500); glVertex3f(-15, -1.9f, -500);
    glEnd();

    glColor3f(1.0f, 1.0f, 1.0f);
    glBegin(GL_QUADS);
    for(int z = 280; z > -480; z -= 40) {
        glVertex3f(-0.5f, -1.85f, z); glVertex3f(0.5f, -1.85f, z);
        glVertex3f(0.5f, -1.85f, z-15); glVertex3f(-0.5f, -1.85f, z-15);
    }
    glEnd();

    for (const auto& obj : envObjects) {
        glPushMatrix();
        glTranslatef(obj.x, -2.0f, obj.z);
        glScalef(obj.scale, obj.scale, obj.scale);
        if (obj.type == 0) {
            glColor3f(0.4f, 0.25f, 0.1f);
            glPushMatrix(); glRotatef(-90, 1, 0, 0); glutSolidCone(0.8, 3.0, 8, 2); glPopMatrix();
            glColor3f(0.1f, 0.6f, 0.1f);
            glTranslatef(0, 2.0f, 0);
            glPushMatrix(); glRotatef(-90, 1, 0, 0); glutSolidCone(2.5, 5.0, 8, 2); glPopMatrix();
        } else {
            glColor3f(0.6f, 0.6f, 0.7f);
            glTranslatef(0, 2.5f, 0);
            glScalef(4.0f, 5.0f, 4.0f);
            glutSolidCube(1.0f);
        }
        glPopMatrix();
    }
}

void updateLogic() {
    if (currentState == TAXI) {
        jetSpeed += 0.005f;
        if (jetSpeed > 0.6f) jetSpeed = 0.6f;
        jetZ -= jetSpeed;
    }
    else if (currentState == TAKEOFF) {
        jetZ -= jetSpeed;
        if (jetPitch < 25.0f) jetPitch += 0.8f;
        jetY += 0.4f;
        if (jetY > 50.0f) currentState = FLYING;
    }
    else if (currentState == FLYING) {
        jetZ -= 1.2f;
        if (jetPitch > 0.0f) jetPitch -= 0.5f;
        if (jetY < 300.0f) jetY += 0.8f;
        if (jetZ < -6000.0f) jetZ = 200.0f;
    }
}

void drawSky() {
    glDisable(GL_LIGHTING); glDisable(GL_DEPTH_TEST);
    glMatrixMode(GL_PROJECTION); glPushMatrix(); glLoadIdentity(); gluOrtho2D(-1, 1, -1, 1);
    glMatrixMode(GL_MODELVIEW); glPushMatrix(); glLoadIdentity();

    // BLUE WHITE GRADIENT SKY
    glBegin(GL_QUADS);
    glColor3f(0.0f, 0.4f, 0.8f); // Deep Blue Top
    glVertex2f(-1, 1); glVertex2f(1, 1);
    glColor3f(0.9f, 0.9f, 1.0f); // White/Pale Blue Bottom
    glVertex2f(1, -1); glVertex2f(-1, -1);
    glEnd();

    glPopMatrix(); glMatrixMode(GL_PROJECTION); glPopMatrix(); glMatrixMode(GL_MODELVIEW);
    glEnable(GL_DEPTH_TEST); glEnable(GL_LIGHTING);
}

// --- DRAW SOLID GLOWING FLAMES ---
void drawFlames() {
    // IMPORTANT: GL_DEPTH_MASK set to FALSE to allow particles to blend
    // but GL_DEPTH_TEST set to TRUE so they hide behind the jet body.
    glEnable(GL_DEPTH_TEST);
    glDepthMask(GL_FALSE);

    glDisable(GL_LIGHTING);
    glEnable(GL_BLEND);
    // Additive blending (GL_ONE) makes the overlapping particles bright and glowing
    glBlendFunc(GL_SRC_ALPHA, GL_ONE);

    glBegin(GL_POINTS);
    for (const auto& p : particles) {
        if (p.life > 0.0f) {
            glColor4f(p.r, p.g, p.b, p.a);
            glPointSize(p.size);
            glVertex3f(p.x, p.y, p.z);
        }
    }
    glEnd();

    glDisable(GL_BLEND);
    glDepthMask(GL_TRUE);
    glEnable(GL_LIGHTING);
}

// --- CONTROLS ---
void handleKeys(unsigned char key, int x, int y) {
    if (key == 's' || key == 'S') {
        if (currentState == IDLE) currentState = TAXI;
    }
    if (key == 'i' || key == 'I') {
        if (currentState == TAXI) currentState = TAKEOFF;
    }
    if (key == 27) exit(0);
}

void specialKeys(int key, int x, int y) {
    switch (key) {
        case GLUT_KEY_UP:    angleX -= 5.0f; break;
        case GLUT_KEY_DOWN:  angleX += 5.0f; break;
        case GLUT_KEY_LEFT:  angleY -= 5.0f; break;
        case GLUT_KEY_RIGHT: angleY += 5.0f; break;
    }
    glutPostRedisplay();
}

void display() {
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    drawSky();
    glLoadIdentity();
    float radX = angleX * M_PI / 180.0f;
    float radY = angleY * M_PI / 180.0f;
    float camX = jetX + sin(radY) * cos(radX) * dist;
    float camY = jetY + sin(radX) * dist;
    float camZ = jetZ + cos(radY) * cos(radX) * dist;
    gluLookAt(camX, camY, camZ, jetX, jetY, jetZ, 0.0f, 1.0f, 0.0f);

    drawEnvironment();

    glPushMatrix();
    glTranslatef(jetX, jetY, jetZ);
    glRotatef(-jetPitch, 1.0f, 0.0f, 0.0f);
    drawF22();
    glPopMatrix();

    drawFlames();

    glutSwapBuffers();
}

void idle() { updateLogic(); updateParticles(); glutPostRedisplay(); }
void mouseMotion(int x, int y) { if (leftMouseDown) { angleY += (x - lastMouseX); angleX += (y - lastMouseY); } if (rightMouseDown) { dist += (y - lastMouseY) * 0.1f; if(dist < 5) dist=5; } lastMouseX = x; lastMouseY = y; }
void mouseButton(int button, int state, int x, int y) { if (button == GLUT_LEFT_BUTTON) leftMouseDown = (state == GLUT_DOWN); else if (button == GLUT_RIGHT_BUTTON) rightMouseDown = (state == GLUT_DOWN); lastMouseX = x; lastMouseY = y; }
void reshape(int w, int h) { if (h == 0) h = 1; glMatrixMode(GL_PROJECTION); glLoadIdentity(); gluPerspective(45.0f, (float)w / h, 1.0f, 1000.0f); glMatrixMode(GL_MODELVIEW); }

int main(int argc, char** argv) {
    glutInit(&argc, argv); glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGBA | GLUT_DEPTH | GLUT_MULTISAMPLE);
    glutInitWindowSize(1000, 700); glutCreateWindow("F-22 Raptor Jet");
    initRendering();
    glutDisplayFunc(display);
    glutReshapeFunc(reshape);
    glutIdleFunc(idle);
    glutMouseFunc(mouseButton);
    glutMotionFunc(mouseMotion);
    glutKeyboardFunc(handleKeys);
    glutSpecialFunc(specialKeys);
    glutMainLoop(); return 0;
}
