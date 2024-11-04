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
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245.6294152332398!2d-84.05295288492904!3d9.928074781298015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0e47853093d67%3A0x350efb329721b958!2sServidental%20CR!5e0!3m2!1ses-419!2scr!4v1666116244981!5m2!1ses-419!2scr" 
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