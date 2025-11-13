// Google Analytics E-commerce tracking utilities

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

// Track cuando un usuario ve un producto
export const trackProductView = (product: {
  id: number;
  name: string;
  price: string;
  category?: string;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'CRC',
      value: parseFloat(product.price),
      items: [
        {
          item_id: product.id.toString(),
          item_name: product.name,
          item_category: product.category || 'Sin categoría',
          price: parseFloat(product.price),
        },
      ],
    });
  }
};

// Track cuando un usuario agrega al carrito
export const trackAddToCart = (product: {
  id: number;
  name: string;
  price: string;
  quantity: number;
  category?: string;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'CRC',
      value: parseFloat(product.price) * product.quantity,
      items: [
        {
          item_id: product.id.toString(),
          item_name: product.name,
          item_category: product.category || 'Sin categoría',
          price: parseFloat(product.price),
          quantity: product.quantity,
        },
      ],
    });
  }
};

// Track cuando un usuario remueve del carrito
export const trackRemoveFromCart = (product: {
  id: number;
  name: string;
  price: string;
  quantity: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'remove_from_cart', {
      currency: 'CRC',
      value: parseFloat(product.price) * product.quantity,
      items: [
        {
          item_id: product.id.toString(),
          item_name: product.name,
          price: parseFloat(product.price),
          quantity: product.quantity,
        },
      ],
    });
  }
};

// Track cuando un usuario inicia el checkout
export const trackBeginCheckout = (cart: {
  items: Array<{
    id: number;
    name: string;
    price: string;
    quantity: number;
  }>;
  total: string;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: 'CRC',
      value: parseFloat(cart.total),
      items: cart.items.map((item) => ({
        item_id: item.id.toString(),
        item_name: item.name,
        price: parseFloat(item.price),
        quantity: item.quantity,
      })),
    });
  }
};

// Track cuando se completa una compra
export const trackPurchase = (order: {
  transactionId: string;
  total: string;
  items: Array<{
    id: number;
    name: string;
    price: string;
    quantity: number;
    category?: string;
  }>;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: order.transactionId,
      currency: 'CRC',
      value: parseFloat(order.total),
      items: order.items.map((item) => ({
        item_id: item.id.toString(),
        item_name: item.name,
        item_category: item.category || 'Sin categoría',
        price: parseFloat(item.price),
        quantity: item.quantity,
      })),
    });
  }
};

// Track búsquedas de productos
export const trackSearch = (searchTerm: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
    });
  }
};
