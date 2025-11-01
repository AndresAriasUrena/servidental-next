/**
 * WooCommerce Migration Script - Fixed Version
 * 
 * Uses direct HTTP calls instead of woocommerce-api package
 * 
 * Usage: node migrations/woocommerce-migration-fixed.js
 */

const fs = require('fs').promises;
const path = require('path');
const https = require('https');
const { URL } = require('url');

// Load environment variables
require('dotenv').config();

// Migration configuration
const CONFIG = {
  batchSize: parseInt(process.env.MIGRATION_BATCH_SIZE) || 5,
  delayBetweenBatches: parseInt(process.env.MIGRATION_DELAY) || 2000,
  logFile: 'migration-log-fixed.json',
  dryRun: process.env.MIGRATION_DRY_RUN === 'true',
  skipExisting: true
};

// Categories mapping (from manual-products.ts)
const CATEGORIES = [
  "Anestesia", "Bombas de vacío", "Activador UV para implantes", "Compresores",
  "Equipo de Rayos X", "Esterilización", "Fresadora", "Lámparas Dentales",
  "Lámparas de Fotocurado", "Cámaras Intraorales", "Lámparas de blanqueamiento",
  "Piezas de mano", "Escáneres", "Selladoras", "Termoformadoras",
  "Motores de implantes", "Motores de cirugías", "Lavadoras ultrasónicas",
  "Pulidores", "Motor NX-201N", "Unidades Dentales", "Mobiliario",
  "Pulverizador", "Equipo portátil", "Equipo para endodoncia",
  "Láseres dentales", "Electro bisturís"
];

class WooCommerceMigrationFixed {
  constructor() {
    this.log = {
      startTime: new Date().toISOString(),
      totalProducts: 0,
      processedProducts: 0,
      createdProducts: 0,
      skippedProducts: 0,
      errors: [],
      createdCategories: [],
      createdBrands: []
    };
    this.categoryMap = new Map();
    this.brandMap = new Map();
    this.existingProducts = new Set();
    this.baseUrl = new URL(process.env.WOOCOMMERCE_URL);
  }

  /**
   * Main migration function
   */
  async migrate() {
    try {
      console.log('🚀 Starting WooCommerce migration (Fixed Version)...');
      
      // Load products
      const products = await this.loadProducts();
      this.log.totalProducts = products.length;
      
      console.log(`📦 Found ${products.length} products to migrate`);
      
      // Step 1: Setup categories
      await this.setupCategories();
      
      // Step 2: Setup brands
      await this.setupBrands();
      
      // Step 3: Get existing products
      if (CONFIG.skipExisting) {
        await this.loadExistingProducts();
      }
      
      // Step 4: Migrate products in batches
      await this.migrateProducts(products);
      
      // Step 5: Save migration log
      await this.saveMigrationLog();
      
      console.log('✅ Migration completed successfully!');
      this.printSummary();
      
    } catch (error) {
      console.error('❌ Migration failed:', error);
      this.log.errors.push({
        type: 'MIGRATION_FAILED',
        error: error.message,
        timestamp: new Date().toISOString()
      });
      await this.saveMigrationLog();
    }
  }

  /**
   * Load products from the extracted JSON file
   */
  async loadProducts() {
    try {
      const extractedPath = path.join(__dirname, 'extracted-products.json');
      const data = await fs.readFile(extractedPath, 'utf8');
      const jsonData = JSON.parse(data);
      
      if (Array.isArray(jsonData)) {
        return jsonData;
      } else if (jsonData.products && Array.isArray(jsonData.products)) {
        return jsonData.products;
      } else {
        throw new Error('Invalid product data format');
      }
    } catch (error) {
      console.error('❌ No product data found. Please run extract-products-improved.js first');
      throw new Error('Product data not found');
    }
  }

  /**
   * Setup WooCommerce categories
   */
  async setupCategories() {
    console.log('📂 Setting up categories...');
    
    for (const categoryName of CATEGORIES) {
      try {
        if (CONFIG.dryRun) {
          console.log(`[DRY RUN] Would create category: ${categoryName}`);
          this.categoryMap.set(categoryName, Math.floor(Math.random() * 1000));
          continue;
        }

        const categoryData = {
          name: categoryName,
          slug: this.createSlug(categoryName),
          description: `Productos de ${categoryName}`
        };

        const response = await this.apiCall('POST', 'products/categories', categoryData);
        
        if (response && response.id) {
          this.categoryMap.set(categoryName, response.id);
          this.log.createdCategories.push({
            name: categoryName,
            id: response.id,
            slug: response.slug
          });
          console.log(`✅ Created category: ${categoryName} (ID: ${response.id})`);
        }
        
      } catch (error) {
        // Category might already exist
        if (error.message && (error.message.includes('already exists') || error.message.includes('slug_exists'))) {
          await this.findExistingCategory(categoryName);
        } else {
          console.error(`❌ Error creating category ${categoryName}:`, error.message);
          this.log.errors.push({
            type: 'CATEGORY_ERROR',
            category: categoryName,
            error: error.message,
            timestamp: new Date().toISOString()
          });
        }
      }
      
      // Rate limiting
      await this.delay(500);
    }
  }

