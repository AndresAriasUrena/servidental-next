/**
 * Product Data Extractor
 * 
 * This script extracts all products from manual-products.ts and converts them to JSON
 * for use with the WooCommerce migration script.
 * 
 * Usage:
 * node migrations/extract-products.js
 */

const fs = require('fs').promises;
const path = require('path');

class ProductExtractor {
  constructor() {
    this.productsPath = path.join(__dirname, '../src/data/manual-products.ts');
    this.outputPath = path.join(__dirname, '../src/data/products.json');
    this.assetsPath = path.join(__dirname, '../src/assets');
  }

  async extract() {
    try {
      console.log('🔍 Reading manual-products.ts...');
      
      // Read the TypeScript file
      const content = await fs.readFile(this.productsPath, 'utf8');
      
      // Extract products array using regex
      const productsMatch = content.match(/export const products: Product\[\] = \[([\s\S]*)\];/);
      
      if (!productsMatch) {
        throw new Error('Could not find products array in file');
      }
      
      console.log('🔄 Processing products data...');
      
      // Parse the products array content
      const productsArrayContent = productsMatch[1];
      
      // Convert TypeScript to JSON-compatible format
      const jsonProducts = await this.convertToJSON(content);
      
      // Save to JSON file
      await fs.writeFile(this.outputPath, JSON.stringify(jsonProducts, null, 2), 'utf8');
      
      console.log(`✅ Extracted ${jsonProducts.length} products to ${this.outputPath}`);
      
      // Generate summary
      this.generateSummary(jsonProducts);
      
    } catch (error) {
      console.error('❌ Error extracting products:', error.message);
      throw error;
    }
  }

  async convertToJSON(content) {
    // Extract categories
    const categoriesMatch = content.match(/export const categories: ProductCategory\[\] = \[([\s\S]*?)\];/);
    const categories = categoriesMatch ? this.parseStringArray(categoriesMatch[1]) : [];
    
    // Extract brands  
    const brandsMatch = content.match(/export const brands: ProductBrand\[\] = \[([\s\S]*?)\];/);
    const brands = brandsMatch ? this.parseStringArray(brandsMatch[1]) : [];
    
    // Extract products using a more sophisticated approach
    const products = await this.extractProducts(content);
    
    return {
      categories,
      brands,
      products,
      extractedAt: new Date().toISOString(),
      totalProducts: products.length
    };
  }

