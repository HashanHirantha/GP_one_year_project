# Smart Property Finder — Project Overview

## 1. Project Description

**Smart Property Finder** is a modern real-estate listing web application built for the Sri Lankan property market. It allows property owners (sellers) to list, manage, and market residential properties, while buyers can browse, search, filter, favourite, and inquire about listings. An admin dashboard provides platform-wide moderation, analytics, and user management.

---

## 2. Tech Stack

| Layer         | Technology                                                     |
| ------------- | -------------------------------------------------------------- |
| **Frontend**  | React 19 (JSX) · Vite 7 · React Router DOM 7                  |
| **Styling**   | Tailwind CSS (CDN) · Custom Tailwind config · Outfit + Playfair Display fonts |
| **Animation** | Framer Motion 12                                               |
| **Icons**     | Lucide React                                                   |
| **Backend**   | Supabase (PostgreSQL + Auth + Realtime + Storage + RLS)        |
| **Hosting**   | GitHub Pages (`gh-pages` package present)                      |

---

## 3. Project Structure

```
GP_one_year_project/
├── index.html                  # Vite entry point + Tailwind CDN config
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies & scripts
├── public/                     # Static assets (logo, icons)
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
│   ├── assets/                 # Images & static media
│   │
│   ├── components/
│   │   ├── common/             # Shared components (Navbar, Footer, Logo, ScrollToTop, EditProperty)
│   │   ├── layout/             # Dashboard layout wrapper (DashboardLayout)
│   │   ├── ui/                 # Reusable UI widgets (PropertyCard, TrendingPropertyCard, PricingTrendChart, SidebarItem)
│   │   ├── admin/              # Admin dashboard sub-views (9 modules — see below)
│   │   └── owner/              # Seller dashboard sub-views (8 modules — see below)
│   │
│   └── pages/
│       ├── public/             # Public-facing pages (Home, About, Contact, Properties, PropertyDetails, Favorites, Profile)
│       ├── auth/               # Authentication pages (Login, Signup, UpdatePassword)
│       ├── owner/              # Owner dashboard page (OwnerDashboard)
│       └── admin/              # Admin dashboard page (AdminDashboard)
│
├── *.sql                       # Supabase migration/schema files
│   ├── contact_messages_schema.sql
│   ├── property_inquiries_schema.sql
│   ├── reviews_schema.sql
│   ├── property_updates_schema.sql
│   └── google_map_schema.sql
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
| Admin Stats           | `AdminStats.jsx`            | Platform-wide KPI cards                          |
| User Management       | `UserManagement.jsx`        | View, search, edit, block, promote users          |
| Property Management   | `PropertyManagement.jsx`    | Review, approve, reject property listings         |
| Contact Messages      | `ContactMessages.jsx`       | Read, reply, archive contact form submissions     |
| Content Moderation    | `ContentModeration.jsx`     | Flag and manage inappropriate content             |
| Analytics & Reports   | `AnalyticsReports.jsx`      | Platform analytics and reporting dashboards       |
| Transactions          | `Transactions.jsx`          | Payment and transaction history                   |
| System Settings       | `SystemSettings.jsx`        | Platform configuration and settings               |
| Recent Activity       | `RecentActivity.jsx`        | Activity feed / audit log                         |

---

## 7. Seller Dashboard Modules

| Module             | File                   | Description                                  |
| ------------------ | ---------------------- | -------------------------------------------- |
| Owner Stats        | `OwnerStats.jsx`       | Seller-specific KPI cards                    |
| My Properties      | `MyProperties.jsx`     | CRUD interface for owned property listings    |
| Add Property       | `AddProperty.jsx`      | Multi-field form for creating new listings    |
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

## 9. Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

If these are not set, the app will still render public pages using fallback/mock data, but all auth and database features will be disabled.

---

## 10. Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start Vite dev server (http://localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```
