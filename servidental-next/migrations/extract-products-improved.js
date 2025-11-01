#!/usr/bin/env node

/**
 * Script mejorado para extraer productos de manual-products.ts
 * Utiliza un enfoque más robusto para parsear el archivo TypeScript
 */

const fs = require('fs');
const path = require('path');

// Configuración de rutas
const PRODUCTS_FILE_PATH = path.join(__dirname, '..', 'src', 'data', 'manual-products.ts');
const OUTPUT_FILE_PATH = path.join(__dirname, 'extracted-products.json');

/**
 * Función helper para crear un mock de assets
 */
function createAssetsMock() {
  return new Proxy({}, {
    get: function(target, prop) {
      if (typeof prop === 'string') {
        return new Proxy({}, {
          get: function(target, subProp) {
            if (typeof subProp === 'string') {
              return `assets/${prop}/${subProp}`;
            }
            return subProp;
          }
        });
      }
      return prop;
    }
  });
}

/**
 * Parsea el archivo usando regex para extraer los productos
 */
function parseProductsFile(fileContent) {
  try {
    // Crear mock de assets más completo
    const assetsMock = new Proxy({}, {
      get(target, prop1) {
        return new Proxy({}, {
          get(target, prop2) {
            return new Proxy({}, {
              get(target, prop3) {
                if (prop3 === 'default') {
                  return `assets/${prop1}/${prop2}/default`;
                }
                return new Proxy({}, {
                  get(target, prop4) {
                    return `assets/${prop1}/${prop2}/${prop3}/${prop4}`;
                  }
                });
              }
            });
          }
        });
      }
    });

    // Preparar el código
    let code = fileContent;
    
    // Remover imports
    code = code.replace(/^import.*$/gm, '');
    
    // Remover tipos TypeScript más cuidadosamente
    code = code.replace(/:\s*Product\[\]/g, '');
    code = code.replace(/:\s*ProductCategory\[\]/g, '');
    code = code.replace(/:\s*ProductBrand\[\]/g, '');
    code = code.replace(/:\s*StaticImageData/g, '');
    
    // Remover export
    code = code.replace(/export\s+const/g, 'const');
    
    // Crear función para evaluación
    const wrappedCode = `
      const assets = arguments[0];
      ${code}
      return { categories: categories || [], brands: brands || [], products: products || [] };
    `;
    
    const func = new Function(wrappedCode);
    const result = func(assetsMock);
    
    return result;
    
  } catch (error) {
    console.error('Error al parsear el archivo:', error.message);
    throw error;
  }
}

/**
 * Limpia las referencias de assets en un objeto
 */
function cleanAssetReferences(obj) {
  if (typeof obj === 'string' && obj.startsWith('assets/')) {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(cleanAssetReferences);
  }
  
  if (obj && typeof obj === 'object') {
    const cleaned = {};
    for (const [key, value] of Object.entries(obj)) {
      cleaned[key] = cleanAssetReferences(value);
    }
    return cleaned;
  }
  
  return obj;
}

/**
 * Procesa un producto individual
 */
function processProduct(product) {
  const processed = cleanAssetReferences({ ...product });
  
  // Asegurar que las fechas están en formato string
  if (processed.createdAt && !(typeof processed.createdAt === 'string')) {
    processed.createdAt = new Date(processed.createdAt).toISOString();
  }
  if (processed.updatedAt && !(typeof processed.updatedAt === 'string')) {
    processed.updatedAt = new Date(processed.updatedAt).toISOString();
  }
  
  // Validar estructura de imágenes
  if (processed.images && Array.isArray(processed.images)) {
    processed.images = processed.images.map(img => ({
      url: typeof img.url === 'string' ? img.url : `assets/products/${img.url || 'default'}`,
      alt: img.alt || '',
      width: img.width || 800,
      height: img.height || 600,
      isPrimary: Boolean(img.isPrimary)
    }));
  }
  
  // Validar estructura de brand
  if (processed.brand && typeof processed.brand === 'object') {
    let logoUrl = processed.brand.logo;
    if (typeof logoUrl !== 'string') {
      if (processed.brand.name) {
        // Convertir nombre de marca a nombre de archivo
        const brandFileName = processed.brand.name.toLowerCase()
          .replace(/\s+/g, '')
          .replace(/[^a-z0-9]/g, '');
        logoUrl = `assets/logos/brands/${brandFileName}`;
      } else {
        logoUrl = 'assets/logos/brands/default';
      }
    }
    
    processed.brand = {
      name: processed.brand.name || '',
      logo: logoUrl
    };
  }
  
  // Limpiar valores undefined
  Object.keys(processed).forEach(key => {
    if (processed[key] === undefined || processed[key] === null) {
      if (key === 'description' || key === 'shortDescription') {
        processed[key] = '';
      } else {
        delete processed[key];
      }
    }
  });
  
  return processed;
}

