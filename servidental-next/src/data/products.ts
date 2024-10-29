// src/data/products.ts
import assets from '@/assets'
import { Product } from '@/types/product'

export const categories = [
  'Unidades Dentales',
  'Rayos X',
  'Esterilización',
  'Piezas de Mano',
  'Fresadoras',
  'Scanners',
] as string[]

export const products: Product[] = [
  {
    id: '1',
    slug: 'unidad-dental-serie-s30',
    name: 'Serie S30®',
    subtitle: 'Unidad Dental',
    brand: {
      name: 'Siger',
      logo: assets.logos.brands.siger,
    },
    description: 'Unidad dental con suave tapicería italiana',
    advantages: ['Suave tapicería italiana'],
    images: [
      {
        url: assets.products.unidadDental.s30.default,
        alt: 'Unidad Dental Serie S30',
        width: 800,
        height: 600,
      },
      {
        url: assets.products.unidadDental.s30.carrito,
        alt: 'Unidad Dental Serie S30 con carrito',
        width: 800,
        height: 600,
      },
    ],
    features: {
      unique: {
        title: 'Características Únicas',
        items: [
          'Motor silencioso LINAK (Dinamarca)',
          'Mesa de doctor a elección (tipo carro o convencional)',
          'Panel de control tipo membrana',
          'Sensores de parada, múltiples',
          'Elección de piezas de mano por sensor óptico',
          'Respaldo sólido de aluminio',
          'Soporte para hasta 150Kg',
        ],
      },
      general: {
        title: 'Características Generales',
        items: [
          'Lámpara V2 LED o V1 LED',
          'Banqueta doctor',
          'Pedal multifuncional',
          'Manguera borden (2)',
          'Manguera midwest (1)',
          'Negatoscopio',
          'Kit calentador de agua',
          'Sistema auxiliar agua',
          '2 jeringas triples',
          'Sistema succión por Venturi o bomba vacío',
          'Cabecera 2 ejes',
          'Caja de previstas externa o interna',
          '5 memorias de movimiento',
          '2 descansa brazos abatibles',
        ],
      },
    },
    gifts: [
      {
        name: 'Limpiador ultrasónico',
        description: 'Kit E2 (LED) Siger',
        price: 295,
        image: {
          url: assets.products.unidadDental.s30.default, // Cambiar por la imagen correcta cuando esté disponible
          alt: 'Limpiador ultrasónico',
          width: 200,
          height: 200,
        },
      },
      {
        name: 'Lámpara Fotocurado',
        description: 'LED G Woodpeaker',
        price: 165,
        image: {
          url: assets.products.unidadDental.s30.default, // Cambiar por la imagen correcta cuando esté disponible
          alt: 'Lámpara Fotocurado',
          width: 200,
          height: 200,
        },
      },
    ],
    category: 'Unidades Dentales',
  },
  // Aquí irían más productos...
]