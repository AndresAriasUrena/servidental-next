'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import Image, { StaticImageData } from 'next/image';
import assets from '@/assets';

type Slide = {
  id: number;
  title: string;
  image: StaticImageData;
  content: JSX.Element;
  imageWidthClass: string;
  textWidthClass: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: 'Frame 1',
    image: assets.images.EquipoDeProfesionales,
    content: (
      <div className="flex flex-col z-10 p-6 text-white bg-[#A5A5A5BF] bg-opacity-90 rounded-2xl 
                      lg:ml-8 lg:mr-[-40%] text-center lg:text-left">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight">
          Equipo de ingenieros y técnicos profesionales, comprometidos en ofrecerle el mejor apoyo
        </h2>
      </div>
    ),
    textWidthClass: 'lg:w-[70%]',
    imageWidthClass: 'lg:w-[90%]',
  },
  {
    id: 2,
    title: 'Frame 2',
    image: assets.images.Mantenimiento,
    content: (
      <div className="flex flex-col z-10 p-8 text-white bg-[#A5A5A5BF] bg-opacity-90 rounded-lg 
                      lg:ml-8 lg:mr-[-60%] text-center lg:text-left">
        <h2 className="text-2xl md:text-4xl lg:text-6xl font-semibold">Mantenimiento preventivo y correctivo</h2>
        <p className="text-xl lg:text-2xl">
          Ofrecemos servicios de mantenimiento preventivo y correctivo para todo tipo de equipo odontológico, asegurando su óptimo funcionamiento y prolongando su vida útil.
        </p>
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
      <div className="flex flex-col z-10 p-8 text-white bg-[#A5A5A5BF] bg-opacity-90 rounded-2xl 
                      lg:ml-8 lg:mr-[-20%] text-center lg:text-left">
        <h2 className="text-2xl md:text-4xl lg:text-6xl font-semibold">Capacitaciones</h2>
        <p className="text-xl lg:text-2xl">
          Nuestro equipo recibe capacitación continua para ofrecerle los servicios de la más alta calidad
        </p>
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
      <div className="flex flex-col z-10 p-8 text-white bg-[#A5A5A5BF] bg-opacity-90 rounded-2xl 
                      lg:ml-8 lg:mr-[-20%] text-center lg:text-left">
        <h2 className="text-2xl md:text-4xl lg:text-6xl font-semibold">Venta de equipo médico odontológico e instalaciones</h2>
        <p className="text-xl lg:text-2xl">
          Adquiera su equipo con nosotros, contamos con variedad de opciones, instalación profesional y respaldo en mantenimiento preventivo
        </p>
      </div>
    ),
    textWidthClass: 'lg:w-[45%]',
    imageWidthClass: 'lg:w-[55%]',
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

  const variants = {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative w-full h-screen bg-[#037971] text-white overflow-hidden">
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

              <div className={`w-full h-1/2 sm:h-screen lg:h-full relative ${slides[currentIndex].imageWidthClass}`}>
                <Image
                  src={slides[currentIndex].image}
                  alt={slides[currentIndex].title}
                  placeholder="blur"
                  priority={currentIndex === 0}
                  className="w-full h-full object-cover"
                />
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