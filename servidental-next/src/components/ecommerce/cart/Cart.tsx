'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/currency';
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

export function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, isLoading } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Tu carrito está vacío
        </h2>
        <p className="text-gray-600 mb-8">
          Agrega algunos productos para comenzar tu compra
        </p>
        <Link
          href="/tienda"
          className="bg-servi_green text-white px-6 py-3 rounded-md hover:bg-servi_dark transition-colors"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Carrito de compras
        </h1>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Vaciar carrito
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 bg-white border border-gray-200 rounded-lg p-4"
            >
              {/* Product Image */}
              <div className="flex-shrink-0 w-20 h-20 bg-gray-50 rounded-lg overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Sin imagen
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-grow">
                <h3 className="font-medium text-gray-900">
                  <Link href={`/tienda/${item.slug}`} className="hover:text-servi_green">
                    {item.name}
                  </Link>
                </h3>
                {item.sku && (
                  <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                )}
                <p className="text-sm text-gray-600">
                  {formatPrice(item.price)} c/u
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={isLoading}
                  className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={isLoading}
                  className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Item Total */}
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  {formatPrice(item.subtotal)}
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                disabled={isLoading}
                className="p-1 text-red-500 hover:text-red-700 disabled:opacity-50"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Resumen del pedido
            </h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({cart.totalQuantity} artículos)</span>
                <span>{formatPrice(cart.total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Envío</span>
                <span>Por calcular</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-servi_green text-white py-3 px-4 rounded-md hover:bg-servi_dark transition-colors text-center block"
            >
              Proceder al checkout
            </Link>
            
            <Link
              href="/products"
              className="w-full text-center text-servi_green hover:text-servi_dark mt-4 block"
            >
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}