  parseStringArray(content) {
    // Remove comments and extract quoted strings
    const cleanContent = content.replace(/\/\/.*$/gm, ''); // Remove line comments
    const matches = cleanContent.match(/"([^"]+)"/g);
    return matches ? matches.map(match => match.slice(1, -1)) : [];
  }

  async extractProducts(content) {
    const products = [];
    
    // Split content by product objects (look for id: pattern)
    const productMatches = content.match(/\{\s*id:\s*"[^"]+"/g);
    
    if (!productMatches) {
      console.log('⚠️ No products found in standard format, using fallback method');
      return this.createSampleProducts();
    }
    
    console.log(`📦 Found ${productMatches.length} product entries`);
    
    // For each product, extract the full object
    let remainingContent = content;
    let productIndex = 0;
    
    // Find the start of products array
    const productsStart = content.indexOf('export const products: Product[] = [');
    if (productsStart === -1) {
      throw new Error('Could not find products array start');
    }
    
    // Extract just the products array content
    const productsSection = content.substring(productsStart);
    const arrayStart = productsSection.indexOf('[') + 1;
    const arrayEnd = productsSection.lastIndexOf('];');
    const productsContent = productsSection.substring(arrayStart, arrayEnd);
    
    // Use a more manual approach to extract individual products
    return this.parseProductsManually(productsContent);
  }

  parseProductsManually(content) {
    const products = [];
    const lines = content.split('\n');
    let currentProduct = null;
    let braceCount = 0;
    let inProduct = false;
    let productLines = [];
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Skip empty lines and comments
      if (!trimmedLine || trimmedLine.startsWith('//')) {
        continue;
      }
      
      // Count braces to track object boundaries
      const openBraces = (line.match(/\{/g) || []).length;
      const closeBraces = (line.match(/\}/g) || []).length;
      
      if (trimmedLine.includes('id:') && !inProduct) {
        // Start of new product
        inProduct = true;
        braceCount = openBraces - closeBraces;
        productLines = [line];
      } else if (inProduct) {
        productLines.push(line);
        braceCount += openBraces - closeBraces;
        
        // End of product object
        if (braceCount <= 0) {
          const productText = productLines.join('\n');
          const product = this.parseProductFromText(productText);
          if (product) {
            products.push(product);
          }
          inProduct = false;
          productLines = [];
        }
      }
    }
    
    return products;
  }

  parseProductFromText(text) {
    try {
      // Extract basic fields using regex
      const product = {};
      
      // ID and slug
      const idMatch = text.match(/id:\s*"([^"]+)"/);
      const slugMatch = text.match(/slug:\s*"([^"]+)"/);
      const nameMatch = text.match(/name:\s*"([^"]+)"/);
      const subtitleMatch = text.match(/subtitle:\s*"([^"]+)"/);
      const descriptionMatch = text.match(/description:\s*"([^"]*)"/);
      const shortDescriptionMatch = text.match(/shortDescription:\s*"([^"]*)"/);
      const priceMatch = text.match(/price:\s*(\d+)/);
      const categoryMatch = text.match(/category:\s*"([^"]+)"/);
      const isActiveMatch = text.match(/isActive:\s*(true|false)/);
      const inStockMatch = text.match(/inStock:\s*(true|false)/);
      
      if (idMatch) product.id = idMatch[1];
      if (slugMatch) product.slug = slugMatch[1];
      if (nameMatch) product.name = nameMatch[1];
      if (subtitleMatch) product.subtitle = subtitleMatch[1];
      if (descriptionMatch) product.description = descriptionMatch[1];
      if (shortDescriptionMatch) product.shortDescription = shortDescriptionMatch[1];
      if (priceMatch) product.price = parseInt(priceMatch[1]);
      if (categoryMatch) product.category = categoryMatch[1];
      if (isActiveMatch) product.isActive = isActiveMatch[1] === 'true';
      if (inStockMatch) product.inStock = inStockMatch[1] === 'true';
      
      // Extract brand
      const brandMatch = text.match(/brand:\s*\{\s*name:\s*"([^"]+)"/);
      if (brandMatch) {
        product.brand = { name: brandMatch[1] };
      }
      
      // Extract features
      product.features = this.extractFeatures(text);
      
      // Extract specifications
      product.specifications = this.extractSpecifications(text);
      
      // Extract images (simplified)
      product.images = this.extractImages(text);
      
      // Add timestamps
      product.createdAt = new Date().toISOString();
      product.updatedAt = new Date().toISOString();
      
      return product;
      
    } catch (error) {
      console.error('Error parsing product:', error.message);
      return null;
    }
  }

  extractFeatures(text) {
    const features = {};
    
    // Extract unique features
    const uniqueMatch = text.match(/unique:\s*\{\s*title:\s*"([^"]+)"[\s\S]*?items:\s*\[([\s\S]*?)\]/);
    if (uniqueMatch) {
      features.unique = {
        title: uniqueMatch[1],
        items: this.extractArrayItems(uniqueMatch[2])
      };
    }
    
    // Extract general features
    const generalMatch = text.match(/general:\s*\{\s*title:\s*"([^"]*)"[\s\S]*?items:\s*\[([\s\S]*?)\]/);
    if (generalMatch) {
      features.general = {
        title: generalMatch[1],
        items: this.extractArrayItems(generalMatch[2])
      };
    }
    
    return features;
  }

  extractSpecifications(text) {
    const specs = [];
    const specsMatch = text.match(/specifications:\s*\[([\s\S]*?)\]/);
    
    if (specsMatch) {
      const specsContent = specsMatch[1];
      const specMatches = specsContent.match(/\{\s*name:\s*"([^"]+)",\s*value:\s*"([^"]+)"\s*\}/g);
      
      if (specMatches) {
        specMatches.forEach(match => {
          const nameMatch = match.match(/name:\s*"([^"]+)"/);
          const valueMatch = match.match(/value:\s*"([^"]+)"/);
          
          if (nameMatch && valueMatch) {
            specs.push({
              name: nameMatch[1],
              value: valueMatch[1]
            });
          }
        });
      }
    }
    
    return specs;
  }

  extractImages(text) {
    const images = [];
    
    // Look for image objects
    const imageMatches = text.match(/\{\s*url:\s*assets\.[\w.]+,[\s\S]*?\}/g);
    
    if (imageMatches) {
      imageMatches.forEach((match, index) => {
        const altMatch = match.match(/alt:\s*"([^"]+)"/);
        const widthMatch = match.match(/width:\s*(\d+)/);
        const heightMatch = match.match(/height:\s*(\d+)/);
        const isPrimaryMatch = match.match(/isPrimary:\s*(true|false)/);
        
        images.push({
          url: `image_${index + 1}.jpg`, // Placeholder
          alt: altMatch ? altMatch[1] : '',
          width: widthMatch ? parseInt(widthMatch[1]) : 800,
          height: heightMatch ? parseInt(heightMatch[1]) : 600,
          isPrimary: isPrimaryMatch ? isPrimaryMatch[1] === 'true' : index === 0
        });
      });
    }
    
    return images;
  }

  extractArrayItems(content) {
    const items = [];
    const itemMatches = content.match(/"([^"]+)"/g);
    
    if (itemMatches) {
      itemMatches.forEach(match => {
        items.push(match.slice(1, -1));
      });
    }
    
    return items;
  }

  createSampleProducts() {
    // Return sample products based on the structure we know
    return [
      {
        id: "sample-product-1",
        slug: "sample-product-1", 
        name: "Sample Product 1",
        subtitle: "Sample subtitle",
        brand: { name: "COXO" },
        description: "Sample description",
        shortDescription: "Short description",
        category: "Anestesia",
        features: {
          unique: { title: "Características", items: ["Feature 1", "Feature 2"] },
          general: { title: "General", items: [] }
        },
        specifications: [],
        images: [],
        isActive: true,
        inStock: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  generateSummary(data) {
    console.log('\n📊 Extraction Summary:');
    console.log('==========================================');
    console.log(`📦 Total products: ${data.products.length}`);
    console.log(`📂 Categories: ${data.categories.length}`);
    console.log(`🏷️ Brands: ${data.brands.length}`);
    
    // Count products by category
    const categoryCount = {};
    data.products.forEach(product => {
      const category = product.category || 'Unknown';
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });
    
    console.log('\n📂 Products by category:');
    Object.entries(categoryCount)
      .sort(([,a], [,b]) => b - a)
      .forEach(([category, count]) => {
        console.log(`   ${category}: ${count}`);
      });
    
    // Count products by brand
    const brandCount = {};
    data.products.forEach(product => {
      const brand = product.brand?.name || 'Unknown';
      brandCount[brand] = (brandCount[brand] || 0) + 1;
    });
    
    console.log('\n🏷️ Products by brand:');
    Object.entries(brandCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10) // Top 10
      .forEach(([brand, count]) => {
        console.log(`   ${brand}: ${count}`);
      });
    
    console.log('==========================================');
  }
}

// Run extraction if called directly
if (require.main === module) {
  const extractor = new ProductExtractor();
  extractor.extract();
}

module.exports = ProductExtractor;