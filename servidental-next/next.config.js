// next.config.js  (cambia la extensión de .ts a .js)
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [], // Si tienes patrones de imágenes remotas
  },
  trailingSlash: true,
  typescript: {
    // Si hay errores de tipos que quieras ignorar temporalmente
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig