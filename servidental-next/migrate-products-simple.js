// migrate-products-simple.js
const dotenv = require('dotenv');
const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;
const fs = require('fs');

// Cargar variables de entorno
dotenv.config({ path: '.env.migration' });

const WooCommerce = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WC_URL || '',
  consumerKey: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY || '',
  consumerSecret: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET || '',
  version: 'wc/v3',
  queryStringAuth: true
});

// Productos manuales extraídos de tu archivo (muestra)
// IMPORTANTE: Agregar aquí todos tus productos reales
const products = [
  {
    id: "Pulidora-dental-por-aire-CP-1",
    slug: "Pulidora-dental-por-aire-CP-1",
    name: "Pulidora dental por aire CP-1",
    subtitle: "Pieza de mano de alto rendimiento",
    brand: { name: "COXO" },
    description: "",
    shortDescription: "Pieza de mano de alto rendimiento para pulido dental",
    price: 250,
    category: "Pulidores",
    features: {
      unique: {
        title: "Características Únicas",
        items: [
          "Sistema de aire comprimido eficiente",
          "Diseño ergonómico para uso prolongado",
          "Compatible con múltiples tipos de polvo abrasivo"
        ]
      },
      general: {
        title: "Características Generales",
        items: [
          "Construcción duradera",
          "Fácil mantenimiento",
          "Garantía del fabricante"
        ]
      }
    },
    isActive: true,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "autoclave-18l-clase-b",
    slug: "autoclave-18l-clase-b",
    name: "Autoclave 18L Clase B",
    subtitle: "Esterilización profesional",
    brand: { name: "Siger" },
    description: "Autoclave de clase B con capacidad de 18 litros para esterilización completa",
    shortDescription: "Autoclave profesional de 18L con certificación clase B",
    price: 3500,
    category: "Esterilización",
    features: {
      unique: {
        title: "Características Únicas",
        items: [
          "Clase B - Esterilización completa",
          "Capacidad de 18 litros",
          "Ciclos automáticos programables",
          "Sistema de secado integrado"
        ]
      },
      general: {
        title: "Características Generales",
        items: [
          "Pantalla digital LCD",
          "Válvulas de seguridad",
          "Certificaciones CE y FDA",
          "Garantía de 2 años"
        ]
      }
    },
    isActive: true,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "compresor-dental-silencioso",
    slug: "compresor-dental-silencioso",
    name: "Compresor Dental Silencioso 50L",
    subtitle: "Libre de aceite y ultra silencioso",
    brand: { name: "Sturdy" },
    description: "Compresor dental de 50 litros, libre de aceite y con tecnología silenciosa",
    shortDescription: "Compresor dental de 50L libre de aceite",
    price: 1200,
    category: "Compresores",
    features: {
      unique: {
        title: "Características Únicas",
        items: [
          "100% libre de aceite",
          "Tecnología ultra silenciosa < 50dB",
          "Tanque de 50 litros",
          "Sistema de filtrado múltiple"
        ]
      },
      general: {
        title: "Características Generales",
        items: [
          "Motor de larga duración",
          "Manómetros de presión",
          "Válvula de drenaje automática",
          "Ruedas para fácil movilidad"
        ]
      }
    },
    isActive: true,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "lampara-fotocurado-led",
    slug: "lampara-fotocurado-led",
    name: "Lámpara de Fotocurado LED",
    subtitle: "Tecnología LED de alta potencia",
    brand: { name: "COXO" },
    description: "Lámpara de fotocurado con tecnología LED de alta intensidad para polimerización eficaz",
    shortDescription: "Lámpara LED para fotocurado dental de alta potencia",
    price: 180,
    category: "Lámparas de Fotocurado",
    features: {
      unique: {
        title: "Características Únicas",
        items: [
          "Tecnología LED de alta intensidad",
          "Longitud de onda óptima 420-480nm",
          "Batería recargable de larga duración",
          "Diseño inalámbrico"
        ]
      },
      general: {
        title: "Características Generales",
        items: [
          "Temporizador programable",
          "Indicador de carga de batería",
          "Guía de luz flexible",
          "Base de carga incluida"
        ]
      }
    },
    isActive: true,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "unidad-dental-completa",
    slug: "unidad-dental-completa",
    name: "Unidad Dental Completa Premium",
    subtitle: "Sistema dental integral con sillón",
    brand: { name: "DOF" },
    description: "Unidad dental completa con sillón ergonómico, bandeja de instrumentos y sistema de aspiración",
    shortDescription: "Unidad dental completa con todas las funciones integradas",
    price: 8500,
    category: "Unidades Dentales",
    features: {
      unique: {
        title: "Características Únicas",
        items: [
          "Sillón ergonómico con memoria de posiciones",
          "Sistema de aspiración dual",
          "Bandeja de instrumentos motorizada",
          "Lámpara LED integrada",
          "Monitor para paciente"
        ]
      },
      general: {
        title: "Características Generales",
        items: [
          "Tapicería de cuero sintético antimicrobiano",
          "Controles táctiles intuitivos",
          "Sistema neumático de precisión",
          "Conexiones estándar internacionales",
          "Garantía completa de 3 años"
        ]
      }
    },
    isActive: true,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// INSTRUCCIONES PARA AGREGAR MÁS PRODUCTOS:
// 1. Ve a tu archivo src/data/manual-products.ts
// 2. Copia cada producto de tu array y pégalo aquí
// 3. Convierte las imágenes de StaticImageData a strings simples (opcional)
// 4. Asegúrate de que cada producto tenga la estructura básica mostrada arriba

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
        slug: categoryName.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[áéíóú]/g, (match) => {
            const accents = {'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u'};
            return accents[match] || match;
          })
          .replace(/[^a-z0-9-]/g, '')
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
    
    const existingAttributes = await WooCommerce.get('products/attributes');
    const brandAttribute = existingAttributes.data.find(attr => 
      attr.name.toLowerCase() === 'marca' || attr.slug === 'marca'
    );
    
    if (brandAttribute) {
      console.log(`  ♻️  Atributo de marca existente (ID: ${brandAttribute.id})`);
      return brandAttribute.id;
    }
    
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
  
  if (!description || description.trim() === '') {
    description = `<p><strong>${product.name}</strong></p>`;
    
    if (product.subtitle) {
      description += `<p><em>${product.subtitle}</em></p>`;
    }
    
    if (product.shortDescription) {
      description += `<p>${product.shortDescription}</p>`;
    }
    
    if (product.features && product.features.unique && product.features.unique.items.length > 0) {
      description += `<h3>${product.features.unique.title}</h3><ul>`;
      product.features.unique.items.forEach(item => {
        description += `<li>${item}</li>`;
      });
      description += '</ul>';
    }
    
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
  
  const categoryMap = await createCategories();
  const brandAttributeId = await createBrandAttribute();
  
  console.log('\n📦 Migrando productos...');
  
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    
    try {
      console.log(`\n[${i + 1}/${products.length}] Migrando: ${product.name}`);
      
      // Verificar si el producto ya existe
      const existingProducts = await WooCommerce.get('products', {
        slug: product.slug,
        per_page: 1
      });
      
      if (existingProducts.data.length > 0) {
        console.log(`  ⚠️  Producto ya existe, saltando: ${product.name}`);
        stats.successful++;
        continue;
      }
      
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
        meta_data: [
          { key: '_original_id', value: product.id },
          { key: '_migration_date', value: new Date().toISOString() }
        ]
      };
      
      // Agregar categoría
      if (categoryMap.has(product.category)) {
        wooProduct.categories = [{ id: categoryMap.get(product.category) }];
      }
      
      // Agregar atributos
      const attributes = [];
      
      if (brandAttributeId && product.brand && product.brand.name) {
        attributes.push({
          id: brandAttributeId,
          name: 'Marca',
          option: product.brand.name,
          visible: true,
          variation: false
        });
      }
      
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
      
      // Pausa para no sobrecargar la API
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
  console.log('🔄 MIGRACIÓN DE PRODUCTOS SERVIDENTAL A WOOCOMMERCE');
  console.log('=================================================');
  
  if (products.length === 0) {
    console.error('❌ No se encontraron productos para migrar');
    process.exit(1);
  }
  
  console.log(`📊 Productos encontrados: ${products.length}`);
  console.log(`📊 Productos activos: ${products.filter(p => p.isActive).length}`);
  console.log(`📊 Productos con precio: ${products.filter(p => p.price && p.price > 0).length}`);
  
  const isConnected = await testConnection();
  if (!isConnected) {
    console.error('❌ No se pudo conectar a WooCommerce');
    process.exit(1);
  }
  
  const stats = await migrateProducts();
  
  console.log('\n📊 RESULTADOS DE LA MIGRACIÓN');
  console.log('==============================');
  console.log(`Total productos: ${stats.total}`);
  console.log(`✅ Exitosos: ${stats.successful}`);
  console.log(`❌ Fallidos: ${stats.failed}`);
  console.log(`📊 Tasa de éxito: ${((stats.successful / stats.total) * 100).toFixed(1)}%`);
  
  if (stats.errors.length > 0) {
    console.log('\n🚨 ERRORES:');
    stats.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error}`);
    });
  }
  
  console.log('\n🎉 Migración completada!');
  console.log('\n📝 PRÓXIMOS PASOS:');
  console.log('1. Ve a WordPress admin: https://wp.servidentalcr.com/wp-admin');
  console.log('2. Revisa WooCommerce → Productos');
  console.log('3. Ajusta precios y stock según necesites');
  console.log('4. Agrega más productos editando este script');
}

main().catch(console.error);