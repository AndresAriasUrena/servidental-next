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
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.9231855805397!2d-84.05499382393826!3d9.930768974057615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0e3c2806df9b9%3A0x7b4d9c86f8f4e8e0!2sServiDental%20CR!5e0!3m2!1ses!2scr!4v1708880000000!5m2!1ses!2scr"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </motion.div>
  )
}