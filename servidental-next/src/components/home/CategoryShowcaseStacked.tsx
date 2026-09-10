'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { WooCommerceProduct } from '@/types/woocommerce'
import { useWooCommerce } from '@/hooks/useWooCommerce'
import { FEATURED_CATEGORIES, FeaturedCategory } from './featured-categories'
import ProductCarousel from './ProductCarousel'

/**
 * Versión B — Bloques apilados: portada + carrusel por categoría (estilo Equipar).
 * Un bloque por categoría, apilados. Cada bloque carga sus productos cuando
 * entra en el viewport (lazy) para no disparar todos los fetch al inicio.
 */

function CategoryBlock({ category }: { category: FeaturedCategory }) {
  const { fetchProducts } = useWooCommerce()
  const [products, setProducts] = useState<WooCommerceProduct[] | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect()
          fetchProducts({ category_slug: category.slug, per_page: 8, status: 'publish' })
            .then((res) => setProducts(res.data || []))
            .catch(() => setProducts([]))
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [category.slug, fetchProducts])

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
      {/* Portada */}
      <Link
        href={`/tienda?categories=${category.slug}`}
        className="group relative col-span-1 overflow-hidden rounded-2xl bg-servi_dark min-h-[260px] flex flex-col justify-end"
      >
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 1024px) 100vw, 25vw"
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-servi_dark via-servi_dark/80 to-transparent" />
        <div className="relative z-10 p-6 text-white">
          <h3 className="text-2xl font-bold">{category.name}</h3>
          <p className="mt-1 text-sm text-gray-200">{category.subtitle}</p>
          <span className="mt-3 inline-flex items-center gap-1 rounded-md bg-servi_green px-4 py-2 text-sm font-semibold transition-colors group-hover:bg-servi_green/90">
            Ver categoría →
          </span>
        </div>
      </Link>

      {/* Carrusel */}
      <div className="col-span-1 lg:col-span-3">
        {products === null ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-lg bg-gray-100 h-72" />
            ))}
          </div>
        ) : (
          <ProductCarousel products={products} />
        )}
      </div>
    </div>
  )
}

export default function CategoryShowcaseStacked() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-servi_dark mb-3">Nuestros equipos por categoría</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore nuestra gama de equipos organizados por categoría.
          </p>
        </div>

        <div className="space-y-12">
          {FEATURED_CATEGORIES.map((cat) => (
            <CategoryBlock key={cat.slug} category={cat} />
          ))}
        </div>
      </div>
    </section>
  )
}
