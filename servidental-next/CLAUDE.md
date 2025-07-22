# CLAUDE.md - ServidentalCR E-commerce Platform

This file provides comprehensive guidance to Claude Code when working with the ServidentalCR project - a complete dental equipment e-commerce platform.

## Project Overview

ServidentalCR is a **full-featured e-commerce platform** for dental medical equipment in Costa Rica, featuring:

- **Complete product catalog** with 99+ dental equipment products
- **WooCommerce e-commerce integration** with full online store functionality  
- **Dynamic blog system** with WordPress headless CMS
- **Product migration system** for database management
- **Advanced contact forms** with EmailJS integration
- **Professional showcase** of dental services
- **Spanish language content** for Costa Rican market
- **Responsive design** with Tailwind CSS custom theme

## Development Commands

```bash
# Development server
npm run dev

# Production build (hybrid - static + dynamic)
npm run build

# Start production server
npm run start

# Linting and type checking
npm run lint
npm run typecheck

# Product data management
npm run parse-products

# WooCommerce migrations
node migrations/extract-products-improved.js          # Extract products to JSON
node migrations/woocommerce-migration-fixed.js       # Migrate to WooCommerce
node migrations/test-woocommerce-api.js              # Test API connection
```

## Architecture & Structure

### Next.js 15 App Router Structure
- `/src/app/` - App router pages and layouts with complete routing
- `/src/components/` - Organized React components by feature
  - `/blog/` - Blog system (BlogClient, BlogPost, BlogSidebar, etc.)
  - `/products/` - Product system (ProductCard, ProductGallery, ProductInfo)
  - `/contact/` - Contact forms and communication
  - `/layout/` - Navigation, header, footer components
  - `/ui/` - Reusable UI components and utilities
- `/src/data/` - Product data files (manual-products.ts, manual-SpareParts.ts)
- `/src/types/` - TypeScript definitions (blog.ts, product.ts, etc.)
- `/src/assets/` - Optimized static assets (600+ AVIF images)
- `/src/services/` - API integration services
  - `blogService.ts` - WordPress API integration
- `/src/utils/` - Helper utilities and functions
- `/migrations/` - **WooCommerce migration system** (complete toolkit)

### WooCommerce E-commerce Integration

**Migration System Status**: ✅ **COMPLETED** - July 22, 2025
- **99 products** successfully migrated to WooCommerce
- **27 categories** created and organized  
- **18 brands** configured as product attributes
- **100% success rate** in 96 seconds migration time
- **Products live at**: https://wp.servidentalcr.com/tienda/

### Key Components Architecture

#### E-commerce System
- **WooCommerce Integration**: Full REST API v3 implementation
- **Product Catalog**: 99+ dental equipment products with detailed specs
- **Category System**: 27 organized product categories
- **Brand Management**: 18 equipment brands as searchable attributes
- **Stock Management**: Automatic inventory tracking
- **Pricing System**: Dynamic pricing with regular/sale prices

#### Blog System (WordPress Headless CMS)
- **Backend**: WordPress at `wp.servidentalcr.com`
- **API Integration**: Custom REST API endpoints with caching
- **Content Management**: Rich text editor with media support
- **SEO Optimization**: Dynamic metadata and Open Graph integration
- **Social Sharing**: WhatsApp, Facebook, LinkedIn integration

#### Product Management System
- **Data Structure**: TypeScript-defined product schemas
- **Image Optimization**: AVIF format with lazy loading
- **Video Integration**: YouTube iframe embedding
- **Specifications**: Detailed technical specifications system
- **Features**: Unique selling points and general features

#### Contact & Communication
- **EmailJS Integration**: Serverless email sending
- **WhatsApp Integration**: Direct messaging system
- **Contact Forms**: Multiple specialized contact forms
- **Service Showcase**: Professional dental services presentation

### Data Management

#### Products (99 items)
- **Source**: `/src/data/manual-products.ts` (TypeScript definitions)
- **Categories**: 27 dental equipment categories
- **Brands**: 18 major dental equipment manufacturers
- **Images**: 600+ optimized AVIF images
- **Videos**: YouTube integration for product demonstrations
- **Specifications**: Technical details and features
- **Migration Status**: ✅ All migrated to WooCommerce

