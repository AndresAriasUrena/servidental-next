# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 website for ServidentalCR, a dental medical equipment company in Costa Rica. The site features:
- Product catalog with detailed product pages
- Services showcase 
- Contact forms with EmailJS integration
- Spanish language content
- Static export configuration for deployment

## Development Commands

```bash
# Development server
npm run dev

# Production build (static export)
npm run build

# Start production server
npm run start

# Linting
npm run lint

# Parse products data (custom script)
npm run parse-products
```

## Architecture & Structure

### App Router Structure (Next.js 13+ App Router)
- `/src/app/` - App router pages and layouts
- `/src/components/` - Reusable React components organized by feature
- `/src/data/` - Static data files (manual-products.ts, manual-SpareParts.ts)
- `/src/types/` - TypeScript type definitions
- `/src/assets/` - Static assets (images, logos)
- `/src/services/` - Service utilities
- `/src/utils/` - Helper utilities

### Key Components Architecture
- **Layout**: Header/Footer in `/components/layout/`
- **Product System**: ProductCard, ProductGallery, ProductInfo in `/components/products/`
- **Contact System**: ContactForm with EmailJS integration in `/components/contact/`
- **UI Components**: Reusable components in `/components/ui/`

### Data Management
- Products defined in `/src/data/manual-products.ts` with TypeScript types
- Spare parts in `/src/data/manual-SpareParts.ts`
- No external database - all content is statically defined

### Styling & Assets
- Tailwind CSS with custom theme colors (servi_green, servi_dark, etc.)
- AVIF image format optimized for web
- Custom background gradients and utilities
- Responsive design with custom 4xl breakpoint

## Important Configuration Notes

### Next.js Configuration
- **Static Export**: `output: 'export'` for static hosting
- **Images**: `unoptimized: true` for static export compatibility
- **TypeScript**: `ignoreBuildErrors: true` set (consider reviewing)
- **Webpack**: Custom rules for video files (mp4, webm)

### Product System
- Products use slug-based routing: `/products/[slug]/`
- Product types defined in `/src/types/product.ts`
- Categories and brands are strictly typed
- Image handling uses Next.js StaticImageData type

### Internationalization
- Spanish language content throughout
- Costa Rican market focus
- 18+ age requirement mentioned in metadata

## Development Guidelines

When working with this codebase:

1. **Product Management**: Products are manually defined in data files, not database-driven
2. **Image Optimization**: Use AVIF format for new images when possible
3. **Routing**: Follow slug-based product routing pattern
4. **Styling**: Use existing Tailwind custom theme colors and utilities
5. **TypeScript**: Leverage existing type definitions in `/src/types/`
6. **Static Export**: Remember this builds to static files, no server-side features