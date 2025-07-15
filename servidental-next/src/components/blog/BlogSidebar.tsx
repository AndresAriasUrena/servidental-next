'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { BlogCategory, BlogPost } from '@/types/blog';

interface BlogSidebarProps {
  categories: BlogCategory[];
  recentPosts: BlogPost[];
  currentSearch?: string;
  currentCategory?: string;
}

export default function BlogSidebar({ 
  categories, 
  recentPosts, 
  currentSearch = '',
  currentCategory 
}: BlogSidebarProps) {
  const [searchQuery, setSearchQuery] = useState(currentSearch);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    } else {
      params.delete('search');
    }
    
    params.delete('page'); // Reset to first page
    router.push(`/blog?${params.toString()}`);
  };

  const handleCategoryClick = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (currentCategory === categorySlug) {
      params.delete('category');
    } else {
      params.set('category', categorySlug);
    }
    
    params.delete('page'); // Reset to first page
    router.push(`/blog?${params.toString()}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Search Box */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Buscar Artículos</h3>
        <form onSubmit={handleSearch} className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en el blog..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-servi_green focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-servi_green hover:text-servi_dark"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          {currentSearch && (
            <div className="text-sm text-gray-600">
              Buscando: &quot;{currentSearch}&quot;
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete('search');
                  params.delete('page');
                  router.push(`/blog?${params.toString()}`);
                }}
                className="ml-2 text-servi_green hover:text-servi_dark"
              >
                Limpiar
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Categorías</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.slug)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                  currentCategory === category.slug
                    ? 'bg-servi_green text-white'
                    : 'hover:bg-servi_light text-gray-700 hover:text-servi_dark'
                }`}
              >
                <span className="font-medium">{category.name}</span>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  currentCategory === category.slug
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
          
          {currentCategory && (
            <button
              onClick={() => handleCategoryClick(currentCategory)}
              className="w-full mt-3 text-sm text-servi_green hover:text-servi_dark"
            >
              Ver todas las categorías
            </button>
          )}
        </div>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Artículos Recientes</h3>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <article key={post.id} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex space-x-3">
                    {/* Thumbnail */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                        {post.featured_image_url ? (
                          <Image
                            src={post.featured_image_url}
                            alt={post.title.rendered}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-servi_light to-gray-100 flex items-center justify-center">
                            <svg className="w-6 h-6 text-servi_green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-servi_green transition-colors line-clamp-2 mb-1">
                        <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                      </h4>
                      <div className="flex items-center text-xs text-gray-500">
                        <time dateTime={post.date}>
                          {formatDate(post.date)}
                        </time>
                        <span className="mx-1">•</span>
                        <span>{post.reading_time} min</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Contact CTA */}
      <div className="bg-gradient-to-br from-servi_green to-servi_dark rounded-xl p-6 text-white">
        <h3 className="text-lg font-bold mb-2">¿Necesitas Asesoría?</h3>
        <p className="text-sm text-gray-100 mb-4">
          Nuestros expertos están listos para ayudarte con tus equipos dentales.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-servi_green px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Contáctanos
        </Link>
      </div>
    </div>
  );
}