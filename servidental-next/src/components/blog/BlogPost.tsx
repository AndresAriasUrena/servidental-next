'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { BlogPost as BlogPostType } from '@/types/blog';

interface BlogPostProps {
  post: BlogPostType;
}

export default function BlogPost({ post }: BlogPostProps) {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector('article');
      if (!article) return;

      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const progress = Math.min(
        Math.max((scrollY - articleTop + windowHeight) / articleHeight, 0),
        1
      );

      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(post.title.rendered.replace(/<[^>]*>/g, ''));

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-servi_green transition-all duration-100"
          style={{ width: `${readingProgress * 100}%` }}
        />
      </div>

      <article className="max-w-none">
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
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <time dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
                <span>•</span>
                <span>{post.reading_time} min de lectura</span>
              </div>
            </div>
          </div>

          {/* Social Share */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 mr-2">Compartir:</span>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
              aria-label="Compartir en Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              aria-label="Compartir en Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-blue-700 transition-colors"
              aria-label="Compartir en LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: post.title.rendered.replace(/<[^>]*>/g, ''),
                    url: shareUrl
                  });
                } else {
                  navigator.clipboard.writeText(shareUrl);
                  alert('Enlace copiado al portapapeles');
                }
              }}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Copiar enlace"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none mb-12"
          style={{
            '--tw-prose-body': '#374151',
            '--tw-prose-headings': '#1f2937',
            '--tw-prose-lead': '#4b5563',
            '--tw-prose-links': '#037971',
            '--tw-prose-bold': '#1f2937',
            '--tw-prose-counters': '#6b7280',
            '--tw-prose-bullets': '#d1d5db',
            '--tw-prose-hr': '#e5e7eb',
            '--tw-prose-quotes': '#1f2937',
            '--tw-prose-quote-borders': '#e5e7eb',
            '--tw-prose-captions': '#6b7280',
            '--tw-prose-code': '#1f2937',
            '--tw-prose-pre-code': '#e5e7eb',
            '--tw-prose-pre-bg': '#1f2937',
            '--tw-prose-th-borders': '#d1d5db',
            '--tw-prose-td-borders': '#e5e7eb',
          } as any}
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