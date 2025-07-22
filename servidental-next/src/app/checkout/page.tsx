import { Suspense } from 'react';
import Checkout from '@/components/ecommerce/checkout/Checkout';

export const metadata = {
  title: 'Checkout | ServidentalCR - Finalizar Compra',
  description: 'Finaliza tu compra de equipos médicos dentales de forma segura',
  keywords: 'checkout, pago, comprar, servidental, costa rica',
  openGraph: {
    title: 'Checkout | ServidentalCR',
    description: 'Finaliza tu compra de forma segura',
    url: 'http://servidentalcr.com/checkout',
    type: 'website'
  }
};

function CheckoutSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout form skeleton */}
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
          
          {/* Personal info skeleton */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-full mt-4 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-full mt-4 animate-pulse"></div>
          </div>

          {/* Shipping info skeleton */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Payment skeleton */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Order summary skeleton */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 mt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/6 animate-pulse"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/5 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/6 animate-pulse"></div>
                </div>
                <div className="flex justify-between font-bold">
                  <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-12 bg-gray-200 rounded w-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <Suspense fallback={<CheckoutSkeleton />}>
          <Checkout />
        </Suspense>
      </div>
    </div>
  );
}