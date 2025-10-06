import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostServer from '@/components/blog/BlogPostServer';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Fetch post en server component
async function getPostBySlug(slug: string) {
  try {
    const WP_URL = process.env.WOOCOMMERCE_URL || process.env.WORDPRESS_BASE_URL || 'https://wp.servidentalcr.com';
    const url = `${WP_URL}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=true&status=publish`;

    const res = await fetch(url, {
      next: { revalidate: 60 }, // Cache 60 segundos
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('WordPress API error:', res.status, text);
      return null;
    }

    const posts = await res.json();
    return posts && posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post no encontrado - Blog ServiDental',
      description: 'El post solicitado no existe.',
    };
  }

  const title = post.title?.rendered || `${slug} - Blog ServiDental`;
  const description = post.excerpt?.rendered?.replace(/<[^>]*>/g, '').trim() || '';
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return {
    title,
    description,
    alternates: {
      canonical: `https://servidentalcr.com/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://servidentalcr.com/blog/${slug}`,
      images: featuredImage ? [featuredImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: featuredImage ? [featuredImage] : [],
    },
  };
}

// Deshabilitar cache estático en preview/dev
export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostServer post={post} />;
}