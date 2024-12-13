// scripts/parseProducts.ts
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

type ProductBrand =
  | 'Siger'
  | 'COXO'
  | 'TPC'
  | 'BioArt'
  | 'DOF'
  | 'Feng Dan'
  | 'Meyer'
  | 'Micro NX'
  | 'Sturdy'
  | 'Xpect Vision';

type ProductCategory =
  | 'Unidades Dentales'
  | 'Bombas de succión'
  | 'Carrito para accesorios'
  | 'Compresores'
  | 'Contra-ángulos'
  | 'Cortadores'
  | 'Equipo de Rayos X'
  | 'Esterilización'
  | 'Microarenador'
  | 'Motores'
  | 'Lámparas Dentales'
  | 'Lámparas de Fotocurado'
  | 'Piezas de mano'
  | 'Selladoras'
  | 'Termoformadoras'
  | 'Vaporizadores'
  | 'Cámaras Intraorales'
  | 'Scanner'
  | 'Fresadora'
  | 'Anestesia'
  | 'Implantes'
  | 'Otros';

interface ParsedProduct {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  brand: {
    name: string;
    logo: string;
  };
  description: string;
  shortDescription: string;
  features: {
    unique: {
      title: string;
      items: string[];
    };
    general: {
      title: string;
      items: string[];
    };
  };
  images: {
    url: string;
    alt: string;
    width: number;
    height: number;
    isPrimary: boolean;
  }[];
  category: ProductCategory;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Función para normalizar nombres de marcas
function normalizeBrandName(brandName: string, productName: string): string {
    // Definición de marcas por palabras clave específicas en el nombre del producto
    const brandKeywords = {
      'COXO': ['cx207', 'cx235', 'coxo', 'explorer'],
      'BioArt': ['plastvac', 'smart', 'bioart', 'biostamp', 'plast press'],
      'TPC': ['dc-70', 'dc701', 'dc702', 'dc703'],
      'Sturdy': ['sa-232', 'sa232'],
      'Meyer': ['meyer'],
      'DOF': ['freedom', 'craft', 'dental edge'],
      'Micro NX': ['nx-201', 'nx201'],
      'Xpect Vision': ['vision', 'xvbeam'],
      'Feng Dan': ['feng']
    };
  
    const searchText = `${productName} ${brandName}`.toLowerCase();
  
    // Buscar coincidencias en las palabras clave
    for (const [brand, keywords] of Object.entries(brandKeywords)) {
      if (keywords.some(keyword => searchText.includes(keyword))) {
        return brand;
      }
    }
  
    // Si el nombre de la marca está presente en el mapeo directo, úsalo
    const directBrandMapping: { [key: string]: string } = {
      'siger': 'Siger',
      'coxo': 'COXO',
      'tpc': 'TPC',
      'bioart': 'BioArt',
      'dof': 'DOF',
      'feng dan': 'Feng Dan',
      'meyer': 'Meyer',
      'micro nx': 'Micro NX',
      'sturdy': 'Sturdy',
      'xpect vision': 'Xpect Vision'
    };
  
    const normalizedInputBrand = brandName.toLowerCase().trim();
    if (directBrandMapping[normalizedInputBrand]) {
      return directBrandMapping[normalizedInputBrand];
    }
  
    // Casos especiales basados en el nombre del producto
    if (searchText.includes('unidad dental') || searchText.includes('serie')) return 'Siger';
    if (searchText.includes('fresadora')) return 'DOF';
    if (searchText.includes('scanner')) return 'DOF';
  
    return 'Siger'; // Marca por defecto
  }

// Función mejorada para detectar categorías
function improvedCategoryDetection(name: string, description: string, features: string[]): ProductCategory {
    const searchText = `${name} ${description} ${features.join(' ')}`.toLowerCase();
    
    const categoryRules = [
      {
        category: 'Unidades Dentales',
        keywords: ['unidad dental', 'sillon dental', 'serie s30', 'serie u', 'serie v']
      },
      {
        category: 'Fresadora',
        keywords: ['fresadora', 'craft 5x', 'fresado']
      },
      {
        category: 'Termoformadoras',
        keywords: ['termoformadora', 'plastvac', 'plast press']
      },
      {
        category: 'Scanner',
        keywords: ['scanner', 'escáner', 'freedom', 'meyer', 'dental edge']
      },
      {
        category: 'Equipo de Rayos X',
        keywords: ['rayos x', 'radiográfico', 'siray', 'xvbeam']
      },
      {
        category: 'Piezas de mano',
        keywords: ['pieza de mano', 'contra-ángulo', 'contraangulo', 'super torque', 'pt master']
      },
      {
        category: 'Motores',
        keywords: ['motor', 'endomotor', 'c-smart', 'c-puma', 'c-sailor']
      },
      {
        category: 'Lámparas de Fotocurado',
        keywords: ['fotocurado', 'db686', 'honor']
      },
      {
        category: 'Lámparas Dentales',
        keywords: ['lámpara dental', 'l500', 'v1', 'v2']
      },
      {
        category: 'Compresores',
        keywords: ['compresor', 'dc-70']
      },
      {
        category: 'Bombas de succión',
        keywords: ['bomba de vacío', 'anyvac', 'vc-10']
      },
      {
        category: 'Esterilización',
        keywords: ['esterilizador', 'autoclave', 'sa-232']
      },
      {
        category: 'Carrito para accesorios',
        keywords: ['carrito']
      },
      {
        category: 'Selladoras',
        keywords: ['selladora', 'biostamp']
      },
      {
        category: 'Vaporizadores',
        keywords: ['vaporizador', 'pulverizador']
      },
      {
        category: 'Cámaras Intraorales',
        keywords: ['cámara intraoral', 'intraoral']
      },
      {
        category: 'Cortadores',
        keywords: ['cortador', 'gutta', 'uc cut']
      },
      {
        category: 'Microarenador',
        keywords: ['microarenador', 'microjato']
      },
      {
        category: 'Anestesia',
        keywords: ['anestesia', 'jeringa']
      },
      {
        category: 'Implantes',
        keywords: ['implante']
      }
    ];
  
    for (const rule of categoryRules) {
      if (rule.keywords.some(keyword => searchText.includes(keyword))) {
        return rule.category as ProductCategory;
      }
    }
  
    return 'Otros';
  }

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach((file: string) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

async function parseProductHTML(htmlPath: string): Promise<ParsedProduct | null> {
  try {
    const html = fs.readFileSync(htmlPath, 'utf-8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Extraer información básica
    const nombrePrincipal = document.querySelector('.nombre-principal')?.textContent?.replace('®', '').trim() || '';
    const nombreAdicional = document.querySelector('.nombre-adicional')?.textContent?.trim() || '';
    const descripcion = document.querySelector('.descripcion-producto p')?.textContent?.trim() || '';

    // Extraer marca
    const marcaImg = document.querySelector('.marca-producto-imagen img');
    const brandLogo = marcaImg?.getAttribute('src')?.replace('../../images//logos_marcas/', '') || '';
    const brandName = normalizeBrandName(marcaImg?.getAttribute('alt') || '', nombrePrincipal);

    // Extraer características
    const caracteristicasUnicas = Array.from(
      document.querySelectorAll('.informacion-producto li') as NodeListOf<HTMLElement>
    ).map(li => li.textContent?.trim() || '');

    const caracteristicasGenerales = Array.from(
      document.querySelectorAll('.informacion-general li') as NodeListOf<HTMLElement>
    ).map(li => li.textContent?.trim() || '');

    // Extraer imagen principal
    const mainImage = document.querySelector('.producto-imagen img')?.getAttribute('src');
    const imageUrl = mainImage?.replace('../productos/', '');

    // Construir slug
    const slug = path.basename(path.dirname(htmlPath));

    // Determinar categoría
    const category = improvedCategoryDetection(
      nombrePrincipal,
      nombreAdicional,
      caracteristicasUnicas
    );

    // Construir el producto
    const product: ParsedProduct = {
      id: slug,
      slug,
      name: nombrePrincipal,
      subtitle: nombreAdicional,
      brand: {
        name: brandName,
        logo: brandLogo
      },
      description: descripcion,
      shortDescription: descripcion.slice(0, 150) + (descripcion.length > 150 ? '...' : ''),
      features: {
        unique: {
          title: 'Características Únicas',
          items: caracteristicasUnicas
        },
        general: {
          title: 'Características Generales',
          items: caracteristicasGenerales
        }
      },
      images: imageUrl ? [{
        url: imageUrl,
        alt: nombrePrincipal,
        width: 800,
        height: 600,
        isPrimary: true
      }] : [],
      category,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return product;

  } catch (error) {
    console.error(`Error parsing ${htmlPath}:`, error);
    return null;
  }
}

async function findAllProductImages(productsDir: string, productSlug: string): Promise<{
  url: string;
  alt: string;
  width: number;
  height: number;
  isPrimary: boolean;
}[]> {
  const images: {
    url: string;
    alt: string;
    width: number;
    height: number;
    isPrimary: boolean;
  }[] = [];
  
  const allFiles = getAllFiles(productsDir);

  allFiles.forEach((file: string) => {
    if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
      const relativePath = path.relative(productsDir, file);
      if (relativePath.includes(productSlug.replace(/-/g, '_'))) {
        images.push({
          url: relativePath,
          alt: path.basename(file, path.extname(file)),
          width: 800,
          height: 600,
          isPrimary: false
        });
      }
    }
  });

  return images;
}

async function parseAllProducts(): Promise<ParsedProduct[]> {
  const products: ParsedProduct[] = [];
  const baseDir = path.join(process.cwd(), 'temp/migration/catalogo_2023');
  const productsDir = path.join(baseDir, 'productos');

  const directories = fs.readdirSync(baseDir)
    .filter((dir: string) => {
      const stat = fs.statSync(path.join(baseDir, dir));
      return stat.isDirectory() && dir !== 'productos';
    });

  for (const dir of directories) {
    const htmlPath = path.join(baseDir, dir, 'index.html');
    if (fs.existsSync(htmlPath)) {
      const product = await parseProductHTML(htmlPath);
      if (product) {
        const additionalImages = await findAllProductImages(productsDir, dir);
        product.images = [...product.images, ...additionalImages];
        products.push(product);
      }
    }
  }

  return products;
}

async function generateProductsFile(products: ParsedProduct[]) {
  // Extraer categorías únicas
  const categories = Array.from(new Set(products.map(p => p.category))).sort();
  const brands = Array.from(new Set(products.map(p => p.brand.name))).sort();

  const outputContent = `
// Este archivo fue generado automáticamente - No editar manualmente
import { Product, ProductCategory, ProductBrand } from '@/types/product';

export const categories: ProductCategory[] = ${JSON.stringify(categories, null, 2)};

export const brands: ProductBrand[] = ${JSON.stringify(brands, null, 2)};

export const products: Product[] = ${JSON.stringify(products, null, 2)};
`;

  const outputPath = path.join(process.cwd(), 'src/data/parsed-products.ts');
  fs.writeFileSync(outputPath, outputContent);
  
  // Generar reporte detallado
  const reportContent = `
Resumen de la migración:
Total de productos: ${products.length}

Productos por categoría:
${categories.map(cat => {
  const categoryProducts = products.filter(p => p.category === cat);
  return `\n${cat} (${categoryProducts.length}):${
    categoryProducts.map(p => `\n  - ${p.name}`).join('')
  }`;
}).join('\n')}

Productos por marca:
${brands.map(brand => {
  const brandProducts = products.filter(p => p.brand.name === brand);
  return `\n${brand} (${brandProducts.length}):${
    brandProducts.map(p => `\n  - ${p.name}`).join('')
  }`;
}).join('\n')}

Productos sin categoría asignada:
${products.filter(p => p.category === 'Otros').map(p => `- ${p.name}`).join('\n')}

Estadísticas:
- Total de imágenes: ${products.reduce((sum, p) => sum + p.images.length, 0)}
- Productos con características únicas: ${products.filter(p => p.features.unique.items.length > 0).length}
- Productos con características generales: ${products.filter(p => p.features.general.items.length > 0).length}
`;
  
  fs.writeFileSync(path.join(process.cwd(), 'temp/migration/report.txt'), reportContent);
}

// Ejecutar el script
async function main() {
  try {
    const products = await parseAllProducts();
    await generateProductsFile(products);
    console.log(`✅ Migración completada. Se procesaron ${products.length} productos.`);
    console.log('📄 Ver reporte en temp/migration/report.txt');
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    process.exit(1);
  }
}

main();