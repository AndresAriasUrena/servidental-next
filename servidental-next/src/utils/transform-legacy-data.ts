// src/utils/transform-legacy-data.ts
import { Product, ProductBrand, ProductCategory } from '@/types/product';

const brandMapping: { [key: string]: ProductBrand } = {
  'siger': 'Siger',
  'coxo': 'Coxo',
  'tpc': 'TPC',
  'bioart': 'BioArt',
  'dof': 'DOF',
  'feng dan': 'Feng Dan',
  'meyer': 'Meyer',
  'micro nx': 'Micro NX',
  'sturdy': 'Sturdy',
  'xpect vision': 'Xpect Vision'
};

const categoryMapping: { [key: string]: ProductCategory } = {
  'unidad dental': 'Unidades Dentales',
  'bomba de vacío': 'Bombas de succión',
  'carrito': 'Carrito para accesorios',
  'compresor': 'Compresores',
  // ... resto de mapeos
};

interface LegacyProduct {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  brandName: string;
  brandLogo: string;
  description: string;
  features: {
    unique: string[];
    general: string[];
  };
  images: string[];
  category: string;
}

export function transformLegacyProduct(legacy: LegacyProduct): Product {
  return {
    id: legacy.id,
    slug: legacy.slug,
    name: legacy.name,
    subtitle: legacy.subtitle,
    brand: {
      name: brandMapping[legacy.brandName.toLowerCase()] || 'Siger',
      logo: legacy.brandLogo
    },
    description: legacy.description,
    shortDescription: legacy.description.slice(0, 150) + '...',
    category: categoryMapping[legacy.category.toLowerCase()] || 'Otros',
    features: {
      unique: {
        title: 'Características Únicas',
        items: legacy.features.unique
      },
      general: {
        title: 'Características Generales',
        items: legacy.features.general
      }
    },
    images: legacy.images.map((url, index) => ({
      url,
      alt: `${legacy.name} - Imagen ${index + 1}`,
      width: 800,
      height: 600,
      isPrimary: index === 0
    })),
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}