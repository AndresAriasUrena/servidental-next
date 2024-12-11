import { StaticImageData } from 'next/image';

export type ProductCategory =
  | 'Unidades Dentales'
  | 'Bombas de vacío'
  | 'Activaodor UV para implantes'
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
  | 'Lámparas de blanqueamiento'
  | 'Piezas de mano'
  | 'Selladoras'
  | 'Tomógrafos'
  | 'Termofomadoras'
  | 'Vaporizadores'
  | 'Cámaras Intraorales'
  | 'Escáneres'
  | 'Sensores Digitales'
  | 'Fresadora'
  | 'Anestesia'
  | 'Implantes'
  | 'Implantes'
  | 'Pulidores'
  | 'Equipo portátil'
  | 'Equipo para endodoncia'
  | 'Motores de implantes'
  | 'Lavadoras ultrasónicas'
  | 'Motor NX-201N'
  | 'Motores de cirugías'
  | 'Otros'
  | 'Mobiliario'
  | 'Carritos'
  | 'Armarios'
  | 'Pulverizador'

  



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
  | 'Xpect Vision'
  | 'elec'
  | 'DenTech'
  | 'DentaFilm'
  | 'epdent'
  | 'mdmed'
  | 'launca'
  | 'whitebrand'
  ;

  export interface ProductImage {
    url: StaticImageData;  // Cambiado de string a StaticImageData
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
    logo: StaticImageData;
  };
  brand2?: {
    name: ProductBrand;
    logo: StaticImageData;
  };
  description: string;
  shortDescription?: string;
  price?: number;
  category: ProductCategory;
  subcategory?: string;
  features: {
    unique: ProductFeature;
    general: ProductFeature;
    includes?: ProductFeature; 
    optional?: ProductFeature;
    additional?: ProductFeature;
  };
  specifications?: ProductSpecification[];
  images?: ProductImage[];
  gifts?: ProductGift[];
  relatedProducts?: string[]; 
  tags?: string[];
  isActive: boolean;
  inStock?: boolean;
  createdAt: string;
  updatedAt: string;
  videoIframe?: string; 
  videoIframes?: string[]; 
}
