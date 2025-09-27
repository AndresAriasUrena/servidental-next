/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wp.servidentalcr.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    WP_API_URL: 'https://wp.servidentalcr.com/wp-json/wp/v2',
    CUSTOM_API_URL: 'https://wp.servidentalcr.com/wp-json/servidental/v1'
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
