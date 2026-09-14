// Categorías destacadas del home (portada elegida manualmente por la clienta).
// Compartidas por las secciones de propuesta (tabs / bloques apilados).

export interface FeaturedCategory {
  name: string
  slug: string
  image: string
  subtitle: string
}

export const FEATURED_CATEGORIES: FeaturedCategory[] = [
  {
    name: 'Escáneres',
    slug: 'escaneres',
    image: 'https://apiwp.servidentalcr.com/wp-content/uploads/2026/06/Breezyscan26-4.jpg',
    subtitle: 'Odontología digital de precisión',
  },
  {
    name: 'Equipo de Rayos X',
    slug: 'equipo-de-rayos-x',
    image: 'https://apiwp.servidentalcr.com/wp-content/uploads/2025/10/Sensor-de-RX-3.webp',
    subtitle: 'Imagenología para su consultorio',
  },
  {
    name: 'Piezas de mano',
    slug: 'piezas-de-mano',
    image: 'https://apiwp.servidentalcr.com/wp-content/uploads/2025/10/Pieza-de-mano-H15-SP-cabezal-estandar.jpg',
    subtitle: 'Alta y baja velocidad',
  },
  {
    name: 'Motores de cirugía',
    slug: 'motores-de-cirugias',
    image: 'https://apiwp.servidentalcr.com/wp-content/uploads/2025/10/Motor-de-cirugia-C-Puma-Master-1.jpg',
    subtitle: 'Precisión para implantología',
  },
  {
    name: 'Autoclaves',
    slug: 'esterilizadores',
    image: 'https://apiwp.servidentalcr.com/wp-content/uploads/2025/12/Esterilizador-AMI-23B-clase-B.jpg',
    subtitle: 'Esterilización confiable',
  },
  {
    name: 'Compresores',
    slug: 'compresores',
    image: 'https://apiwp.servidentalcr.com/wp-content/uploads/2025/10/Compresor-3HPnormal.jpg',
    subtitle: 'Aire limpio y seco',
  },
  {
    name: 'Mobiliario',
    slug: 'mobiliario',
    image: 'https://apiwp.servidentalcr.com/wp-content/uploads/2025/10/Carro-movil-Siger.webp',
    subtitle: 'Equipe su clínica',
  },
]
