/**
 * Simple connection test to WooCommerce
 */

require('dotenv').config();
const https = require('https');
const http = require('http');

console.log('🔍 Testing WooCommerce Connection...');
console.log('URL:', process.env.WOOCOMMERCE_URL);
console.log('Consumer Key:', process.env.WOOCOMMERCE_CONSUMER_KEY?.substring(0, 10) + '...');

// Test 1: Basic URL connectivity
const url = new URL(process.env.WOOCOMMERCE_URL);
console.log('\n📡 Testing basic connectivity...');
console.log('Host:', url.hostname);
console.log('Protocol:', url.protocol);

const client = url.protocol === 'https:' ? https : http;

// Test basic connection to the domain
const options = {
  hostname: url.hostname,
  port: url.port || (url.protocol === 'https:' ? 443 : 80),
  path: '/',
  method: 'GET',
  timeout: 5000
};

const req = client.request(options, (res) => {
  console.log(`✅ Connection successful - Status: ${res.statusCode}`);
  
  // Test WooCommerce API endpoint
  testWooCommerceEndpoint();
});

req.on('error', (err) => {
  console.log(`❌ Connection failed: ${err.message}`);
});

req.on('timeout', () => {
  console.log('❌ Connection timeout');
  req.destroy();
});

req.end();

function testWooCommerceEndpoint() {
  console.log('\n🔗 Testing WooCommerce API endpoint...');
  
  const apiPath = '/wp-json/wc/v3/products';
  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;
  
  // Build query string for authentication
  const queryParams = new URLSearchParams({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    per_page: 1
  });
  
  const fullPath = `${apiPath}?${queryParams.toString()}`;
  
  const apiOptions = {
    hostname: url.hostname,
    port: url.port || (url.protocol === 'https:' ? 443 : 80),
    path: fullPath,
    method: 'GET',
    timeout: 10000,
    headers: {
      'User-Agent': 'ServidentalCR-Migration/1.0'
    }
  };
  
  console.log('API Path:', fullPath.substring(0, 100) + '...');
  
  const apiReq = client.request(apiOptions, (res) => {
    console.log(`📊 API Response Status: ${res.statusCode}`);
    console.log(`📊 API Response Headers:`, res.headers);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        console.log(`📊 Raw Response Length: ${data.length} chars`);
        console.log(`📊 First 200 chars:`, data.substring(0, 200));
        
        if (res.statusCode === 200) {
          const jsonData = JSON.parse(data);
          console.log(`✅ WooCommerce API working! Found ${jsonData.length || 0} products`);
          
          if (jsonData.length > 0) {
            console.log(`📦 Sample product: ${jsonData[0].name}`);
          }
        } else {
          console.log(`❌ API Error (Status ${res.statusCode}):`, data);
        }
      } catch (error) {
        console.log(`❌ JSON Parse Error:`, error.message);
        console.log(`Raw data:`, data.substring(0, 500));
      }
    });
  });
  
  apiReq.on('error', (err) => {
    console.log(`❌ API Request failed: ${err.message}`);
  });
  
  apiReq.on('timeout', () => {
    console.log('❌ API Request timeout');
    apiReq.destroy();
  });
  
  apiReq.end();
}