// Server Component para renderizar post de blog
import Link from 'next/link';
import Image from 'next/image';

interface BlogPostServerProps {
  post: any; // WordPress post object
}

export default function BlogPostServer({ post }: BlogPostServerProps) {
  // Extraer datos del post
  const title = post.title?.rendered || '';
  const content = post.content?.rendered || '';
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const author = post._embedded?.author?.[0];
  const authorName = author?.name || 'ServiDental';
  const date = post.date ? new Date(post.date).toLocaleDateString('es-CR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-200 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-400 hover:text-gray-500">
                  <svg className="flex-shrink-0 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span className="sr-only">Inicio</span>
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link href="/blog" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                    Blog
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-4 text-sm font-medium text-gray-500 truncate" title={title.replace(/<[^>]*>/g, '')}>
                    {title.replace(/<[^>]*>/g, '').substring(0, 50)}...
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Image */}
        {featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <Image
              src={featuredImage}
              alt={title.replace(/<[^>]*>/g, '')}
              width={1200}
              height={630}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}

        {/* Title */}
        <h1
          className="text-4xl font-bold text-gray-900 mb-4"
          dangerouslySetInnerHTML={{ __html: title }}
        />

        {/* Meta */}
        <div className="flex items-center text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
          <span className="font-medium text-gray-700">{authorName}</span>
          <span className="mx-2">•</span>
          <time dateTime={post.date}>{date}</time>
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none
            prose-headings:text-gray-900 prose-headings:font-bold
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-servi_green prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-lg prose-img:shadow-md
            prose-strong:text-gray-900
            prose-ul:list-disc prose-ul:pl-6
            prose-ol:list-decimal prose-ol:pl-6
            prose-li:text-gray-700"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </div>
  );
}
