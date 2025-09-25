import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/hooks/useCart';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ServiDental | Equipo Médico Dental',
  description: '18 años de experiencia en el mercado costarricense, ofrecemos soluciones efectivas para los problemas técnicos asociados con clínicas odontológicas.',
  keywords: 'equipo médico dental, servicio técnico dental, Costa Rica, unidades dentales',
  metadataBase: new URL('http://servidentalcr.com'),
  openGraph: {
    title: 'ServidentalCR',
    description: '18 años de experiencia en el mercado costarricense, ofrecemos soluciones efectivas para los problemas técnicos asociados con clínicas odontológicas.',
    url: 'http://servidentalcr.com/',
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'ServiDental CR Logo',
      },
    ],
    type: 'website',
  },
  authors: [{ name: 'ServidentalCR' }],
  alternates: {
    canonical: 'http://servidentalcr.com/',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
    other: [
      { rel: 'manifest', url: '/site.webmanifest' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* jQuery required by TiloPay SDK */}
        <script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
          crossOrigin="anonymous"
        />
        {/* TiloPay SDK - Try multiple possible URLs */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Try multiple TiloPay SDK URLs
              const sdkUrls = [
                'https://app.tilopay.com/sdk/v1/tilopay.min.js',
                'https://tilopay.com/sdk/v1/tilopay.min.js',
                'https://js.tilopay.com/v1/tilopay.min.js',
                'https://cdn.tilopay.com/v1/tilopay.min.js',
                'https://sdk.tilopay.com/v1/tilopay.min.js',
                'https://app.tilopay.com/js/sdk.min.js',
                'https://tilopay.com/js/sdk.min.js'
              ];
              
              let sdkLoaded = false;
              let currentIndex = 0;
              
              function loadTilopaySDK() {
                if (sdkLoaded || currentIndex >= sdkUrls.length) return;
                
                const script = document.createElement('script');
                script.src = sdkUrls[currentIndex];
                script.defer = true;
                
                script.onload = function() {
                  if (window.Tilopay || window.TiloPay) {
                    console.log('✅ TiloPay SDK loaded successfully from:', sdkUrls[currentIndex]);
                    sdkLoaded = true;
                    // Normalize window object
                    if (window.TiloPay && !window.Tilopay) {
                      window.Tilopay = window.TiloPay;
                    }
                  }
                };
                
                script.onerror = function() {
                  console.log('❌ Failed to load SDK from:', sdkUrls[currentIndex]);
                  currentIndex++;
                  setTimeout(loadTilopaySDK, 100);
                };
                
                document.head.appendChild(script);
              }
              
              // Start loading when DOM is ready
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', loadTilopaySDK);
              } else {
                loadTilopaySDK();
              }
            `
          }}
        />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <main className="text-black pt-24 lg:pt-32">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
