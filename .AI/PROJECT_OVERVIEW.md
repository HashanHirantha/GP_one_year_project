# Smart Property Finder — Project Overview

## 1. Project Description

**Smart Property Finder** is a modern real-estate listing web application built for the Sri Lankan property market. It allows property owners (sellers) to list, manage, and market residential properties, while buyers can browse, search, filter, favourite, and inquire about listings. An admin dashboard provides platform-wide moderation, analytics, and user management. The platform also features a **WhatsApp-based price drop alert system** powered by a Node.js backend server.

---

## 2. Tech Stack

| Layer              | Technology                                                                       |
| ------------------ | -------------------------------------------------------------------------------- |
| **Frontend**       | React 19 (JSX) · Vite 7 · React Router DOM 7                                    |
| **Styling**        | Tailwind CSS (CDN) · Custom Tailwind config · Outfit + Playfair Display fonts    |
| **Animation**      | Framer Motion 12                                                                 |
| **Icons**          | Lucide React                                                                     |
| **Backend (BaaS)** | Supabase (PostgreSQL + Auth + Realtime + Storage + RLS)                          |
| **Backend Server** | Node.js + Express 5 (WhatsApp notification gateway on port 3001)                 |
| **WhatsApp**       | `whatsapp-web.js` + `qrcode-terminal` (session-based WhatsApp Web automation)    |
| **SMS (legacy)**   | Twilio SDK (package present, server migrated to WhatsApp)                        |
| **Hosting**        | GitHub Pages (`gh-pages` package present)                                        |

---

## 3. Project Structure

```
GP_one_year_project/
├── index.html                  # Vite entry point + Tailwind CDN config
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies & scripts
├── server.js                   # WhatsApp notification backend (Express, port 3001)
├── public/
│   └── logo.svg                # Favicon / logo
│
├── src/
│   ├── main.jsx                # React entry — renders <App />
│   ├── App.jsx                 # Root component — routing + role-sync
│   ├── App.css                 # Global app styles
│   ├── index.css               # Base CSS
│   │
│   ├── config/
│   │   └── supabase.js         # Supabase client initialisation
│   │
│   ├── context/
│   │   └── AuthContext.jsx     # Auth state provider (session, role, realtime)
│   │
│   ├── data/
│   │   └── properties.js       # Static/mock property listings (fallback data)
│   │
│   ├── assets/
│   │   ├── logo.png            # App logo
│   │   ├── react.svg           # React logo
│   │   └── images/             # Static images
│   │
│   ├── components/
│   │   ├── common/             # Shared: Navbar, Footer, LogoIcon, ScrollToTop, EditProperty
│   │   ├── layout/             # Dashboard layout wrapper (DashboardLayout)
│   │   ├── ui/                 # Reusable: PropertyCard, TrendingPropertyCard, PricingTrendChart, SidebarItem
│   │   ├── admin/              # Admin dashboard sub-views (9 modules)
│   │   └── owner/              # Seller dashboard sub-views (8 modules)
│   │
│   └── pages/
│       ├── public/             # Home, About, Contact, Properties, PropertyDetails, Favorites, Profile, SmsAlertsInfo
│       ├── auth/               # Login, Signup, UpdatePassword
│       ├── owner/              # OwnerDashboard
│       └── admin/              # AdminDashboard
│
├── *.sql                       # Supabase migration/schema files
│   ├── contact_messages_schema.sql
│   ├── property_inquiries_schema.sql
│   ├── reviews_schema.sql
│   ├── property_updates_schema.sql
│   ├── google_map_schema.sql
│   ├── notifications_schema.sql
│   └── price_alerts_schema.sql
│
├── price_alerts.json           # Local JSON fallback for WhatsApp alert subscriptions
├── README_SMS.md               # SMS/Twilio setup guide (legacy)
├── README_WHATSAPP.md          # WhatsApp setup guide (current)
│
└── UI/                         # Design references, wireframes, Figma assets
```

---

## 4. User Roles & Permissions

The platform supports three user roles, managed via a `user_roles` Supabase table with real-time role syncing:

| Role       | Capabilities                                                                                       |
| ---------- | -------------------------------------------------------------------------------------------------- |
| **Buyer**  | Browse properties, search/filter, view details, add to favourites, submit inquiries, write reviews  |
| **Seller** | All buyer capabilities + list properties, manage own listings, respond to inquiries, view analytics  |
| **Admin**  | Full platform control: user management, property moderation, contact messages, analytics, system settings |

- A **blocked** role exists to ban users (triggers forced sign-out via realtime).
- Role changes are detected in real-time via Supabase Postgres Changes and trigger automatic UI redirection.

---

## 5. Routing Map

```
/                       → Home (public)
/about                  → About (public)
/contact                → Contact (public)
/properties             → Property Listings (public)
/property/:id           → Property Details (public)
/favorites              → Saved Favourites (authenticated)
/sms-alerts             → Price Drop Alerts Info Page (public)
/profile                → User Profile (authenticated)
/login                  → Login
/signup                 → Sign Up
/update-password        → Password Reset
/dashboard/seller/*     → Owner/Seller Dashboard (role: seller)
/dashboard/admin/*      → Admin Dashboard (role: admin)
*                       → Redirect to /
```

