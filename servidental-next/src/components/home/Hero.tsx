'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';
import Image, { StaticImageData } from 'next/image';
import assets from '@/assets';
import Link from 'next/link';

type Slide = {
  id: number;
  badge: string;
  title: string;
  description: string;
  image: StaticImageData;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
};

const slides: Slide[] = [
  {
    id: 1,
    badge: 'Expertos en soporte técnico',
    title: 'Equipo de ingenieros y técnicos profesionales, comprometidos en ofrecerle el mejor apoyo',
    description: 'Combinamos conocimiento especializado y dedicación para ofrecerle el soporte más robusto y confiable.',
    image: assets.images.Compu,
    primaryCTA: {
      text: 'Equipo Médico',
      href: '/tienda'
    },
    secondaryCTA: {
      text: 'Servicio Técnico',
      href: '/services'
    }
  },
  {
    id: 2,
    badge: 'Seguridad y profesionalismo',
    title: 'Mantenimiento preventivo y correctivo',
    description: 'Ofrecemos servicios de mantenimiento preventivo y correctivo para todo tipo de equipo odontológico, asegurando su óptimo funcionamiento y prolongando su vida útil',
    image: assets.images.Mantenimiento,
    primaryCTA: {
      text: 'Equipo Médico',
      href: '/tienda'
    },
    secondaryCTA: {
      text: 'Servicio Técnico',
      href: '/services'
    }
  },
  {
    id: 3,
    badge: 'Creando profesionales',
    title: 'Capacitaciones',
    description: 'Nuestro equipo recibe capacitación continua para ofrecerle únicamente los servicios de la más alta calidad',
    image: assets.images.Capacitaciones,
    primaryCTA: {
      text: 'Equipo Médico',
      href: '/tienda'
    },
    secondaryCTA: {
      text: 'Servicio Técnico',
      href: '/services'
    }
  },
  {
    id: 4,
    badge: 'Solo equipo de alta calidad',
    title: 'Venta de equipo médico odontológico e instalaciones',
    description: 'Adquiera su equipo con nosotros, contamos con variedad de opciones, instalación profesional y respaldo en mantenimiento preventivo',
    image: assets.images.VentaDeEquipo,
    primaryCTA: {
      text: 'Equipo Médico',
      href: '/tienda'
    },
    secondaryCTA: {
      text: 'Servicio Técnico',
      href: '/services'
    }
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative w-full h-[calc(100vh-170px)] md:h-[calc(100vh-168px)] bg-[#2C3E50] text-white overflow-hidden">
      {/* Contenedor de slides */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Imagen de fondo */}
          <div className="absolute inset-0">
            <Image
              src={currentSlide.image}
              alt={currentSlide.title}
              fill
              priority={currentIndex === 0}
              className="object-cover"
              quality={90}
            />
            {/* Overlay oscuro más pronunciado */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a2332]/98 via-[#2C3E50]/95 to-[#2C3E50]/70" />
          </div>

          {/* Contenido */}
          <div className="relative h-full flex items-center py-6 sm:py-8 z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-10 max-w-7xl">
              <div className="max-w-xl lg:max-w-2xl">
                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 bg-servi_green/20 text-servi_green border border-servi_green/50 px-3 py-1 rounded-full mb-3">
                  <FaCheckCircle className="w-3 h-3" />
                  <span className="text-xs sm:text-sm text-white font-semibold">{currentSlide.badge}</span>
                </div>

                {/* Título */}
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-3 text-white">
                  {currentSlide.title}
                </h1>

                {/* Descripción */}
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-100 mb-4 leading-relaxed max-w-lg">
                  {currentSlide.description}
                </p>

                {/* Botones CTA */}
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <Link
                    href={currentSlide.primaryCTA.href}
                    className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 bg-servi_green hover:bg-servi_green/90 text-white text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {currentSlide.primaryCTA.text}
                    <MdArrowForward className="ml-1.5 w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={currentSlide.secondaryCTA.href}
                    className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 bg-transparent border-2 border-white hover:bg-white hover:text-servi_dark text-white text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200"
                  >
                    {currentSlide.secondaryCTA.text}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controles del carrusel */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 z-30 bg-white/10 backdrop-blur-sm text-white p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-all duration-200"
        aria-label="Slide anterior"
      >
        <MdArrowBack size={18} className="sm:w-5 sm:h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 z-30 bg-white/10 backdrop-blur-sm text-white p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-all duration-200"
        aria-label="Siguiente slide"
      >
        <MdArrowForward size={18} className="sm:w-5 sm:h-5" />
      </button>

      {/* Indicadores de slides */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === idx
                ? 'w-5 sm:w-6 h-1.5 bg-servi_green'
                : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Ir al slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}