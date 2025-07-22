/**
 * WooCommerce API Migration Script for ServidentalCR Products
 * 
 * This script migrates all products from manual-products.ts to WooCommerce via REST API
 * 
 * Requirements:
 * - npm install woocommerce-api
 * - WooCommerce store with REST API enabled
 * - API credentials (Consumer Key & Consumer Secret)
 * 
 * Usage:
 * node migrations/woocommerce-migration.js
 */

const WooCommerceAPI = require('woocommerce-api');
const fs = require('fs').promises;
const path = require('path');

// Load environment variables
require('dotenv').config();

// WooCommerce API Configuration
const WooCommerce = new WooCommerceAPI({
  url: process.env.WOOCOMMERCE_URL || 'https://your-store.com',
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || 'ck_xxxxxxxxxxxxxxxxxxxxx',
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || 'cs_xxxxxxxxxxxxxxxxxxxxx',
  wpAPI: true,
  version: 'wc/v3',
  queryStringAuth: true
});

// Migration configuration
const CONFIG = {
  batchSize: parseInt(process.env.MIGRATION_BATCH_SIZE) || 10, // Products per batch
  delayBetweenBatches: parseInt(process.env.MIGRATION_DELAY) || 2000, // ms
  logFile: 'migration-log.json',
  dryRun: process.env.MIGRATION_DRY_RUN === 'true', // Set to true for testing without actual API calls
  skipExisting: true // Skip products that already exist
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

// Brands mapping
const BRANDS = [
  "BioArt", "COXO", "DOF", "Meyer", "Micro NX", "Siger", "Sturdy", "TPC",
  "Xpect Vision", "elec", "DenTech", "DentaFilm", "epdent", "mdmed",
  "launca", "dimed", "artelectron", "fame", "whitebrand"
];

class WooCommerceMigration {
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
  }

  /**
   * Main migration function
   */
  async migrate() {
    try {
      console.log('🚀 Starting WooCommerce migration...');
      
      // Load products from manual-products.ts
      const products = await this.loadProducts();
      this.log.totalProducts = products.length;
      
      console.log(`📦 Found ${products.length} products to migrate`);
      
      // Step 1: Setup categories and brands
      await this.setupCategories();
      await this.setupBrands();
      
      // Step 2: Get existing products to avoid duplicates
      if (CONFIG.skipExisting) {
        await this.loadExistingProducts();
      }
      
      // Step 3: Migrate products in batches
      await this.migrateProducts(products);
      
      // Step 4: Save migration log
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
      // Try to load from extracted-products.json first
      const extractedPath = path.join(__dirname, 'extracted-products.json');
      const data = await fs.readFile(extractedPath, 'utf8');
      const jsonData = JSON.parse(data);
      
      // Check if it's an array or object with products property
      if (Array.isArray(jsonData)) {
        return jsonData;
      } else if (jsonData.products && Array.isArray(jsonData.products)) {
        return jsonData.products;
      } else {
        throw new Error('Invalid product data format');
      }
    } catch (error) {
      console.log('⚠️  extracted-products.json not found, trying products.json...');
      
      try {
        const productsPath = path.join(__dirname, '../src/data/products.json');
        const data = await fs.readFile(productsPath, 'utf8');
        const jsonData = JSON.parse(data);
        
        if (Array.isArray(jsonData)) {
          return jsonData;
        } else if (jsonData.products && Array.isArray(jsonData.products)) {
          return jsonData.products;
        } else {
          throw new Error('Invalid product data format');
        }
      } catch (error2) {
        console.error('❌ No product data found. Please run extract-products-improved.js first');
        throw new Error('Product data not found');
      }
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
          continue;
        }

        const categoryData = {
          name: categoryName,
          slug: this.createSlug(categoryName),
          description: `Productos de ${categoryName}`,
          display: 'default',
          menu_order: 0
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
        if (error.message && error.message.includes('already exists')) {
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
        
        // Create brand terms
        for (const brandName of BRANDS) {
          try {
            const termData = {
              name: brandName,
              slug: this.createSlug(brandName),
              description: `Productos de la marca ${brandName}`
            };

            const termResponse = await this.apiCall('POST', `products/attributes/${attrResponse.id}/terms`, termData);
            
            if (termResponse && termResponse.id) {
              this.brandMap.set(brandName, {
                attributeId: attrResponse.id,
                termId: termResponse.id
              });
              this.log.createdBrands.push({
                name: brandName,
                attributeId: attrResponse.id,
                termId: termResponse.id
              });
              console.log(`✅ Created brand term: ${brandName}`);
            }
            
            await this.delay(300);
            
          } catch (error) {
            console.error(`❌ Error creating brand term ${brandName}:`, error.message);
          }
        }
      }
      
    } catch (error) {
      console.error('❌ Error setting up brands:', error.message);
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
      
      const promises = batch.map(product => this.migrateProduct(product));
      await Promise.allSettled(promises);
      
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
        console.log(JSON.stringify(wooProduct, null, 2));
        return;
      }
      
      const response = await this.apiCall('POST', 'products', wooProduct);
      
      if (response && response.id) {
        console.log(`✅ Created product: ${product.name} (ID: ${response.id})`);
        this.log.createdProducts++;
        
        // Handle additional data (images, videos, etc.)
        await this.handleProductExtras(response.id, product);
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
    const brandInfo = this.brandMap.get(product.brand?.name);
    
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
      description: description,
      short_description: product.shortDescription || product.subtitle || '',
      sku: product.id,
      price: product.price?.toString() || '',
      regular_price: product.price?.toString() || '',
      manage_stock: true,
      stock_quantity: product.inStock ? 100 : 0,
      stock_status: product.inStock ? 'instock' : 'outofstock',
      weight: '',
      dimensions: {
        length: '',
        width: '',
        height: ''
      },
      categories: categoryId ? [{ id: categoryId }] : [],
      images: this.transformImages(product.images),
      attributes: this.transformAttributes(product, brandInfo),
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
    
    return wooProduct;
  }

  /**
   * Transform product images
   */
  transformImages(images) {
    if (!images || !Array.isArray(images)) return [];
    
    return images.map((image, index) => ({
      src: image.url.src || image.url, // Handle StaticImageData
      alt: image.alt || '',
      position: index
    }));
  }

  /**
   * Transform product attributes
   */
  transformAttributes(product, brandInfo) {
    const attributes = [];
    
    // Add brand attribute
    if (brandInfo && product.brand?.name) {
      attributes.push({
        id: brandInfo.attributeId,
        position: 0,
        visible: true,
        variation: false,
        options: [product.brand.name]
      });
    }
    
    // Add specifications as attributes
    if (product.specifications && Array.isArray(product.specifications)) {
      product.specifications.forEach((spec, index) => {
        attributes.push({
          name: spec.name,
          position: index + 1,
          visible: true,
          variation: false,
          options: [spec.value]
        });
      });
    }
    
    return attributes;
  }

  /**
   * Handle additional product data (videos, etc.)
   */
  async handleProductExtras(productId, product) {
    // Handle video iframes as meta data
    if (product.videoIframe) {
      await this.updateProductMeta(productId, '_video_iframe', product.videoIframe);
    }
    
    if (product.videoIframes && Array.isArray(product.videoIframes)) {
      await this.updateProductMeta(productId, '_video_iframes', JSON.stringify(product.videoIframes));
    }
    
    // Handle tags
    if (product.tags && Array.isArray(product.tags)) {
      // WooCommerce tags need to be created separately
      for (const tag of product.tags) {
        await this.createProductTag(productId, tag);
      }
    }
  }

  /**
   * API call wrapper with error handling
   */
  async apiCall(method, endpoint, data = null) {
    if (CONFIG.dryRun) {
      console.log(`[DRY RUN] API Call: ${method} ${endpoint}`);
      if (data) console.log(`[DRY RUN] Data:`, JSON.stringify(data, null, 2));
      return { id: Math.floor(Math.random() * 1000), slug: 'dry-run-item' };
    }
    
    return new Promise((resolve, reject) => {
      if (method === 'GET') {
        WooCommerce.get(endpoint, (err, data, res) => {
          if (err) reject(err);
          else resolve(data);
        });
      } else if (method === 'POST') {
        WooCommerce.post(endpoint, data, (err, data, res) => {
          if (err) reject(err);
          else resolve(data);
        });
      } else if (method === 'PUT') {
        WooCommerce.put(endpoint, data, (err, data, res) => {
          if (err) reject(err);
          else resolve(data);
        });
      } else {
        reject(new Error(`Unsupported method: ${method}`));
      }
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
      const categories = await this.apiCall('GET', 'products/categories', {
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

  async updateProductMeta(productId, key, value) {
    try {
      await this.apiCall('POST', `products/${productId}`, {
        meta_data: [{
          key: key,
          value: value
        }]
      });
    } catch (error) {
      console.error(`Error updating product meta ${key}:`, error.message);
    }
  }

  async createProductTag(productId, tagName) {
    try {
      // Create tag if it doesn't exist
      const tagData = {
        name: tagName,
        slug: this.createSlug(tagName)
      };
      
      await this.apiCall('POST', 'products/tags', tagData);
    } catch (error) {
      // Tag might already exist, that's OK
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

  /**
   * Sample products for testing (replace with actual data)
   */
  getSampleProducts() {
    return [
      {
        id: "sample-product-1",
        slug: "sample-product-1",
        name: "Sample Product 1",
        subtitle: "Test product",
        brand: { name: "COXO" },
        description: "Sample description",
        shortDescription: "Short description",
        price: 100,
        category: "Anestesia",
        features: {
          unique: {
            title: "Características",
            items: ["Feature 1", "Feature 2"]
          },
          general: {
            title: "General",
            items: ["General 1", "General 2"]
          }
        },
        specifications: [
          { name: "Weight", value: "1kg" },
          { name: "Color", value: "Blue" }
        ],
        images: [
          {
            url: "https://example.com/image1.jpg",
            alt: "Sample image",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        isActive: true,
        inStock: true,
        tags: ["sample", "test"],
        videoIframe: "<iframe>...</iframe>"
      }
    ];
  }
}

// Run migration if called directly
if (require.main === module) {
  const migration = new WooCommerceMigration();
  migration.migrate();
}

module.exports = WooCommerceMigration;