---

## 6. Admin Dashboard Modules

| Module                | File                        | Description                                      |
| --------------------- | --------------------------- | ------------------------------------------------ |
| Admin Stats           | `AdminStats.jsx`            | Platform-wide KPI cards (users, properties count) |
| User Management       | `UserManagement.jsx`        | View, search, edit, block, delete users           |
| Property Management   | `PropertyManagement.jsx`    | Review, delete property listings + images         |
| Contact Messages      | `ContactMessages.jsx`       | Read, reply, archive contact form submissions     |
| Content Moderation    | `ContentModeration.jsx`     | Flag and manage inappropriate content             |
| Analytics & Reports   | `AnalyticsReports.jsx`      | Platform analytics: user growth, inquiries        |
| Transactions          | `Transactions.jsx`          | Payment and transaction history                   |
| System Settings       | `SystemSettings.jsx`        | Platform configuration and settings               |
| Recent Activity       | `RecentActivity.jsx`        | Activity feed / audit log                         |

---

## 7. Seller Dashboard Modules

| Module             | File                   | Description                                  |
| ------------------ | ---------------------- | -------------------------------------------- |
| Owner Stats        | `OwnerStats.jsx`       | Seller-specific KPI cards                    |
| My Properties      | `MyProperties.jsx`     | CRUD interface for owned property listings    |
| Add Property       | `AddProperty.jsx`      | Multi-field form with image upload to Supabase Storage |
| Inquiries          | `Inquiries.jsx`        | View and reply to buyer inquiries             |
| Bookings           | `Bookings.jsx`         | Manage property booking requests              |
| Payments & Revenue | `PaymentsRevenue.jsx`  | Financial overview and payment tracking       |
| Owner Analytics    | `OwnerAnalytics.jsx`   | Performance metrics for own listings          |
| Owner Settings     | `OwnerSettings.jsx`    | Account and notification preferences          |

---

## 8. Authentication Flow

1. **Supabase Auth** handles email/password registration and login.
2. On sign-up, a role (buyer/seller) is stored in `user_metadata` and in the `user_roles` table.
3. `AuthContext` provides `{ user, role, loading, signOut }` to the entire app.
4. A **RoleSyncRedirector** component listens for role changes and redirects to the appropriate dashboard.
5. If Supabase env vars are missing, the app gracefully degrades — public pages render with mock data.

---

## 9. WhatsApp Notification Backend (`server.js`)

The project includes a standalone Express.js backend server (`server.js`) that acts as a **WhatsApp notification gateway** for price drop alerts. It runs on `http://localhost:3001`.

### Features
- **QR-based authentication**: On first run, displays a QR code in the terminal for linking a WhatsApp account via `whatsapp-web.js`.
- **Session persistence**: Saves auth session locally in `.wwebjs_auth/` so subsequent starts auto-connect.
- **Two subscription methods**:
  1. **Verification Code method**: User enters phone on the website → server sends a 6-digit WhatsApp OTP → user enters code → subscription confirmed.
  2. **Short Code method**: Server generates a 5-digit code → user sends it to the bot's WhatsApp number → subscription confirmed.
- **Price drop alerts**: When a property price changes, the frontend calls `/api/send-sms` to send WhatsApp messages to subscribed numbers.
- **Dual storage**: Subscriptions are stored in both Supabase (`price_alerts` table) and a local JSON file (`price_alerts.json`) as fallback.

### API Endpoints

| Method | Endpoint                              | Description                                    |
| ------ | ------------------------------------- | ---------------------------------------------- |
| GET    | `/api/whatsapp-status`                | WhatsApp client connection status + QR code    |
| GET    | `/api/whatsapp-info`                  | Connected WhatsApp number info                 |
| GET    | `/api/whatsapp-debug`                 | Debug info including browser screenshot        |
| POST   | `/api/request-subscription-code`      | Generate a 5-digit subscription short code     |
| GET    | `/api/check-subscription-code/:code`  | Poll if a short code has been verified         |
| POST   | `/api/send-verification-code`         | Send 6-digit OTP via WhatsApp to a phone       |
| POST   | `/api/verify-code`                    | Verify OTP and register subscription           |
| GET    | `/api/price-alerts/:propertyId`       | Get all subscribed phone numbers for a property|
| POST   | `/api/subscribe-alert`                | Manually subscribe a phone to a property       |
| POST   | `/api/send-sms`                       | Send a WhatsApp message to a phone number      |

---

## 10. Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

If these are not set, the app will still render public pages using fallback/mock data, but all auth and database features will be disabled.

> **Note:** The WhatsApp backend reads the same `.env` file for Supabase credentials. No additional Twilio or WhatsApp API keys are needed — authentication is handled via QR code scanning.

---

## 11. Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start Vite dev server (http://localhost:5173)
npm run server       # Start WhatsApp notification backend (http://localhost:3001)
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

> **Important:** Both `npm run dev` and `npm run server` must run simultaneously for the full application to work. The frontend connects to the backend at `http://localhost:3001` for WhatsApp alert features.
