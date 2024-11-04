// src/components/home/ServicesSection.tsx
'use client'

import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import assets from '@/assets'

interface Service {
  title: string;
  description: string;
  image: StaticImageData;
  hasLink?: boolean;
}

const services: Service[] = [
  {
    title: 'Instalaciones',
    description: 'El proceso de instalación es llevado a cabo por nuestro personal altamente calificado, siguiendo los más altos estándares de calidad.',
    image: assets.services.instalaciones
  },
  {
    title: 'Mantenimiento y servicio técnico',
    description: 'Contamos con planes de mantenimiento preventivo y correctivo, realizados por nuestro personal certificado acorde a los requerimientos del fabricante.',
    image: assets.services.mantenimientos,
    hasLink: true
  },
  {
    title: 'Calibraciones',
    description: 'Al ser distribuidores nacionales, contamos con líneas de comunicación directa con los fabricantes, manteniéndonos al día en las últimas actualizaciones de software.',
    image: assets.services.calibraciones
  },
  {
    title: 'Traslado de equipos',
    description: 'Ofrecemos un servicio de traslado de equipos que incluye la desinstalación, el transporte y la instalación, todo ello tras una cuidadosa coordinación.',
    image: assets.services.traslados
  },
  {
    title: 'Certificación de Rayos X',
    description: 'Contamos con una profesional que está debidamente registrada ante el Ministerio de Salud para poder emitir una certificación basada en la verificación de parámetros para el buen funcionamiento de su equipo radiológico.',
    image: assets.services.certificaciones
  }
]

export default function ServicesSection() {
  return (
    <section className="bg-services_gradient py-24"> {/* Cambiado a py-24 para más espacio vertical */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto"> {/* Aumentado mb-12 a mb-16 */}
            Proveemos servicio técnico especializado en todas nuestras marcas para
            garantizar la experiencia de usuario de mayor calidad para usted y sus clientes.
          </p>
        </motion.div>
        
        <div className="flex flex-wrap justify-center gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)] bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow" // Mejorados los estilos de las cards
            >
              {/* Image container */}
              <div className="relative aspect-[8/5] mb-6 rounded-lg overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
  
              {/* Content */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                {service.hasLink && (
                  <Link 
                    href="/services" 
                    className="inline-flex items-center text-servi_green hover:text-servi_dark font-medium transition-colors"
                  >
                    Ver más →
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}