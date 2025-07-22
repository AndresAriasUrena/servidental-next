'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface MiniCartProps {
  onClose?: () => void;
}

export default function MiniCart({ onClose }: MiniCartProps) {
  const { cart, removeFromCart } = useCart();

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={handleClose}
      />
      
      {/* Mini Cart Dropdown */}
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
                    href="/carrito"
                    onClick={handleClose}
                    className="w-full bg-gray-100 text-gray-900 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-center block"
                  >
                    Ver carrito
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={handleClose}
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
  );
}