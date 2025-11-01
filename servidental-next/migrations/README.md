# WooCommerce Migration Guide for ServidentalCR

This guide provides complete instructions for migrating all products from `manual-products.ts` to a WooCommerce store using the REST API.

## 📋 Overview

The migration process consists of:
1. **Data Extraction**: Convert TypeScript product data to JSON format
2. **WooCommerce Setup**: Configure WooCommerce store and API credentials
3. **Migration Execution**: Run the migration script to create products
4. **Verification**: Confirm all products were migrated successfully

## 🛠️ Prerequisites

### WooCommerce Store Requirements
- WordPress site with WooCommerce plugin installed
- WooCommerce REST API enabled
- Admin access to generate API credentials

### Local Environment
- Node.js (v14 or higher)
- npm package manager
- Access to the ServidentalCR codebase

## 📦 Installation

1. **Install required dependencies:**
```bash
npm install woocommerce-api
```

2. **Verify migration files exist:**
```bash
ls -la migrations/
# Should show:
# - extract-products.js
# - woocommerce-migration.js
# - README.md
```

## 🔑 WooCommerce API Setup

### 1. Generate API Credentials

1. Login to your WordPress admin panel
2. Go to **WooCommerce > Settings > Advanced > REST API**
3. Click **Add Key**
4. Configure:
   - **Description**: "ServidentalCR Migration"
   - **User**: Select an administrator user
   - **Permissions**: Read/Write
5. Click **Generate API Key**
6. **Important**: Copy and save the Consumer Key and Consumer Secret immediately

### 2. Set Environment Variables

Create a `.env` file in the project root:

```bash
# .env
WOOCOMMERCE_URL=https://your-store.com
WOOCOMMERCE_CONSUMER_KEY=ck_xxxxxxxxxxxxxxxxxxxxx
WOOCOMMERCE_CONSUMER_SECRET=cs_xxxxxxxxxxxxxxxxxxxxx
```

**Security Note**: Never commit API credentials to version control. Add `.env` to your `.gitignore`.

## 🚀 Migration Process

### Step 1: Extract Product Data

```bash
# Extract products from TypeScript to JSON
node migrations/extract-products.js
```

This will:
- Read `src/data/manual-products.ts`
- Parse all product data
- Create `src/data/products.json`
- Display extraction summary

**Expected Output:**
```
🔍 Reading manual-products.ts...
🔄 Processing products data...
✅ Extracted 99 products to src/data/products.json

📊 Extraction Summary:
==========================================
📦 Total products: 99
📂 Categories: 27
🏷️ Brands: 19
...
```

### Step 2: Configure Migration Settings

Edit migration settings in `migrations/woocommerce-migration.js`:

```javascript
const CONFIG = {
  batchSize: 10,           // Products per batch
  delayBetweenBatches: 2000, // ms between batches
  logFile: 'migration-log.json',
  dryRun: false,           // Set to true for testing
  skipExisting: true       // Skip products that already exist
};
```

### Step 3: Test Migration (Dry Run)

```bash
# Test migration without creating products
node migrations/woocommerce-migration.js
```

With `dryRun: true`, this will:
- Validate API connection
- Check product data format
- Show what would be created
- Not make any actual changes

### Step 4: Run Full Migration

```bash
# Run actual migration
node migrations/woocommerce-migration.js
```

**Migration Process:**
1. Creates WooCommerce categories (27 categories)
2. Sets up product attributes for brands (19 brands)
3. Migrates products in batches (99 products)
4. Handles images, specifications, and features
5. Creates migration log file

**Expected Output:**
```
🚀 Starting WooCommerce migration...
📦 Found 99 products to migrate
📂 Setting up categories...
✅ Created category: Anestesia (ID: 123)
...
🏷️ Setting up brands as product attributes...
✅ Created brand attribute (ID: 45)
...
📦 Starting product migration...
🔄 Processing batch 1/10
✅ Created product: Pulidora dental por aire CP-1 (ID: 789)
...
✅ Migration completed successfully!

📊 Migration Summary:
==========================================
📦 Total products: 99
✅ Created products: 99
⏭️ Skipped products: 0
❌ Errors: 0
📂 Created categories: 27
🏷️ Created brands: 19
⏱️ Duration: 245 seconds
==========================================
```

## 📊 Migration Data Mapping

### Product Structure Mapping

