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
                    <p>El mantenimiento preventivo de equipos dentales es fundamental para garantizar su funcionamiento óptimo y prolongar su vida útil. En ServiDental, con más de 18 años de experiencia en el mercado costarricense, hemos desarrollado protocolos especializados para el cuidado de equipos médicos dentales.</p>
                    
                    <h3>Beneficios del Mantenimiento Regular</h3>
                    <ul>
                      <li><strong>Reducción de costos:</strong> Previene reparaciones costosas y reemplazos prematuros</li>
                      <li><strong>Seguridad del paciente:</strong> Garantiza el funcionamiento seguro de los equipos</li>
                      <li><strong>Eficiencia operativa:</strong> Minimiza el tiempo de inactividad</li>
                      <li><strong>Cumplimiento normativo:</strong> Asegura el cumplimiento de estándares sanitarios</li>
                    </ul>

                    <h3>Equipos que Requieren Mantenimiento Especializado</h3>
                    <p>Nuestros servicios de mantenimiento cubren una amplia gama de equipos:</p>
                    <ul>
                      <li>Unidades dentales</li>
                      <li>Compresores y sistemas de vacío</li>
                      <li>Equipos de rayos X</li>
                      <li>Autoclaves y equipos de esterilización</li>
                      <li>Piezas de mano y motores</li>
                    </ul>

                    <h3>Programa de Mantenimiento ServiDental</h3>
                    <p>En ServiDental ofrecemos programas de mantenimiento personalizados que incluyen:</p>
                    <ul>
                      <li>Inspecciones regulares programadas</li>
                      <li>Limpieza y lubricación especializada</li>
                      <li>Calibración de equipos</li>
                      <li>Reemplazo de piezas de desgaste</li>
                      <li>Certificaciones de funcionamiento</li>
                    </ul>

                    <h3>Contacta con Nuestros Expertos</h3>
                    <p>Para más información sobre nuestros servicios de mantenimiento, contacta con nuestro equipo de especialistas. Estamos aquí para ayudarte a mantener tus equipos en óptimas condiciones.</p>
                  </div>
                `
              },
              excerpt: { rendered: '<p>Descubre las mejores prácticas para el mantenimiento de tus equipos dentales y cómo prolongar su vida útil.</p>' },
              excerpt_plain: 'Descubre las mejores prácticas para el mantenimiento de tus equipos dentales y cómo prolongar su vida útil.',
              slug: 'mantenimiento-equipos-dentales-guia-completa',
              date: new Date().toISOString(),
              modified: new Date().toISOString(),
              author_details: {
                name: 'Equipo ServiDental',
                bio: 'Especialistas en equipos médicos dentales con más de 18 años de experiencia',
                avatar: ''
              },
              featured_image_url: null,
              categories: [1],
              tags: [1, 2],
              reading_time: 8,
              link: '',
              status: 'publish'
            };
          }
        }

        try {
          configData = await blogService.fetchBlogConfig();
        } catch (configError) {
          console.warn('Failed to load blog config:', configError);
          configData = {
            site_name: 'Blog ServiDental',
            site_description: 'Noticias y artículos sobre equipos médicos dentales',
            posts_per_page: 12,
            categories: [
              { id: 1, name: 'Mantenimiento', slug: 'mantenimiento', count: 1 },
              { id: 2, name: 'Equipos Dentales', slug: 'equipos-dentales', count: 1 }
            ],
            recent_posts: []
          };
        }

        if (!postData) {
          setError('not-found');
          return;
        }

        setPost(postData);
        setBlogConfig(configData);

      } catch (err) {
        console.error('Error loading post data:', err);
        setError('Error al cargar el artículo');
      } finally {
        setLoading(false);
      }
    };

    loadPostData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="animate-pulse flex space-x-4">
              <div className="h-4 bg-gray-300 rounded w-20"></div>
              <div className="h-4 bg-gray-300 rounded w-4"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
              <div className="h-4 bg-gray-300 rounded w-4"></div>
              <div className="h-4 bg-gray-300 rounded w-40"></div>
            </div>
          </div>
        </div>

        {/* Loading Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4 mb-6"></div>
                <div className="h-64 bg-gray-300 rounded mb-6"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="animate-pulse space-y-4">
                <div className="h-32 bg-gray-300 rounded"></div>
                <div className="h-48 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error === 'not-found') {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Artículo no encontrado
              </h3>
              <p className="text-gray-600 mb-4">
                El artículo que buscas no existe o ha sido removido.
              </p>
              <button 
                onClick={() => router.push('/blog')}
                className="bg-servi_green text-white px-6 py-2 rounded-lg hover:bg-servi_dark transition-colors"
              >
                Volver al blog
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <div className="max-w-md mx-auto bg-red-50 rounded-lg p-8">
              <div className="text-red-500 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Error al cargar el artículo
              </h2>
              <p className="text-gray-600 mb-4">
                {error}
              </p>
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
        </div>
      </div>
    );
  }

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
            {blogConfig && (
              <BlogSidebar 
                categories={blogConfig.categories}
                recentPosts={blogConfig.recent_posts.filter(p => p.id !== post?.id)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}