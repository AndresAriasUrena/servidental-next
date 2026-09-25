'use client'

import { motion } from 'framer-motion'

export default function Map() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg"
    >
      <iframe
        src="https://maps.google.com/maps?q=9.92788314819336,-84.05352783203125&z=17&hl=es&output=embed"
        title="Ubicación de ServiDental CR"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade">
      </iframe>
    </motion.div>
  )
}