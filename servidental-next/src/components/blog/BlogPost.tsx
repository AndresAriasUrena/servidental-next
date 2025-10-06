// src/components/blog/BlogPost.tsx
'use client';

import Image from 'next/image';
import { BlogPost as BlogPostType } from '@/types/blog';
import { useState, useEffect } from 'react';

interface BlogPostProps {
  post: BlogPostType;
}

export default function BlogPost({ post }: BlogPostProps) {
  const [readingProgress, setReadingProgress] = useState(0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Reading progress calculation
  useEffect(() => {
    const calculateReadingProgress = () => {
      const article = document.querySelector('[data-blog-content]') as HTMLElement;
      if (!article) return;

      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      const articleBottom = articleTop + articleHeight;
      const viewportBottom = scrollTop + viewportHeight;

      if (scrollTop < articleTop) {
        setReadingProgress(0);
      } else if (viewportBottom > articleBottom) {
        setReadingProgress(100);
      } else {
        const progress = ((scrollTop - articleTop) / (articleHeight - viewportHeight)) * 100;
        setReadingProgress(Math.min(Math.max(progress, 0), 100));
      }
    };

    window.addEventListener('scroll', calculateReadingProgress);
    calculateReadingProgress();

    return () => window.removeEventListener('scroll', calculateReadingProgress);
  }, []);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(post.title.rendered.replace(/<[^>]*>/g, ''));
  const encodedSummary = encodeURIComponent(post.excerpt_plain || 'Artículo del blog de ServiDental sobre equipos médicos dentales.');

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-servi_green transition-all duration-100"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <article className="max-w-none wp-block-content" data-blog-content>
        {/* Featured Image */}
        {post.featured_image_url && (
          <div className="relative h-96 mb-8 rounded-xl overflow-hidden">
            <Image
              src={post.featured_image_url}
              alt={post.title.rendered.replace(/<[^>]*>/g, '')}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h1 
                className="text-4xl font-bold mb-2"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
            </div>
          </div>
        )}

        {/* Article Header */}
        {!post.featured_image_url && (
          <header className="mb-8">
            <h1 
              className="text-4xl font-bold text-gray-900 mb-4"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          </header>
        )}

        {/* Article Meta */}
        <div className="flex items-center justify-between mb-8 p-6 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4">
            {post.author_details.avatar && (
              <Image
                src={post.author_details.avatar}
                alt={post.author_details.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
            <div>
              <p className="font-semibold text-gray-900">{post.author_details.name}</p>
              <p className="text-sm text-gray-500">
                {formatDate(post.date)} • {post.reading_time} min de lectura
              </p>
            </div>
          </div>
          {/* Share Buttons */}
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">Compartir:</span>
            <div className="flex space-x-2">
              {/* WhatsApp */}
              <button 
                onClick={() => {
                  window.open(`https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`, '_blank');
                }}
                className="p-2 text-green-500 hover:text-green-600 transition-colors rounded-full hover:bg-green-50"
                aria-label="Compartir en WhatsApp"
                title="Compartir en WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </button>
              
              {/* Facebook */}
              <button 
                onClick={() => {
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
                }}
                className="p-2 text-blue-600 hover:text-blue-700 transition-colors rounded-full hover:bg-blue-50"
                aria-label="Compartir en Facebook"
                title="Compartir en Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>

              {/* LinkedIn */}
              <button 
                onClick={() => {
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedSummary}`, '_blank');
                }}
                className="p-2 text-blue-700 hover:text-blue-800 transition-colors rounded-full hover:bg-blue-50"
                aria-label="Compartir en LinkedIn"
                title="Compartir en LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Article Content with improved Tailwind Typography */}
        <div 
          className="
            prose prose-lg max-w-none mb-12
            prose-headings:text-servi_dark prose-headings:font-bold prose-headings:tracking-tight
            prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8
            prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8
            prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-6
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-servi_green prose-a:no-underline hover:prose-a:text-servi_dark hover:prose-a:underline
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-ul:my-6 prose-ol:my-6
            prose-li:mb-2 prose-li:text-gray-700
            prose-blockquote:border-l-4 prose-blockquote:border-servi_green prose-blockquote:bg-servi_light prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:italic
            prose-img:rounded-xl prose-img:shadow-md prose-img:mx-auto prose-img:my-8
            prose-table:my-8
            prose-thead:bg-servi_green
            prose-th:text-white prose-th:font-semibold
            prose-td:border prose-td:border-gray-300
          "
        >
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </div>

        {/* Author Bio */}
        {post.author_details.bio && (
          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="flex items-start space-x-4">
              {post.author_details.avatar && (
                <Image
                  src={post.author_details.avatar}
                  alt={post.author_details.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Sobre {post.author_details.name}
                </h3>
                <p className="text-gray-600">{post.author_details.bio}</p>
              </div>
            </div>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-r from-servi_green to-servi_dark rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            ¿Necesitas ayuda con tus equipos dentales?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Nuestros expertos están listos para brindarte el mejor servicio
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-servi_green px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contáctanos
          </a>
        </div>
      </article>
    </>
  );
}