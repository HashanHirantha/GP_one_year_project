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

### 1.2 Search & Filtering ✅
- Filter by property type (House, Apartment, etc.)
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
- View and manage user profile information
- Role-aware profile display

### 1.6 Seller Dashboard ✅
- Add new property listings (multi-field form)
- Manage owned properties (edit, delete, toggle availability)
- View and respond to buyer inquiries
- Revenue and payment tracking
- Seller-specific analytics and stats
- Account settings management

### 1.7 Admin Dashboard ✅
- Platform-wide statistics overview
- User management (search, edit roles, block users)
- Property moderation (approve, reject, remove listings)
- Contact message management (read, reply, archive)
- Content moderation tools
- Analytics and reporting dashboards
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
- Reviews displayed on property detail pages

### 1.11 Google Maps Integration ✅
- Map URL field for properties
- Location display on property details

---

## 2. Enhancements — Planned 📋

### 2.1 Advanced Search 📋
- Map-based property search (interactive map view)
- Neighbourhood/area-based filtering
- Nearby amenities search (schools, hospitals, transport)
- Save search preferences
- Search history

### 2.2 Image Management 📋
- Image upload via Supabase Storage (replace URL-based approach)
- Image compression and optimisation
- Multiple image upload with drag-and-drop
- Virtual tour / 360° photo support

### 2.3 Notifications System 📋
- In-app notification centre
- Email notifications for inquiry replies
- Push notifications (browser / PWA)
- Notification preferences management

### 2.4 Messaging / Chat 📋
- Real-time chat between buyers and sellers
- Chat history and message threads
- File/image sharing in chat
- Online status indicators

### 2.5 Comparison Tool 📋
- Side-by-side property comparison
- Compare by price, area, amenities, location
- Save and share comparisons

### 2.6 Mortgage Calculator 📋
- Built-in mortgage/loan calculator
- Monthly payment estimates
- Interest rate comparison
- Down payment analysis

### 2.7 Appointment/Viewing Scheduler 📋
- Book property viewings online
- Calendar integration
- Automated reminders
- Seller availability management

### 2.8 Social Sharing 📋
- Share property listings to WhatsApp, Facebook, X/Twitter
- Generate shareable property links
- Social media preview cards (Open Graph tags)

### 2.9 Multi-Language Support (i18n) 📋
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
