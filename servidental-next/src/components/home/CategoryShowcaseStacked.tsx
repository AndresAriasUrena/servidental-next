'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { WooCommerceProduct } from '@/types/woocommerce'
import { useWooCommerce } from '@/hooks/useWooCommerce'
import { FEATURED_CATEGORIES, FeaturedCategory } from './featured-categories'
import { ProductCard } from '@/components/ecommerce/product/ProductCard'

/**
 * Sección "Nuestros equipos por categoría": una fila por categoría con una
 * portada fija (navegación) a la izquierda y una tira de productos que se
 * desplaza horizontalmente a la derecha, controlada por las flechas de la portada.
 */

const PER_PAGE = 12
const SCROLL_STEP_DESKTOP = 336 // ancho de tarjeta (320px) + gap (16px)
const SCROLL_STEP_MOBILE = 192 // ancho de tarjeta (176px) + gap (16px)

function CategoryRow({ category }: { category: FeaturedCategory }) {
  const { fetchProducts } = useWooCommerce()
  const [products, setProducts] = useState<WooCommerceProduct[] | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect()
          fetchProducts({ category_slug: category.slug, per_page: PER_PAGE, status: 'publish' })
            .then((res) => setProducts(res.data || []))
            .catch(() => setProducts([]))
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [category.slug, fetchProducts])

  const scrollByStep = (direction: 1 | -1) => {
    const step = window.innerWidth < 640 ? SCROLL_STEP_MOBILE : SCROLL_STEP_DESKTOP
    scrollRef.current?.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <div ref={sectionRef} className="border-b border-gray-200 pb-8 last:border-b-0">
      {/* Encabezado compacto (solo mobile): la portada grande no cabe en pantallas
          chicas sin tapar los productos, así que en su lugar mostramos el nombre
          de la categoría y el enlace "Ver todos" arriba de la tira de productos. */}
      <div className="mb-3 flex items-center justify-between gap-2 sm:hidden">
        <span className="rounded-full bg-servi_green px-3 py-1 text-xs font-semibold text-white">
          {category.name}
        </span>
        <Link
          href={`/tienda?categories=${category.slug}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-servi_dark transition-colors hover:text-servi_green"
        >
          Ver todos
          <ArrowRight size={12} />
        </Link>
      </div>

      <div className="flex gap-4">
        {/* Portada fija (no se desplaza, solo desktop) */}
        <div className="relative hidden h-[520px] w-80 flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-b from-white via-servi_light to-servi_green sm:flex">
          <span className="absolute left-3 top-3 z-10 rounded-full bg-servi_green px-3 py-1 text-xs font-semibold text-white">
            {category.name}
          </span>

          <div className="relative flex-1">
            {/* mix-blend-multiply funde el fondo blanco de la foto de producto con el
                degradado de la tarjeta, en vez de dejar un recuadro blanco recortado */}
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="320px"
              className="object-contain p-6 mix-blend-multiply"
            />
          </div>

          <div className="relative z-10 flex items-center justify-between gap-2 p-3">
            <Link
              href={`/tienda?categories=${category.slug}`}
              className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-servi_dark shadow-sm transition-colors hover:text-servi_green"
            >
              Ver todos
              <ArrowRight size={12} />
            </Link>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollByStep(-1)}
                aria-label={`Retroceder en ${category.name}`}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white/80 transition-colors hover:bg-white/30"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => scrollByStep(1)}
                aria-label={`Avanzar en ${category.name}`}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-servi_green shadow-sm transition-colors hover:bg-gray-100"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Tira de productos: se desplaza horizontalmente, la portada permanece fija */}
        <div
          ref={scrollRef}
          className="scrollbar-hide flex h-96 flex-1 gap-4 overflow-x-auto scroll-smooth sm:h-[520px]"
        >
          {products === null ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-full w-44 flex-shrink-0 animate-pulse rounded-lg bg-gray-200 sm:w-80" />
            ))
          ) : products.length === 0 ? (
            <div className="flex w-full items-center justify-center text-sm text-gray-400">
              No hay productos disponibles en esta categoría.
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="h-full w-44 flex-shrink-0 sm:w-80">
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Controles de desplazamiento (solo mobile, la portada con flechas está oculta) */}
      <div className="mt-3 flex items-center justify-center gap-2 sm:hidden">
        <button
          onClick={() => scrollByStep(-1)}
          aria-label={`Retroceder en ${category.name}`}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-servi_dark transition-colors hover:bg-gray-200"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          onClick={() => scrollByStep(1)}
          aria-label={`Avanzar en ${category.name}`}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-servi_dark transition-colors hover:bg-gray-200"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  )
}

export default function CategoryShowcaseStacked() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-servi_dark mb-3">Nuestros equipos por categoría</h2>
            <p className="text-gray-600 max-w-2xl">
              Explore nuestra gama de equipos organizados por categoría.
            </p>
          </div>
          <Link
            href="/tienda"
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-servi_dark px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-servi_dark/90"
          >
            Ver todos los productos
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="space-y-8">
          {FEATURED_CATEGORIES.map((cat) => (
            <CategoryRow key={cat.slug} category={cat} />
          ))}
        </div>
      </div>
    </section>
  )
}
