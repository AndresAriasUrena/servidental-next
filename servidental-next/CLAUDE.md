# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ServidentalCR is a Next.js 15 e-commerce platform for dental equipment in Costa Rica. This is a hybrid static/dynamic application with integrated e-commerce functionality, blog system, and payment processing.

**Key Features:**
- Complete WooCommerce integration with 99+ migrated dental products
- WordPress headless CMS for blog content
- ONVO payment processing for Costa Rican market
- Advanced cart/checkout system with state management
- Product filtering, search, and categorization
- Responsive design with Tailwind CSS

## Development Commands

```bash
# Development
npm run dev                    # Start development server at localhost:3000
npm run build                  # Build for production (hybrid static + dynamic)
npm run start                  # Start production server
npm run lint                   # ESLint code checking

# Product Management
npm run parse-products         # Parse TypeScript products to JSON

# WooCommerce Migration (Already completed - 99/99 products migrated)
node migrations/extract-products-improved.js
node migrations/woocommerce-migration-fixed.js
node migrations/test-woocommerce-api.js
```

## Architecture Overview

### Core Architecture
This is a **Next.js 15 App Router** application with:
- **Hybrid rendering**: Static pages + dynamic e-commerce/blog content
- **Multi-service integration**: WooCommerce, WordPress CMS, ONVO payments
- **State management**: React Context for cart, local state for UI
- **API proxy pattern**: Next.js API routes proxy external services

### Key Directory Structure
```
src/
├── app/                     # Next.js 15 App Router
│   ├── api/                 # API route handlers
│   │   ├── woocommerce/     # WooCommerce REST API proxy
│   │   └── onvo/            # ONVO payment API proxy
│   ├── blog/                # Blog pages (WordPress CMS)
│   ├── tienda/              # E-commerce store pages
│   ├── carrito/             # Shopping cart page
│   └── checkout/            # Payment success/cancel pages
├── components/
│   ├── ecommerce/           # E-commerce UI components
│   │   ├── cart/            # Cart, MiniCart components
│   │   ├── checkout/        # Checkout, ONVO payment integration
│   │   ├── product/         # Product display components
│   │   └── filters/         # Product filtering/search
│   ├── blog/                # Blog components + WordPress iframe
│   └── layout/              # Header (with MiniCart), Footer
├── hooks/                   # Custom React hooks
│   ├── useCart.ts          # Cart state management
│   └── useWooCommerce.ts   # WooCommerce API integration
├── lib/
│   └── onvo.ts             # ONVO payment API client
├── services/
│   └── blogService.ts      # WordPress API integration
└── types/
    ├── woocommerce.ts      # WooCommerce type definitions
    └── blog.ts             # Blog/WordPress types
```

### Integration Status

**WooCommerce Backend**: ✅ Completed (99 products migrated)
**E-commerce Frontend**: ✅ Fully integrated
**Payment Processing**: ✅ ONVO integration active
**Blog System**: ✅ WordPress headless CMS

**Store URL**: https://wp.servidentalcr.com/tienda/

### System Integration Details

#### E-commerce Data Flow
1. **Product Management**: WooCommerce backend stores 99 dental products (27 categories, 18 brands)
2. **Frontend API**: Next.js API routes (`/api/woocommerce/*`) proxy WooCommerce REST API
3. **State Management**: React Context manages cart state across components
4. **Payment Flow**: Cart → Checkout → ONVO payment processor → Success/Cancel pages

#### API Architecture
```
Frontend → Next.js API Routes → External Services
         ↓
      /api/woocommerce/*  → WooCommerce REST API
      /api/onvo/*         → ONVO Payment API
      Direct fetch        → WordPress REST API
```

#### Key Components
- **ProductGrid**: WooCommerce product display with filtering/search
- **ProductDetails**: Individual product pages with cart integration
- **MiniCart**: Header cart component with real-time quantity updates
- **Checkout**: ONVO payment integration with customer data collection
- **BlogPost**: WordPress content rendering with custom styling
- **CartProvider**: React Context providing cart state management

### Data Sources & Management

**Primary Data Sources:**
- **WooCommerce**: Live product catalog (99 products, 27 categories)
- **WordPress**: Blog content via REST API (`/wp-json/wp/v2`)
- **Local Assets**: 600+ AVIF optimized product images in `/src/assets/`

**Data Flow:**
1. **Products**: WooCommerce → API routes → React components
2. **Blog**: WordPress → Direct fetch → React components (with caching)
3. **Cart**: Local state → React Context → Checkout integration
4. **Payments**: Cart data → ONVO API → Payment confirmation

### Styling Architecture

**Tailwind CSS** with custom theme:
- Brand colors: `servi_green`, `servi_dark`, `servi_light`
- Mobile-first responsive design
- Custom components for e-commerce UI

**Global CSS** (`/src/app/globals.css`):
- WordPress content styling overrides
- Product gallery and video integration styles
- Custom checkout and payment form styling

## Environment Configuration

### Required Environment Variables

**WooCommerce Integration:**
```bash
WOOCOMMERCE_URL=https://wp.servidentalcr.com
WOOCOMMERCE_CONSUMER_KEY=ck_[your_key]
WOOCOMMERCE_CONSUMER_SECRET=cs_[your_secret]
```

**ONVO Payment Processing:**
```bash
NEXT_PUBLIC_ONVO_PUBLISHABLE_KEY=onvo_test_[key]
ONVO_SECRET_KEY=onvo_test_[secret]
```

