'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ProductImage } from '@/types/product'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductGalleryProps {
  images: ProductImage[]
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Imagen principal */}
      <div className="relative aspect-w-4 aspect-h-3 w-full overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <Image
              src={images[currentImageIndex].url}
              alt={images[currentImageIndex].alt}
              className="h-full w-full object-contain"
              width={images[currentImageIndex].width}
              height={images[currentImageIndex].height}
            />
          </motion.div>
        </AnimatePresence>

        {/* Botones de navegación */}
        {images.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md hover:bg-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md hover:bg-white"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md ${
                index === currentImageIndex ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-200'
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                className="h-full w-full object-cover"
                width={80}
                height={80}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}