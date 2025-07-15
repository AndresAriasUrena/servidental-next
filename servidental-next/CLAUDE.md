# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 website for ServidentalCR, a dental medical equipment company in Costa Rica. The site features:
- Product catalog with detailed product pages
- **Dynamic blog system with WordPress headless CMS**
- Services showcase 
- Contact forms with EmailJS integration
- Spanish language content
- **Hybrid deployment: Static pages + Dynamic blog**

## Development Commands

```bash
# Development server
npm run dev

# Production build (hybrid - static + dynamic)
npm run build

# Start production server
npm run start

# Linting
npm run lint

# Parse products data (custom script)
npm run parse-products
```

## Architecture & Structure

### App Router Structure (Next.js 15 App Router)
- `/src/app/` - App router pages and layouts
- `/src/components/` - Reusable React components organized by feature
  - `/blog/` - **Blog components (BlogClient, BlogPost, BlogSidebar, etc.)**
- `/src/data/` - Static data files (manual-products.ts, manual-SpareParts.ts)
- `/src/types/` - TypeScript type definitions
  - `blog.ts` - **Blog-related TypeScript interfaces**
- `/src/assets/` - Static assets (images, logos)
- `/src/services/` - Service utilities
  - `blogService.ts` - **WordPress API integration service**
- `/src/utils/` - Helper utilities

### Key Components Architecture
- **Layout**: Header/Footer in `/components/layout/`
- **Product System**: ProductCard, ProductGallery, ProductInfo in `/components/products/`
- **Blog System**: BlogClient, BlogPost, BlogSidebar, BlogCard in `/components/blog/`
- **Contact System**: ContactForm with EmailJS integration in `/components/contact/`
- **UI Components**: Reusable components in `/components/ui/`

### Data Management
- **Products**: Defined in `/src/data/manual-products.ts` with TypeScript types (static)
- **Spare parts**: In `/src/data/manual-SpareParts.ts` (static)
- **Blog content**: Fetched from WordPress headless CMS at `wp.servidentalcr.com` (dynamic)
- **Blog caching**: Implemented with in-memory cache and error handling

### Styling & Assets
- Tailwind CSS with custom theme colors (servi_green, servi_dark, etc.)
- **Custom blog content styling with global CSS overrides**
- AVIF image format optimized for web
- Custom background gradients and utilities
- Responsive design with custom 4xl breakpoint
- **Blog-specific prose styling for WordPress content**

## Important Configuration Notes

### Next.js Configuration
- **Deployment Mode**: Changed from static export to hybrid (static pages + dynamic blog)
- **Images**: `unoptimized: true` for static export compatibility
- **TypeScript**: `ignoreBuildErrors: true` set (consider reviewing)
- **Webpack**: Custom rules for video files (mp4, webm)

### Blog System (New)
- **Backend**: WordPress headless CMS at `wp.servidentalcr.com`
- **API**: WordPress REST API + custom endpoints
- **Routes**: 
  - `/blog` - Main blog page with pagination and filtering
  - `/blog/[slug]` - Individual post pages
- **Features**:
  - Server-side rendering for SEO
  - Social sharing (WhatsApp, Facebook, LinkedIn)
  - Categories and recent posts sidebar
  - Search functionality
  - Reading progress indicator
  - Responsive images with proper styling
- **Caching**: In-memory cache with fallback mechanisms
- **Error Handling**: Graceful degradation with fallback content

### Product System
- Products use slug-based routing: `/products/[slug]/`
- Product types defined in `/src/types/product.ts`
- Categories and brands are strictly typed
- Image handling uses Next.js StaticImageData type

### WordPress Integration
- **Headless Setup**: WordPress backend serves only API, frontend handled by Next.js
- **CORS Configuration**: Enabled for servidentalcr.com domain
- **Content Processing**: HTML content from WordPress styled with custom CSS
- **Image Optimization**: WordPress images displayed with proper centering and border-radius
- **SEO**: Dynamic metadata generation for blog posts

### Internationalization
- Spanish language content throughout
- Costa Rican market focus
- 18+ age requirement mentioned in metadata

## Development Guidelines

When working with this codebase:

1. **Product Management**: Products are manually defined in data files, not database-driven
2. **Blog Management**: Content managed through WordPress admin at `wp.servidentalcr.com`
3. **Image Optimization**: Use AVIF format for new images when possible
4. **Routing**: Follow slug-based routing pattern for both products and blog posts
5. **Styling**: Use existing Tailwind custom theme colors and utilities
6. **TypeScript**: Leverage existing type definitions in `/src/types/`
7. **Blog Content**: WordPress HTML content styled with global CSS in `globals.css`
8. **API Integration**: Use `blogService.ts` for all WordPress API interactions
9. **Error Handling**: Implement proper fallbacks for network/API failures
10. **Caching**: Utilize built-in caching mechanisms for better performance

## Blog Development Notes

### Content Styling
- WordPress content requires global CSS overrides in `globals.css`
- Images are automatically centered and styled with border-radius
- Proper spacing between paragraphs and images
- Consistent typography with brand colors

### Performance Considerations
- Blog posts are cached in memory for improved performance
- Pagination implemented for large post lists
- Images lazy-loaded with proper optimization
- Search functionality with debouncing

### SEO Implementation
- Dynamic metadata for individual blog posts
- Open Graph tags for social sharing
- Structured data for better search engine indexing
- Breadcrumb navigation

### Future Enhancements Ready
- Comment system integration point available
- Newsletter subscription placeholder
- Related posts functionality
- Tag-based filtering system