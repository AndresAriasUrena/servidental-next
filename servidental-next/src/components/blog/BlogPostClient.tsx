// src/components/blog/BlogPostClient.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { blogService } from '@/services/blogService';
import { BlogPost as BlogPostType, BlogConfig } from '@/types/blog';
import BlogPost from './BlogPost';
import BlogSidebar from './BlogSidebar';

interface BlogPostClientProps {
  slug: string;
}

export default function BlogPostClient({ slug }: BlogPostClientProps) {
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [blogConfig, setBlogConfig] = useState<BlogConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadPostData = async () => {
      try {
        setLoading(true);
        setError(null);

        let postData: BlogPostType | null = null;
        let configData: BlogConfig;

        try {
          postData = await blogService.fetchPostBySlug(slug);
        } catch (postError) {
          console.warn('Failed to load post:', postError);
          
          // Check if it's the demo post
          if (slug === 'mantenimiento-equipos-dentales-guia-completa') {
            postData = {
              id: 1,
              title: { rendered: 'Mantenimiento de Equipos Dentales: Guía Completa' },
              content: { 
                rendered: `
                  <div class="prose max-w-none">
                    <h2>Importancia del Mantenimiento Preventivo</h2>
                    <p>El mantenimiento preventivo de equipos dentales es fundamental para garantizar su funcionamiento óptimo y prolongar su vida útil.</p>
                    <img src="https://via.placeholder.com/600x300" alt="Equipo dental" />
                    <p>Un programa de mantenimiento preventivo adecuado incluye inspecciones regulares, calibración de equipos y reemplazo de componentes desgastados.</p>
                    <h3>Beneficios del Mantenimiento Regular</h3>
                    <ul>
                      <li>Prolonga la vida útil de los equipos</li>
                      <li>Reduce los costos de reparación</li>
                      <li>Garantiza la seguridad del paciente</li>
                      <li>Mantiene la precisión de diagnósticos</li>
                    </ul>
                    <p>En ServiDental, ofrecemos programas completos de mantenimiento preventivo adaptados a las necesidades específicas de cada clínica dental.</p>
                  </div>
                `
              },
              excerpt: { rendered: 'Una guía completa sobre la importancia del mantenimiento preventivo en equipos dentales.' },
              excerpt_plain: 'Una guía completa sobre la importancia del mantenimiento preventivo en equipos dentales.',
              slug: 'mantenimiento-equipos-dentales-guia-completa',
              date: new Date().toISOString(),
              modified: new Date().toISOString(),
              author_details: {
                name: 'ServiDental',
                bio: 'Expertos en equipos médicos dentales',
                avatar: ''
              },
              featured_image_url: 'https://via.placeholder.com/800x400',
              categories: [1],
              tags: [1, 2],
              reading_time: 5,
              link: '/blog/mantenimiento-equipos-dentales-guia-completa',
              status: 'publish'
            };
          }
        }

        if (!postData) {
          setError('Artículo no encontrado');
          return;
        }

        // Load blog config
        try {
          configData = await blogService.fetchBlogConfig();
        } catch (configError) {
          console.warn('Failed to load blog config, using fallback:', configError);
          configData = {
            site_name: 'Blog ServiDental',
            site_description: 'Noticias y artículos sobre equipos médicos dentales',
            posts_per_page: 12,
            categories: [
              { id: 1, name: 'Blog', slug: 'blog', count: 1 },
              { id: 2, name: 'Historia', slug: 'historia', count: 1 }
            ],
            recent_posts: []
          };
        }

        setPost(postData);
        setBlogConfig(configData);
      } catch (error) {
        console.error('Error loading post data:', error);
        setError('Error al cargar el artículo. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    loadPostData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-gray-50 border-b border-gray-200 pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="animate-pulse space-y-4">
                <div className="h-32 bg-gray-300 rounded"></div>
                <div className="h-32 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-gray-400 mb-4">📄</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Artículo no encontrado</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="bg-servi_green text-white px-6 py-2 rounded-lg hover:bg-servi_dark transition-colors"
            >
              Intentar de nuevo
            </button>
            <button
              onClick={() => router.push('/blog')}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Volver al blog
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-gray-400 mb-4">📄</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Artículo no encontrado</h1>
          <p className="text-gray-600 mb-6">El artículo que buscas no existe o ha sido eliminado.</p>
          <div className="space-x-4">
            <button
              onClick={() => router.push('/blog')}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Volver al blog
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Safe filtering of recent posts with defensive checks
  const getFilteredRecentPosts = () => {
    if (!blogConfig?.recent_posts || !Array.isArray(blogConfig.recent_posts)) {
      return [];
    }
    
    return blogConfig.recent_posts
      .filter(p => p && p.id !== post?.id)
      .filter(p => p.title && p.title.rendered && p.slug && p.date)
      .slice(0, 5);
  };

  const getSafeCategories = () => {
    if (!blogConfig?.categories || !Array.isArray(blogConfig.categories)) {
      return [];
    }
    return blogConfig.categories;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-200 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <div>
                  <button onClick={() => router.push('/')} className="text-gray-400 hover:text-gray-500">
                    <svg className="flex-shrink-0 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    <span className="sr-only">Inicio</span>
                  </button>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <button onClick={() => router.push('/blog')} className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                    Blog
                  </button>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-4 text-sm font-medium text-gray-500 truncate" title={post?.title.rendered.replace(/<[^>]*>/g, '')}>
                    {post?.title.rendered.replace(/<[^>]*>/g, '').substring(0, 50)}...
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-3">
            {post && <BlogPost post={post} />}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar 
              categories={getSafeCategories()}
              recentPosts={getFilteredRecentPosts()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}