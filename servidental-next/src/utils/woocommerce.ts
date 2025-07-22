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

/**
 * Gets product brand from attributes
 */
export function getProductBrand(product: WooCommerceProduct): string {
  const brandAttribute = product.attributes?.find(attr => 
    attr.name.toLowerCase().includes('marca') || 
    attr.name.toLowerCase().includes('brand')
  );
  
  return brandAttribute?.options?.[0] || '';
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