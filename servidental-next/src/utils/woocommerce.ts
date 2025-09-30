import { WooCommerceProduct, ProductFilters } from '@/types/woocommerce';

/**
 * Formats price in Costa Rican Colón
 */
export function formatPrice(price: number | string): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(numPrice) || numPrice === 0) return 'Consultar precio';
  
  return `₡${numPrice.toLocaleString('es-CR')}`;
}

/**
 * Calculates discount percentage
 */
export function getDiscountPercentage(regularPrice: string, salePrice: string): number {
  const regular = parseFloat(regularPrice) || 0;
  const sale = parseFloat(salePrice) || 0;
  
  if (regular === 0 || sale === 0 || sale >= regular) return 0;
  
  return Math.round(((regular - sale) / regular) * 100);
}

/**
 * Checks if product is on sale
 */
export function isProductOnSale(product: WooCommerceProduct): boolean {
  return product.on_sale && parseFloat(product.sale_price) > 0;
}

/**
 * Gets product main image
 */
export function getProductMainImage(product: WooCommerceProduct): string {
  return product.images?.[0]?.src || '/images/placeholder-product.jpg';
}

/**
 * Gets product category name
 */
export function getProductCategory(product: WooCommerceProduct): string {
  return product.categories?.[0]?.name || 'Sin categoría';
}

// Brand ID to name mapping (from WooCommerce taxonomy)
// This should be the primary source of truth for brand detection
const BRAND_ID_MAPPING: Record<string, string> = {
  '55': 'SIGER',
  '54': 'BIOART',
  '97': 'COXO',
  '88': 'DOF',      // Adding DOF mapping
  '89': 'FAME',     // Adding FAME mapping  
  '90': 'MEYER',    // Adding other brands as needed
  '91': 'MICRO NX',
  '92': 'TPC',
  '93': 'XPECT VISION',
  '94': 'DENTECH',
  '95': 'DENTAFILM',
  '96': 'LAUNCA',
  '98': 'ELEC',
  '99': 'EPDENT',
  '100': 'MDMED',
  '101': 'STURDY',
  '102': 'ARTELECTRON',
  '103': 'DIMED'
};

/**
 * Gets product brand from WooCommerce data with robust detection
 * Priority: 1) Attributes, 2) Meta data, 3) Taxonomy mapping, 4) Product name fallback
 */
