'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import hero5 from '@/assets/hero/5.avif';
import hero5Mobile from '@/assets/hero/5Mobile.avif';

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
      text: 'Tienda en linea',
      href: '/tienda',
    },
    image: hero1,
    imageMobile: hero1Mobile,
    desktopPosition: 'left',
    mobilePosition: 'right',
  },
  {
    id: 2,
    titleParts: [
      { text: 'INGENIEROS' },
      { text: 'Y TECNICOS', highlighted: true },
      { text: 'ESPECIALIZADOS', highlighted: true },
    ],
    cta: {
      text: 'Servicio tecnico',
      href: '/services',
    },
    image: hero2,
    imageMobile: hero2Mobile,
    desktopPosition: 'right',
    mobilePosition: 'right',
  },
  {
    id: 3,
    titleParts: [
      { text: 'CERTIFIQUE' },
      { text: 'SU EQUIPO DE' },
      { text: 'RAYOS X', highlighted: true },
    ],
    cta: {
      text: 'Mas informacion',
      href: '/x-ray-certification',
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
      text: 'Mas informacion',
      href: '/services',
    },
    image: hero4,
    imageMobile: hero4Mobile,
    desktopPosition: 'left',
    mobilePosition: 'left',
  },
  {
    id: 5,
    titleParts: [
      { text: 'SHOWROOM' },
      { text: 'EQUIPOS Y ASESORIA', highlighted: true },
      { text: 'ESPECIALIZADA', highlighted: true },
    ],
    cta: {
      text: 'Agende su cita',
      href: '/tienda',
    },
    image: hero5,
    imageMobile: hero5Mobile,
    desktopPosition: 'right',
    mobilePosition: 'right',
  },
];

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const currentSlide = slides[currentIndex];
  const position = isMobile ? currentSlide.mobilePosition : currentSlide.desktopPosition;

  const getPositionClasses = () => {
    if (position === 'left') {
      return 'items-start text-left';
    }
    return 'items-end text-right';
  };

  const getContainerClasses = () => {
    if (position === 'left') {
      return 'justify-start';
    }
    return 'justify-end';
  };

  return (
    <section className="relative w-full h-[50vh] md:h-[60vh] lg:h-[80vh] overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Background Image - Desktop */}
          <div className="absolute inset-0 hidden md:block">
            <Image
              src={currentSlide.image}
              alt="Hero background"
              fill
              priority={currentIndex === 0}
              className="object-cover object-[60%_30%]"
              quality={90}
            />
          </div>

          {/* Background Image - Mobile */}
          <div className="absolute inset-0 md:hidden">
            <Image
              src={currentSlide.imageMobile}
              alt="Hero background"
              fill
              priority={currentIndex === 0}
              className="object-cover"
              quality={90}
            />
          </div>

          {/* Content */}
          <div className="relative h-full z-10">
            <div className={`container mx-auto px-4 sm:px-6 lg:px-10 max-w-7xl h-full flex ${getContainerClasses()}`}>
              <div className={`flex flex-col ${getPositionClasses()} pt-8 md:pt-12 lg:pt-16 max-w-md lg:max-w-xl`}>
                {/* Title */}
                <h1 className="font-bold leading-tight mb-4 md:mb-6">
                  {currentSlide.titleParts.map((part, idx) => (
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
                </h1>

                {/* CTA Button */}
                <Link
                  href={currentSlide.cta.href}
                  className="inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3 bg-servi_green hover:bg-servi_green/90 text-white text-sm sm:text-base font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl w-fit"
                >
                  {currentSlide.cta.text}
                  <MdArrowForward className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Carousel Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 z-30 bg-[#2a7e87] backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-200"
        aria-label="Slide anterior"
      >
        <MdArrowBack size={20} className="sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 z-30 bg-[#2a7e87] backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-200"
        aria-label="Siguiente slide"
      >
        <MdArrowForward size={20} className="sm:w-6 sm:h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === idx
                ? 'w-6 sm:w-8 h-2 bg-servi_green'
                : 'w-2 h-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Ir al slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