/**
 * Función principal
 */
async function main() {
  try {
    console.log('🚀 Iniciando extracción mejorada de productos...');
    
    // Verificar que el archivo existe
    if (!fs.existsSync(PRODUCTS_FILE_PATH)) {
      throw new Error(`El archivo no existe: ${PRODUCTS_FILE_PATH}`);
    }
    
    console.log('📖 Leyendo archivo manual-products.ts...');
    const fileContent = fs.readFileSync(PRODUCTS_FILE_PATH, 'utf8');
    
    console.log('🔍 Parseando archivo TypeScript...');
    const parsed = parseProductsFile(fileContent);
    
    if (!parsed.products || !Array.isArray(parsed.products)) {
      throw new Error('No se pudieron extraer los productos del archivo');
    }
    
    console.log(`✨ Se encontraron ${parsed.products.length} productos`);
    
    console.log('🔧 Procesando productos...');
    const processedProducts = parsed.products.map(processProduct);
    
    console.log('🔍 Validando productos...');
    const validProducts = processedProducts.filter(product => {
      return product.id && product.name && product.slug;
    });
    
    if (validProducts.length !== processedProducts.length) {
      console.warn(`⚠️ Se filtraron ${processedProducts.length - validProducts.length} productos inválidos`);
    }
    
    console.log('💾 Guardando productos en JSON...');
    const jsonOutput = JSON.stringify(validProducts, null, 2);
    fs.writeFileSync(OUTPUT_FILE_PATH, jsonOutput, 'utf8');
    
    console.log('✅ Extracción completada exitosamente!');
    console.log(`📄 Archivo generado: ${OUTPUT_FILE_PATH}`);
    console.log(`📊 Total de productos extraídos: ${validProducts.length}`);
    
    // Mostrar estadísticas detalladas
    const stats = {
      totalProducts: validProducts.length,
      categories: [...new Set(validProducts.map(p => p.category).filter(Boolean))],
      brands: [...new Set(validProducts.map(p => p.brand?.name).filter(Boolean))],
      withImages: validProducts.filter(p => p.images && p.images.length > 0).length,
      withVideo: validProducts.filter(p => p.videoIframe).length,
      active: validProducts.filter(p => p.isActive).length
    };
    
    console.log('\n📈 Estadísticas:');
    console.log(`   - Total de productos: ${stats.totalProducts}`);
    console.log(`   - Categorías únicas: ${stats.categories.length}`);
    console.log(`   - Marcas únicas: ${stats.brands.length}`);
    console.log(`   - Productos con imágenes: ${stats.withImages}`);
    console.log(`   - Productos con video: ${stats.withVideo}`);
    console.log(`   - Productos activos: ${stats.active}`);
    
    console.log('\n📂 Categorías encontradas:');
    stats.categories.forEach(cat => console.log(`   - ${cat}`));
    
    console.log('\n🏢 Marcas encontradas:');
    stats.brands.forEach(brand => console.log(`   - ${brand}`));
    
    // Guardar también estadísticas
    const statsOutput = {
      extractedAt: new Date().toISOString(),
      sourceFile: PRODUCTS_FILE_PATH,
      outputFile: OUTPUT_FILE_PATH,
      statistics: stats,
      sample: validProducts.slice(0, 3) // Primeros 3 productos como muestra
    };
    
    const statsPath = path.join(__dirname, 'extraction-stats.json');
    fs.writeFileSync(statsPath, JSON.stringify(statsOutput, null, 2), 'utf8');
    console.log(`\n📊 Estadísticas guardadas en: ${statsPath}`);
    
  } catch (error) {
    console.error('❌ Error durante la extracción:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { main, processProduct, cleanAssetReferences };