// src/components/home/CategoriesSection.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Categorías destacadas del home (definidas por la clienta).
// Imagen de portada elegida manualmente por categoría.
// El enlace filtra la tienda por el slug de la categoría (/tienda?categories=<slug>).
interface Category {
  name: string
  slug: string
  image: string
  /** Clases de grid para el layout bento (tamaño de la celda). */
  span: string
}

const categories: Category[] = [
  {
    name: 'Escáneres',
    slug: 'escaneres',
    image: 'https://apiwp.servidentalcr.com/wp-content/uploads/2026/06/Breezyscan26-4.jpg',
    // Celda destacada grande (2 columnas x 2 filas)
    span: 'sm:col-span-2 sm:row-span-2',
  },
  {
    name: 'Equipo de Rayos X',
    slug: 'equipo-de-rayos-x',
    image: 'https://apiwp.servidentalcr.com/wp-content/uploads/2025/10/Sensor-de-RX-3.webp',
    span: 'sm:col-span-2',
  },
  {
    name: 'Piezas de mano',
    slug: 'piezas-de-mano',
    image: 'https://apiwp.servidentalcr.com/wp-content/uploads/2025/10/Pieza-de-mano-H15-SP-cabezal-estandar.jpg',
    span: '',
  },
  {
    name: 'Motores de cirugía',
    slug: 'motores-de-cirugias',
    image: 'https://apiwp.servidentalcr.com/wp-content/uploads/2025/10/Motor-de-cirugia-C-Puma-Master-1.jpg',
    span: '',
  },
  {
    name: 'Autoclaves',
    slug: 'esterilizadores',
    image: 'https://apiwp.servidentalcr.com/wp-content/uploads/2025/12/Esterilizador-AMI-23B-clase-B.jpg',
    span: '',
  },
  {
    name: 'Compresores',
    slug: 'compresores',
    image: 'https://apiwp.servidentalcr.com/wp-content/uploads/2025/10/Compresor-3HPnormal.jpg',
    span: '',
  },
  {
    name: 'Mobiliario',
    slug: 'mobiliario',
    image: 'https://apiwp.servidentalcr.com/wp-content/uploads/2025/10/Carro-movil-Siger.webp',
    // Celda ancha (2 columnas) para cerrar el mosaico
    span: 'sm:col-span-2',
  },
]

function BentoCard({ category, index }: { category: Category; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`group relative min-h-[180px] ${category.span}`}
    >
      <Link
        href={`/tienda?categories=${category.slug}`}
        className="relative flex h-full w-full flex-col justify-end overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1 hover:border-servi_green hover:shadow-xl hover:ring-servi_green/30"
      >
        {/* Rejilla decorativa tecnológica (sutil, en color de marca) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #2a7e87 1px, transparent 1px), linear-gradient(to bottom, #2a7e87 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />

        {/* Imagen del producto sobre fondo blanco (se integra sin recuadro) */}
        <div className="absolute inset-0">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Degradado inferior blanco para legibilidad del texto */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white via-white/90 to-transparent" />

        {/* Etiqueta de la categoría */}
        <div className="relative z-10 p-5">
          <div className="mb-1.5 h-1 w-8 rounded-full bg-servi_green transition-all duration-300 group-hover:w-14" />
          <h3 className="text-lg font-bold text-servi_dark md:text-xl">
            {category.name}
          </h3>
          <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-servi_green opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Ver equipos →
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export default function CategoriesSection() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-servi_dark mb-4">
            Categorías de equipos
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore nuestras principales categorías de equipos y encuentre lo que su clínica necesita.
          </p>
        </motion.div>

        {/* Bento box: celdas de distintos tamaños en mosaico */}
        <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[180px] gap-4">
          {categories.map((category, index) => (
            <BentoCard key={category.slug} category={category} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/tienda"
            className="inline-block bg-servi_green text-white px-8 py-3 rounded-md hover:bg-servi_dark transition-colors"
          >
            Ver todos los equipos
          </Link>
        </div>
      </div>
    </section>
  )
}
