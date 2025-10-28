import { Suspense } from 'react';
import { Metadata } from 'next';
import BlogClient from '@/components/blog/BlogClient';
import BlackNovemberBanner from '@/components/home/BlackNovemberBanner';

export const metadata: Metadata = {
  title: 'Blog | ServiDental',
  description: 'Noticias, artículos y novedades',
};

// Loading component para el suspense
function BlogLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-gradient_gray to-gradient_green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Blog ServiDental
            </h1>
            <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
              Cargando artículos...
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <>
      <BlackNovemberBanner />
      <Suspense fallback={<BlogLoading />}>
        <BlogClient />
      </Suspense>
    </>
  );
}