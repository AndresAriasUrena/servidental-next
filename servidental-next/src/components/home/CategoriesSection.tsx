// src/components/home/CategoriesSection.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Categorías destacadas del home (definidas por la clienta).
// La imagen es la del producto más vendido de cada categoría.
// El enlace filtra la tienda por el slug de la categoría (/tienda?categories=<slug>).
interface Category {
  name: string
  slug: string
  image: string
}

const categories: Category[] = [
  {
    name: 'Escáneres',
    slug: 'escaneres',
    image: 'https://apiwp.servidentalcr.com/wp-content/uploads/2025/10/Especificaciones-compu-escaner-1.webp',
  },
  {
    name: 'Piezas de mano',
    slug: 'piezas-de-mano',
    image: 'https://apiwp.servidentalcr.com/wp-content/uploads/2025/10/Pieza-de-mano-H15-SP-cabezal-estandar.jpg',
  },
  {
    name: 'Motores de cirugía',
    slug: 'motores-de-cirugias',
    image: 'https://apiwp.servidentalcr.com/wp-content/uploads/2025/10/Motor-de-cirugia-C-Puma-Master-1.jpg',
  },
  {
    name: 'Equipo de Rayos X',
    slug: 'equipo-de-rayos-x',
    image: 'https://apiwp.servidentalcr.com/wp-content/uploads/2025/10/Sensor-de-RX-3.webp',
  },
  {
    name: 'Mobiliario',
    slug: 'mobiliario',
    image: 'https://apiwp.servidentalcr.com/wp-content/uploads/2025/10/Carro-movil-Siger.webp',
  },
  {
    name: 'Autoclaves',
    slug: 'esterilizadores',
    image: 'https://apiwp.servidentalcr.com/wp-content/uploads/2025/10/Esterilizador-SA-232-Manual-clase-N.jpg',
  },
  {
    name: 'Compresores',
    slug: 'compresores',
    image: 'https://apiwp.servidentalcr.com/wp-content/uploads/2025/10/Compresor-DC-701-1HP-110vAC.jpg',
  },
]

function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/tienda?categories=${category.slug}`}
      className="group flex-shrink-0 w-[220px] md:w-[260px] mx-3"
    >
      <div className="h-full bg-white rounded-2xl overflow-hidden shadow-md border-2 border-transparent hover:border-servi_green hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
        {/* Imagen del producto */}
        <div className="relative aspect-square bg-white">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="260px"
            className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        {/* Nombre de la categoría con acento de marca */}
        <div className="bg-servi_dark py-4 px-4 text-center">
          <h3 className="font-semibold text-white group-hover:text-servi_green transition-colors">
            {category.name}
          </h3>
        </div>
      </div>
    </Link>
  )
}

export default function CategoriesSection() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 overflow-hidden">
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
      </div>

      {/* Carrusel animado infinito */}
      <div className="relative">
        {/* Degradados laterales para un borde suave */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-gray-50 to-transparent" />

        <div className="flex animate-scroll-categories py-2">
          {/* Triplicamos para efecto infinito suave */}
          {[...categories, ...categories, ...categories].map((category, index) => (
            <CategoryCard key={`${category.slug}-${index}`} category={category} />
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/tienda"
          className="inline-block bg-servi_green text-white px-8 py-3 rounded-md hover:bg-servi_dark transition-colors"
        >
          Ver todos los equipos
        </Link>
      </div>

      <style jsx>{`
        @keyframes scroll-categories {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll-categories {
          animation: scroll-categories 30s linear infinite;
          width: max-content;
        }

        @media (min-width: 768px) {
          .animate-scroll-categories {
            animation: scroll-categories 45s linear infinite;
          }
          .animate-scroll-categories:hover {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  )
}
