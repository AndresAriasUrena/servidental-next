// migrate-products.js
const dotenv = require('dotenv');
const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

// Cargar variables de entorno
dotenv.config({ path: '.env.migration' });

// Importar productos usando require - necesitamos compilar TypeScript primero
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const WooCommerce = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WC_URL || '',
  consumerKey: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY || '',
  consumerSecret: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET || '',
  version: 'wc/v3',
  queryStringAuth: true
});

// Leer productos desde el archivo TypeScript compilado
let products = [];

try {
  // Compilar el archivo TypeScript temporalmente
  execSync('npx tsc src/data/manual-products.ts --outDir temp --module commonjs --target es2017 --esModuleInterop --skipLibCheck', { stdio: 'pipe' });
  
  // Importar el archivo compilado
  const productsModule = require('./temp/src/data/manual-products.js');
  products = productsModule.products;
  
  // Limpiar archivos temporales
  execSync('rm -rf temp', { stdio: 'pipe' });
  
  console.log(`✅ Productos cargados: ${products.length}`);
} catch (error) {
  console.error('❌ Error cargando productos:', error.message);
  
  // Fallback: productos de ejemplo para testing
  products = [
    {
      id: "test-product",
      slug: "test-product",
      name: "Producto de Prueba",
      subtitle: "Solo para testing",
      brand: { name: "COXO" },
      description: "Producto de prueba para migración",
      shortDescription: "Testing",
      price: 100,
      category: "Compresores",
      features: {
        unique: { title: "Características", items: ["Prueba 1", "Prueba 2"] },
        general: { title: "General", items: ["General 1"] }
      },
      isActive: true,
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  
  console.log('⚠️  Usando productos de prueba para testing');
}

async function testConnection() {
  try {
    console.log('🔍 Probando conexión con WooCommerce...');
    const response = await WooCommerce.get('products', { per_page: 1 });
    console.log('✅ Conexión exitosa con WooCommerce');
    return true;
  } catch (error) {
    console.error('❌ Error de conexión:', error.response?.data || error.message);
    return false;
  }
}

async function createCategories() {
  const categoryMap = new Map();
  const uniqueCategories = [...new Set(products.map(p => p.category))];
  
  console.log('\n📁 Creando categorías...');
  
  for (const categoryName of uniqueCategories) {
    try {
      // Verificar si la categoría ya existe
      const existingCategories = await WooCommerce.get('products/categories', {
        search: categoryName
      });
      
      if (existingCategories.data.length > 0) {
        const existing = existingCategories.data.find(cat => 
          cat.name.toLowerCase() === categoryName.toLowerCase()
        );
        if (existing) {
          categoryMap.set(categoryName, existing.id);
          console.log(`  ♻️  Categoría existente: ${categoryName} (ID: ${existing.id})`);
          continue;
        }
      }
      
      // Crear nueva categoría
      const response = await WooCommerce.post('products/categories', {
        name: categoryName,
        slug: categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[áéíóú]/g, (match) => {
          const accents = {'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u'};
          return accents[match] || match;
        })
      });
      
      categoryMap.set(categoryName, response.data.id);
      console.log(`  ✅ Categoría creada: ${categoryName} (ID: ${response.data.id})`);
      
    } catch (error) {
      console.error(`  ❌ Error creando categoría ${categoryName}:`, error.response?.data || error.message);
    }
  }
  
  return categoryMap;
}

async function createBrandAttribute() {
  try {
    console.log('\n🏷️  Configurando atributo de Marca...');
    
    // Verificar si el atributo ya existe
    const existingAttributes = await WooCommerce.get('products/attributes');
    const brandAttribute = existingAttributes.data.find(attr => 
      attr.name.toLowerCase() === 'marca' || attr.slug === 'marca'
    );
    
    if (brandAttribute) {
      console.log(`  ♻️  Atributo de marca existente (ID: ${brandAttribute.id})`);
      return brandAttribute.id;
    }
    
    // Crear atributo de marca
    const response = await WooCommerce.post('products/attributes', {
      name: 'Marca',
      slug: 'marca',
      type: 'select',
      order_by: 'name',
      has_archives: true
    });
    
    console.log(`  ✅ Atributo de marca creado (ID: ${response.data.id})`);
    return response.data.id;
    
  } catch (error) {
    console.error('  ❌ Error creando atributo de marca:', error.response?.data || error.message);
    return null;
  }
}

function generateProductDescription(product) {
  let description = product.description || '';
  
  // Si no hay descripción, construir una a partir de las características
  if (!description || description.trim() === '') {
    description = `<p><strong>${product.name}</strong></p>`;
    
    if (product.subtitle) {
      description += `<p><em>${product.subtitle}</em></p>`;
    }
    
    if (product.shortDescription) {
      description += `<p>${product.shortDescription}</p>`;
    }
    
    // Agregar características únicas
    if (product.features && product.features.unique && product.features.unique.items.length > 0) {
      description += `<h3>${product.features.unique.title}</h3><ul>`;
      product.features.unique.items.forEach(item => {
        description += `<li>${item}</li>`;
      });
      description += '</ul>';
    }
    
    // Agregar características generales
    if (product.features && product.features.general && product.features.general.items.length > 0) {
      description += `<h3>${product.features.general.title}</h3><ul>`;
      product.features.general.items.forEach(item => {
        description += `<li>${item}</li>`;
      });
      description += '</ul>';
    }
  }
  
  return description;
}

function generateShortDescription(product) {
  if (product.shortDescription) {
    return product.shortDescription;
  }
  
  if (product.subtitle) {
    return product.subtitle;
  }
  
  if (product.features && product.features.unique && product.features.unique.items.length > 0) {
    return product.features.unique.items.slice(0, 2).join('. ') + '.';
  }
  
  return `Equipo dental de alta calidad de la marca ${product.brand.name}.`;
}

async function migrateProducts() {
  const stats = {
    total: products.length,
    successful: 0,
    failed: 0,
    errors: []
  };
  
  console.log('\n🚀 Iniciando migración de productos...');
  console.log(`Total de productos a migrar: ${stats.total}`);
  
  // Crear categorías y atributos primero
  const categoryMap = await createCategories();
  const brandAttributeId = await createBrandAttribute();
  
  console.log('\n📦 Migrando productos...');
  
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    
    try {
      console.log(`\n[${i + 1}/${products.length}] Migrando: ${product.name}`);
      
      // Verificar si el producto ya existe por slug
      const existingProducts = await WooCommerce.get('products', {
        slug: product.slug,
        per_page: 1
      });
      
      if (existingProducts.data.length > 0) {
        console.log(`  ⚠️  Producto ya existe, saltando: ${product.name}`);
        stats.successful++;
        continue;
      }
      
      // Preparar datos del producto
      const wooProduct = {
        name: product.name,
        type: 'simple',
        regular_price: product.price ? product.price.toString() : '0',
        description: generateProductDescription(product),
        short_description: generateShortDescription(product),
        slug: product.slug,
        status: product.isActive ? 'publish' : 'draft',
        catalog_visibility: 'visible',
        stock_quantity: product.inStock !== false ? 10 : 0,
        manage_stock: true,
        in_stock: product.inStock !== false,
        weight: '',
        dimensions: {
          length: '',
          width: '',
          height: ''
        },
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
      
      // Agregar categoría
      if (categoryMap.has(product.category)) {
        wooProduct.categories = [{
          id: categoryMap.get(product.category)
        }];
      }
      
      // Agregar tags
      const tags = [];
      if (product.subcategory) {
        tags.push(product.subcategory);
      }
      if (product.tags) {
        tags.push(...product.tags);
      }
      
      if (tags.length > 0) {
        wooProduct.tags = tags.map(tag => ({ name: tag }));
      }
      
      // Agregar imágenes
      if (product.images && product.images.length > 0) {
        wooProduct.images = product.images.map((img, index) => {
          const imageUrl = typeof img.url === 'string' ? img.url : (img.url.src || '');
          
          return {
            src: `https://servidentalcr.com${imageUrl}`,
            alt: img.alt || product.name,
            position: index
          };
        });
      }
      
      // Agregar atributos
      const attributes = [];
      
      // Atributo de marca
      if (brandAttributeId && product.brand && product.brand.name) {
        attributes.push({
          id: brandAttributeId,
          name: 'Marca',
          option: product.brand.name,
          visible: true,
          variation: false
        });
      }
      
      // Categoría original como atributo
      attributes.push({
        name: 'Categoría Original',
        option: product.category,
        visible: true,
        variation: false
      });
      
      if (attributes.length > 0) {
        wooProduct.attributes = attributes;
      }
      
      // Crear producto en WooCommerce
      const response = await WooCommerce.post('products', wooProduct);
      
      console.log(`  ✅ Producto migrado exitosamente (ID: ${response.data.id})`);
      stats.successful++;
      
      // Pausa pequeña para no sobrecargar la API
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error(`  ❌ Error migrando ${product.name}:`, error.response?.data || error.message);
      stats.failed++;
      stats.errors.push(`${product.name}: ${error.response?.data?.message || error.message}`);
    }
  }
  
  return stats;
}

async function main() {
  console.log('🔄 INICIANDO MIGRACIÓN DE PRODUCTOS SERVIDENTAL A WOOCOMMERCE');
  console.log('===========================================================');
  
  // Verificar que tenemos productos para migrar
  if (products.length === 0) {
    console.error('❌ No se encontraron productos para migrar');
    process.exit(1);
  }
  
  console.log(`📊 Productos encontrados: ${products.length}`);
  console.log(`📊 Productos activos: ${products.filter(p => p.isActive).length}`);
  console.log(`📊 Productos con precio: ${products.filter(p => p.price && p.price > 0).length}`);
  
  // Verificar conexión
  const isConnected = await testConnection();
  if (!isConnected) {
    console.error('❌ No se pudo conectar a WooCommerce. Verifica las credenciales en .env.migration');
    process.exit(1);
  }
  
  // Ejecutar migración
  const stats = await migrateProducts();
  
  // Mostrar resultados
  console.log('\n📊 RESULTADOS DE LA MIGRACIÓN');
  console.log('==============================');
  console.log(`Total productos: ${stats.total}`);
  console.log(`✅ Exitosos: ${stats.successful}`);
  console.log(`❌ Fallidos: ${stats.failed}`);
  console.log(`📊 Tasa de éxito: ${((stats.successful / stats.total) * 100).toFixed(1)}%`);
  
  if (stats.errors.length > 0) {
    console.log('\n🚨 ERRORES ENCONTRADOS:');
    stats.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error}`);
    });
  }
  
  console.log('\n🎉 Migración completada!');
  
  if (stats.successful > 0) {
    console.log('\n📝 PRÓXIMOS PASOS:');
    console.log('1. Ve a tu WordPress admin: https://wp.servidentalcr.com/wp-admin');
    console.log('2. Navega a WooCommerce → Productos');
    console.log('3. Revisa los productos migrados y ajusta precios/stock');
    console.log('4. Configura métodos de envío en WooCommerce → Configuración → Envío');
    console.log('5. Configura ONVO Pay en WooCommerce → Configuración → Pagos');
    console.log('6. Prueba el frontend con: npm run dev');
  }
}

// Ejecutar migración
main().catch(console.error);