#### Blog Content
- **Backend**: WordPress headless CMS
- **API**: REST API with custom endpoints
- **Caching**: In-memory cache with error handling fallbacks
- **Content Types**: Posts, categories, featured images
- **SEO**: Dynamic metadata generation

#### Migration Data
- **Extraction**: `migrations/extracted-products.json` (99 products)
- **Logs**: `migrations/migration-log-fixed.json` (detailed process log)
- **Statistics**: `migrations/extraction-stats.json` (analytics)
- **Documentation**: Complete migration guides and reports

### Styling & Design

#### Tailwind CSS Custom Theme
- **Brand Colors**: 
  - `servi_green`: Primary brand color
  - `servi_dark`: Dark theme variant
  - `servi_light`: Light accents
- **Typography**: Professional medical/dental industry fonts
- **Responsive Design**: Mobile-first approach with custom breakpoints
- **Custom Components**: Reusable UI component library

#### Content Styling
- **WordPress Content**: Global CSS overrides for blog content
- **Product Galleries**: Custom image carousel and zoom functionality
- **Video Integration**: Responsive YouTube embed styling
- **Form Styling**: Professional contact form appearance

## Configuration & Environment

### Next.js Configuration (next.config.js)
- **Deployment Mode**: Hybrid (static pages + dynamic blog/e-commerce)
- **Image Optimization**: Custom handling for AVIF and StaticImageData
- **TypeScript**: Configured with strict typing
- **Webpack**: Custom video file handling (mp4, webm)
- **Environment Variables**: Organized configuration management

### Environment Variables (.env files)

#### WordPress & Blog Integration
```bash
# WordPress CMS Backend
WORDPRESS_API_URL=https://wp.servidentalcr.com/wp-json/wp/v2
WORDPRESS_BASE_URL=https://wp.servidentalcr.com
```

#### WooCommerce E-commerce Integration
```bash
# WooCommerce Store
WOOCOMMERCE_URL=https://wp.servidentalcr.com
WOOCOMMERCE_CONSUMER_KEY=ck_[your_key]
WOOCOMMERCE_CONSUMER_SECRET=cs_[your_secret]

# Migration Configuration
MIGRATION_DRY_RUN=false
MIGRATION_BATCH_SIZE=5
MIGRATION_DELAY=2000
```

#### Contact & Communication
```bash
# EmailJS Integration
EMAILJS_SERVICE_ID=[service_id]
EMAILJS_TEMPLATE_ID=[template_id]
EMAILJS_USER_ID=[user_id]
```

#### Payment Integration (Future)
```bash
# ONVO Pay (Costa Rica)
NEXT_PUBLIC_ONVO_PUBLISHABLE_KEY=onvo_test_[key]
ONVO_SECRET_KEY=onvo_test_[secret]
```

### Dependencies

#### Production Dependencies
```json
{
  "next": "15.0.x",
  "react": "18.x",
  "typescript": "5.x",
  "tailwindcss": "3.x",
  "woocommerce-api": "1.x", // E-commerce integration
  "dotenv": "16.x" // Environment management
}
```

#### Migration & Development Tools
- **WooCommerce API Client**: REST API integration
- **Product Extraction Tools**: TypeScript to JSON conversion
- **Testing Suite**: API connectivity and validation
- **Logging System**: Detailed migration and error tracking

## WooCommerce Migration System

### Migration Status: ✅ COMPLETED
**Date**: July 22, 2025  
**Result**: 99/99 products successfully migrated (100% success rate)  
**Duration**: 96 seconds  
**Products Live**: https://wp.servidentalcr.com/tienda/

### Migration Toolkit (`/migrations/`)

#### Core Migration Scripts
- `extract-products-improved.js` - ✅ Extracts TypeScript products to JSON
- `woocommerce-migration-fixed.js` - ✅ Migrates products to WooCommerce
- `test-woocommerce-api.js` - ✅ Tests API connectivity and permissions

#### Data Files
- `extracted-products.json` - 99 products in WooCommerce-ready format
- `migration-log-fixed.json` - Detailed migration process log
- `extraction-stats.json` - Analytics and statistics