  /**
   * Setup WooCommerce product attributes for brands
   */
  async setupBrands() {
    console.log('🏷️ Setting up brands as product attributes...');
    
    try {
      if (CONFIG.dryRun) {
        console.log('[DRY RUN] Would create brand attribute');
        return;
      }

      // Create brand attribute
      const brandAttribute = {
        name: 'Marca',
        slug: 'marca',
        type: 'select',
        order_by: 'menu_order',
        has_archives: true
      };

      const attrResponse = await this.apiCall('POST', 'products/attributes', brandAttribute);
      
      if (attrResponse && attrResponse.id) {
        console.log(`✅ Created brand attribute (ID: ${attrResponse.id})`);
        this.log.createdBrands.push({
          name: 'Brand Attribute',
          id: attrResponse.id
        });
      }
      
    } catch (error) {
      if (!error.message.includes('already exists')) {
        console.error('❌ Error setting up brands:', error.message);
      }
    }
  }

  /**
   * Load existing products to avoid duplicates
   */
  async loadExistingProducts() {
    console.log('🔍 Loading existing products...');
    
    try {
      let page = 1;
      let hasMore = true;
      
      while (hasMore) {
        const products = await this.apiCall('GET', 'products', {
          per_page: 100,
          page: page
        });
        
        if (products && products.length > 0) {
          products.forEach(product => {
            this.existingProducts.add(product.slug);
          });
          page++;
          
          if (products.length < 100) {
            hasMore = false;
          }
        } else {
          hasMore = false;
        }
        
        await this.delay(1000);
      }
      
      console.log(`📋 Found ${this.existingProducts.size} existing products`);
      
    } catch (error) {
      console.error('❌ Error loading existing products:', error.message);
    }
  }

  /**
   * Migrate products in batches
   */
  async migrateProducts(products) {
    console.log('📦 Starting product migration...');
    
    for (let i = 0; i < products.length; i += CONFIG.batchSize) {
      const batch = products.slice(i, i + CONFIG.batchSize);
      console.log(`\n🔄 Processing batch ${Math.floor(i / CONFIG.batchSize) + 1}/${Math.ceil(products.length / CONFIG.batchSize)}`);
      
      for (const product of batch) {
        await this.migrateProduct(product);
      }
      
      // Delay between batches
      if (i + CONFIG.batchSize < products.length) {
        console.log(`⏳ Waiting ${CONFIG.delayBetweenBatches}ms before next batch...`);
        await this.delay(CONFIG.delayBetweenBatches);
      }
    }
  }

