'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateExcerpt = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <article className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Featured Image */}
      <div className="relative h-48 overflow-hidden">
        {post.featured_image_url ? (
          <Image
            src={post.featured_image_url}
            alt={post.title.rendered}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-servi_light to-gray-100 flex items-center justify-center">
            <div className="text-servi_green">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          </div>
        )}
        
        {/* Reading Time Badge */}
        <div className="absolute top-3 right-3 bg-servi_green text-white px-3 py-1 rounded-full text-sm font-medium">
          {post.reading_time} min
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-servi_dark">{post.author_details.name}</span>
          </div>
          <time dateTime={post.date}>
            {formatDate(post.date)}
          </time>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-servi_green transition-colors">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {truncateExcerpt(post.excerpt_plain)}
        </p>

        {/* Categories Badge (if available) */}
        {post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.slice(0, 2).map((categoryId) => (
              <span
                key={categoryId}
                className="inline-block bg-servi_light text-servi_dark px-3 py-1 rounded-full text-xs font-medium"
              >
                Categoría {categoryId}
              </span>
            ))}
          </div>
        )}

        {/* Read More Button */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-servi_green font-semibold hover:text-servi_dark transition-colors group"
        >
          Leer más
          <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}