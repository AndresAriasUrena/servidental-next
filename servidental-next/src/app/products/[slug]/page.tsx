import { Metadata } from 'next'
import { products } from '@/data/manual-products'
import { notFound } from 'next/navigation'
import ProductGallery from '@/components/products/ProductGallery'
import ProductInfo from '@/components/products/ProductInfo'

const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://servidentalcr.com' 
  : 'http://localhost:3000'

interface PageProps {
  params: { slug: string }
}

async function getProduct(slug: string) {
  'use server'
  return products.find(p => p.slug === slug)
}

export async function generateMetadata(
  props: PageProps
): Promise<Metadata> {
  const product = await getProduct(props.params.slug)
  
  if (!product) {
    return {
      title: 'Producto no encontrado | ServiDental',
      description: 'El producto que buscas no existe o ha sido removido.'
    }
  }

  return {
    title: `${product.name} | ServiDental`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      url: `${baseUrl}/products/${product.slug}`,
      siteName: 'ServiDental CR',
      locale: 'es_CR',
      type: 'website',
    }
  }
}

export default async function ProductPage(
  props: PageProps
) {
  const product = await getProduct(props.params.slug)
  
  if (!product) {
    notFound()
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <ProductGallery images={product.images} />
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}