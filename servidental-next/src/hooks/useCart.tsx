'use client';

import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { WooCommerceProduct, Cart, CartItem, productToCartItem, ProductVariation } from '@/types/woocommerce';
import { canAddToCart, validateQuantity, getStockErrorMessage } from '@/utils/stock';

const CartContext = createContext<{
  cart: Cart;
  addToCart: (product: WooCommerceProduct, quantity: number, variation?: ProductVariation) => Promise<{ success: boolean; error?: string }>;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => { success: boolean; error?: string };
  clearCart: () => void;
  isLoading: boolean;
  getCartQuantity: (productId: number) => number;
} | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    totalItems: 0,
    totalQuantity: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('servidental-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error parsing saved cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('servidental-cart', JSON.stringify(cart));
  }, [cart]);

  const calculateCartTotals = useCallback((items: CartItem[]): Cart => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.subtotal, 0);

    return {
      items,
      total,
      totalItems: items.length,
      totalQuantity
    };
  }, []);

  const getCartQuantity = useCallback((productId: number): number => {
    const item = cart.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }, [cart.items]);

  const addToCart = useCallback(async (
    product: WooCommerceProduct,
    quantity: number = 1,
    variation?: ProductVariation
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      // Use variation data for stock validation if available
      const itemForValidation = variation || product;

      // Obtener cantidad actual en el carrito
      // For variations, check both product ID and variation ID
      const cartKey = variation ? `${product.id}-${variation.id}` : `${product.id}`;
      const currentCartQty = cart.items
        .filter(item => {
          if (variation) {
            return item.id === product.id && item.variationId === variation.id;
          }
          return item.id === product.id && !item.variationId;
        })
        .reduce((sum, item) => sum + item.quantity, 0);

      // Validar si se puede agregar la cantidad solicitada
      if (!canAddToCart(itemForValidation, quantity, currentCartQty)) {
        const error = getStockErrorMessage(true);
        return { success: false, error };
      }

      setCart(currentCart => {
        // Find existing item (consider variation ID if present)
        const existingItemIndex = currentCart.items.findIndex(item => {
          if (variation) {
            return item.id === product.id && item.variationId === variation.id;
          }
          return item.id === product.id && !item.variationId;
        });

        let newItems: CartItem[];

        if (existingItemIndex >= 0) {
          // Update existing item
          const newQuantity = currentCart.items[existingItemIndex].quantity + quantity;
          newItems = currentCart.items.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: newQuantity, subtotal: newQuantity * item.price }
              : item
          );
        } else {
          // Add new item
          const newItem = productToCartItem(product, quantity, variation);
          newItems = [...currentCart.items, newItem];
        }

        return calculateCartTotals(newItems);
      });

      return { success: true };
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, error: 'Error al agregar al carrito' };
    } finally {
      setIsLoading(false);
    }
  }, [calculateCartTotals, cart.items]);

  const removeFromCart = useCallback((productId: number) => {
    setCart(currentCart => {
      const newItems = currentCart.items.filter(item => item.id !== productId);
      return calculateCartTotals(newItems);
    });
  }, [calculateCartTotals]);

  const updateQuantity = useCallback((productId: number, quantity: number, product?: WooCommerceProduct): { success: boolean; error?: string } => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return { success: true };
    }

    // Si se proporciona el producto, validar stock
    if (product) {
      const currentCartQty = getCartQuantity(productId);
      const validatedQty = validateQuantity(product, quantity, 0);

      if (validatedQty < quantity) {
        return { success: false, error: getStockErrorMessage(true) };
      }
    }

    setCart(currentCart => {
      const newItems = currentCart.items.map(item =>
        item.id === productId
          ? { ...item, quantity, subtotal: quantity * item.price }
          : item
      );
      return calculateCartTotals(newItems);
    });

    return { success: true };
  }, [calculateCartTotals, removeFromCart, getCartQuantity]);

  const clearCart = useCallback(() => {
    setCart({
      items: [],
      total: 0,
      totalItems: 0,
      totalQuantity: 0
    });
  }, []);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isLoading,
      getCartQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}