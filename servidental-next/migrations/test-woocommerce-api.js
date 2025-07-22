/**
 * WooCommerce API Test Script
 * 
 * Tests the connection to WooCommerce REST API and basic operations
 * 
 * Usage: node migrations/test-woocommerce-api.js
 */

const WooCommerceAPI = require('woocommerce-api');
require('dotenv').config();

// WooCommerce API Configuration
const WooCommerce = new WooCommerceAPI({
  url: process.env.WOOCOMMERCE_URL,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  wpAPI: true,
  version: 'wc/v3',
  queryStringAuth: true
});

async function testWooCommerceAPI() {
  console.log('🔬 Testing WooCommerce API Connection...');
  console.log('==========================================');
  
  // Test basic connection
  console.log(`🌐 Store URL: ${process.env.WOOCOMMERCE_URL}`);
  console.log(`🔑 Consumer Key: ${process.env.WOOCOMMERCE_CONSUMER_KEY?.substring(0, 10)}...`);
  console.log(`🔐 Consumer Secret: ${process.env.WOOCOMMERCE_CONSUMER_SECRET?.substring(0, 10)}...`);
  
  try {
    // Test 1: Get WooCommerce System Status
    console.log('\n📊 Test 1: Getting WooCommerce System Status...');
    
    const systemStatus = await makeAPICall('GET', 'system_status');
    if (systemStatus) {
      console.log(`✅ WooCommerce Version: ${systemStatus.environment?.version || 'Unknown'}`);
      console.log(`✅ WordPress Version: ${systemStatus.environment?.wp_version || 'Unknown'}`);
      console.log(`✅ API Status: Connected`);
    }
    
  } catch (error) {
    console.log(`❌ System Status Error: ${error.message}`);
  }
  
  try {
    // Test 2: Get existing products
    console.log('\n📦 Test 2: Getting existing products...');
    
    const products = await makeAPICall('GET', 'products', { per_page: 5 });
    if (products) {
      console.log(`✅ Found ${products.length} existing products`);
      if (products.length > 0) {
        console.log(`   First product: ${products[0].name} (ID: ${products[0].id})`);
      }
    }
    
  } catch (error) {
    console.log(`❌ Products Error: ${error.message}`);
  }
  
  try {
    // Test 3: Get existing categories
    console.log('\n📂 Test 3: Getting existing categories...');
    
    const categories = await makeAPICall('GET', 'products/categories', { per_page: 10 });
    if (categories) {
      console.log(`✅ Found ${categories.length} existing categories`);
      categories.forEach((cat, index) => {
        if (index < 5) { // Show first 5
          console.log(`   ${cat.name} (ID: ${cat.id})`);
        }
      });
    }
    
  } catch (error) {
    console.log(`❌ Categories Error: ${error.message}`);
  }
  
  try {
    // Test 4: Create a test category
    console.log('\n🧪 Test 4: Creating a test category...');
    
    const testCategory = {
      name: 'Test Category - ServidentalCR',
      slug: 'test-category-servidentalcr',
      description: 'Test category created by migration script'
    };
    
    const createdCategory = await makeAPICall('POST', 'products/categories', testCategory);
    if (createdCategory) {
      console.log(`✅ Test category created: ${createdCategory.name} (ID: ${createdCategory.id})`);
      
      // Clean up - delete the test category
      try {
        await makeAPICall('DELETE', `products/categories/${createdCategory.id}`, { force: true });
        console.log(`🧹 Test category deleted successfully`);
      } catch (deleteError) {
        console.log(`⚠️ Could not delete test category: ${deleteError.message}`);
      }
    }
    
  } catch (error) {
    console.log(`❌ Create Category Error: ${error.message}`);
  }
  
  try {
    // Test 5: Get product attributes
    console.log('\n🏷️ Test 5: Getting product attributes...');
    
    const attributes = await makeAPICall('GET', 'products/attributes');
    if (attributes) {
      console.log(`✅ Found ${attributes.length} product attributes`);
      attributes.forEach((attr, index) => {
        if (index < 3) { // Show first 3
          console.log(`   ${attr.name} (ID: ${attr.id})`);
        }
      });
    }
    
  } catch (error) {
    console.log(`❌ Attributes Error: ${error.message}`);
  }
  
  console.log('\n==========================================');
  console.log('🏁 API Test Complete');
}

function makeAPICall(method, endpoint, data = null) {
  return new Promise((resolve, reject) => {
    if (method === 'GET') {
      WooCommerce.get(endpoint, (err, data, res) => {
        if (err) {
          reject(new Error(`${err.message} (Status: ${res?.statusCode || 'Unknown'})`));
        } else {
          resolve(data);
        }
      });
    } else if (method === 'POST') {
      WooCommerce.post(endpoint, data, (err, data, res) => {
        if (err) {
          reject(new Error(`${err.message} (Status: ${res?.statusCode || 'Unknown'})`));
        } else {
          resolve(data);
        }
      });
    } else if (method === 'DELETE') {
      WooCommerce.delete(endpoint, (err, data, res) => {
        if (err) {
          reject(new Error(`${err.message} (Status: ${res?.statusCode || 'Unknown'})`));
        } else {
          resolve(data);
        }
      });
    } else {
      reject(new Error(`Unsupported method: ${method}`));
    }
  });
}

// Run the test if called directly
if (require.main === module) {
  testWooCommerceAPI();
}

module.exports = { testWooCommerceAPI, makeAPICall };