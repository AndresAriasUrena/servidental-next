'use client';

import { BlogPost } from '@/types/blog';
import BlogCard from './BlogCard';
import { useRouter, useSearchParams } from 'next/navigation';

interface BlogGridProps {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  searchParams: {
    page?: string;
    category?: string;
    search?: string;
  };
}

export default function BlogGrid({
  posts,
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  searchParams
}: BlogGridProps) {
  const router = useRouter();
  const urlSearchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(urlSearchParams.toString());
    params.set('page', page.toString());
    return `/blog?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    router.push(createPageUrl(page));
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No se encontraron artículos
          </h3>
          <p className="text-gray-600">
            {searchParams.search ? 
              'Intenta con otros términos de búsqueda' : 
              'No hay artículos disponibles en este momento'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-12">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!hasPrevPage}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              hasPrevPage
                ? 'bg-white text-servi_green border-servi_green hover:bg-servi_green hover:text-white'
                : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
            }`}
          >
            ← Anterior
          </button>

          {/* Page Numbers */}
          <div className="flex space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              const isActive = pageNum === currentPage;

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-2 rounded-lg border transition-colors ${
                    isActive
                      ? 'bg-servi_green text-white border-servi_green'
                      : 'bg-white text-servi_green border-servi_green hover:bg-servi_green hover:text-white'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!hasNextPage}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              hasNextPage
                ? 'bg-white text-servi_green border-servi_green hover:bg-servi_green hover:text-white'
                : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
            }`}
          >
            Siguiente →
          </button>
        </div>
      )}

      {/* Results Info */}
      <div className="text-center mt-6 text-sm text-gray-500">
        Página {currentPage} de {totalPages}
      </div>
    </div>
  );
}