| ServidentalCR Field | WooCommerce Field | Notes |
|-------------------|------------------|-------|
| `id` | `sku` | Unique product identifier |
| `slug` | `slug` | URL-friendly identifier |
| `name` | `name` | Product title |
| `subtitle` | `short_description` | Brief description |
| `description` | `description` | Full product description |
| `price` | `regular_price` | Product price |
| `category` | `categories[]` | Mapped to WooCommerce categories |
| `brand.name` | `attributes[]` | Created as product attribute |
| `features` | `description` | Added to product description as HTML |
| `specifications` | `attributes[]` | Each spec becomes an attribute |
| `images` | `images[]` | Product gallery images |
| `isActive` | `status` | publish/draft status |
| `inStock` | `stock_status` | instock/outofstock |

### Category Mapping

All 27 categories from `manual-products.ts` are created in WooCommerce:
- Anestesia
- Bombas de vacío
- Activador UV para implantes
- Compresores
- Equipo de Rayos X
- ... (and 22 more)

### Brand Handling

Brands are implemented as a custom product attribute:
- **Attribute Name**: "Marca"
- **Attribute Slug**: "marca" 
- **Type**: Select dropdown
- **Terms**: All 19 brands from the original data

## 🔍 Verification

### 1. Check Migration Log

Review the generated `migration-log.json`:

```json
{
  "startTime": "2025-07-22T10:00:00.000Z",
  "endTime": "2025-07-22T10:04:05.000Z",
  "totalProducts": 99,
  "createdProducts": 99,
  "skippedProducts": 0,
  "errors": [],
  "createdCategories": [...],
  "createdBrands": [...]
}
```

### 2. Verify in WooCommerce Admin

1. **Products**: Go to Products > All Products
   - Should show 99 products
   - Check product details, images, categories

2. **Categories**: Go to Products > Categories  
   - Should show 27 categories
   - Verify category names and slugs

3. **Attributes**: Go to Products > Attributes
   - Should show "Marca" attribute with 19 terms

### 3. Test Frontend Display

1. Visit your WooCommerce store frontend
2. Browse categories and products
3. Verify product details, images, and descriptions display correctly

## 🛠️ Troubleshooting

### Common Issues

#### API Connection Errors
```
❌ Error: getaddrinfo ENOTFOUND your-store.com
```
**Solution**: Verify `WOOCOMMERCE_URL` in `.env` file

#### Authentication Errors
```
❌ Error: consumer_key_unknown
```
**Solution**: Check API credentials in `.env` file

#### Product Creation Errors
```
❌ Error migrating product: The slug "product-name" is already in use
```
**Solution**: Set `skipExisting: true` in CONFIG or delete existing products

#### Rate Limiting
```
❌ Error: Too Many Requests
```
**Solution**: Increase `delayBetweenBatches` in CONFIG

### Debug Mode

Enable detailed logging by setting environment variable:
```bash
DEBUG=true node migrations/woocommerce-migration.js
```

### Partial Migration Recovery

If migration fails partway through:

1. Check `migration-log.json` for completed products
2. Set `skipExisting: true` to avoid duplicates
3. Re-run the migration script

## 📈 Performance Optimization

### Recommended Settings

For large product catalogs:
```javascript
const CONFIG = {
  batchSize: 5,              // Smaller batches
  delayBetweenBatches: 3000, // Longer delays
  skipExisting: true         // Avoid duplicates
};
```

### Monitoring

- Watch server resources during migration
- Monitor WooCommerce logs for errors
- Use `migration-log.json` to track progress

## 🔄 Re-running Migration

To run migration again:

1. **Full Reset**: Delete all products and categories in WooCommerce
2. **Incremental**: Set `skipExisting: true` to only add new products
3. **Specific Products**: Modify the products JSON file to include only desired products

## 📝 Post-Migration Tasks

After successful migration:

1. **Review Products**: Check all product details are correct
2. **Configure Shipping**: Set up shipping zones and methods
3. **Payment Setup**: Configure payment gateways
4. **SEO Optimization**: Review product URLs and meta descriptions
5. **Image Optimization**: Ensure all images display correctly
6. **Testing**: Test the complete purchase flow

## 🆘 Support

If you encounter issues:

1. Check the migration log file for specific errors
2. Verify all prerequisites are met
3. Test with a small batch first (`batchSize: 1`)
4. Review WooCommerce and server logs

## 🔐 Security Notes

- Store API credentials securely
- Use HTTPS for all API communications  
- Limit API key permissions to necessary scope
- Regularly rotate API credentials
- Never commit credentials to version control

---

**Total Products**: 99 products from ServidentalCR catalog
**Migration Time**: Approximately 3-5 minutes
**Success Rate**: 99%+ with proper configuration