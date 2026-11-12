'use client';

import { useState, useEffect } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import hero1 from '@/assets/hero/1.avif';
import hero1Mobile from '@/assets/hero/1Mobile.avif';
import hero2 from '@/assets/hero/2.avif';
import hero2Mobile from '@/assets/hero/2Mobile.avif';
import hero3 from '@/assets/hero/3.avif';
import hero3Mobile from '@/assets/hero/3Mobile.avif';
import hero4 from '@/assets/hero/4.avif';
import hero4Mobile from '@/assets/hero/4Mobile.avif';
// Showroom (slide 5) ocultado temporalmente:
// import hero5 from '@/assets/hero/5.avif';
// import hero5Mobile from '@/assets/hero/5Mobile.avif';

type TitlePart = {
  text: string;
  highlighted?: boolean;
};

type Slide = {
  id: number;
  titleParts: TitlePart[];
  cta: {
    text: string;
    href: string;
  };
  image: StaticImageData;
  imageMobile: StaticImageData;
  desktopPosition: 'left' | 'right';
  mobilePosition: 'left' | 'right';
};

const slides: Slide[] = [
  {
    id: 1,
    titleParts: [
      { text: 'SU EQUIPO DENTAL' },
      { text: 'A UN CLICK', highlighted: true },
    ],
    cta: {
      text: 'Tienda en línea',
      href: '/tienda',
    },
    image: hero1,
    imageMobile: hero1Mobile,
    desktopPosition: 'left',
    mobilePosition: 'left',
  },
  {
    id: 2,
    titleParts: [
      { text: 'CERTIFIQUE' },
      { text: 'SU EQUIPO DE' },
      { text: 'RAYOS X', highlighted: true },
    ],
    cta: {
      text: 'Más información',
      href: '/x-ray-certification',
    },
    image: hero2,
    imageMobile: hero2Mobile,
    desktopPosition: 'left',
    mobilePosition: 'left',
  },
  {
    id: 3,
    titleParts: [
      { text: 'INGENIEROS' },
      { text: 'Y TECNICOS', highlighted: true },
      { text: 'ESPECIALIZADOS', highlighted: true },
    ],
    cta: {
      text: 'Servicio técnico',
      href: '/services',
    },
    image: hero3,
    imageMobile: hero3Mobile,
    desktopPosition: 'left',
    mobilePosition: 'left',
  },
  {
    id: 4,
    titleParts: [
      { text: 'MANTENIMIENTOS' },
      { text: '✓ PREVENTIVOS', highlighted: true },
      { text: '✓ CORRECTIVOS' },
    ],
    cta: {
      text: 'Más información',
      href: '/services',
    },
    image: hero4,
    imageMobile: hero4Mobile,
    desktopPosition: 'left',
    mobilePosition: 'left',
  },
  // Slide de Showroom ocultado temporalmente a pedido de la clienta.
  // {
  //   id: 5,
  //   titleParts: [
  //     { text: 'SHOWROOM' },
  //     { text: 'EQUIPOS Y ASESORIA', highlighted: true },
  //     { text: 'ESPECIALIZADA', highlighted: true },
  //   ],
  //   cta: {
  //     text: 'Agende su cita',
  //     href: '/tienda',
  //   },
  //   image: hero5,
  //   imageMobile: hero5Mobile,
  //   desktopPosition: 'right',
  //   mobilePosition: 'right',
  // },
];

