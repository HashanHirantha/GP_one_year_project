# Smart Property Finder — Feature Roadmap

> Status legend: ✅ Implemented · 🔧 Partial · 📋 Planned · 💡 Idea

---

## 1. Core Features — Implemented ✅

### 1.1 Property Listings ✅
- Browse all properties with card-based UI
- Property detail page with image gallery, amenities, owner info
- Trending property cards on home page
- Pricing trend chart component
- Featured & sponsored property flags
- Property view counter (session-deduplicated via `increment_property_views` RPC)

### 1.2 Search & Filtering ✅
- Filter by property type (House, Apartment, Villa, Land, Boarding)
- Search by location and keywords
- Price range filtering
- Sort by various criteria

### 1.3 Authentication & Authorization ✅
- Email/password registration and login (Supabase Auth)
- Role-based access control (buyer, seller, admin, blocked)
- Real-time role synchronization via Supabase Realtime
- Automatic account blocking with forced sign-out
- Password reset/update flow

### 1.4 Favourites System ✅
- Add/remove properties from favourites
- Dedicated favourites page
- Persistent across sessions (Supabase-backed)

### 1.5 User Profile ✅
- View and manage user profile information (`user_profiles` table)
- Role-aware profile display

### 1.6 Seller Dashboard ✅
- Add new property listings (multi-field form with image upload to Supabase Storage)
- Manage owned properties (edit, delete, toggle availability)
- View and respond to buyer inquiries
- Revenue and payment tracking
- Seller-specific analytics and stats
- Account settings management

### 1.7 Admin Dashboard ✅
- Platform-wide statistics overview (user count, property count)
- User management (search, edit roles, block, delete users)
- Property moderation (review, delete listings + images from storage)
- Contact message management (read, reply, archive)
- Content moderation tools
- Analytics and reporting dashboards (user growth, inquiry trends)
- Transaction history
- System settings configuration

### 1.8 Contact System ✅
- Public contact form (no auth required)
- Admin inbox with status tracking (unread → read → replied → archived)
- Full CRUD for admin contact management

### 1.9 Property Inquiries ✅
- Buyers can send inquiries on property detail pages
- Sellers receive and reply to inquiries in dashboard
- Status tracking (pending → replied)

### 1.10 Reviews & Ratings ✅
- Users can rate properties (1-5 stars)
- Written review comments
- Reviews displayed on property detail pages with reviewer names (via `user_profiles` lookup)
- Average rating calculation

### 1.11 Google Maps Integration ✅
- Map URL field for properties (supports iframe embed code or raw src URL)
- Interactive Google Maps iframe on property details

### 1.12 Image Upload via Supabase Storage ✅
- Direct image upload to Supabase Storage bucket (`property-images`)
- Multiple image upload (up to 5 per property)
- Primary image designation (first upload)
- Image management in edit mode (add new, delete existing)
- Images stored in `property_images` relational table

### 1.13 WhatsApp Price Drop Alerts ✅
- Dedicated "Price Drop Alerts" info page (`/sms-alerts`)
- WhatsApp notification backend server (`server.js` on port 3001)
- Two subscription methods:
  - **Verification Code**: User enters phone → receives 6-digit OTP via WhatsApp → verifies on website
  - **Short Code**: Website generates 5-digit code → user sends to bot's WhatsApp number → auto-subscribed
- Direct WhatsApp subscription via message (e.g., "Subscribe to price drop alerts for property [id]")
- QR-based WhatsApp authentication (via terminal)
- Session persistence (`.wwebjs_auth/`)
- Dual storage: Supabase `price_alerts` table + local JSON file fallback
- Price drop alert modal integrated into PropertyDetails page

### 1.14 Social Sharing ✅
- Web Share API integration on property details page
- Clipboard fallback for unsupported browsers
- Share property title, description, and URL

### 1.15 In-App Notifications (Schema) ✅
- `notifications` table created with RLS policies
- Supports per-user, per-property notifications with read status

---

## 2. Enhancements — Planned 📋

### 2.1 Advanced Search 📋
- Map-based property search (interactive map view)
- Neighbourhood/area-based filtering
- Nearby amenities search (schools, hospitals, transport)
- Save search preferences
- Search history

### 2.2 Notifications System (Frontend) 📋
- In-app notification centre (UI — schema already exists)
- Email notifications for inquiry replies
- Push notifications (browser / PWA)
- Notification preferences management

### 2.3 Messaging / Chat 📋
- Real-time chat between buyers and sellers
- Chat history and message threads
- File/image sharing in chat
- Online status indicators

### 2.4 Comparison Tool 📋
- Side-by-side property comparison
- Compare by price, area, amenities, location
- Save and share comparisons

### 2.5 Mortgage Calculator 📋
- Built-in mortgage/loan calculator
- Monthly payment estimates
- Interest rate comparison
- Down payment analysis

### 2.6 Appointment/Viewing Scheduler 📋
- Book property viewings online (button placeholder exists)
- Calendar integration
- Automated reminders
- Seller availability management

### 2.7 Multi-Language Support (i18n) 📋
- Sinhala and Tamil translations
- Language switcher in UI
- RTL layout support if needed

---

## 3. Technical Improvements — Planned 📋

### 3.1 Performance 📋
- Code splitting and lazy loading for routes
- Image lazy loading with placeholder blur
- Bundle size optimisation
- Service worker / PWA support for offline access

### 3.2 SEO & Accessibility 📋
- Server-side rendering (SSR) or static site generation (SSG) via Next.js migration
- Structured data (JSON-LD) for property listings
- Semantic HTML improvements
- ARIA labels and keyboard navigation
- Sitemap and robots.txt generation

### 3.3 Testing 📋
- Unit tests (Vitest + React Testing Library)
- Integration tests for auth flows
- E2E tests (Playwright or Cypress)
- API/RLS policy testing

### 3.4 CI/CD 📋
- GitHub Actions pipeline for lint, test, build
- Automated deployment to hosting platform
- Preview deployments for pull requests

### 3.5 Analytics & Monitoring 📋
- Google Analytics or Plausible integration
- Error monitoring (Sentry)
- Performance monitoring (Core Web Vitals)
- User behaviour tracking

---

## 4. Future Ideas 💡

### 4.1 AI-Powered Features 💡
- AI property recommendations based on user preferences
- Natural language property search ("3-bedroom house near Colombo under 50M")
- Automated property valuation estimates
- Image-based similar property suggestions

### 4.2 Payment Integration 💡
- Online payment for property deposits / booking fees
- Stripe or local payment gateway (e.g., PayHere)
- Invoice generation
- Payment history and receipts

### 4.3 Agent/Agency System 💡
- Real estate agent profiles
- Agency pages with team listings
- Agent performance ratings
- Commission tracking

### 4.4 Mobile App 💡
- React Native mobile app
- Mobile-first responsive PWA
- Native push notifications
- Offline property browsing

### 4.5 Data & Insights 💡
- Property market trends for Sri Lanka
- Area-based price indexes
- Investment ROI calculators
- Historical price data visualisation