  /**
   * Migrate a single product
   */
  async migrateProduct(product) {
    try {
      this.log.processedProducts++;
      
      // Skip if product already exists
      if (CONFIG.skipExisting && this.existingProducts.has(product.slug)) {
        console.log(`⏭️ Skipping existing product: ${product.name}`);
        this.log.skippedProducts++;
        return;
      }
      
      const wooProduct = this.transformProduct(product);
      
      if (CONFIG.dryRun) {
        console.log(`[DRY RUN] Would create product: ${product.name}`);
        return;
      }
      
      const response = await this.apiCall('POST', 'products', wooProduct);
      
      if (response && response.id) {
        console.log(`✅ Created product: ${product.name} (ID: ${response.id})`);
        this.log.createdProducts++;
      }
      
    } catch (error) {
      console.error(`❌ Error migrating product ${product.name}:`, error.message);
      this.log.errors.push({
        type: 'PRODUCT_ERROR',
        product: product.name,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Transform product from internal format to WooCommerce format
   */
  transformProduct(product) {
    const categoryId = this.categoryMap.get(product.category);
    
    // Build product description
    let description = product.description || '';
    
    // Add features to description
    if (product.features) {
      if (product.features.unique && product.features.unique.items.length > 0) {
        description += `\n\n<h3>${product.features.unique.title}</h3>\n<ul>`;
        product.features.unique.items.forEach(item => {
          description += `<li>${item}</li>`;
        });
        description += '</ul>';
      }
      
      if (product.features.general && product.features.general.items.length > 0) {
        description += `\n\n<h3>${product.features.general.title}</h3>\n<ul>`;
        product.features.general.items.forEach(item => {
          description += `<li>${item}</li>`;
        });
        description += '</ul>';
      }
    }
    
    const wooProduct = {
      name: product.name,
      slug: product.slug,
      type: 'simple',
      status: product.isActive ? 'publish' : 'draft',
      featured: false,
      catalog_visibility: 'visible',
      description: description.trim(),
      short_description: product.shortDescription || product.subtitle || '',
      sku: product.id,
      manage_stock: true,
      stock_quantity: product.inStock ? 100 : 0,
      stock_status: product.inStock ? 'instock' : 'outofstock',
      categories: categoryId ? [{ id: categoryId }] : [],
      meta_data: [
        {
          key: '_original_id',
          value: product.id
        },
        {
          key: '_migration_date',
          value: new Date().toISOString()
        }
      ]
    };
    
    // Add price if available
    if (product.price && product.price > 0) {
      wooProduct.price = product.price.toString();
      wooProduct.regular_price = product.price.toString();
    }
    
    return wooProduct;
  }

  /**
   * HTTP API call wrapper
   */
  async apiCall(method, endpoint, data = null, queryParams = {}) {
    if (CONFIG.dryRun && method !== 'GET') {
      console.log(`[DRY RUN] API Call: ${method} ${endpoint}`);
      return { id: Math.floor(Math.random() * 1000), slug: 'dry-run-item' };
    }
    
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams({
        consumer_key: process.env.WOOCOMMERCE_CONSUMER_KEY,
        consumer_secret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
        ...queryParams
      });
      
      const path = `/wp-json/wc/v3/${endpoint}?${params.toString()}`;
      
      const options = {
        hostname: this.baseUrl.hostname,
        port: this.baseUrl.port || 443,
        path: path,
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'ServidentalCR-Migration/1.0'
        }
      };
      
      if (data && (method === 'POST' || method === 'PUT')) {
        const jsonData = JSON.stringify(data);
        options.headers['Content-Length'] = Buffer.byteLength(jsonData);
      }
      
      const req = https.request(options, (res) => {
        let responseData = '';
        
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        
        res.on('end', () => {
          try {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              const jsonResponse = JSON.parse(responseData);
              resolve(jsonResponse);
            } else {
              const errorData = JSON.parse(responseData);
              reject(new Error(`API Error (${res.statusCode}): ${errorData.message || responseData}`));
            }
          } catch (error) {
            reject(new Error(`Parse Error: ${error.message}. Response: ${responseData.substring(0, 200)}`));
          }
        });
      });
      
      req.on('error', (error) => {
        reject(new Error(`Request Error: ${error.message}`));
      });
      
      req.on('timeout', () => {
        reject(new Error('Request timeout'));
        req.destroy();
      });
      
      req.setTimeout(30000);
      
      if (data && (method === 'POST' || method === 'PUT')) {
        req.write(JSON.stringify(data));
      }
      
      req.end();
    });
  }

  /**
   * Utility functions
   */
  createSlug(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Remove multiple hyphens
      .trim('-');
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async findExistingCategory(categoryName) {
    try {
      const categories = await this.apiCall('GET', 'products/categories', null, {
        search: categoryName,
        per_page: 1
      });
      
      if (categories && categories.length > 0) {
        this.categoryMap.set(categoryName, categories[0].id);
        console.log(`📂 Found existing category: ${categoryName} (ID: ${categories[0].id})`);
      }
    } catch (error) {
      console.error(`Error finding category ${categoryName}:`, error.message);
    }
  }

  /**
   * Save migration log to file
   */
  async saveMigrationLog() {
    this.log.endTime = new Date().toISOString();
    this.log.duration = new Date(this.log.endTime) - new Date(this.log.startTime);
    
    try {
      await fs.writeFile(
        path.join(__dirname, CONFIG.logFile),
        JSON.stringify(this.log, null, 2),
        'utf8'
      );
      console.log(`📋 Migration log saved to ${CONFIG.logFile}`);
    } catch (error) {
      console.error('❌ Error saving migration log:', error);
    }
  }

  /**
   * Print migration summary
   */
  printSummary() {
    console.log('\n📊 Migration Summary:');
    console.log('==========================================');
    console.log(`📦 Total products: ${this.log.totalProducts}`);
    console.log(`✅ Created products: ${this.log.createdProducts}`);
    console.log(`⏭️ Skipped products: ${this.log.skippedProducts}`);
    console.log(`❌ Errors: ${this.log.errors.length}`);
    console.log(`📂 Created categories: ${this.log.createdCategories.length}`);
    console.log(`🏷️ Created brands: ${this.log.createdBrands.length}`);
    console.log(`⏱️ Duration: ${Math.round(this.log.duration / 1000)} seconds`);
    console.log('==========================================');
    
    if (this.log.errors.length > 0) {
      console.log('\n❌ Errors encountered:');
      this.log.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error.type}: ${error.error}`);
      });
    }
  }
}

// Run migration if called directly
if (require.main === module) {
  const migration = new WooCommerceMigrationFixed();
  migration.migrate();
}

module.exports = WooCommerceMigrationFixed;