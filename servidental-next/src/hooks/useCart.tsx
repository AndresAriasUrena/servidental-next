'use client';

import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { WooCommerceProduct, Cart, CartItem, productToCartItem } from '@/types/woocommerce';

const CartContext = createContext<{
  cart: Cart;
  addToCart: (product: WooCommerceProduct, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isLoading: boolean;
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

  const addToCart = useCallback(async (product: WooCommerceProduct, quantity: number = 1) => {
    setIsLoading(true);
    
    try {
      setCart(currentCart => {
        const existingItemIndex = currentCart.items.findIndex(item => item.id === product.id);
        let newItems: CartItem[];

        if (existingItemIndex >= 0) {
          // Update existing item
          newItems = currentCart.items.map((item, index) => 
            index === existingItemIndex 
              ? { ...item, quantity: item.quantity + quantity, subtotal: (item.quantity + quantity) * item.price }
              : item
          );
        } else {
          // Add new item
          const newItem = productToCartItem(product, quantity);
          newItems = [...currentCart.items, newItem];
        }

        return calculateCartTotals(newItems);
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [calculateCartTotals]);

  const removeFromCart = useCallback((productId: number) => {
    setCart(currentCart => {
      const newItems = currentCart.items.filter(item => item.id !== productId);
      return calculateCartTotals(newItems);
    });
  }, [calculateCartTotals]);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(currentCart => {
      const newItems = currentCart.items.map(item => 
        item.id === productId 
          ? { ...item, quantity, subtotal: quantity * item.price }
          : item
      );
      return calculateCartTotals(newItems);
    });
  }, [calculateCartTotals, removeFromCart]);

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
      isLoading
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