export function getProductBrand(product: WooCommerceProduct): string {
  // Enable debug logging in development AND for specific products
  const debug = process.env.NODE_ENV === 'development' || product.name.toLowerCase().includes('freedom') || product.name.toLowerCase().includes('dof');
  
  if (debug) {
    console.log('🔍 Brand Detection for:', product.name);
    console.log('🔍 Product ID:', product.id);
  }

  // PRIORITY 1: Check product attributes for brand/marca
  if (product.attributes?.length > 0) {
    const brandAttribute = product.attributes.find(attr => {
      const name = attr.name.toLowerCase();
      return name.includes('marca') || name.includes('brand');
    });
    
    if (brandAttribute?.options?.[0]) {
      const brandValue = brandAttribute.options[0].trim();
      
      // Check if it's a brand ID that needs mapping
      if (BRAND_ID_MAPPING[brandValue]) {
        const mappedBrand = BRAND_ID_MAPPING[brandValue];
        if (debug) console.log('✅ Found brand via attributes (ID mapped):', brandValue, '→', mappedBrand);
        return mappedBrand;
      }
      
      // Return the brand name directly if it's not an ID
      if (brandValue && !brandValue.match(/^\d+$/)) {
        if (debug) console.log('✅ Found brand via attributes:', brandValue);
        return brandValue.toUpperCase();
      }
    }
  }

  // PRIORITY 2: Check meta_data for brand information
  if (product.meta_data?.length > 0) {
    // Look for various brand-related meta keys
    const brandMetaKeys = [
      'pa_marca', 'pa_brand', 'attribute_pa_marca', 'attribute_pa_brand',
      '_product_brand', '_brand', 'marca', 'brand'
    ];
    
    for (const key of brandMetaKeys) {
      const metaItem = product.meta_data.find(meta => 
        meta.key.toLowerCase() === key.toLowerCase()
      );
      
      if (metaItem?.value) {
        let brandValue = metaItem.value;
        
        // Handle various data formats
        if (typeof brandValue === 'string') {
          // Handle serialized PHP arrays
          if (brandValue.startsWith('a:')) {
            const match = brandValue.match(/s:\d+:"([^"]+)"/);
            if (match) brandValue = match[1];
          }
          
          brandValue = brandValue.toString().trim();
          
          // Check if it's a brand ID that needs mapping
          if (BRAND_ID_MAPPING[brandValue]) {
            const mappedBrand = BRAND_ID_MAPPING[brandValue];
            if (debug) console.log('✅ Found brand via meta_data (ID mapped):', brandValue, '→', mappedBrand);
            return mappedBrand;
          }
          
          // Return direct brand name if it's not just a number
          if (brandValue && !brandValue.match(/^\d+$/)) {
            if (debug) console.log('✅ Found brand via meta_data:', brandValue);
            return brandValue.toUpperCase();
          }
        }
      }
    }
  }

  // PRIORITY 3: Check for taxonomy term IDs in categories or other fields
  // Sometimes brands are stored as taxonomy terms
  if (product.meta_data?.length > 0) {
    const taxonomyFields = product.meta_data.filter(meta => 
      meta.key.includes('taxonomy') || 
      meta.key.includes('term') ||
      meta.key.startsWith('_')
    );
    
    for (const field of taxonomyFields) {
      if (field.value && typeof field.value === 'string') {
        const termId = field.value.toString().trim();
        if (BRAND_ID_MAPPING[termId]) {
          const mappedBrand = BRAND_ID_MAPPING[termId];
          if (debug) console.log('✅ Found brand via taxonomy:', termId, '→', mappedBrand);
          return mappedBrand;
        }
      }
    }
  }

  // PRIORITY 4: Product name pattern matching (last resort)
  const productName = product.name.toLowerCase();
  
  // Known product name patterns to brand mapping
  const namePatterns: Record<string, string> = {
    'freedom': 'DOF',
    'escaner intraoral freedom': 'DOF',
    'escáner intraoral freedom': 'DOF',
    'fresadora': 'DOF',           // Milling machines are DOF brand
    'fresadora dental': 'DOF',
    'craft pro': 'DOF',          // Specific DOF milling machine model
    'bioart': 'BIOART',
    'termoformadora': 'BIOART',  // Based on your feedback
    'articulador': 'BIOART',     // Articulators typically BIOART
    'siger': 'SIGER',
    'coxo': 'COXO',
    'pieza de mano': 'COXO',
    'piezas de mano': 'COXO',
    'contra ángulo': 'COXO',     // Contra angle handpieces
    'contraángulo': 'COXO',
    'turbina': 'COXO',           // Turbines
    'meyer': 'MEYER',
    'tomógrafo meyer': 'MEYER',
    'tomografo meyer': 'MEYER',
    'ss-x9010dpro': 'MEYER',
    'x9010dpro': 'MEYER',
    'rayos x': 'MEYER',          // X-ray equipment
    'sensor': 'FAME',            // Sensors often FAME brand
    'placa': 'FAME',             // Plates for imaging
    'escáner de placas': 'FAME', // Plate scanners
    'micro motor': 'MICRO NX',   // Micro motors
    'micromotor': 'MICRO NX'
  };
  
  for (const [pattern, brand] of Object.entries(namePatterns)) {
    if (productName.includes(pattern)) {
      if (debug) console.log('✅ Found brand via product name pattern:', pattern, '→', brand);
      return brand;
    }
  }

  if (debug) {
    console.log('❌ No brand found for:', product.name);
    console.log('Available attributes:', product.attributes?.map(attr => ({
      name: attr.name,
      options: attr.options
    })));
    console.log('Available meta keys:', product.meta_data?.map(meta => meta.key));
  }
  
  return '';
}

