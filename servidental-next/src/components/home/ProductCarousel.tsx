'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { WooCommerceProduct } from '@/types/woocommerce'
import { ProductCard } from '@/components/ecommerce/product/ProductCard'

interface ProductCarouselProps {
  products: WooCommerceProduct[]
}

/**
 * Carrusel horizontal de productos (usa ProductCard). Muestra 1/2/3 tarjetas
 * según el viewport, con flechas y dots. Sin autoplay (el usuario navega).
 */
export default function ProductCarousel({ products }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [perView, setPerView] = useState(1)
  const [slideTransform, setSlideTransform] = useState('0%')

  // Cuántas tarjetas se ven según el ancho
  useEffect(() => {
    const updatePerView = () => {
      if (typeof window === 'undefined') return
      if (window.innerWidth < 640) setPerView(1)
      else if (window.innerWidth < 1024) setPerView(2)
      else setPerView(3)
    }
    updatePerView()
    window.addEventListener('resize', updatePerView)
    return () => window.removeEventListener('resize', updatePerView)
  }, [])

  // El índice máximo depende de cuántas tarjetas se ven
  const maxIndex = Math.max(0, products.length - perView)

  // Ajustar el índice si cambia perView o la cantidad de productos
  useEffect(() => {
    setCurrentIndex((i) => Math.min(i, maxIndex))
  }, [maxIndex])

  useEffect(() => {
    const stepPct = 100 / perView
    setSlideTransform(`-${currentIndex * stepPct}%`)
  }, [currentIndex, perView])

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1))
  const next = () => setCurrentIndex((i) => Math.min(maxIndex, i + 1))

  if (products.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-400">
        No hay productos disponibles en esta categoría.
      </div>
    )
  }

  const cardWidth =
    perView === 1 ? 'w-full' : perView === 2 ? 'w-1/2' : 'w-1/3'

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: slideTransform }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {products.map((product) => (
            <div key={product.id} className={`flex-none ${cardWidth} px-2`}>
              <ProductCard product={product} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Controles (solo si hay más de las visibles) */}
      {products.length > perView && (
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="rounded-full bg-white p-2 text-gray-800 shadow-sm transition-colors hover:bg-gray-50 disabled:opacity-40"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentIndex ? 'w-4 bg-servi_green' : 'w-2 bg-gray-300'
                }`}
                aria-label={`Ir a grupo ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            disabled={currentIndex === maxIndex}
            className="rounded-full bg-white p-2 text-gray-800 shadow-sm transition-colors hover:bg-gray-50 disabled:opacity-40"
            aria-label="Siguiente"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  )
}
