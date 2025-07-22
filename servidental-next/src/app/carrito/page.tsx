import { Suspense } from 'react';
import Cart from '@/components/ecommerce/cart/Cart';

export const metadata = {
  title: 'Carrito de Compras | ServidentalCR',
  description: 'Revisa y gestiona los productos en tu carrito de compras',
  keywords: 'carrito, compras, servidental, checkout, costa rica',
  openGraph: {
    title: 'Carrito de Compras | ServidentalCR',
    description: 'Revisa y gestiona los productos en tu carrito',
    url: 'http://servidentalcr.com/carrito',
    type: 'website'
  }
};

function CartSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items skeleton */}
        <div className="lg:col-span-2">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order summary skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="h-12 bg-gray-200 rounded w-full mt-6 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CarritoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <Suspense fallback={<CartSkeleton />}>
          <Cart />
        </Suspense>
      </div>
    </div>
  );
}