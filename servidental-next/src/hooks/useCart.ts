'use client';

import { useState, useEffect } from 'react';
import { WooCommerceProduct, CartItem, Cart } from '@/types/woocommerce';

export function useCart() {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    totalItems: 0,
    totalQuantity: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('servidental-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('servidental-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (product: WooCommerceProduct, quantity: number = 1) => {
    setIsLoading(true);
    
    try {
      const existingItemIndex = cart.items.findIndex(item => item.id === product.id);
      const price = parseFloat(product.sale_price) || parseFloat(product.price) || 0;
      
      let newItems = [...cart.items];
      
      if (existingItemIndex >= 0) {
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity,
          subtotal: (newItems[existingItemIndex].quantity + quantity) * price
        };
      } else {
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price,
          quantity,
          image: product.images[0]?.src || '',
          slug: product.slug,
          sku: product.sku,
          subtotal: price * quantity
        };
        newItems.push(newItem);
      }
      
      const newTotal = newItems.reduce((sum, item) => sum + item.subtotal, 0);
      const newTotalQuantity = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      setCart({
        items: newItems,
        total: newTotal,
        totalItems: newItems.length,
        totalQuantity: newTotalQuantity,
      });

      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1000);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = (productId: number) => {
    const newItems = cart.items.filter(item => item.id !== productId);
    const newTotal = newItems.reduce((sum, item) => sum + item.subtotal, 0);
    const newTotalQuantity = newItems.reduce((sum, item) => sum + item.quantity, 0);
    
    setCart({
      items: newItems,
      total: newTotal,
      totalItems: newItems.length,
      totalQuantity: newTotalQuantity,
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    const newItems = cart.items.map(item => {
      if (item.id === productId) {
        return {
          ...item,
          quantity,
          subtotal: item.price * quantity
        };
      }
      return item;
    });
    
    const newTotal = newItems.reduce((sum, item) => sum + item.subtotal, 0);
    const newTotalQuantity = newItems.reduce((sum, item) => sum + item.quantity, 0);
    
    setCart({
      items: newItems,
      total: newTotal,
      totalItems: newItems.length,
      totalQuantity: newTotalQuantity,
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      totalItems: 0,
      totalQuantity: 0,
    });
  };

  const getItemQuantity = (productId: number) => {
    const item = cart.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  return {
    cart,
    isLoading,
    justAdded,
    totalQuantity: cart.totalQuantity,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
  } as const;
} 