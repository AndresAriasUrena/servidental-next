import { Metadata } from 'next';
import BlogClient from '@/components/blog/BlogClient';

export const metadata: Metadata = {
  title: 'Blog - ServiDental | Noticias y Artículos sobre Equipos Dentales',
  description: 'Mantente actualizado con las últimas noticias, artículos y consejos sobre equipos médicos dentales. 18 años de experiencia en Costa Rica.',
  keywords: 'blog dental, noticias dentales, equipos dentales, Costa Rica, consejos dentales, servicio técnico',
  openGraph: {
    title: 'Blog ServiDental - Noticias y Artículos Dentales',
    description: 'Mantente actualizado con las últimas noticias y artículos sobre equipos médicos dentales.',
    type: 'website',
    url: 'https://servidentalcr.com/blog',
  },
};

export default function BlogPage() {
  return <BlogClient />;
}