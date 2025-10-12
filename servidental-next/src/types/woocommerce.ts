// AUTO-GENERATED TYPES FROM WOOCOMMERCE API
// Generated on: 2025-07-22T07:09:17.865Z
// Total products: 105
// Total categories: 29  
// Total attributes: 1
// Do not edit manually - run 'node generate-types-fixed.js' to regenerate

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
// BRAND TYPES (Product Attribute Terms)
// ============================================

export interface WooCommerceBrand {
  id: number;
  name: string;
  slug: string;
  description: string;
  menu_order: number;
  count: number;
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
// UTILITY TYPES FOR SERVIDENTAL APP
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
  brands?: string[]; // Slugs de marcas
  attributes?: { [key: string]: string[] };
  price_min?: number;
  price_max?: number;
  on_sale?: boolean;
  in_stock?: boolean;
  search?: string;
  per_page?: number;
  page?: number;
  exclude?: number[];
  status?: string;
}

// Para respuestas de API paginadas
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  total_pages: number;
  current_page: number;
  per_page: number;
}

// Tipos específicos para ServidentalCR
export interface ServidentalProduct extends WooCommerceProduct {
  // Extensiones específicas para equipos dentales
  brand?: string;
  model?: string;
  warranty?: string;
  certification?: string[];
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

// Función para convertir productos a formato legacy de ServidentalCR
export function wooCommerceToServidentalProduct(product: WooCommerceProduct): any {
  // Buscar marca en atributos
  const brandAttribute = product.attributes.find(attr => 
    attr.name.toLowerCase().includes('marca') || 
    attr.name.toLowerCase().includes('brand')
  );
  
  return {
    id: product.id.toString(),
    slug: product.slug,
    name: product.name,
    subtitle: product.short_description,
    brand: {
      name: brandAttribute?.options[0] || '',
      logo: '' // Se debe mapear desde assets
    },
    description: product.description,
    shortDescription: product.short_description,
    price: parseFloat(product.price) || undefined,
    category: product.categories[0]?.name || '',
    images: product.images.map((img, index) => ({
      url: img.src,
      alt: img.alt || product.name,
      width: 800,
      height: 600,
      isPrimary: index === 0
    })),
    isActive: product.status === 'publish',
    inStock: product.stock_status === 'instock',
    createdAt: product.date_created,
    updatedAt: product.date_modified
  };
}

// Función para obtener productos filtrados
export function filterProducts(products: WooCommerceProduct[], filters: ProductFilters): WooCommerceProduct[] {
  return products.filter(product => {
    // Filtro por categorías
    if (filters.categories && filters.categories.length > 0) {
      const hasMatchingCategory = product.categories.some(cat => 
        filters.categories!.includes(cat.id)
      );
      if (!hasMatchingCategory) return false;
    }
    
    // Filtro por precio
    const price = parseFloat(product.price);
    if (filters.price_min && price < filters.price_min) return false;
    if (filters.price_max && price > filters.price_max) return false;
    
    // Filtro por oferta
    if (filters.on_sale && !product.on_sale) return false;
    
    // Filtro por stock
    if (filters.in_stock && product.stock_status !== 'instock') return false;
    
    // Filtro por búsqueda
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(searchTerm);
      const matchesDescription = product.description.toLowerCase().includes(searchTerm);
      const matchesSKU = product.sku.toLowerCase().includes(searchTerm);
      
      if (!matchesName && !matchesDescription && !matchesSKU) return false;
    }
    
    return true;
  });
}
