'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

/**
 * Banner deslizante promocional para página de inicio
 * Muestra mensajes rotativos con información importante
 */
export default function BlackNovemberBanner() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messages = [
    { text: 'Visite nuestra tienda en línea y adquiera su equipo a 6 meses sin intereses con BAC.', link: null },
    { text: 'Conozca nuestros servicios — Clic aquí.', link: '/servicios' },
    { text: 'Certificación radiológica — Ver información.', link: '/certificacion' },
    { text: 'Visite nuestro showroom; estamos ubicados en San Pedro, Montes de Oca.', link: null }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 4000); // Cambiar mensaje cada 4 segundos

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Fondo con patrón */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
        }} />
      </div>

      {/* Contenido del banner */}
      <div className="relative container mx-auto px-4 py-2 sm:py-2.5">
        <div className="flex items-center justify-center">

          {/* Mensaje deslizante animado */}
          <div className="w-full text-center overflow-hidden">
            <div
              className="transition-all duration-500 ease-in-out"
              key={currentMessageIndex}
              style={{
                animation: 'slideIn 0.5s ease-out'
              }}
            >
              {messages[currentMessageIndex].link ? (
                <Link
                  href={messages[currentMessageIndex].link!}
                  className="text-[10px] md:text-xs font-semibold text-white hover:text-servi_green transition-colors duration-200 underline underline-offset-2"
                >
                  {messages[currentMessageIndex].text}
                </Link>
              ) : (
                <p className="text-[10px] md:text-xs font-semibold text-white">
                  {messages[currentMessageIndex].text}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Indicadores de mensaje (opcional - puntos para mostrar qué mensaje está activo) */}
      <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 flex gap-1">
        {messages.map((_, index) => (
          <div
            key={index}
            className={`w-1 h-1 rounded-full transition-all duration-300 ${
              index === currentMessageIndex
                ? 'bg-slate-300 w-3'
                : 'bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Animación CSS */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
