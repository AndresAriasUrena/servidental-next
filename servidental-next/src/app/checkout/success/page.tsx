import { Suspense } from 'react';
import CheckoutSuccess from '@/components/ecommerce/checkout/CheckoutSuccess';

export const metadata = {
  title: 'Pago Exitoso | ServidentalCR',
  description: 'Tu pago ha sido procesado exitosamente',
  keywords: 'pago exitoso, confirmación, servidental, costa rica',
  openGraph: {
    title: 'Pago Exitoso | ServidentalCR',
    description: 'Tu pago ha sido procesado exitosamente',
    url: 'http://servidentalcr.com/checkout/success',
    type: 'website'
  }
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <Suspense fallback={
          <div className="max-w-2xl mx-auto px-4 py-16 text-center">
            <div className="animate-pulse">
              <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        }>
          <CheckoutSuccess />
        </Suspense>
      </div>
    </div>
  );
} 