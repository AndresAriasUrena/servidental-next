'use client'
import { motion } from 'framer-motion'

export default function YouTubeVideoSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Sobre nosotros
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="aspect-video shadow-lg rounded-lg overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/1-AgeQLqk90?si=l9SzRrN-4vu3liA-" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
              className="w-full h-full"
            />
          </motion.div>
        </div>

        <div className="mt-24 text-center">
          <a
            href="https://www.youtube.com/@ServiDentalCR"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-servi_green text-white px-8 py-3 rounded-md hover:bg-servi_dark transition-colors"
          >
            Ver más videos
          </a>
        </div>
      </div>
    </section>
  )
}