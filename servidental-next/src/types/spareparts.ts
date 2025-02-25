import { StaticImageData } from 'next/image';

export type SparePartsCategory =
  | 'Aceites y Detergentes'
  | 'Lubricantes'
  | 'Acoples Dentales'
  | 'Iluminación Dental'
  | 'Boquillas y Accesorios'
  | 'Controles'
  | 'Jeringas'
  | 'Mangueras'
  | 'Mangueras Especiales'
  | 'Transductores'
  | 'Puntas'
  | 'Compresores'
  | 'Contrangulos'
  | 'Partes de Sillón'
  | 'Refacciones Autoclave'

export interface SparePartsImage {
  url: StaticImageData;  
  alt: string;
  width: number;
  height: number;
  isPrimary?: boolean;
}

export interface SpareParts {
  id: string;
  slug: string;
  name: string;
  category: SparePartsCategory; // Fixed from ProductCategory
  images?: SparePartsImage[];
  isActive: boolean;
  inStock?: boolean;
  createdAt: string;
  updatedAt: string;
}