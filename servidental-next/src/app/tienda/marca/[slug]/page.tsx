import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import ProductGrid from '@/components/ecommerce/product/ProductGrid';

interface BrandPageProps {
  params: {
    slug: string;
  };
}

// ============================================
// FUNCIÓN AUXILIAR PARA OBTENER MARCA
// ============================================
async function getBrandBySlug(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/woocommerce/brands`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Revalidar cada 10 minutos
      next: { revalidate: 600 }
    });

    if (!response.ok) {
      console.error('[Brand Page] Failed to fetch brands');
      return null;
    }

    const result = await response.json();
    const brands = result.data || [];

    const brand = brands.find((b: any) => b.slug === slug);
    return brand || null;
  } catch (error) {
    console.error('[Brand Page] Error fetching brand:', error);
    return null;
  }
}

// ============================================
// METADATA
// ============================================
export async function generateMetadata({ params }: BrandPageProps) {
  const brand = await getBrandBySlug(params.slug);

  if (!brand) {
    return {
      title: 'Marca no encontrada | ServidentalCR',
    };
  }

  return {
    title: `${brand.name} - Productos | ServidentalCR`,
    description: `Explora todos los productos de ${brand.name} disponibles en ServidentalCR. Equipo médico dental de calidad para profesionales en Costa Rica.`,
    openGraph: {
      title: `${brand.name} - Productos | ServidentalCR`,
      description: `Explora todos los productos de ${brand.name} disponibles en ServidentalCR.`,
      type: 'website',
    },
  };
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default async function BrandPage({ params }: BrandPageProps) {
  const brand = await getBrandBySlug(params.slug);

  if (!brand) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de la marca */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-servi_dark mb-2">
                {brand.name}
              </h1>
              <p className="text-gray-600">
                {brand.count} {brand.count === 1 ? 'producto disponible' : 'productos disponibles'}
              </p>
            </div>
          </div>
        </div>

        {/* Grilla de productos con filtro aplicado */}
        <Suspense fallback={<ProductGridSkeleton />}>
          <BrandProductGrid brandSlug={params.slug} />
        </Suspense>
      </div>
    </main>
  );
}

// ============================================
// COMPONENTE CLIENT PARA GRILLA
// ============================================
function BrandProductGrid({ brandSlug }: { brandSlug: string }) {
  // El ProductGrid es 'use client', así que podemos usarlo con filtros iniciales
  // mediante la URL - pero para pasar filtros directamente usamos un wrapper
  return (
    <div>
      <ProductGrid
        instanceKey={`brand-${brandSlug}`}
        showFilters={true}
      />
    </div>
  );
}

// ============================================
// SKELETON LOADING
// ============================================
function ProductGridSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters skeleton */}
      <div className="hidden lg:block w-full lg:w-1/4">
        <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-6 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Products grid skeleton */}
      <div className="flex-1">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
