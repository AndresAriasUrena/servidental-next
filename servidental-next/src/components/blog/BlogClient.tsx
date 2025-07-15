'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { blogService } from '@/services/blogService';
import { BlogPost, BlogConfig, BlogSearchParams } from '@/types/blog';
import BlogGrid from './BlogGrid';
import BlogSidebar from './BlogSidebar';

export default function BlogClient() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [blogConfig, setBlogConfig] = useState<BlogConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    total: 0
  });

  // Get current search parameters
  const currentParams: BlogSearchParams = {
    page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
    category: searchParams.get('category') || undefined,
    search: searchParams.get('search') || undefined,
  };

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load posts and config separately to handle errors independently
        let postsResponse;
        let configResponse;

        try {
          postsResponse = await blogService.fetchPosts(currentParams);
        } catch (postsError) {
          console.warn('Failed to load posts:', postsError);
          // Create empty posts response as fallback
          postsResponse = {
            posts: [],
            total: 0,
            totalPages: 1,
            currentPage: 1,
            hasNextPage: false,
            hasPrevPage: false
          };
        }

        try {
          configResponse = await blogService.fetchBlogConfig();
        } catch (configError) {
          console.warn('Failed to load blog config:', configError);
          // Create minimal config as fallback
          configResponse = {
            site_name: 'Blog ServiDental',
            site_description: 'Noticias y artículos sobre equipos médicos dentales',
            posts_per_page: 12,
            categories: [],
            recent_posts: []
          };
        }

        setPosts(postsResponse.posts);
        setPagination({
          currentPage: postsResponse.currentPage,
          totalPages: postsResponse.totalPages,
          hasNextPage: postsResponse.hasNextPage,
          hasPrevPage: postsResponse.hasPrevPage,
          total: postsResponse.total
        });
        setBlogConfig(configResponse);

        // If both posts and config failed, add demo content
        if (postsResponse.posts.length === 0 && postsResponse.total === 0) {
          const demoPost: BlogPost = {
            id: 1,
            title: { rendered: 'Mantenimiento de Equipos Dentales: Guía Completa' },
            content: { rendered: '<p>El mantenimiento preventivo de equipos dentales es fundamental para garantizar su funcionamiento óptimo y prolongar su vida útil...</p>' },
            excerpt: { rendered: '<p>Descubre las mejores prácticas para el mantenimiento de tus equipos dentales y cómo prolongar su vida útil.</p>' },
            excerpt_plain: 'Descubre las mejores prácticas para el mantenimiento de tus equipos dentales y cómo prolongar su vida útil.',
            slug: 'mantenimiento-equipos-dentales-guia-completa',
            date: new Date().toISOString(),
            modified: new Date().toISOString(),
            author_details: {
              name: 'Equipo ServiDental',
              bio: 'Especialistas en equipos médicos dentales',
              avatar: ''
            },
            featured_image_url: null,
            categories: [1],
            tags: [1, 2],
            reading_time: 5,
            link: '',
            status: 'publish'
          };

          postsResponse = {
            posts: [demoPost],
            total: 1,
            totalPages: 1,
            currentPage: 1,
            hasNextPage: false,
            hasPrevPage: false
          };

          configResponse.categories = [
            { id: 1, name: 'Mantenimiento', slug: 'mantenimiento', count: 1 },
            { id: 2, name: 'Equipos Dentales', slug: 'equipos-dentales', count: 1 }
          ];
          configResponse.recent_posts = [demoPost];

          setPosts(postsResponse.posts);
          setPagination({
            currentPage: postsResponse.currentPage,
            totalPages: postsResponse.totalPages,
            hasNextPage: postsResponse.hasNextPage,
            hasPrevPage: postsResponse.hasPrevPage,
            total: postsResponse.total
          });
          setBlogConfig(configResponse);
          
          setError('Modo de demostración: No se pudo conectar con el servidor del blog. Mostrando contenido de ejemplo.');
        }

      } catch (err) {
        console.error('Error loading blog data:', err);
        setError('Error al cargar el contenido del blog. Por favor, intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    loadBlogData();
  }, [searchParams]); // Re-run when search params change

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-servi_green to-servi_dark py-16 lg:py-24">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Blog ServiDental
              </h1>
              <p className="text-xl lg:text-2xl text-gray-100 max-w-3xl mx-auto">
                Noticias y artículos sobre equipos médicos dentales
              </p>
              <div className="mt-8 text-lg text-gray-200">
                18 años de experiencia compartiendo conocimiento dental
              </div>
            </div>
          </div>
        </section>

        {/* Loading State */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
                    <div className="h-48 bg-gray-300"></div>
                    <div className="p-6">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-6 bg-gray-300 rounded mb-3"></div>
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 animate-pulse">
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="space-y-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-4 bg-gray-300 rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-servi_green to-servi_dark py-16 lg:py-24">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Blog ServiDental
              </h1>
            </div>
          </div>
        </section>

        {/* Error State */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <div className="max-w-md mx-auto bg-red-50 rounded-lg p-8">
              <div className="text-red-500 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Error al cargar el blog
              </h2>
              <p className="text-gray-600 mb-4">
                {error}
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-servi_green text-white px-6 py-2 rounded-lg hover:bg-servi_dark transition-colors"
              >
                Intentar de nuevo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-servi_green to-servi_dark py-16 lg:py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Blog ServiDental
            </h1>
            <p className="text-xl lg:text-2xl text-gray-100 max-w-3xl mx-auto">
              {blogConfig?.site_description || 'Noticias y artículos sobre equipos médicos dentales'}
            </p>
            <div className="mt-8 text-lg text-gray-200">
              18 años de experiencia compartiendo conocimiento dental
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Demo Mode Notice */}
            {error && error.includes('Modo de demostración') && (
              <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-blue-700 text-sm">
                    <strong>Modo de demostración:</strong> El blog se está ejecutando con contenido de ejemplo mientras no esté disponible la conexión al servidor.
                  </p>
                </div>
              </div>
            )}

            {/* Search Results Header */}
            {(currentParams.search || currentParams.category) && (
              <div className="mb-8 p-6 bg-servi_light rounded-lg border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {currentParams.search && (
                    <>Resultados para: &quot;{currentParams.search}&quot;</>
                  )}
                  {currentParams.category && !currentParams.search && (
                    <>Categoría: {currentParams.category}</>
                  )}
                </h2>
                <p className="text-gray-600">
                  {pagination.total} {pagination.total === 1 ? 'artículo encontrado' : 'artículos encontrados'}
                </p>
              </div>
            )}

            {/* Blog Grid */}
            <BlogGrid 
              posts={posts}
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              hasNextPage={pagination.hasNextPage}
              hasPrevPage={pagination.hasPrevPage}
              searchParams={{
                page: currentParams.page?.toString(),
                category: currentParams.category,
                search: currentParams.search
              }}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {blogConfig && (
              <BlogSidebar 
                categories={blogConfig.categories}
                recentPosts={blogConfig.recent_posts}
                currentSearch={currentParams.search}
                currentCategory={currentParams.category}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}