#### Documentation
- `README.md` - Complete migration guide
- `MIGRATION_SUCCESS_REPORT.md` - Detailed success report
- `MIGRATION_SUMMARY.md` - Executive summary

#### Testing & Debugging Tools
- `test-connection.js` - Basic connectivity testing
- `debug-api.js` - Detailed API response debugging
- Various diagnostic utilities

### Product Data Structure (WooCommerce)

Each migrated product includes:
- **Basic Info**: Name, slug, SKU, description
- **Categorization**: Product category assignment
- **Features**: HTML-formatted unique selling points
- **Stock Management**: Inventory tracking enabled
- **SEO**: Optimized titles and descriptions
- **Metadata**: Original ID and migration timestamp
- **Status**: Active/published state

### Migration Process
1. **Extract** products from TypeScript files
2. **Transform** data to WooCommerce format
3. **Create** categories and attributes
4. **Upload** products in optimized batches
5. **Verify** successful creation and indexing

## Blog System Integration

### WordPress Headless CMS
- **Backend URL**: `wp.servidentalcr.com`
- **API Endpoint**: `/wp-json/wp/v2/`
- **Features**: Posts, categories, featured images, SEO
- **Content Management**: WordPress admin interface

### Frontend Integration
- **Routes**: 
  - `/blog` - Main blog page with pagination
  - `/blog/[slug]` - Individual post pages
- **Components**: BlogClient, BlogPost, BlogSidebar, BlogCard
- **Caching**: In-memory cache with 15-minute expiration
- **SEO**: Dynamic metadata and social sharing

### Content Features
- **Search**: Real-time blog post search
- **Categories**: Organized content categorization  
- **Pagination**: Optimized page loading
- **Social Sharing**: WhatsApp, Facebook, LinkedIn
- **Reading Progress**: Visual reading progress indicator
- **Responsive Images**: Optimized image delivery

## Development Guidelines

### Working with Products
1. **Product Updates**: Modify `manual-products.ts` and re-run migration
2. **New Products**: Add to TypeScript file, extract, and migrate
3. **Images**: Store in `/src/assets/` with AVIF optimization
4. **Categories**: Update both TypeScript types and WooCommerce

### Working with Blog
1. **Content Management**: Use WordPress admin at `wp.servidentalcr.com/wp-admin`
2. **API Changes**: Update `blogService.ts` for new endpoints
3. **Styling**: Modify global CSS for WordPress content styling
4. **Caching**: Clear cache on significant blog updates

### Working with E-commerce
1. **Product Management**: Use WooCommerce admin interface
2. **Orders**: Process through WooCommerce dashboard
3. **Inventory**: Automatic stock tracking enabled
4. **Pricing**: Update via WooCommerce or re-run migration

### Code Standards
- **TypeScript**: Strict typing enabled, use existing type definitions
- **Components**: Follow existing patterns for consistency
- **Styling**: Use Tailwind classes with custom theme
- **Images**: Prefer AVIF format, use Next.js Image component
- **API Integration**: Implement proper error handling and caching

### Security Practices
- **Environment Variables**: Never commit credentials
- **API Keys**: Use environment-specific keys
- **Content Sanitization**: Sanitize user inputs
- **HTTPS**: Enforce secure connections
- **Error Handling**: Implement graceful degradation

## Internationalization & Localization

- **Language**: Spanish (Costa Rica)
- **Currency**: Costa Rican Colón (₡) and USD ($)
- **Market Focus**: Costa Rican dental professionals
- **Age Restriction**: 18+ mentioned in metadata
- **Cultural Considerations**: Professional medical industry standards

## Performance Optimizations

### Image Optimization
- **Format**: AVIF for modern browsers with WebP fallback
- **Lazy Loading**: Implemented on all product images
- **Responsive Images**: Multiple sizes for different viewports
- **CDN Ready**: Optimized for content delivery networks

### Caching Strategy
- **Blog Content**: In-memory cache with automatic invalidation
- **Product Data**: Static generation with incremental regeneration
- **API Responses**: Cached responses with appropriate TTL
- **Asset Optimization**: Minimized CSS/JS bundles

### Database Optimization
- **WooCommerce**: Optimized queries and indexing
- **WordPress**: Cached database queries
- **Migration**: Batch processing to prevent timeouts

