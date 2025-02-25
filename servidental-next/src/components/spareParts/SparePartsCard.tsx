'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { SpareParts } from '@/types/spareparts'

interface SparePartsCardProps {
  sparePart: SpareParts
}

export default function SparePartsCard({ sparePart }: SparePartsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="relative">
        <div className="relative aspect-[4/3] w-full">
          {sparePart.images?.[0]?.url && (
            <Image
              src={sparePart.images[0].url}
              alt={sparePart.images[0].alt || sparePart.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-contain object-center transition-transform duration-300"
              priority
            />
          )}
        </div>
        <div className="mb-4 px-4">
        <h3 className="text-xl font-semibold text-servi_dark">{sparePart.name}</h3>
        </div>
      </div>
    </motion.div>
  )
}