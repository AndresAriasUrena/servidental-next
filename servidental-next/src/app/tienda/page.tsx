import { Suspense } from 'react';
import ProductGrid from '@/components/ecommerce/product/ProductGrid';
import StoreBenefitsBanner from '@/components/ecommerce/ui/StoreBenefitsBanner';
import BlackNovemberBanner from '@/components/home/BlackNovemberBanner';
import PageBanner from '@/components/common/PageBanner';
import tiendaDesktop from '@/assets/banners/tienda-desktop.avif';
import tiendaMobile from '@/assets/banners/tienda-mobile.avif';
import promoDesktop from '@/assets/banners/promo-independencia-desktop.avif';
import promoMobile from '@/assets/banners/promo-independencia-mobile.avif';
import { isIndependenciaActive } from '@/utils/promo';

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
  // Durante la Promoción de Independencia (14-30 set) se muestra su banner;
  // fuera de ese rango, el banner normal de la tienda.
  const promoActive = isIndependenciaActive();

  return (
    <div className="min-h-screen bg-gray-50 py-4 lg:py-8">
      <BlackNovemberBanner />
      {/* Banner de la tienda (decorativo). Cambia a la promo cuando está activa. */}
      <PageBanner
        desktop={promoActive ? promoDesktop : tiendaDesktop}
        mobile={promoActive ? promoMobile : tiendaMobile}
        alt={promoActive ? 'Promoción de Independencia — 20% de descuento por transferencia' : 'Tienda en línea ServiDental'}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center pt-8 lg:pt-12 mb-6 lg:mb-12">
          <p className="text-sm lg:text-lg text-gray-600 max-w-2xl mx-auto hidden lg:block">
            Descubra nuestra gama de equipos dentales. Respaldo y experiencia
            desde el 2007 en Costa Rica.
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