## Testing & Quality Assurance

### Automated Testing
- **API Testing**: WooCommerce REST API connectivity
- **Migration Testing**: Dry-run mode for safe testing
- **Product Validation**: Data integrity checks
- **Performance Testing**: Load testing for high traffic

### Manual Testing Checklist
- [ ] All 99 products display correctly
- [ ] Product categories filter properly
- [ ] Blog posts load and display correctly
- [ ] Contact forms submit successfully
- [ ] WhatsApp integration works
- [ ] Responsive design on all devices
- [ ] SEO metadata generates correctly

## Deployment & Production

### Production Environment
- **Hosting**: Next.js compatible hosting (Vercel recommended)
- **Database**: WooCommerce MySQL database
- **CDN**: Image and asset delivery optimization
- **SSL**: HTTPS enforcement required

### Deployment Process
1. **Build**: `npm run build` for production bundle
2. **Environment**: Set production environment variables
3. **Database**: Ensure WooCommerce database is accessible
4. **Assets**: Upload optimized images to CDN if applicable
5. **Testing**: Verify all functionality in production
6. **Monitoring**: Set up error tracking and analytics

## Monitoring & Analytics

### Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS optimization
- **Page Load Times**: Regular performance audits
- **Database Performance**: Query optimization
- **API Response Times**: Monitor WooCommerce API

### Business Analytics
- **E-commerce Tracking**: Sales, conversion rates, popular products
- **Blog Analytics**: Most read posts, engagement metrics
- **Contact Form Analytics**: Inquiry rates and sources
- **SEO Performance**: Search rankings and organic traffic

## Future Enhancements

### Planned Features
- [ ] **User Accounts**: Customer registration and login
- [ ] **Order Management**: Full e-commerce checkout process
- [ ] **Payment Integration**: ONVO Pay for Costa Rican payments
- [ ] **Inventory Management**: Advanced stock tracking
- [ ] **Product Reviews**: Customer review system
- [ ] **Wishlist**: Customer product favorites
- [ ] **Advanced Search**: Product filtering and search
- [ ] **Email Marketing**: Newsletter and promotions

### Technical Improvements
- [ ] **PWA**: Progressive Web App functionality
- [ ] **Mobile App**: React Native companion app
- [ ] **API Expansion**: Custom endpoints for advanced features
- [ ] **Machine Learning**: Product recommendations
- [ ] **Advanced SEO**: Schema markup and rich snippets
- [ ] **Multi-language**: English language support

## Support & Maintenance

### Regular Maintenance Tasks
- **Product Updates**: Quarterly product catalog review
- **Security Updates**: Monthly dependency updates
- **Performance Audits**: Quarterly performance reviews
- **Content Updates**: Regular blog content publishing
- **Backup Verification**: Weekly backup testing

### Troubleshooting Common Issues
- **Migration Errors**: Check API credentials and connectivity
- **Blog Loading Issues**: Verify WordPress backend status
- **Product Display Problems**: Validate product data structure
- **Contact Form Issues**: Verify EmailJS configuration
- **Performance Issues**: Check image optimization and caching

### Getting Help
- **Documentation**: Refer to migration guides and API documentation
- **Logs**: Check migration logs and error reports
- **Testing Tools**: Use built-in diagnostic scripts
- **WordPress Support**: Contact WordPress hosting provider
- **WooCommerce Support**: Use WooCommerce community resources

---

## Project Status Summary

**Current Status**: ✅ **PRODUCTION READY**  
**Last Updated**: July 22, 2025  
**Migration Status**: ✅ **COMPLETED** (99/99 products)  
**Blog System**: ✅ **ACTIVE**  
**E-commerce**: ✅ **LIVE**  

### Key Achievements
- **Complete Product Migration**: 99 dental equipment products in WooCommerce
- **Professional Blog**: WordPress CMS with optimized content delivery
- **Responsive Design**: Mobile-optimized user experience
- **SEO Optimized**: Search engine friendly architecture
- **Production Ready**: Scalable, maintainable codebase

**ServidentalCR represents a complete digital transformation from simple catalog to full-featured e-commerce platform, ready for Costa Rican dental professionals.**