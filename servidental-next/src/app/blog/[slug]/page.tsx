import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostClient from '@/components/blog/BlogPostClient';
import { blogService } from '@/services/blogService';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await blogService.fetchPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post no encontrado - Blog ServiDental',
      description: 'El post solicitado no existe.',
    };
  }

  return {
    title: post.seo?.title || post.title?.rendered || `${slug} - Blog ServiDental`,
    description: post.seo?.description || post.excerpt_plain || '',
    keywords: post.seo?.keywords || '',
    alternates: {
      canonical: post.seo?.canonical || `https://servidentalcr.com/blog/${slug}`,
    },
    openGraph: {
      title: post.seo?.title || post.title?.rendered || '',
      description: post.seo?.description || post.excerpt_plain || '',
      type: 'article',
      url: post.seo?.canonical || `https://servidentalcr.com/blog/${slug}`,
      images: post.featured_image_url ? [post.featured_image_url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo?.title || post.title?.rendered || '',
      description: post.seo?.description || post.excerpt_plain || '',
      images: post.featured_image_url ? [post.featured_image_url] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}