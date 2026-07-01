import express from 'express';
import cors from 'cors';
import pkg from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

dotenv.config();
console.log("DEBUG ENV - VITE_SUPABASE_URL:", process.env.VITE_SUPABASE_URL);
console.log("DEBUG ENV - VITE_SUPABASE_ANON_KEY:", process.env.VITE_SUPABASE_ANON_KEY);
console.log("DEBUG ENV - VITE_SUPABASE_KEY:", process.env.VITE_SUPABASE_KEY);

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_KEY
);

const { Client, LocalAuth } = pkg;

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',') 
    : ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());

let isReady = false;
let latestQrCode = null;
let clientStatus = 'initializing'; // initializing, scan_required, connected, disconnected

// Prevent server crash on async third-party library errors
process.on('unhandledRejection', (reason, promise) => {
    console.error('⚠️ Unhandled Promise Rejection:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('⚠️ Uncaught Exception:', error);
});

// Initialize WhatsApp Web Client
console.log('🚀 Initializing WhatsApp Web Client...');
const whatsapp = new Client({
    authStrategy: new LocalAuth({
        dataPath: './.wwebjs_auth'
    }),
    puppeteer: {
        // Use default chromium on Linux servers, or specific path on Windows local
        ...(process.platform === 'win32' ? { executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' } : {}),
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// QR Code generation for terminal scanning
whatsapp.on('qr', (qr) => {
    console.log('\n📱 ACTION REQUIRED: Scan the QR code below to connect your WhatsApp account:');
    qrcode.generate(qr, { small: true });
    console.log('Once scanned, your session will be saved locally so you do not have to scan it again.');
    latestQrCode = qr;
    clientStatus = 'scan_required';
});

whatsapp.on('ready', () => {
    console.log('\n✅ WhatsApp Web Client is ready! You can now send automatic notifications.');
    isReady = true;
    latestQrCode = null;
    clientStatus = 'connected';
});

whatsapp.on('auth_failure', (msg) => {
    console.error('\n❌ WhatsApp Authentication failed:', msg);
    clientStatus = 'disconnected';
    isReady = false;
});

whatsapp.on('disconnected', (reason) => {
    console.log('\n⚠️ WhatsApp was disconnected:', reason);
    isReady = false;
    clientStatus = 'disconnected';
});

// Listen for incoming messages to handle subscriptions
whatsapp.on('message', async (msg) => {
    if (!msg.body) return;
    
    const bodyText = msg.body.trim();
    const rawPhone = msg.from.split('@')[0]; // Extract phone number (e.g. 94721300910)
    
    let propertyId = null;
    let isShortCode = false;

    // Check if it's a 5-digit numeric code
    if (/^\d{5}$/.test(bodyText)) {
        const record = subscriptionCodes.get(bodyText);
        if (record) {
            propertyId = record.propertyId;
            isShortCode = true;
            
            // Mark as verified and store sender's phone
            record.verified = true;
            record.verifiedPhone = rawPhone;
            
            // Schedule code deletion in 30 seconds (allows polling client to read it)
            setTimeout(() => {
                subscriptionCodes.delete(bodyText);
            }, 30000);
        } else {
            return msg.reply("❌ Invalid or expired subscription code. Please request a new code on the website.");
        }
    } else if (bodyText.startsWith('Subscribe to price drop alerts for property ')) {
        propertyId = bodyText.replace('Subscribe to price drop alerts for property ', '').trim();
    } else if (bodyText.startsWith('Subscribe to price alerts for property ')) {
        propertyId = bodyText.replace('Subscribe to price alerts for property ', '').trim();
    }

    if (propertyId) {
        console.log(`\n📲 Received subscription request from ${rawPhone} for property ID: ${propertyId}`);
        
        try {
            // Fetch property details to verify and get the name
            const { data: property, error: fetchErr } = await supabase
                .from('properties')
                .select('title')
                .eq('id', propertyId)
                .single();
                
            if (fetchErr || !property) {
                console.error(`❌ Could not find property with ID ${propertyId}:`, fetchErr);
                return msg.reply("❌ Sorry, we couldn't find that property. Please verify the link and try again.");
            }
            
            let isSubscribed = false;
            let alreadyExists = false;

            // 1. Try Supabase first
            try {
                // Check if already subscribed to prevent duplicates
                const { data: existing, error: checkErr } = await supabase
                    .from('price_alerts')
                    .select('id')
                    .eq('property_id', propertyId)
                    .eq('phone_number', rawPhone)
                    .maybeSingle();
                    
                if (existing) {
                    alreadyExists = true;
                    isSubscribed = true;
                } else if (!checkErr) {
                    // Insert subscription
                    const { error: insertErr } = await supabase
                        .from('price_alerts')
                        .insert([{
                            property_id: propertyId,
                            phone_number: rawPhone
                        }]);
                        
                    if (!insertErr) {
                        isSubscribed = true;
                    }
                }
            } catch (dbErr) {
                console.warn("Supabase database subscription query/insert failed, falling back to local file storage:", dbErr.message || dbErr);
            }
            
            // 2. Local JSON File storage fallback
            if (!isSubscribed) {
                let localAlerts = [];
                try {
                    if (fs.existsSync('price_alerts.json')) {
                        localAlerts = JSON.parse(fs.readFileSync('price_alerts.json', 'utf8'));
                    }
                } catch (e) {
                    console.error("Error reading local alerts file:", e);
                }

                alreadyExists = localAlerts.some(a => a.property_id === propertyId && a.phone_number === rawPhone);
                if (alreadyExists) {
                    isSubscribed = true;
                } else {
                    localAlerts.push({ property_id: propertyId, phone_number: rawPhone, created_at: new Date().toISOString() });
                    try {
                        fs.writeFileSync('price_alerts.json', JSON.stringify(localAlerts, null, 2));
                        isSubscribed = true;
                    } catch (e) {
                        console.error("Error writing local alerts file:", e);
                    }
                }
            }
            
            if (alreadyExists) {
                return msg.reply(`🔔 You are already subscribed to price alerts for *"${property.title}"*! We will notify you here as soon as the price changes.`);
            }

            if (isSubscribed) {
                msg.reply(`✅ *Subscription Confirmed!*\n\nYou have successfully subscribed to price alerts for *"${property.title}"*.\n\nWe will notify you here the second the price changes!`);
                console.log(`📱 Subscribed WhatsApp number ${rawPhone} to property "${property.title}"`);
            } else {
                msg.reply("⚠️ An error occurred while processing your subscription. Please try again later.");
            }
        } catch (err) {
            console.error('Subscription processing error:', err);
            msg.reply("⚠️ An error occurred while processing your subscription. Please try again later.");
        }
    }
});

// Initialize client
whatsapp.initialize().catch(err => {
    console.error('Failed to initialize WhatsApp client:', err);
});

// Normalize phone number to WhatsApp format (E.164 without plus prefix, ending with @c.us)
function formatToWhatsAppId(phone) {
    if (!phone) return '';
    
    // Remove all non-digit characters
    let cleaned = phone.trim().replace(/\D/g, '');
    
    // Sri Lankan mobile number in local format: e.g. 0771234567 -> 94771234567
    if (cleaned.startsWith('0') && cleaned.length === 10) {
        cleaned = '94' + cleaned.slice(1);
    }
    
    // Sri Lankan number without leading zero: e.g. 771234567 -> 94771234567
    if (cleaned.length === 9 && (cleaned.startsWith('7') || cleaned.startsWith('1') || cleaned.startsWith('2') || cleaned.startsWith('3') || cleaned.startsWith('4') || cleaned.startsWith('5') || cleaned.startsWith('6') || cleaned.startsWith('8') || cleaned.startsWith('9'))) {
        cleaned = '94' + cleaned;
    }
    
    // Append the WhatsApp suffix
    return `${cleaned}@c.us`;
}

app.get('/api/whatsapp-status', (req, res) => {
    res.json({
        success: true,
        status: clientStatus,
        qr: latestQrCode
    });
});

const verificationCodes = new Map();
const subscriptionCodes = new Map();

app.get('/api/whatsapp-info', (req, res) => {
    res.json({
        success: true,
        status: clientStatus,
        number: (isReady && whatsapp.info && whatsapp.info.wid) ? whatsapp.info.wid.user : null
    });
});

app.get('/api/whatsapp-debug', async (req, res) => {
    try {
        let pageUrl = 'N/A';
        let pageTitle = 'N/A';
        let screenshot = null;
        
        if (whatsapp && whatsapp.pupPage) {
            pageUrl = whatsapp.pupPage.url();
            pageTitle = await whatsapp.pupPage.title();
            try {
                const buf = await whatsapp.pupPage.screenshot();
                screenshot = buf.toString('base64');
            } catch (e) {
                screenshot = 'Error taking screenshot: ' + e.message;
            }
        }
        
        res.json({
            success: true,
            status: clientStatus,
            isReady,
            latestQrCode,
            pageUrl,
            pageTitle,
            screenshot,
            info: whatsapp ? whatsapp.info : null
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/request-subscription-code', async (req, res) => {
    const { propertyId } = req.body;
    if (!propertyId) {
        return res.status(400).json({ success: false, error: 'Property ID is required.' });
    }

    try {
        let code;
        let attempts = 0;
        do {
            code = Math.floor(10000 + Math.random() * 90000).toString(); // 5-digit code
            attempts++;
        } while (subscriptionCodes.has(code) && attempts < 10);

        subscriptionCodes.set(code, {
            propertyId,
            createdAt: Date.now(),
            verified: false,
            verifiedPhone: null
        });

        // Auto expire after 15 minutes
        setTimeout(() => {
            subscriptionCodes.delete(code);
        }, 15 * 60 * 1000);

        res.json({
            success: true,
            code,
            botNumber: (isReady && whatsapp.info && whatsapp.info.wid) ? whatsapp.info.wid.user : '94769700721'
        });
    } catch (error) {
        console.error("Error generating subscription code:", error);
        res.status(500).json({ success: false, error: 'Failed to generate code.' });
    }
});

app.get('/api/check-subscription-code/:code', (req, res) => {
    const { code } = req.params;
    const record = subscriptionCodes.get(code);
    if (record && record.verified) {
        res.json({
            success: true,
            verified: true,
            phone: record.verifiedPhone
        });
    } else {
        res.json({
            success: true,
            verified: false
        });
    }
});

app.post('/api/send-verification-code', async (req, res) => {
    const { phoneNumber, propertyId } = req.body;
    if (!phoneNumber || !propertyId) {
        return res.status(400).json({ success: false, error: 'Phone number and property ID are required.' });
    }

    if (!isReady) {
        return res.status(400).json({ success: false, error: 'WhatsApp gateway is offline. Please try again later.' });
    }

    try {
        // Clean and format phone number
        let cleaned = phoneNumber.trim().replace(/\D/g, '');
        if (cleaned.startsWith('0') && cleaned.length === 10) {
            cleaned = '94' + cleaned.slice(1);
        }
        if (cleaned.length === 9 && (cleaned.startsWith('7') || cleaned.startsWith('1') || cleaned.startsWith('2') || cleaned.startsWith('3') || cleaned.startsWith('4') || cleaned.startsWith('5') || cleaned.startsWith('6') || cleaned.startsWith('8') || cleaned.startsWith('9'))) {
            cleaned = '94' + cleaned;
        }

        // Get property details
        const { data: property, error: propErr } = await supabase
            .from('properties')
            .select('title')
            .eq('id', propertyId)
            .single();

        if (propErr || !property) {
            return res.status(404).json({ success: false, error: 'Property not found.' });
        }

        // Resolve JID using getNumberId
        const whatsappId = `${cleaned}@c.us`;
        const numberId = await whatsapp.getNumberId(whatsappId);
        
        if (!numberId) {
            return res.status(400).json({ success: false, error: 'This phone number is not registered on WhatsApp.' });
        }

        const targetJid = numberId._serialized;

        // Generate 6-digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Store code (valid for 5 minutes)
        const expiry = Date.now() + 5 * 60 * 1000;
        verificationCodes.set(`${cleaned}_${propertyId}`, { code, expiry });

        // Send WhatsApp verification message
        const messageText = `🔐 *Smart Property Finder Verification Code*\n\nYour code is: *${code}*\n\nEnter this code on the website to subscribe to price alerts for *"${property.title}"*. (Valid for 5 mins)`;
        
        await whatsapp.sendMessage(targetJid, messageText);
        console.log(`✉️ Sent verification code ${code} to ${cleaned} for property ${propertyId}`);

        res.json({ success: true });
    } catch (error) {
        console.error("Error sending verification code:", error);
        res.status(500).json({ success: false, error: error.message || 'Failed to send verification code.' });
    }
});

app.post('/api/verify-code', async (req, res) => {
    const { phoneNumber, code, propertyId } = req.body;
    if (!phoneNumber || !code || !propertyId) {
        return res.status(400).json({ success: false, error: 'Phone number, code, and property ID are required.' });
    }

    let cleaned = phoneNumber.trim().replace(/\D/g, '');
    if (cleaned.startsWith('0') && cleaned.length === 10) {
        cleaned = '94' + cleaned.slice(1);
    }
    if (cleaned.length === 9 && (cleaned.startsWith('7') || cleaned.startsWith('1') || cleaned.startsWith('2') || cleaned.startsWith('3') || cleaned.startsWith('4') || cleaned.startsWith('5') || cleaned.startsWith('6') || cleaned.startsWith('8') || cleaned.startsWith('9'))) {
        cleaned = '94' + cleaned;
    }

    const key = `${cleaned}_${propertyId}`;
    const record = verificationCodes.get(key);

    if (!record) {
        return res.status(400).json({ success: false, error: 'No verification code was sent to this number or it expired.' });
    }

    if (Date.now() > record.expiry) {
        verificationCodes.delete(key);
        return res.status(400).json({ success: false, error: 'Verification code has expired. Please request a new one.' });
    }

    if (record.code !== code.trim()) {
        return res.status(400).json({ success: false, error: 'Invalid verification code. Please check and try again.' });
    }

    // Code is valid! Delete it from temp store
    verificationCodes.delete(key);

    // Register subscription
    let isSubscribed = false;
    try {
        // Try Supabase first
        const { error } = await supabase
            .from('price_alerts')
            .insert([{
                property_id: propertyId,
                phone_number: cleaned
            }]);
        if (!error) {
            isSubscribed = true;
        }
    } catch (e) {
        console.warn("Supabase insert during verification failed, trying local file:", e.message || e);
    }

    // Try local JSON file fallback
    if (!isSubscribed) {
        try {
            let localAlerts = [];
            if (fs.existsSync('price_alerts.json')) {
                localAlerts = JSON.parse(fs.readFileSync('price_alerts.json', 'utf8'));
            }

            const alreadyExists = localAlerts.some(a => a.property_id === propertyId && a.phone_number === cleaned);
            if (!alreadyExists) {
                localAlerts.push({ property_id: propertyId, phone_number: cleaned, created_at: new Date().toISOString() });
                fs.writeFileSync('price_alerts.json', JSON.stringify(localAlerts, null, 2));
            }
            isSubscribed = true;
        } catch (e) {
            console.error("Failed to save verification locally:", e);
        }
    }

    if (isSubscribed) {
        try {
            // Get property title
            const { data: property } = await supabase
                .from('properties')
                .select('title')
                .eq('id', propertyId)
                .single();

            const title = property ? property.title : 'selected property';

            // Send confirmation WhatsApp message
            const whatsappId = `${cleaned}@c.us`;
            const numberId = await whatsapp.getNumberId(whatsappId);
            const targetJid = numberId ? numberId._serialized : whatsappId;

            await whatsapp.sendMessage(targetJid, `✅ *Subscription Confirmed!*\n\nYou have successfully subscribed to price alerts for *"${title}"*.\n\nWe will notify you here the second the price changes!`);
        } catch (msgErr) {
            console.error("Failed to send verification confirmation message:", msgErr);
        }

        res.json({ success: true });
    } else {
        res.status(500).json({ success: false, error: 'Failed to complete subscription registration.' });
    }
});

app.get('/api/price-alerts/:propertyId', async (req, res) => {
    const { propertyId } = req.params;
    let alertsList = [];
    
    // 1. Try Supabase
    try {
        const { data: alerts, error } = await supabase
            .from('price_alerts')
            .select('phone_number')
            .eq('property_id', propertyId);
            
        if (!error && alerts) {
            alertsList = alerts.map(a => a.phone_number);
        }
    } catch (err) {
        console.warn("Supabase fetch for alerts failed, trying local file:", err.message || err);
    }
    
    // 2. Load from local JSON file and merge
    try {
        if (fs.existsSync('price_alerts.json')) {
            const localAlerts = JSON.parse(fs.readFileSync('price_alerts.json', 'utf8'));
            const matching = localAlerts
                .filter(a => a.property_id === propertyId)
                .map(a => a.phone_number);
            
            // Merge and deduplicate
            alertsList = [...new Set([...alertsList, ...matching])];
        }
    } catch (e) {
        console.error("Failed to read local alerts file:", e);
    }
    
    res.json({
        success: true,
        alerts: alertsList
    });
});

app.post('/api/subscribe-alert', async (req, res) => {
    const { propertyId, phoneNumber } = req.body;
    if (!propertyId || !phoneNumber) {
        return res.status(400).json({ success: false, error: 'Property ID and Phone Number are required.' });
    }
    
    const rawPhone = phoneNumber.replace(/\D/g, '');
    let isSubscribed = false;
    
    // Try Supabase first
    try {
        const { error } = await supabase
            .from('price_alerts')
            .insert([{
                property_id: propertyId,
                phone_number: rawPhone
            }]);
        if (!error) {
            isSubscribed = true;
        }
    } catch (e) {
        console.warn("Supabase manual insert failed, trying local file:", e.message || e);
    }
    
    // Try local file fallback
    if (!isSubscribed) {
        try {
            let localAlerts = [];
            if (fs.existsSync('price_alerts.json')) {
                localAlerts = JSON.parse(fs.readFileSync('price_alerts.json', 'utf8'));
            }
            
            const alreadyExists = localAlerts.some(a => a.property_id === propertyId && a.phone_number === rawPhone);
            if (!alreadyExists) {
                localAlerts.push({ property_id: propertyId, phone_number: rawPhone, created_at: new Date().toISOString() });
                fs.writeFileSync('price_alerts.json', JSON.stringify(localAlerts, null, 2));
            }
            isSubscribed = true;
        } catch (e) {
            console.error("Failed to save alert locally:", e);
        }
    }
    
    if (isSubscribed) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false, error: 'Failed to subscribe phone number.' });
    }
});

app.post('/api/send-sms', async (req, res) => {
    const { to, message } = req.body;

    if (!isReady) {
        console.error('❌ Cannot send message: WhatsApp client is not authenticated/ready yet.');
        return res.status(400).json({
            success: false,
            error: 'WhatsApp client is not ready. Please scan the QR code in the server terminal first.'
        });
    }

    try {
        const formattedId = formatToWhatsAppId(to);
        const numberId = await whatsapp.getNumberId(formattedId);
        const whatsappId = numberId ? numberId._serialized : formattedId;

        console.log(`\n📬 Incoming Notification request:`);
        console.log(`   - To (Raw): "${to}"`);
        console.log(`   - To (WhatsApp ID resolved): "${whatsappId}"`);
        console.log(`   - Message: "${message}"`);

        const response = await whatsapp.sendMessage(whatsappId, message);
        console.log('✅ WhatsApp message sent successfully! Msg ID:', response.id.id);
        res.status(200).json({ success: true, sid: response.id.id });
    } catch (error) {
        console.error('❌ Failed to send WhatsApp message:', error);
        res.status(500).json({ success: false, error: error.message || 'WhatsApp sending failed' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Notification Backend Server running on http://localhost:${PORT}`);
    console.log(`Waiting for notification requests...`);
});

