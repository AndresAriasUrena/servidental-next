import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostClient from '@/components/blog/BlogPostClient';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const cleanSlug = params.slug.replace(/-/g, ' ').replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

  return {
    title: `${cleanSlug} - Blog ServiDental`,
    description: `Artículo sobre ${cleanSlug} en el blog de ServiDental. Equipos médicos dentales y servicios especializados.`,
    keywords: `dental, equipos dentales, ${cleanSlug}, ServiDental, Costa Rica`,
    openGraph: {
      title: `${cleanSlug} - Blog ServiDental`,
      description: `Artículo sobre ${cleanSlug} en el blog de ServiDental.`,
      type: 'article',
      url: `https://servidentalcr.com/blog/${params.slug}`,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return <BlogPostClient slug={params.slug} />;
}