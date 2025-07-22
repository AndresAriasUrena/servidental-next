'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';

export function MiniCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart } = useCart();

  return (
    <div className="relative">
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-700 hover:text-servi_green transition-colors"
      >
        <ShoppingBagIcon className="w-6 h-6" />
        {cart.totalQuantity > 0 && (
          <span className="absolute -top-1 -right-1 bg-servi_green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cart.totalQuantity}
          </span>
        )}
      </button>

      {/* Mini Cart Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Carrito ({cart.totalQuantity})
              </h3>
              
              {cart.items.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  Tu carrito está vacío
                </p>
              ) : (
                <>
                  <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded overflow-hidden">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200" />
                          )}
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.quantity} x ₡{item.price.toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-medium text-lg mb-4">
                      <span>Total:</span>
                      <span>₡{cart.total.toLocaleString()}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <Link
                        href="/cart"
                        onClick={() => setIsOpen(false)}
                        className="w-full bg-gray-100 text-gray-900 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-center block"
                      >
                        Ver carrito
                      </Link>
                      <Link
                        href="/checkout"
                        onClick={() => setIsOpen(false)}
                        className="w-full bg-servi_green text-white py-2 px-4 rounded-md hover:bg-servi_dark transition-colors text-center block"
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}