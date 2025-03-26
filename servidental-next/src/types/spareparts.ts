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
| 'Accesorios de Mobiliario Dental'
| 'Equipamiento Ergonómico'
| 'Sistemas de Distribución Neumática'
| 'Sistemas de Control Neumático'
| 'Componentes de Seguridad'
| 'Protección de Instrumentos'
| 'Accesorios de Consultorio'
| 'Componentes Mecánicos'
| 'Repuestos para Esterilización'
| 'Productos de Limpieza y Desinfección'
| 'Instrumentos de Medición'
| 'Instrumentos de Control'


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