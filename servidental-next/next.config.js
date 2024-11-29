/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [],
  },
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    // Agregar regla para manejar archivos multimedia
    config.module.rules.push({
      test: /\.(mp4|webm)$/, // Extensiones soportadas
      type: 'asset/resource', // Utiliza Webpack Asset Modules
      generator: {
        filename: 'static/media/[name].[hash][ext]', // Define el nombre y ubicación del archivo exportado
      },
    });

    return config;
  },
};

module.exports = nextConfig;
