// src/types/product.ts
export type ProductCategory =
  | 'Unidades Dentales'
  | 'Bombas de succión'
  | 'Carrito para accesorios'
  | 'Compresores'
  | 'Contra-ángulos'
  | 'Cortadores'
  | 'Equipo de Rayos X'
  | 'Esterilización'
  | 'Microarenador'
  | 'Motores'
  | 'Lámparas Dentales'
  | 'Lámparas de Fotocurado'
  | 'Piezas de mano'
  | 'Selladoras'
  | 'Tomógrafos'
  | 'Termofomadoras'
  | 'Vaporizadores'
  | 'Cámaras Intraorales'
  | 'Scanner'
  | 'Sensores Digitales'
  | 'Fresadora'
  | 'Anestesia'
  | 'Implantes'
  | 'Otros';

export type ProductBrand =
  | 'Siger'
  | 'COXO'
  | 'TPC'
  | 'BioArt'
  | 'DOF'
  | 'Feng Dan'
  | 'Meyer'
  | 'Micro NX'
  | 'Sturdy'
  | 'Xpect Vision';

export interface ProductImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  isPrimary?: boolean;
}

export interface ProductFeature {
  title: string;
  items: string[];
}

export interface ProductSpecification {
  name: string;
  value: string;
}

export interface ProductGift {
  name: string;
  description: string;
  price: number;
  image: ProductImage;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  brand: {
    name: ProductBrand;
    logo: string;
  };
  description: string;
  shortDescription?: string;
  price?: number;
  category: ProductCategory;
  subcategory?: string;
  features: {
    unique: ProductFeature;
    general: ProductFeature;
  };
  specifications?: ProductSpecification[];
  images: ProductImage[];
  gifts?: ProductGift[];
  relatedProducts?: string[]; // Array of product IDs
  tags?: string[];
  isActive: boolean;
  inStock?: boolean;
  createdAt: string;
  updatedAt: string;
}