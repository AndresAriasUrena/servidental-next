/**
 * Debug WooCommerce API Response
 */

const WooCommerceAPI = require('woocommerce-api');
require('dotenv').config();

const WooCommerce = new WooCommerceAPI({
  url: process.env.WOOCOMMERCE_URL,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  wpAPI: true,
  version: 'wc/v3',
  queryStringAuth: true
});

console.log('🔍 Debugging WooCommerce API Response...');

// Test simple products endpoint
WooCommerce.get('products', { per_page: 1 }, (err, data, res) => {
  console.log('\n📦 Products Endpoint Debug:');
  console.log('Error:', err);
  console.log('Status Code:', res?.statusCode);
  console.log('Data Type:', typeof data);
  console.log('Data:', JSON.stringify(data, null, 2));
  
  // Test categories endpoint
  WooCommerce.get('products/categories', { per_page: 1 }, (err2, data2, res2) => {
    console.log('\n📂 Categories Endpoint Debug:');
    console.log('Error:', err2);
    console.log('Status Code:', res2?.statusCode);
    console.log('Data Type:', typeof data2);
    console.log('Data:', JSON.stringify(data2, null, 2));
    
    // Test creating a simple category
    const testCat = {
      name: 'Test Debug Category',
      slug: 'test-debug-category'
    };
    
    WooCommerce.post('products/categories', testCat, (err3, data3, res3) => {
      console.log('\n🧪 Create Category Debug:');
      console.log('Error:', err3);
      console.log('Status Code:', res3?.statusCode);
      console.log('Data Type:', typeof data3);
      console.log('Data:', JSON.stringify(data3, null, 2));
      
      if (data3 && data3.id) {
        // Delete the test category
        WooCommerce.delete(`products/categories/${data3.id}`, { force: true }, (err4, data4, res4) => {
          console.log('\n🗑️ Delete Category Debug:');
          console.log('Error:', err4);
          console.log('Status Code:', res4?.statusCode);
          console.log('Test category cleaned up');
        });
      }
    });
  });
});