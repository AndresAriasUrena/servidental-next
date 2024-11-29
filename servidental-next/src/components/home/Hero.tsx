'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { GrServices } from "react-icons/gr";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-hero_bg bg-cover bg-center bg-no-repeat">
      <video
        className="absolute inset-0 w-full h-full object-cover hidden xl:block"
        src="/videos/HeroVideo.mp4" 
        autoPlay
        loop
        muted
      ></video>

      <div className="absolute inset-0 bg-[#23596c] bg-opacity-50"></div>

      <div className="relative z-10 h-full">
        <div className="flex flex-col justify-center min-h-screen gap-16 px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center xl:items-start mx-auto lg:mx-2">
            {/* Título y descripción */}
            <motion.div
              className="text-center lg:text-start max-w-3xl xl:max-w-full flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-[5.5rem] 4xl:text-[7.5rem] tracking-tight font-[300] text-gray-50 space-y-2">
                <span className="block">Profesionales en</span>
                <span className="block text-white font-[600] pb-[4px]">Equipo médico </span>
                odontológico
              </h1>
              <p className="mt-6 md:mt-0 text-lg sm:text-xl md:text-2xl lg:text-3xl font-[300] text-white max-w-2xl xl:max-w-full mx-auto xl:mx-4 leading-relaxed">
                18 años de experiencia en el mercado costarricense, <br className='hidden xl:block' /> ofrecemos
                soluciones efectivas para los problemas técnicos <br className='hidden xl:block' /> asociados con clínicas
                odontológicas.
              </p>
            </motion.div>
          </div>
          <div className="flex items-center justify-center ">
            <motion.div
              className="grid grid-cols-1 gap-6 lg:grid-cols-3 w-full max-w-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex bg-white bg-opacity-90 rounded-sm p-3 shadow-lg">
                <div className="flex-[2] flex flex-col items-center justify-center">
                  <p className="text-2xl font-[200] uppercase text-[#23596c] mt-2">Desde</p>
                  <p className="text-4xl font-[900] text-[#23596c]">2006</p>
                </div>
                <div className="flex-[3] flex items-center">
                  <p className="text-3xl font-medium text-[#23596c]">Años de experiencia</p>
                </div>
              </div>

              <div className="flex bg-white bg-opacity-90 rounded-sm p-3 shadow-lg">
                <div className="flex-[2] flex flex-col items-center justify-center">
                  <p className="text-4xl font-[900] text-[#23596c]">+800</p>
                </div>
                <div className="flex-[3] flex items-center">
                  <p className="text-3xl font-medium text-[#23596c]">Clientes satisfechos</p>
                </div>
              </div>

              <div className="flex bg-white bg-opacity-90 rounded-sm p-3 shadow-lg">
                <div className="flex-[2] flex items-center justify-center">
                  <GrServices className="w-16 h-16 text-[#23596c]" />
                </div>
                <div className="flex-[3] flex items-center">
                  <p className="text-3xl font-medium text-[#23596c]">Equipo y servicio técnico</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
