'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/currency';
import { XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

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
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      <div className="fixed inset-0 z-50 lg:absolute lg:inset-auto lg:right-0 lg:top-full lg:mt-3 lg:w-96">
        <div className="h-full bg-white lg:h-auto lg:max-h-[85vh] lg:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom lg:slide-in-from-top-2 duration-200">
          <div className="bg-gradient-to-r from-servi_green to-servi_dark px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Mi Carrito
              </h3>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 text-white text-sm px-3 py-1 rounded-full font-medium">
                  {cart.totalQuantity} {cart.totalQuantity === 1 ? 'artículo' : 'artículos'}
                </div>
                <button
                  onClick={handleClose}
                  className="text-white/80 hover:text-white transition-colors p-1"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto max-h-[calc(85vh-180px)] lg:max-h-[60vh]">
            {cart.items.length === 0 ? (
              <div className="text-center py-12 px-6 lg:py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBagIcon className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium mb-2">Tu carrito está vacío</p>
                <p className="text-sm text-gray-400">Agrega productos para comenzar</p>
              </div>
            ) : (
              <div className="p-4 lg:p-4">
                <div className="space-y-4">
                  {cart.items.map((item, index) => (
                    <div 
                      key={item.id} 
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors animate-in slide-in-from-left duration-200"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex-shrink-0 w-16 h-16 lg:w-14 lg:h-14 bg-white rounded-lg overflow-hidden border border-gray-200">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <ShoppingBagIcon className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-grow min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1 leading-tight">
                          {item.name}
                        </h4>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            Cantidad: <span className="font-medium text-servi_green">{item.quantity}</span>
                          </div>
                          <div className="text-sm font-bold text-gray-900">
                            {formatPrice(item.subtotal)}
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex-shrink-0 w-9 h-9 lg:w-8 lg:h-8 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {cart.items.length > 0 && (
            <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 lg:py-4">
              {/* Show discount if applied */}
              {cart.discount > 0 && (
                <div className="space-y-1 mb-3 pb-3 border-b border-gray-200">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal:</span>
                    <span>{formatPrice(cart.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600 font-medium">
                    <span>Descuento:</span>
                    <span>-{formatPrice(cart.discount)}</span>
                  </div>
                </div>
              )}
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-xl font-bold text-servi_green">
                  {formatPrice(cart.total)}
                </span>
              </div>
              
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <Link
                  href="/carrito"
                  onClick={handleClose}
                  className="bg-white text-gray-700 border border-gray-200 py-3 px-4 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-center font-medium text-sm hover:shadow-sm order-2 lg:order-1"
                >
                  Ver carrito
                </Link>
                <Link
                  href="/checkout"
                  onClick={handleClose}
                  className="bg-servi_green text-white py-3 px-4 rounded-xl hover:bg-servi_dark transition-all duration-200 text-center font-medium text-sm hover:shadow-lg hover:scale-105 transform order-1 lg:order-2"
                >
                  Finalizar compra
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}