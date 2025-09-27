// Script to debug and extract brand information from WooCommerce
// Run with: node scripts/debug-brands.js

const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

const WooCommerce = new WooCommerceRestApi({
  url: 'https://wp.servidentalcr.com',
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || '',
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || '',
  version: 'wc/v3'
});

async function debugBrands() {
  try {
    console.log('🔍 Fetching product attributes...');
    
    // Get all product attributes (including brands)
    const attributesResponse = await WooCommerce.get('products/attributes');
    console.log('📋 Available Attributes:');
    attributesResponse.data.forEach(attr => {
      console.log(`  - ${attr.name} (ID: ${attr.id}, Slug: ${attr.slug})`);
    });

    // Get attribute terms for each attribute
    for (const attr of attributesResponse.data) {
      if (attr.name.toLowerCase().includes('marca') || attr.name.toLowerCase().includes('brand')) {
        console.log(`\n🏷️ Getting terms for ${attr.name}:`);
        try {
          const termsResponse = await WooCommerce.get(`products/attributes/${attr.id}/terms`);
          termsResponse.data.forEach(term => {
            console.log(`  - ${term.name} (ID: ${term.id}, Slug: ${term.slug})`);
          });
        } catch (error) {
          console.log(`  ❌ Error fetching terms: ${error.message}`);
        }
      }
    }

    console.log('\n🔍 Checking a few products for brand data...');
    
    // Get first 10 products to see how brand data is stored
    const productsResponse = await WooCommerce.get('products', { per_page: 10 });
    
    productsResponse.data.forEach(product => {
      console.log(`\n📦 Product: ${product.name}`);
      
      // Check attributes
      if (product.attributes && product.attributes.length > 0) {
        console.log('  Attributes:');
        product.attributes.forEach(attr => {
          console.log(`    - ${attr.name}: ${attr.options.join(', ')} (ID: ${attr.id})`);
        });
      }
      
      // Check meta_data for brand info
      if (product.meta_data && product.meta_data.length > 0) {
        const brandMeta = product.meta_data.filter(meta => 
          meta.key.toLowerCase().includes('marca') ||
          meta.key.toLowerCase().includes('brand') ||
          meta.key.startsWith('pa_') ||
          meta.key.includes('attribute')
        );
        
        if (brandMeta.length > 0) {
          console.log('  Brand-related Meta Data:');
          brandMeta.forEach(meta => {
            console.log(`    - ${meta.key}: ${meta.value}`);
          });
        }
      }
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the debug function
debugBrands();