/**
 * Builds WooCommerce API URL with parameters
 */
export function buildWooCommerceUrl(endpoint: string, params: Record<string, any> = {}): string {
  const baseUrl = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || 'https://wp.servidentalcr.com';
  const consumerKey = process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY;
  const consumerSecret = process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET;
  
  const url = new URL(`${baseUrl}/wp-json/wc/v3/${endpoint}`);
  
  // Add authentication
  url.searchParams.append('consumer_key', consumerKey || '');
  url.searchParams.append('consumer_secret', consumerSecret || '');
  
  // Add other parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, String(value));
    }
  });
  
  return url.toString();
}

/**
 * Filters products based on criteria
 */
export function filterProducts(products: WooCommerceProduct[], filters: ProductFilters): WooCommerceProduct[] {
  return products.filter(product => {
    // Category filter
    if (filters.categories && filters.categories.length > 0) {
      const hasCategory = product.categories.some(cat => 
        filters.categories!.includes(cat.id)
      );
      if (!hasCategory) return false;
    }
    
    // Price filter
    const price = parseFloat(product.price) || 0;
    if (filters.price_min && price < filters.price_min) return false;
    if (filters.price_max && price > filters.price_max) return false;
    
    // Sale filter
    if (filters.on_sale && !product.on_sale) return false;
    
    // Stock filter
    if (filters.in_stock && product.stock_status !== 'instock') return false;
    
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(searchTerm);
      const matchesDescription = product.description.toLowerCase().includes(searchTerm);
      const matchesSKU = product.sku?.toLowerCase().includes(searchTerm);
      
      if (!matchesName && !matchesDescription && !matchesSKU) return false;
    }
    
    return true;
  });
}

/**
 * Sorts products by different criteria
 */
export function sortProducts(
  products: WooCommerceProduct[], 
  sortBy: 'name' | 'price' | 'date' | 'popularity' = 'name',
  order: 'asc' | 'desc' = 'asc'
): WooCommerceProduct[] {
  const sorted = [...products].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'price':
        const priceA = parseFloat(a.price) || 0;
        const priceB = parseFloat(b.price) || 0;
        comparison = priceA - priceB;
        break;
      case 'date':
        comparison = new Date(a.date_created).getTime() - new Date(b.date_created).getTime();
        break;
      case 'popularity':
        comparison = b.total_sales - a.total_sales;
        break;
      default:
        comparison = 0;
    }
    
    return order === 'desc' ? -comparison : comparison;
  });
  
  return sorted;
}

/**
 * Creates a product slug from name
 */
export function createProductSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove multiple hyphens
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Validates Costa Rican phone number
 */
export function validateCostaRicanPhone(phone: string): boolean {
  // Costa Rican phone patterns: +506 XXXX-XXXX, 506 XXXX-XXXX, XXXX-XXXX
  const phoneRegex = /^(\+?506\s?)?\d{4}-?\d{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Formats Costa Rican phone number
 */
export function formatCostaRicanPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 8) {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('506')) {
    return `+506 ${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone; // Return original if format doesn't match
}

/**
 * Gets shipping estimate for Costa Rica
 */
export function getShippingEstimate(province: string): { days: string; cost: number } {
  const shippingRates: Record<string, { days: string; cost: number }> = {
    'san-jose': { days: '1-2', cost: 2500 },
    'alajuela': { days: '1-2', cost: 2500 },
    'cartago': { days: '1-3', cost: 3000 },
    'heredia': { days: '1-2', cost: 2500 },
    'puntarenas': { days: '2-4', cost: 4000 },
    'guanacaste': { days: '2-4', cost: 4500 },
    'limon': { days: '3-5', cost: 5000 }
  };
  
  const provinceKey = province.toLowerCase().replace(/\s+/g, '-');
  return shippingRates[provinceKey] || { days: '3-5', cost: 3500 };
}