**WordPress Blog Integration:**
```bash
WORDPRESS_API_URL=https://wp.servidentalcr.com/wp-json/wp/v2
WORDPRESS_BASE_URL=https://wp.servidentalcr.com
```

**EmailJS Contact Forms:**
```bash
EMAILJS_SERVICE_ID=[service_id]
EMAILJS_TEMPLATE_ID=[template_id]
EMAILJS_USER_ID=[user_id]
```

### Key Dependencies

**Core Framework:**
- `next`: 15.0.x (App Router)
- `react`: 18.x
- `typescript`: 5.x

**E-commerce & Payments:**
- `@woocommerce/woocommerce-rest-api`: WooCommerce integration
- `woocommerce-api`: Legacy API client
- `axios`: HTTP client for ONVO and other APIs

**UI & Styling:**
- `tailwindcss`: CSS framework
- `@headlessui/react`: UI components
- `@heroicons/react`: Icon library
- `framer-motion`: Animations
- `yet-another-react-lightbox`: Image galleries

**Communication:**
- `@emailjs/browser`: Contact form integration

## Working with the E-commerce System

### Product Management
**Migration Completed**: 99 products successfully migrated to WooCommerce
**Status**: All products live at https://wp.servidentalcr.com/tienda/

**Key Files:**
- `/migrations/` - Complete migration toolkit (reference only)
- `/src/types/woocommerce.ts` - Auto-generated TypeScript types from WooCommerce API
- `/src/hooks/useWooCommerce.ts` - React hook for WooCommerce API integration

### Payment Integration (ONVO)
**Payment Flow:**
1. Cart state managed by `useCart` hook
2. Checkout component collects customer information
3. ONVO API creates payment intent
4. Customer redirected to ONVO payment page
5. Success/cancel redirects handled by `/checkout/success` and `/checkout/cancel` pages

**Key Files:**
- `/src/lib/onvo.ts` - ONVO API client and type definitions
- `/src/app/api/onvo/payment-intent/route.ts` - Payment intent creation endpoint
- `/src/components/ecommerce/checkout/OnvoPaymentSDK.tsx` - Payment integration component

### Blog System (WordPress Headless)
**API**: WordPress REST API at `wp.servidentalcr.com/wp-json/wp/v2/`
**Caching**: In-memory cache with 15-minute TTL
**Components**: BlogPost, BlogClient, WordPressDirectIframe

**Routes:**
- `/blog` - Blog listing with pagination
- `/blog/[slug]` - Individual blog posts
- `/tienda` - Product store
- `/tienda/[slug]` - Individual product pages
- `/carrito` - Shopping cart
- `/checkout/success` - Payment success
- `/checkout/cancel` - Payment cancellation


## Development Guidelines

### API Integration Patterns
**WooCommerce**: Use Next.js API routes (`/api/woocommerce/*`) as proxy to avoid CORS issues
**WordPress**: Direct fetch from frontend with caching in `blogService.ts`
**ONVO**: Server-side API calls only (secret keys)

### State Management Patterns
**Cart State**: Use `CartProvider` context - available globally after wrapping in layout
**Product Data**: Fetch via `useWooCommerce` hook with built-in caching
**Form State**: Local component state for checkout/contact forms

### Component Architecture
**E-commerce Components**: Located in `/src/components/ecommerce/`
- Follow existing patterns for product display
- Use WooCommerce types from `/src/types/woocommerce.ts`
- Implement loading states and error handling

**Styling**: Use Tailwind utility classes with custom theme colors
**Images**: AVIF format preferred, use Next.js Image component

### Localization
**Language**: Spanish (Costa Rica)
**Currency**: Costa Rican Colón (₡) and USD ($)
**Payment**: ONVO (Costa Rican payment processor)
**Target Market**: Costa Rican dental professionals

### Performance Considerations
**Image Optimization**: AVIF format with lazy loading (600+ optimized product images)
**Caching**: Blog content cached for 15 minutes, product data cached per request
**Bundle Optimization**: Next.js automatic code splitting and optimization

### Testing Key Functionality
**E-commerce Flow**: Product browsing → Add to cart → Checkout → ONVO payment
**Blog System**: WordPress content loading and display
**API Endpoints**: Test WooCommerce and ONVO integrations
**Responsive Design**: Mobile cart and checkout functionality

### Deployment Notes
**Platform**: Next.js compatible hosting (Vercel recommended)
**Environment Variables**: Required for WooCommerce, ONVO, and WordPress integration
**External Dependencies**: WooCommerce backend, WordPress CMS, ONVO payment processor
**Build Command**: `npm run build` (hybrid static + dynamic)

### Troubleshooting Common Issues

**API 500 Errors**: Check WooCommerce credentials and API endpoint URLs
**Payment Failures**: Verify ONVO keys and webhook configurations
**Blog Loading Issues**: Check WordPress backend status and API connectivity
**Cart State Issues**: Ensure CartProvider wraps the application properly
**Product Search**: Verify slug-based search implementation in WooCommerce API

**Migration Scripts** (Reference only - migration completed):
- All scripts in `/migrations/` directory for reference
- 99/99 products successfully migrated
- Do not re-run unless adding new products



---

## Current Status

**Production Ready**: ✅ Full e-commerce platform with payment integration
**Product Catalog**: 99 dental equipment products migrated and live
**Payment Processing**: ONVO integration active for Costa Rican market
**Blog System**: WordPress headless CMS integrated
**Cart & Checkout**: Complete shopping experience implemented

The platform serves Costa Rican dental professionals with a complete digital e-commerce solution including product catalog, cart management, secure payment processing, and content management.