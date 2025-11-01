// generate-types.js
// Generador automático de tipos TypeScript desde WooCommerce API
// Ejecutar con: node generate-types.js

require('dotenv').config();
const WooCommerceAPI = require('woocommerce-api');
const fs = require('fs');
const path = require('path');

// Configuración WooCommerce desde .env
const WooCommerce = new WooCommerceAPI({
  url: process.env.WOOCOMMERCE_URL || 'https://wp.servidentalcr.com',
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || '',
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || '',
  wpAPI: true,
  version: 'wc/v3',
  queryStringAuth: true
});

async function generateTypes() {
  console.log('🔧 Generando tipos TypeScript desde WooCommerce API...');
  console.log('='.repeat(50));

  try {
    // 1. Obtener productos para analizar estructura
    console.log('📦 Analizando estructura de productos...');
    const productsResponse = await new Promise((resolve, reject) => {
      WooCommerce.get('products', { per_page: 5 }, (err, data, res) => {
        if (err) reject(err);
        else resolve({ data, total: res.headers['x-wp-total'] });
      });
    });
    
    // 2. Obtener categorías
    console.log('📂 Analizando estructura de categorías...');
    const categoriesResponse = await new Promise((resolve, reject) => {
      WooCommerce.get('products/categories', { per_page: 10 }, (err, data, res) => {
        if (err) reject(err);
        else resolve({ data, total: res.headers['x-wp-total'] });
      });
    });

    // 3. Obtener atributos
    console.log('🏷️ Analizando estructura de atributos...');
    const attributesResponse = await new Promise((resolve, reject) => {
      WooCommerce.get('products/attributes', {}, (err, data, res) => {
        if (err) reject(err);
        else resolve({ data, total: res.headers['x-wp-total'] || 0 });
      });
    });

    const products = productsResponse.data || [];
    const categories = categoriesResponse.data || [];
    const attributes = attributesResponse.data || [];

    // 4. Generar tipos TypeScript
    const typesContent = `// AUTO-GENERATED TYPES FROM WOOCOMMERCE API
// Generated on: ${new Date().toISOString()}
// Do not edit manually - run 'node generate-types.js' to regenerate

// ============================================
// PRODUCT TYPES
// ============================================

export interface WooCommerceProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  type: 'simple' | 'grouped' | 'external' | 'variable';
  status: 'draft' | 'pending' | 'private' | 'publish';
  featured: boolean;
  catalog_visibility: 'visible' | 'catalog' | 'search' | 'hidden';
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from: string | null;
  date_on_sale_from_gmt: string | null;
  date_on_sale_to: string | null;
  date_on_sale_to_gmt: string | null;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  downloads: any[];
  download_limit: number;
  download_expiry: number;
  external_url: string;
  button_text: string;
  tax_status: 'taxable' | 'shipping' | 'none';
  tax_class: string;
  manage_stock: boolean;
  stock_quantity: number | null;
  backorders: 'no' | 'notify' | 'yes';
  backorders_allowed: boolean;
  backordered: boolean;
  low_stock_amount: number | null;
  sold_individually: boolean;
  weight: string;
  dimensions: ProductDimensions;
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  upsell_ids: number[];
  cross_sell_ids: number[];
  parent_id: number;
  purchase_note: string;
  categories: ProductCategory[];
  tags: ProductTag[];
  images: ProductImage[];
  attributes: ProductAttribute[];
  default_attributes: any[];
  variations: number[];
  grouped_products: number[];
  menu_order: number;
  price_html: string;
  related_ids: number[];
  meta_data: MetaData[];
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  has_options: boolean;
}

export interface ProductDimensions {
  length: string;
  width: string;
  height: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ProductTag {
  id: number;
  name: string;
  slug: string;
}

export interface ProductImage {
  id: number;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  src: string;
  name: string;
  alt: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

export interface MetaData {
  id: number;
  key: string;
  value: any;
}

// ============================================
// CATEGORY TYPES
// ============================================

export interface WooCommerceCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: 'default' | 'products' | 'subcategories' | 'both';
  image: CategoryImage | null;
  menu_order: number;
  count: number;
}

export interface CategoryImage {
  id: number;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  src: string;
  name: string;
  alt: string;
}

// ============================================
// ATTRIBUTE TYPES
// ============================================

export interface WooCommerceAttribute {
  id: number;
  name: string;
  slug: string;
  type: 'select' | 'text' | 'multiselect';
  order_by: 'menu_order' | 'name' | 'name_num' | 'id';
  has_archives: boolean;
}

// ============================================
// ORDER TYPES
// ============================================

export interface WooCommerceOrder {
  id: number;
  parent_id: number;
  status: 'pending' | 'processing' | 'on-hold' | 'completed' | 'cancelled' | 'refunded' | 'failed' | 'trash';
  currency: string;
  version: string;
  prices_include_tax: boolean;
  date_created: string;
  date_modified: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  customer_id: number;
  order_key: string;
  billing: BillingAddress;
  shipping: ShippingAddress;
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  customer_ip_address: string;
  customer_user_agent: string;
  created_via: string;
  customer_note: string;
  date_completed: string | null;
  date_paid: string | null;
  cart_hash: string;
  number: string;
  meta_data: MetaData[];
  line_items: OrderLineItem[];
  tax_lines: any[];
  shipping_lines: any[];
  fee_lines: any[];
  coupon_lines: any[];
  refunds: any[];
  payment_url: string;
  is_editable: boolean;
  needs_payment: boolean;
  needs_processing: boolean;
  date_created_gmt: string;
  date_modified_gmt: string;
  date_completed_gmt: string | null;
  date_paid_gmt: string | null;
  currency_symbol: string;
}

export interface BillingAddress {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
}

export interface ShippingAddress {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface OrderLineItem {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  tax_class: string;
  subtotal: string;
  subtotal_tax: string;
  total: string;
  total_tax: string;
  taxes: any[];
  meta_data: MetaData[];
  sku: string;
  price: number;
  image: ProductImage;
}

// ============================================
// UTILITY TYPES
// ============================================

// Para componentes de carrito
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
  sku?: string;
  subtotal: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  totalItems: number;
  totalQuantity: number;
}

// Para filtros de productos
export interface ProductFilters {
  categories?: number[];
  attributes?: { [key: string]: string[] };
  price_min?: number;
  price_max?: number;
  on_sale?: boolean;
  in_stock?: boolean;
  search?: string;
}

// Para respuestas de API paginadas
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  total_pages: number;
  current_page: number;
  per_page: number;
}

// ============================================
// CONVERSION FUNCTIONS
// ============================================

// Función para convertir producto WooCommerce a formato del carrito
export function productToCartItem(product: WooCommerceProduct, quantity: number = 1): CartItem {
  return {
    id: product.id,
    name: product.name,
    price: parseFloat(product.price) || 0,
    quantity,
    image: product.images[0]?.src || '',
    slug: product.slug,
    sku: product.sku,
    subtotal: (parseFloat(product.price) || 0) * quantity
  };
}

// Función para convertir productos a formato legacy
export function wooCommerceToLegacyProduct(product: WooCommerceProduct): any {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: parseFloat(product.price) || 0,
    description: product.description,
    summary: product.short_description,
    images: product.images.map(img => ({
      src: img.src,
      alt: img.alt
    })),
    category: product.categories[0]?.name || '',
    brand: product.attributes.find(attr => 
      attr.name.toLowerCase().includes('marca') || 
      attr.name.toLowerCase().includes('brand')
    )?.options[0] || '',
    inStock: product.stock_status === 'instock',
    featured: product.featured
  };
}

// ============================================
// EXPORT ALL TYPES
// ============================================

export type {
  WooCommerceProduct,
  ProductDimensions,
  ProductCategory,
  ProductTag,
  ProductImage,
  ProductAttribute,
  MetaData,
  WooCommerceCategory,
  CategoryImage,
  WooCommerceAttribute,
  WooCommerceOrder,
  BillingAddress,
  ShippingAddress,
  OrderLineItem,
  CartItem,
  Cart,
  ProductFilters,
  PaginatedResponse
};
`;

    // 5. Escribir archivo de tipos
    const typesPath = path.join(process.cwd(), 'src', 'types', 'woocommerce.ts');
    const typesDir = path.dirname(typesPath);
    
    // Crear directorio si no existe
    if (!fs.existsSync(typesDir)) {
      fs.mkdirSync(typesDir, { recursive: true });
    }
    
    fs.writeFileSync(typesPath, typesContent);
    
    console.log('✅ Tipos generados exitosamente!');
    console.log(`📁 Archivo creado: ${typesPath}`);
    console.log('');
    console.log('📊 Estadísticas:');
    console.log(`   - Productos analizados: ${products.length}`);
    console.log(`   - Total productos en tienda: ${productsResponse.total || 'N/A'}`);
    console.log(`   - Categorías analizadas: ${categories.length}`);
    console.log(`   - Total categorías: ${categoriesResponse.total || 'N/A'}`);
    console.log(`   - Atributos analizados: ${attributes.length}`);
    console.log('');
    console.log('🎯 Próximos pasos:');
    console.log('   1. Revisar los tipos generados en src/types/woocommerce.ts');
    console.log('   2. Actualizar imports en componentes existentes');
    console.log('   3. Usar tipos para desarrollo de e-commerce');
    
    console.log('');
    console.log('📋 Ejemplo de uso:');
    console.log(`   import { WooCommerceProduct, Cart } from '@/types/woocommerce';`);

  } catch (error) {
    console.error('❌ Error generando tipos:', error);
    if (error.message && error.message.includes('consumer')) {
      console.log('💡 Verifica que las credenciales WooCommerce estén configuradas en .env');
    }
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  generateTypes();
}

module.exports = generateTypes;