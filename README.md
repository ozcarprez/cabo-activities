# 🌊 CaboXplore — Cabo San Lucas Activities Platform

A full-stack marketplace for booking activities, tours, and experiences in Cabo San Lucas, Mexico. Built with Next.js 14, TypeScript, Tailwind CSS, Prisma, and PostgreSQL.

![CaboXplore](https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1200&h=400&fit=crop)

## 🏗️ Architecture

```
cabo-activities/
├── prisma/
│   ├── schema.prisma        # Database schema (Users, Activities, Bookings, Reviews, etc.)
│   └── seed.ts              # Seed data with 10 real Cabo activities
├── src/
│   ├── app/
│   │   ├── page.tsx          # Homepage (Hero, Categories, Featured, Testimonials, CTA)
│   │   ├── layout.tsx        # Root layout with Header & Footer
│   │   ├── globals.css       # Global styles, Cabo theme, animations
│   │   ├── activities/       # Activities listing with search & filters
│   │   ├── [slug]/           # Activity detail page with booking widget
│   │   ├── auth/signin/      # Sign in / Sign up page
│   │   ├── dashboard/
│   │   │   └── operator/     # Operator dashboard (stats, bookings, activities)
│   │   └── api/
│   │       ├── activities/   # GET activities with filters
│   │       └── bookings/     # POST create booking, GET user bookings
│   ├── components/
│   │   ├── layout/           # Header, Footer
│   │   ├── home/             # Hero, Categories, Featured, Why, Testimonials, CTA
│   │   ├── activities/       # ActivityCard
│   │   ├── booking/          # (ready for BookingForm, BookingConfirmation)
│   │   └── ui/               # RatingStars, (ready for more shared components)
│   └── lib/
│       ├── types.ts          # TypeScript interfaces
│       └── sample-data.ts    # 10 real Cabo activities (works without DB)
├── tailwind.config.ts        # Cabo-themed color palette & animations
├── .env.example              # All required environment variables
└── package.json
```

## ✨ Features Implemented

### Pages
- **Homepage** — Hero with search, category grid, featured activities, trust section, testimonials, operator CTA
- **Activities Listing** — Search, category filters, duration filter, price range, sort options
- **Activity Detail** — Image gallery, includes/excludes, requirements, meeting point, reviews, booking widget with date/time/guests, mobile booking bar
- **Sign In/Up** — Google OAuth + email/password forms
- **Operator Dashboard** — Revenue stats, recent bookings, activity management, daily schedule

### API Routes
- `GET /api/activities` — Search, filter, sort, paginate activities
- `POST /api/bookings` — Create booking with pricing calculation (15% commission)
- `GET /api/bookings` — Fetch user bookings

### Database (Prisma Schema)
- **Users** — Tourists, Operators, Admins with role-based access
- **Activities** — Full details, images, coordinates, pricing, availability
- **Categories** — 8 Cabo-specific categories
- **Bookings** — With booking items, status tracking
- **Payments** — Stripe integration ready
- **Reviews** — Star ratings, comments, photo reviews
- **Availability** — Date/time slots with capacity management

### Design
- **Custom Cabo palette** — Ocean blues, turquoise, sand, sunset orange, coral
- **DM Serif Display** — Elegant serif for headings
- **Outfit** — Clean sans-serif for body text
- **Glassmorphism** — Frosted glass effects on header and search bar
- **Micro-animations** — Fade-in, slide-up, staggered reveals, floating elements
- **Mobile-first** — Fully responsive with mobile booking bar

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL (or use Supabase/Neon for hosted)
- npm or yarn

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env with your database URL and API keys

# 3. Generate Prisma client
npx prisma generate

# 4. Push schema to database
npx prisma db push

# 5. Seed sample data
npx ts-node prisma/seed.ts

# 6. Start dev server
npm run dev
```

The app works **without a database** using the sample data in `src/lib/sample-data.ts`. Connect PostgreSQL when ready for real data.

### Visit
- Homepage: http://localhost:3000
- Activities: http://localhost:3000/activities
- Activity Detail: http://localhost:3000/deep-sea-marlin-fishing
- Operator Dashboard: http://localhost:3000/dashboard/operator
- Sign In: http://localhost:3000/auth/signin

## 🔌 Integration Guide

### Stripe (Payments)
1. Add `STRIPE_SECRET_KEY` and `STRIPE_PUBLIC_KEY` to `.env`
2. Create payment intent in `POST /api/bookings`
3. Add Stripe Elements to the booking form
4. Set up webhooks for payment confirmation

### NextAuth (Authentication)
1. Add Google OAuth credentials to `.env`
2. Configure providers in `src/app/api/auth/[...nextauth]/route.ts`
3. Wrap app with `SessionProvider`

### Google Maps (Meeting Points)
1. Add `NEXT_PUBLIC_GOOGLE_MAPS_KEY` to `.env`
2. Replace map placeholder in Activity Detail with `@react-google-maps/api`

### Cloudinary (Images)
1. Add Cloudinary credentials to `.env`
2. Create upload API route
3. Add image upload to operator activity form

## 📊 Activity Categories

| Category | Icon | Examples |
|----------|------|----------|
| Sport Fishing | 🎣 | Marlin charters, inshore fishing |
| Snorkel & Diving | 🤿 | Pelican Rock, Chileno Bay, scuba |
| Boat Tours | 🚤 | Whale watching, glass-bottom, kayak |
| ATV & Land | 🏜️ | Desert ATV, camel rides, zip lines |
| Sailing & Cruises | ⛵ | Sunset sails, catamarans, party boats |
| Water Sports | 🏄 | Jet ski, flyboard, parasailing |
| Cultural Tours | 🎨 | Art walks, history, Todos Santos |
| Food & Drinks | 🌮 | Taco tours, tequila tastings |

## 🗺️ Next Steps

1. **Authentication** — Wire up NextAuth with Google + credentials
2. **Stripe Checkout** — Complete payment flow
3. **Email Notifications** — Booking confirmations via SendGrid/Resend
4. **Image Uploads** — Cloudinary integration for operator photos
5. **Admin Dashboard** — User management, commission settings, analytics
6. **Availability Calendar** — Interactive date picker with real-time slots
7. **i18n** — Full Spanish translation
8. **SEO** — Dynamic meta tags, structured data for activities
9. **PWA** — Offline support, push notifications
10. **Analytics** — Conversion tracking, operator performance metrics

## 📝 License

MIT — Built with ♥ for Cabo San Lucas
