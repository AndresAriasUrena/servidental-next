import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import ProductDetails from '@/components/ecommerce/product/ProductDetails';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  // In a real implementation, you would fetch the product data here
  return {
    title: `Producto ${params.slug} | ServidentalCR`,
    description: `Detalles del producto ${params.slug} - Equipo médico dental de calidad`,
    keywords: `${params.slug}, equipo médico dental, servidental, costa rica`,
    openGraph: {
      title: `Producto ${params.slug} | ServidentalCR`,
      description: `Detalles del producto ${params.slug}`,
      type: 'product'
    }
  };
}

function ProductDetailsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image skeleton */}
        <div className="space-y-4">
          <div className="w-full h-96 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full h-20 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Product info skeleton */}
        <div className="space-y-6">
          <div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          </div>

          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
          </div>

          <div className="h-12 bg-gray-200 rounded w-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails slug={params.slug} />
      </Suspense>
    </div>
  );
}