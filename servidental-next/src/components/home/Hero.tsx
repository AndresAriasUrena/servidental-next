'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import Image, { StaticImageData } from 'next/image';
import assets from '@/assets';

import CTAButtons from '@/components/CTAButtons';

type Slide = {
  id: number;
  title: string;
  image: StaticImageData;
  content: JSX.Element;
  imageWidthClass: string;
  textWidthClass: string;
  responsiveImages?: {
    mobile: StaticImageData;
    tablet: StaticImageData;
    desktop: StaticImageData;
  };
};

const deviceImages = [
  { src: assets.images.Compu, alt: 'Versión Computadora' },
  { src: assets.images.Tablet, alt: 'Versión Tablet' },
  { src: assets.images.Celular, alt: 'Versión Celular' }
];

const slides: Slide[] = [
  {
    id: 1,
    title: 'Frame 1',
    image: assets.images.Compu,
    content: (
      <div className="flex flex-col z-10 p-6 text-white bg-vertical_gradient md:bg-horizontal_gradient rounded-2xl 
                      lg:ml-8 lg:mr-[-40%] text-center lg:text-left lg:mt-[40%]">
        <h2 className="text-2xl md:text-4xl lg:text-4xl font-semibold leading-relaxed">
          Equipo de ingenieros y técnicos profesionales, comprometidos en ofrecerle el mejor apoyo
        </h2>
        <div className="mt-6 lg:mt-8 px-6 lg:px-0 lg:ml-[25%] lg:w-[75%] flex justify-center">
          <CTAButtons className="lg:justify-center" />
        </div>
      </div>
    ),
    textWidthClass: 'lg:w-[70%]',
    imageWidthClass: 'lg:w-[120%]',
    responsiveImages: {
      mobile: assets.images.Celular,
      tablet: assets.images.Tablet,
      desktop: assets.images.Tablet
    }
  },
  {
    id: 2,
    title: 'Frame 2',
    image: assets.images.Mantenimiento,
    content: (
      <div className="flex flex-col z-10 p-8 text-white bg-vertical_gradient md:bg-horizontal_gradient rounded-lg 
                      lg:ml-8 lg:mr-[-60%] text-center lg:text-left">
        <h2 className="text-2xl md:text-4xl lg:text-4xl font-semibold leading-relaxed">Mantenimiento preventivo y correctivo</h2>
        <p className="text-xl lg:text-2xl mt-3">
          Ofrecemos servicios de mantenimiento preventivo y correctivo para todo tipo de equipo odontológico, asegurando su óptimo funcionamiento y prolongando su vida útil.
        </p>
        <div className="mt-6 lg:mt-8 px-6 lg:px-0 lg:ml-[25%] lg:w-[75%] flex justify-center">
          <CTAButtons className="lg:justify-center" />
        </div>
      </div>
    ),
    textWidthClass: 'lg:w-[40%]',
    imageWidthClass: 'lg:w-[90%]',
  },
  {
    id: 3,
    title: 'Frame 3',
    image: assets.images.Capacitaciones,
    content: (
      <div className="flex flex-col z-10 p-8 text-white bg-vertical_gradient md:bg-horizontal_gradient rounded-2xl 
                      lg:ml-8 lg:mr-[-20%] text-center lg:text-left">
        <h2 className="text-2xl md:text-4xl lg:text-4xl font-semibold leading-relaxed">Capacitaciones</h2>
        <p className="text-xl lg:text-2xl mt-3">
          Nuestro equipo recibe capacitación continua para ofrecerle los servicios de la más alta calidad
        </p>
        <div className="mt-6 lg:mt-8 px-6 lg:px-0 lg:ml-[25%] lg:w-[75%] flex justify-center">
          <CTAButtons className="lg:justify-center" />
        </div>
      </div>
    ),
    textWidthClass: 'lg:w-[38%]',
    imageWidthClass: 'lg:w-[70%]',
  },
  {
    id: 4,
    title: 'Frame 4',
    image: assets.images.VentaDeEquipo,
    content: (
      <div className="flex flex-col z-10 p-8 text-white bg-vertical_gradient md:bg-horizontal_gradient rounded-2xl 
                      lg:ml-8 lg:mr-[-20%] text-center lg:text-left">
        <h2 className="text-2xl md:text-4xl lg:text-4xl font-semibold leading-relaxed">Venta de equipo médico odontológico e instalaciones</h2>
        <p className="text-xl lg:text-2xl mt-3">
          Adquiera su equipo con nosotros, contamos con variedad de opciones, instalación profesional y respaldo en mantenimiento preventivo
        </p>
        <div className="mt-6 lg:mt-8 px-6 lg:px-0 lg:ml-[25%] lg:w-[75%] flex justify-center">
          <CTAButtons className="lg:justify-center" />
        </div>
      </div>
    ),
    textWidthClass: 'lg:w-[45%]',
    imageWidthClass: 'lg:w-[55%]',
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deviceIndex, setDeviceIndex] = useState(0);

  useEffect(() => {
    if (currentIndex === 0) {
      const interval = setInterval(() => {
        setDeviceIndex((prev) => (prev + 1) % deviceImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const variants = {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative w-full h-screen bg-[#003B46] text-white overflow-hidden overflow-x-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence initial={false}>
          <motion.div
            key={slides[currentIndex].id}
            className="absolute w-full h-full"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <div className="flex flex-col-reverse lg:flex-row w-full h-full relative">
              <div className={`w-full h-1/2 lg:h-full flex items-center justify-center px-4 lg:px-8 mb-16 sm:mb-0 ${slides[currentIndex].textWidthClass} relative z-20 mt-[-40%] lg:mt-0`}>
                {slides[currentIndex].content}
              </div>

              <div className={`w-full h-screen lg:h-full relative ${slides[currentIndex].imageWidthClass}`}>
                {currentIndex === 0 && slides[currentIndex].responsiveImages ? (
                  <>
                    <Image
                      src={slides[currentIndex].responsiveImages.desktop}
                      alt={slides[currentIndex].title}
                      placeholder="blur"
                      priority={true}
                      className="w-full h-full object-contain opacity-95 hidden xl:block"
                    />
                    <Image
                      src={slides[currentIndex].responsiveImages.mobile}
                      alt={slides[currentIndex].title}
                      placeholder="blur"
                      priority={true}
                      className="w-full h-full object-contain opacity-95 hidden md:block xl:hidden"
                    />
                    <Image
                      src={slides[currentIndex].responsiveImages.mobile}
                      alt={slides[currentIndex].title}
                      placeholder="blur"
                      priority={true}
                      className="w-full h-full object-cover opacity-95 block md:hidden"
                    />
                  </>
                ) : (
                  <Image
                    src={slides[currentIndex].image}
                    alt={slides[currentIndex].title}
                    placeholder="blur"
                    priority={currentIndex === 0}
                    className="w-full h-full object-cover opacity-95"
                  />
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controles del carrusel */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 flex items-center gap-2 z-10">
        <button
          onClick={prevSlide}
          className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
        >
          <MdArrowBack size={24} />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center gap-2 z-10">
        <button
          onClick={nextSlide}
          className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
        >
          <MdArrowForward size={24} />
        </button>
      </div>

      {/* Indicadores de slides */}
      <div className="absolute bottom-6 w-full flex items-center justify-center gap-2 z-10">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full cursor-pointer ${currentIndex === idx ? 'bg-white' : 'bg-gray-300'}`}
            onClick={() => setCurrentIndex(idx)}
          ></div>
        ))}
      </div>
    </section>
  );
}