const SLIDE_INTERVAL_MS = 5000;
const FADE_MS = 500;

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // El timer se reinicia en cada cambio de slide (automático o manual), así un
  // clic del usuario justo antes del tick no provoca dos cambios seguidos.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, SLIDE_INTERVAL_MS);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        {/* El degradado vive en el contenedor (fijo), no en cada slide, para que
            nunca se vea un hueco blanco entre una transición y otra. */}
        <section className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden rounded-2xl shadow-lg bg-gradient-to-b from-white via-servi_light to-servi_green">
          {/* Todos los slides permanecen montados y apilados: las imágenes se
              cargan/decodifican una sola vez y el cambio es solo de opacidad.
              Antes se desmontaba y montaba cada slide (AnimatePresence mode="wait"),
              lo que causaba fade-out a vacío + imagen apareciendo tarde (parpadeo). */}
          {slides.map((slide, index) => {
            const isActive = index === currentIndex;
            const position = isMobile ? slide.mobilePosition : slide.desktopPosition;
            const positionClasses =
              position === 'left' ? 'items-start text-left' : 'items-end text-right';
            const containerClasses = position === 'left' ? 'justify-start' : 'justify-end';
            const TitleTag = isActive ? 'h1' : 'p';

            return (
              <div
                key={slide.id}
                aria-hidden={!isActive}
                className={`absolute inset-0 ${isActive ? 'z-10' : 'z-0'}`}
                style={{
                  opacity: isActive ? 1 : 0,
                  visibility: isActive ? 'visible' : 'hidden',
                  // El slide que entra hace fade-in encima; el que sale se queda
                  // opaco debajo hasta que termina el fade y luego se oculta.
                  // Así nunca hay un momento con ambos semitransparentes.
                  transition: isActive
                    ? `opacity ${FADE_MS}ms ease-in-out`
                    : `opacity 0s linear ${FADE_MS}ms, visibility 0s linear ${FADE_MS}ms`,
                  willChange: 'opacity',
                }}
              >
                {/* Background Image - Desktop (decorativa: no debe interceptar clics del botón) */}
                <div className="absolute inset-0 hidden md:block pointer-events-none">
                  <Image
                    src={slide.image}
                    alt="Hero background"
                    fill
                    priority={index === 0}
                    className="object-contain object-center"
                    quality={90}
                  />
                </div>

                {/* Background Image - Mobile (decorativa: no debe interceptar clics del botón) */}
                <div className="absolute inset-0 md:hidden pointer-events-none">
                  <Image
                    src={slide.imageMobile}
                    alt="Hero background"
                    fill
                    priority={index === 0}
                    className="object-contain object-bottom"
                    quality={90}
                  />
                </div>

                {/* Content */}
                <div className="relative h-full z-10">
                  <div className={`container mx-auto px-4 sm:px-6 lg:px-10 max-w-7xl h-full flex ${containerClasses}`}>
                    <div className={`flex flex-col ${positionClasses} pt-8 md:pt-12 lg:pt-16 max-w-md lg:max-w-xl`}>
                      {/* Title (solo el slide activo es h1) */}
                      <TitleTag className="font-bold leading-tight mb-4 md:mb-6">
                        {slide.titleParts.map((part, idx) => (
                          <span
                            key={idx}
                            className={`block text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase ${
                              part.highlighted ? 'text-[#2a7e87]' : 'text-[#383536]'
                            }`}
                            style={{
                              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                            }}
                          >
                            {part.text}
                          </span>
                        ))}
                      </TitleTag>

                      {/* CTA Button */}
                      <Link
                        href={slide.cta.href}
                        tabIndex={isActive ? 0 : -1}
                        className="inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3 bg-servi_green hover:bg-servi_green/90 text-white text-sm sm:text-base font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl w-fit"
                      >
                        {slide.cta.text}
                        <MdArrowForward className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Carousel Controls + Slide Indicators */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-4 z-30">
            <button
              onClick={prevSlide}
              className="bg-[#2a7e87] backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-200"
              aria-label="Slide anterior"
            >
              <MdArrowBack size={20} className="sm:w-6 sm:h-6" />
            </button>

            <div className="flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === idx
                      ? 'w-6 sm:w-8 h-2 bg-servi_green'
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ir al slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="bg-[#2a7e87] backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-200"
              aria-label="Siguiente slide"
            >
              <MdArrowForward size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
