// src/app/products/[slug]/page.tsx
import { Metadata } from 'next'
import { products } from '@/data/manual-products'
import { notFound } from 'next/navigation'
import ProductGallery from '@/components/products/ProductGallery'
import ProductInfo from '@/components/products/ProductInfo'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://servidentalcr.com' 
  : 'http://localhost:3000'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ returnCategory?: string }>
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

async function getProduct(slug: string) {
  return products.find(p => p.slug === slug)
}

export async function generateMetadata(
  props: PageProps
): Promise<Metadata> {
  const { slug } = await props.params
  const product = await getProduct(slug)
  
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

export default async function ProductPage(props: PageProps) {
  const { slug } = await props.params
  const { returnCategory = 'all' } = await props.searchParams
  
  const product = await getProduct(slug)
  
  if (!product) {
    notFound()
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Botón de regreso con categoría */}
        <Link
          href={`/products${returnCategory !== 'all' ? `?category=${returnCategory}` : ''}`}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a {returnCategory === 'all' ? 'productos' : 'la categoría'}
        </Link>

        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <ProductGallery images={product.images} product={product} />
          <ProductInfo product={product} />
        </div>

        {/* Productos relacionados */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Productos relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.relatedProducts.map((relatedProductId) => {
                const relatedProduct = products.find((p) => p.id === relatedProductId)
                if (!relatedProduct) return null

                return (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.slug}?returnCategory=${returnCategory}`}
                    className="group"
                  >
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                      {relatedProduct.images && relatedProduct.images[0] && (
                        <img
                          src={relatedProduct.images[0].url.src}
                          alt={relatedProduct.images[0].alt}
                          className="h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                      )}
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">{relatedProduct.name}</h3>
                    {relatedProduct.brand && (
                      <p className="mt-1 text-sm text-gray-500">{relatedProduct.brand.name}</p>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}