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
    image: assets.services.instalaciones
  },
  {
    title: 'Certificación de Rayos X',
    description: 'Contamos con una profesional que está debidamente registrada ante el Ministerio de Salud para poder emitir una certificación basada en la verificación de parámetros para el buen funcionamiento de su equipo radiológico.',
    image: assets.services.calibraciones
  }
]

export default function ServicesSection() {
  // return (
  //   <section className="bg-white py-16">
  //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //       <motion.div
  //         initial={{ opacity: 0 }}
  //         whileInView={{ opacity: 1 }}
  //         viewport={{ once: true }}
  //         className="text-center"
  //       >
  //         <h2 className="text-4xl font-bold text-gray-900 mb-4">
  //           Nuestros Servicios
  //         </h2>
  //         <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
  //           Proveemos servicio técnico especializado en todas nuestras marcas para
  //           garantizar la experiencia de usuario de mayor calidad para usted y sus clientes.
  //         </p>
  //       </motion.div>

  //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
  //         {services.map((service, index) => (
  //           <motion.div
  //             key={service.title}
  //             initial={{ opacity: 0, y: 20 }}
  //             whileInView={{ opacity: 1, y: 0 }}
  //             viewport={{ once: true }}
  //             transition={{ duration: 0.5, delay: index * 0.1 }}
  //             className="w-full max-w-md"
  //           >
  //             {/* Image container */}
  //             <div className="relative aspect-[4/3] mb-4 rounded-lg overflow-hidden">
  //               <Image
  //                 src={service.image}
  //                 alt={service.title}
  //                 fill
  //                 className="object-cover"
  //               />
  //             </div>

  //             {/* Content */}
  //             <div>
  //               <h3 className="text-xl font-semibold text-gray-900 mb-2">
  //                 {service.title}
  //               </h3>
  //               <p className="text-gray-600 mb-4">
  //                 {service.description}
  //               </p>
  //               {service.hasLink && (
  //                 <Link 
  //                   href="/services" 
  //                   className="inline-block text-blue-600 hover:text-blue-700 font-medium"
  //                 >
  //                   Ver más →
  //                 </Link>
  //               )}
  //             </div>
  //           </motion.div>
  //         ))}
  //       </div>
  //     </div>
  //   </section>
  // )
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section se mantiene igual */}
        
        <div className="flex flex-wrap justify-center gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]"
            >
              {/* Image container */}
              <div className="relative aspect-[4/3] mb-4 rounded-lg overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
  
              {/* Content */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                {service.hasLink && (
                  <Link 
                    href="/services" 
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
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