'use client';

import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { WooCommerceProduct, Cart, CartItem, productToCartItem, ProductVariation, AppliedCoupon, WooCommerceCoupon } from '@/types/woocommerce';
import { canAddToCart, validateQuantity, getStockErrorMessage } from '@/utils/stock';

const CartContext = createContext<{
  cart: Cart;
  addToCart: (product: WooCommerceProduct, quantity: number, variation?: ProductVariation) => Promise<{ success: boolean; error?: string }>;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => { success: boolean; error?: string };
  clearCart: () => void;
  isLoading: boolean;
  getCartQuantity: (productId: number) => number;
  applyCoupon: (code: string) => Promise<{ success: boolean; error?: string }>;
  removeCoupon: (code: string) => void;
} | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    subtotal: 0,
    discount: 0,
    total: 0,
    totalItems: 0,
    totalQuantity: 0,
    appliedCoupons: []
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

  const calculateCartTotals = useCallback((items: CartItem[], coupons: AppliedCoupon[] = []): Cart => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);

    let discount = 0;
    coupons.forEach(coupon => {
      if (coupon.discountType === 'percent') {
        discount += (subtotal * parseFloat(coupon.amount)) / 100;
      } else if (coupon.discountType === 'fixed_cart') {
        discount += parseFloat(coupon.amount);
      }
    });

    discount = Math.min(discount, subtotal);

    const total = subtotal - discount;

    return {
      items,
      subtotal,
      discount,
      total,
      totalItems: items.length,
      totalQuantity,
      appliedCoupons: coupons
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

        return calculateCartTotals(newItems, currentCart.appliedCoupons);
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
      return calculateCartTotals(newItems, currentCart.appliedCoupons);
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
      return calculateCartTotals(newItems, currentCart.appliedCoupons);
    });

    return { success: true };
  }, [calculateCartTotals, removeFromCart, getCartQuantity]);

  const clearCart = useCallback(() => {
    setCart({
      items: [],
      subtotal: 0,
      discount: 0,
      total: 0,
      totalItems: 0,
      totalQuantity: 0,
      appliedCoupons: []
    });
  }, []);

  const applyCoupon = useCallback(async (code: string): Promise<{ success: boolean; error?: string }> => {
    if (!code || code.trim() === '') {
      return { success: false, error: 'Por favor ingrese un código de cupón' };
    }

    if (cart.appliedCoupons.length > 0) {
      return { success: false, error: 'Solo se puede usar un cupón por compra. Elimina el cupón actual para aplicar otro.' };
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/woocommerce/coupons/${encodeURIComponent(code)}`);
      const data = await response.json();

      if (!response.ok || !data.valid) {
        return { success: false, error: data.error || 'Cupón inválido' };
      }

      const coupon: WooCommerceCoupon = data.coupon;

      if (coupon.minimum_amount && parseFloat(coupon.minimum_amount) > 0) {
        if (cart.subtotal < parseFloat(coupon.minimum_amount)) {
          return {
            success: false,
            error: `Este cupón requiere un mínimo de ₡${parseFloat(coupon.minimum_amount).toLocaleString('es-CR')}`
          };
        }
      }

      if (coupon.maximum_amount && parseFloat(coupon.maximum_amount) > 0) {
        if (cart.subtotal > parseFloat(coupon.maximum_amount)) {
          return {
            success: false,
            error: `Este cupón solo es válido para compras menores a ₡${parseFloat(coupon.maximum_amount).toLocaleString('es-CR')}`
          };
        }
      }

      let discountAmount = 0;
      if (coupon.discount_type === 'percent') {
        discountAmount = (cart.subtotal * parseFloat(coupon.amount)) / 100;
      } else if (coupon.discount_type === 'fixed_cart') {
        discountAmount = parseFloat(coupon.amount);
      }

      const newCoupon: AppliedCoupon = {
        code: coupon.code,
        discount: discountAmount,
        discountType: coupon.discount_type,
        amount: coupon.amount
      };

      setCart(currentCart => {
        return calculateCartTotals(currentCart.items, [newCoupon]);
      });

      return { success: true };
    } catch (error) {
      console.error('Error applying coupon:', error);
      return { success: false, error: 'Error al validar el cupón' };
    } finally {
      setIsLoading(false);
    }
  }, [cart, calculateCartTotals]);

  const removeCoupon = useCallback((code: string) => {
    setCart(currentCart => {
      const newCoupons = currentCart.appliedCoupons.filter(c => c.code !== code);
      return calculateCartTotals(currentCart.items, newCoupons);
    });
  }, [calculateCartTotals]);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isLoading,
      getCartQuantity,
      applyCoupon,
      removeCoupon
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