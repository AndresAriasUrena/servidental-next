import { Suspense } from 'react';
import ProductGrid from '@/components/ecommerce/product/ProductGrid';
import StoreBenefitsBanner from '@/components/ecommerce/ui/StoreBenefitsBanner';

export const metadata = {
  title: 'Tienda | ServidentalCR - Equipo Médico Dental',
  description: 'Catálogo completo de equipos médicos dentales. 18 años de experiencia en Costa Rica.',
  keywords: 'tienda, equipo médico dental, comprar, servidental, costa rica',
  openGraph: {
    title: 'Tienda ServidentalCR',
    description: 'Catálogo completo de equipos médicos dentales',
    url: 'http://servidentalcr.com/tienda',
    type: 'website'
  }
};

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-full"></div>
        </div>
      ))}
    </div>
  );
}

export default function TiendaPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-4 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 lg:mb-12">
          <h1 className="text-2xl lg:text-4xl font-bold text-servi_dark mb-2 lg:mb-4">
            Tienda ServidentalCR
          </h1>
          <p className="text-sm lg:text-lg text-gray-600 max-w-2xl mx-auto hidden lg:block">
            Descubre nuestro catálogo completo de equipos médicos dentales de
            alta calidad. Con 18 años de experiencia en Costa Rica.
          </p>
        </div>

        <StoreBenefitsBanner />

        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid instanceKey="shop" />
        </Suspense>
      </div>
    </div>
  );
}