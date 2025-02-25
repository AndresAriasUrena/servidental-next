// src/data/manual-products.ts
import { SpareParts, SparePartsCategory } from '@/types/spareparts';
import assets from '@/assets';

export const categories: SparePartsCategory[] = [
  "Aceites y Detergentes",
  "Lubricantes",
  "Acoples Dentales",
  "Iluminación Dental",
  "Boquillas y Accesorios",
  "Controles",
  "Jeringas",
  "Mangueras",
  "Mangueras Especiales",
  "Transductores",
  "Puntas",
  "Compresores",
  "Partes de Sillón",
  "Refacciones Autoclave",

];

export const spareParts: SpareParts[] = [
  {
    id: "Aceite-Detergente---BienAir-ROJO",
    slug: "Aceite-Detergente---BienAir-ROJO",
    name: "Aceite Detergente - BienAir ROJO",
    category: "Aceites y Detergentes",
    images: [
      {
        url: assets.spareparts.AceiteDetergenteBienAirROJO.default,
        alt: "Aceite Detergente - BienAir ROJO",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:37:37.581630",
    updatedAt: "2025-02-24T19:37:37.581630",
  },
  {
    id: "Aceite-Lubricante---BienAir",
    slug: "Aceite-Lubricante---BienAir",
    name: "Aceite Lubricante - BienAir",
    category: "Lubricantes",
    images: [
      {
        url: assets.spareparts.AceiteLubricanteBienAir.default,
        alt: "Aceite Lubricante - BienAir",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:37:37.692966",
    updatedAt: "2025-02-24T19:37:37.692966",
  },
  {
    id: "Acople-Cavitron-Hembra-DCI",
    slug: "Acople-Cavitron-Hembra-DCI",
    name: "Acople Cavitron Hembra DCI",
    category: "Acoples Dentales",
    images: [
      {
        url: assets.spareparts.AcopleCavitronHembraDCI.default,
        alt: "Acople Cavitron Hembra DCI",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:37:37.788392",
    updatedAt: "2025-02-24T19:37:37.788392",
  },
  {
    id: "Acople-Cavitron-Macho",
    slug: "Acople-Cavitron-Macho",
    name: "Acople Cavitron Macho",
    category: "Acoples Dentales",
    images: [
      {
        url: assets.spareparts.AcopleCavitronMacho.default,
        alt: "Acople Cavitron Macho",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:37:37.884143",
    updatedAt: "2025-02-24T19:37:37.884143",
  },
  {
    id: "Bombillo-halogeno-12v-50w",
    slug: "Bombillo-halogeno-12v-50w",
    name: "Bombillo halogeno 12v-50w",
    category: "Iluminación Dental",
    images: [
      {
        url: assets.spareparts.Bombillohalogeno12v50w.default,
        alt: "Bombillo halogeno 12v-50w",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:37:37.983897",
    updatedAt: "2025-02-24T19:37:37.983897",
  },
  {
    id: "Boquilla-suctor-baja---Metalica-Generica",
    slug: "Boquilla-suctor-baja---Metalica-Generica",
    name: "Boquilla suctor baja - Metálica Genérica",
    category: "Boquillas y Accesorios",
    images: [
      {
        url: assets.spareparts.BoquillasuctorbajaMetalicaGenerica.default,
        alt: "Boquilla suctor baja - Metálica Genérica",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:37:38.085209",
    updatedAt: "2025-02-24T19:37:38.085209",
  },
  {
    id: "Boton-On-Off",
    slug: "Boton-On-Off",
    name: "Botón On-Off",
    category: "Controles",
    images: [
      {
        url: assets.spareparts.BotonOnOff.default,
        alt: "Botón On-Off",
        width: 800,
        height: 800,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:37:38.159166",
    updatedAt: "2025-02-24T19:37:38.159166",
  },
  {
    id: "Jeringa-triple",
    slug: "Jeringa-triple",
    name: "Jeringa triple",
    category: "Jeringas",
    images: [
      {
        url: assets.spareparts.Jeringatriple.default,
        alt: "Jeringa triple",
        width: 800,
        height: 800,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:37:38.220002",
    updatedAt: "2025-02-24T19:37:38.220002",
  },
  {
    id: "Jeringa-triple---Recta",
    slug: "Jeringa-triple---Recta",
    name: "Jeringa triple - Recta",
    category: "Jeringas",
    images: [
      {
        url: assets.spareparts.JeringatripleRecta.default,
        alt: "Jeringa triple - Recta",
        width: 800,
        height: 800,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:37:38.281389",
    updatedAt: "2025-02-24T19:37:38.281389",
  },
  {
    id: "Manguera-31x19",
    slug: "Manguera-31x19",
    name: "Manguera 3.1x1.9",
    category: "Mangueras",
    images: [
      {
        url: assets.spareparts.Manguera31x19.default,
        alt: "Manguera 3.1x1.9",
        width: 800,
        height: 800,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:37:38.338585",
    updatedAt: "2025-02-24T19:37:38.338585",
  },
  {
    id: "Manguera-4x25",
    slug: "Manguera-4x25",
    name: "Manguera 4x2.5",
    category: "Mangueras",
    images: [
      {
        url: assets.spareparts.Manguera4x25.default,
        alt: "Manguera 4x2.5",
        width: 800,
        height: 800,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:37:38.397400",
    updatedAt: "2025-02-24T19:37:38.397400",
  },
  {
    id: "Manguera-6x4",
    slug: "Manguera-6x4",
    name: "Manguera 6x4",
    category: "Mangueras",
    images: [
      {
        url: assets.spareparts.Manguera6x4.default,
        alt: "Manguera 6x4",
        width: 800,
        height: 800,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:37:38.452891",
    updatedAt: "2025-02-24T19:37:38.452891",
  },
  {
    id: "Manguera-8x55",
    slug: "Manguera-8x55",
    name: "Manguera 8x5.5",
    category: "Mangueras",
    images: [
      {
        url: assets.spareparts.Manguera8x55.default,
        alt: "Manguera 8x5.5",
        width: 800,
        height: 800,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:37:38.507626",
    updatedAt: "2025-02-24T19:37:38.507626",
  },
  {
    id: "Manguera-8x6",
    slug: "Manguera-8x6",
    name: "Manguera 8x6",
    category: "Mangueras",
    images: [
      {
        url: assets.spareparts.Manguera8x6.default,
        alt: "Manguera 8x6",
        width: 800,
        height: 800,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:37:38.566208",
    updatedAt: "2025-02-24T19:37:38.566208",
  },
  {
    id: "SIGER---Manguera-Borden-2-huecos",
    slug: "SIGER---Manguera-Borden-2-huecos",
    name: "SIGER - Manguera Borden 2 huecos",
    category: "Mangueras Especiales",
    images: [
      {
        url: assets.spareparts.SIGERMangueraBorden2huecos.default,
        alt: "SIGER - Manguera Borden 2 huecos",
        width: 800,
        height: 800,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:37:38.628036",
    updatedAt: "2025-02-24T19:37:38.628036",
  },
  {
    id: "SIGER---Manguera-Midwest-4-huecos",
    slug: "SIGER---Manguera-Midwest-4-huecos",
    name: "SIGER - Manguera Midwest 4 huecos",
    category: "Mangueras Especiales",
    images: [
      {
        url: assets.spareparts.SIGERMangueraMidwest4huecos.default,
        alt: "SIGER - Manguera Midwest 4 huecos",
        width: 800,
        height: 800,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:37:38.688263",
    updatedAt: "2025-02-24T19:37:38.688263",
  },
  {
    id: "Woodpecker---Pieza-de-mano-transductor-HW-1",
    slug: "Woodpecker---Pieza-de-mano-transductor-HW-1",
    name: "Woodpecker - Pieza de mano (transductor) HW-1",
    category: "Transductores",
    images: [
      {
        url: assets.spareparts.WoodpeckerPiezademanotransductorHW1.default,
        alt: "Woodpecker - Pieza de mano (transductor) HW-1",
        width: 800,
        height: 800,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:37:38.750718",
    updatedAt: "2025-02-24T19:37:38.750718",
  },
  {
    id: "Woodpecker---Pieza-de-mano-transductor-HW-3H",
    slug: "Woodpecker---Pieza-de-mano-transductor-HW-3H",
    name: "Woodpecker - Pieza de mano (transductor) HW-3H",
    category: "Transductores",
    images: [
      {
        url: assets.spareparts.WoodpeckerPiezademanotransductorHW3H.default,
        alt: "Woodpecker - Pieza de mano (transductor) HW-3H",
        width: 800,
        height: 800,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:37:38.822030",
    updatedAt: "2025-02-24T19:37:38.822030",
  },
  {
    id: "Woodpecker---Puntas-G1",
    slug: "Woodpecker---Puntas-G1",
    name: "Woodpecker - Puntas G1",
    category: "Puntas",
    images: [
      {
        url: assets.spareparts.WoodpeckerPuntasG1.default,
        alt: "Woodpecker - Puntas G1",
        width: 800,
        height: 800,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:37:38.894752",
    updatedAt: "2025-02-24T19:37:38.894752",
  },
  {
    id: "Woodpecker---Puntas-G2",
    slug: "Woodpecker---Puntas-G2",
    name: "Woodpecker - Puntas G2",
    category: "Puntas",
    images: [
      {
        url: assets.spareparts.WoodpeckerPuntasG2.default,
        alt: "Woodpecker - Puntas G2",
        width: 800,
        height: 800,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:37:38.950964",
    updatedAt: "2025-02-24T19:37:38.950964",
  },
  {
    id: "Woodpecker---Puntas-limpiador",
    slug: "Woodpecker---Puntas-limpiador",
    name: "Woodpecker - Puntas limpiador",
    category: "Puntas",
    images: [
      {
        url: assets.spareparts.WoodpeckerPuntaslimpiador.default,
        alt: "Woodpecker - Puntas limpiador",
        width: 800,
        height: 800,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:37:39.018969",
    updatedAt: "2025-02-24T19:37:39.018969",
  },
  {
    id: "Woodpecker---Puntas-P1",
    slug: "Woodpecker---Puntas-P1",
    name: "Woodpecker - Puntas P1",
    category: "Puntas",
    images: [
      {
        url: assets.spareparts.WoodpeckerPuntasP1.default,
        alt: "Woodpecker - Puntas P1",
        width: 800,
        height: 800,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:37:39.084026",
    updatedAt: "2025-02-24T19:37:39.084026",
  },
  {
    id: "Compresor---Anillos-genericos",
    slug: "Compresor---Anillos-genericos",
    name: "Compresor - Anillos genericos",
    category: "Compresores",
    images: [
      {
        url: assets.spareparts.CompresorAnillosgenericos.default,
        alt: "Compresor - Anillos genericos",
        width: 800,
        height: 800,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:45:32.352261",
    updatedAt: "2025-02-24T19:45:32.352261",
  },
  {
    id: "Compresor---Capacitor-80uf",
    slug: "Compresor---Capacitor-80uf",
    name: "Compresor - Capacitor 80uf",
    category: "Compresores",
    images: [
      {
        url: assets.spareparts.CompresorCapacitor80uf.default,
        alt: "Compresor - Capacitor 80uf",
        width: 800,
        height: 800,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:45:32.416326",
    updatedAt: "2025-02-24T19:45:32.416326",
  },
  {
    id: "Compresor---Electrovalvula",
    slug: "Compresor---Electrovalvula",
    name: "Compresor - Electrovalvula",
    category: "Compresores",
    images: [
      {
        url: assets.spareparts.CompresorElectrovalvula.default,
        alt: "Compresor - Electrovalvula",
        width: 800,
        height: 800,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:45:32.495927",
    updatedAt: "2025-02-24T19:45:32.495927",
  },
  {
    id: "Compresor---Filtro-compresor-intake",
    slug: "Compresor---Filtro-compresor-intake",
    name: "Compresor - Filtro compresor (intake)",
    category: "Compresores",
    images: [
      {
        url: assets.spareparts.CompresorFiltrocompresorintake.default,
        alt: "Compresor - Filtro compresor (intake)",
        width: 800,
        height: 800,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:45:32.569231",
    updatedAt: "2025-02-24T19:45:32.569231",
  },
  {
    id: "Compresor---Filtro-de-aire-regulador-con-Manometro",
    slug: "Compresor---Filtro-de-aire-regulador-con-Manometro",
    name: "Compresor - Filtro de aire regulador con Manómetro",
    category: "Compresores",
    images: [
      {
        url: assets.spareparts.CompresorFiltrodeairereguladorconManometro.default,
        alt: "Compresor - Filtro de aire regulador con Manómetro",
        width: 800,
        height: 800,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:45:32.636153",
    updatedAt: "2025-02-24T19:45:32.636153",
  },
  {
    id: "Compresor---Motor-completo",
    slug: "Compresor---Motor-completo",
    name: "Compresor - Motor completo",
    category: "Compresores",
    images: [
      {
        url: assets.spareparts.CompresorMotorcompleto.default,
        alt: "Compresor - Motor completo",
        width: 800,
        height: 800,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:45:32.710172",
    updatedAt: "2025-02-24T19:45:32.710172",
  },
  {
    id: "Compresor---Presostato",
    slug: "Compresor---Presostato",
    name: "Compresor - Presostato",
    category: "Compresores",
    images: [
      {
        url: assets.spareparts.CompresorPresostato.default,
        alt: "Compresor - Presostato",
        width: 800,
        height: 800,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:45:32.783552",
    updatedAt: "2025-02-24T19:45:32.783552",
  },
  {
    id: "Compresor---Valvula-Alivio-seguridad",
    slug: "Compresor---Valvula-Alivio-seguridad",
    name: "Compresor - Válvula Alivio seguridad",
    category: "Compresores",
    images: [
      {
        url: assets.spareparts.CompresorValvulaAlivioseguridad.default,
        alt: "Compresor - Válvula Alivio seguridad",
        width: 800,
        height: 800,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:45:32.853711",
    updatedAt: "2025-02-24T19:45:32.853711",
  },
  {
    id: "Compresor---Valvula-check",
    slug: "Compresor---Valvula-check",
    name: "Compresor - Válvula check",
    category: "Compresores",
    images: [
      {
        url: assets.spareparts.CompresorValvulacheck.default,
        alt: "Compresor - Válvula check",
        width: 800,
        height: 800,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T19:45:32.927803",
    updatedAt: "2025-02-24T19:45:32.927803",
  },
  {
    id: "COXO---Cabeza-Contrangulo-NSKPalancaCH2",
    slug: "COXO---Cabeza-Contrangulo-NSKPalancaCH2",
    name: "COXO - Cabeza Contrangulo (NSK)(Palanca)(CH2)",
    category: "Contrangulos", // <--- Re-categorizado
    images: [
      {
        url: assets.spareparts.COXOCabezaContranguloNSKPalancaCH2.default,
        alt: "COXO - Cabeza Contrangulo (NSK)(Palanca)(CH2)",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T21:38:34.327287",
    updatedAt: "2025-02-24T21:38:34.327287",
  },
  {
    id: "COXO---Cabeza-Contrangulo-NSKPush-ButtonCH4",
    slug: "COXO---Cabeza-Contrangulo-NSKPush-ButtonCH4",
    name: "COXO - Cabeza Contrangulo (NSK)(Push Button)(CH4)",
    category: "Contrangulos", // <--- Re-categorizado
    images: [
      {
        url: assets.spareparts.COXOCabezaContranguloNSKPushButtonCH4.default,
        alt: "COXO - Cabeza Contrangulo (NSK)(Push Button)(CH4)",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T21:38:34.434400",
    updatedAt: "2025-02-24T21:38:34.434400",
  },
  {
    id: "DTE---Manguera-de-pieza-de-mano-Satelec",
    slug: "DTE---Manguera-de-pieza-de-mano-Satelec",
    name: "DTE - Manguera de pieza de mano Satelec",
    category: "Mangueras Especiales", // <--- Re-categorizado
    images: [
      {
        url: assets.spareparts.DTEMangueradepiezademanoSatelec.default,
        alt: "DTE - Manguera de pieza de mano Satelec",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T21:38:34.549508",
    updatedAt: "2025-02-24T21:38:34.549508",
  },
  {
    id: "DTE---Pieza-de-mano-HD-7H-Satelec",
    slug: "DTE---Pieza-de-mano-HD-7H-Satelec",
    name: "DTE - Pieza de mano HD-7H (Satelec)",
    category: "Transductores", // <--- Re-categorizado (ultrasónico)
    images: [
      {
        url: assets.spareparts.DTEPiezademanoHD7HSatelec.default,
        alt: "DTE - Pieza de mano HD-7H (Satelec)",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T21:38:34.650476",
    updatedAt: "2025-02-24T21:38:34.650476",
  },
  {
    id: "DTE---Pieza-de-mano-Satelec",
    slug: "DTE---Pieza-de-mano-Satelec",
    name: "DTE - Pieza de mano Satelec",
    category: "Transductores", // <--- Re-categorizado (ultrasónico)
    images: [
      {
        url: assets.spareparts.DTEPiezademanoSatelec.default,
        alt: "DTE - Pieza de mano Satelec",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T21:38:34.736627",
    updatedAt: "2025-02-24T21:38:34.736627",
  },
  {
    id: "DTE---Punta-DT1",
    slug: "DTE---Punta-DT1",
    name: "DTE - Punta DT1",
    category: "Puntas", // <--- Re-categorizado
    images: [
      {
        url: assets.spareparts.DTEPuntaDT1.default,
        alt: "DTE - Punta DT1",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T21:38:34.834962",
    updatedAt: "2025-02-24T21:38:34.834962",
  },
  {
    id: "Puntas-de-jeringa-Triple-Canula",
    slug: "Puntas-de-jeringa-Triple-Canula",
    name: "Puntas de jeringa Triple (Cánula)",
    category: "Jeringas", // <--- Re-categorizado
    images: [
      {
        url: assets.spareparts.PuntasdejeringaTripleCanula.default,
        alt: "Puntas de jeringa Triple (Cánula)",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T21:38:34.948387",
    updatedAt: "2025-02-24T21:38:34.948387",
  },
  {
    id: "SIGER---Brazo-de-monitor",
    slug: "SIGER---Brazo-de-monitor",
    name: "SIGER - Brazo de monitor",
    category: "Partes de Sillón", // <--- Categoría NUEVA
    images: [
      {
        url: assets.spareparts.SIGERBrazodemonitor.default,
        alt: "SIGER - Brazo de monitor",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T21:38:35.061820",
    updatedAt: "2025-02-24T21:38:35.061820",
  },
  {
    id: "SIGER---Motor-de-respaldo-TiMotion",
    slug: "SIGER---Motor-de-respaldo-TiMotion",
    name: "SIGER - Motor de respaldo (TiMotion)",
    category: "Partes de Sillón", // <--- Categoría NUEVA
    images: [
      {
        url: assets.spareparts.SIGERMotorderespaldoTiMotion.default,
        alt: "SIGER - Motor de respaldo (TiMotion)",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T21:38:35.183451",
    updatedAt: "2025-02-24T21:38:35.183451",
  },
  {
    id: "SIGER---Piston-de-banqueta-SOLO",
    slug: "SIGER---Piston-de-banqueta-SOLO",
    name: "SIGER - Pistón de banqueta (SOLO)",
    category: "Partes de Sillón", // <--- Categoría NUEVA
    images: [
      {
        url: assets.spareparts.SIGERPistondebanquetaSOLO.default,
        alt: "SIGER - Pistón de banqueta (SOLO)",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T21:38:35.279563",
    updatedAt: "2025-02-24T21:38:35.279563",
  },
  {
    id: "SIGER---Piston-de-sillon-Hidraulico",
    slug: "SIGER---Piston-de-sillon-Hidraulico",
    name: "SIGER - Pistón de sillón Hidráulico",
    category: "Partes de Sillón", // <--- Categoría NUEVA
    images: [
      {
        url: assets.spareparts.SIGERPistondesillonHidraulico.default,
        alt: "SIGER - Pistón de sillón Hidráulico",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T21:38:35.373813",
    updatedAt: "2025-02-24T21:38:35.373813",
  },
  {
    id: "Sturdy---Juego-de-Valvula-de-escape",
    slug: "Sturdy---Juego-de-Valvula-de-escape",
    name: "Sturdy - Juego de Válvula de escape",
    category: "Refacciones Autoclave", // <--- Categoría NUEVA
    images: [
      {
        url: assets.spareparts.SturdyJuegodeValvuladeescape.default,
        alt: "Sturdy - Juego de Válvula de escape",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T21:38:35.482892",
    updatedAt: "2025-02-24T21:38:35.482892",
  },
  {
    id: "Sturdy---Resistencia-SA-232-X",
    slug: "Sturdy---Resistencia-SA-232-X",
    name: "Sturdy - Resistencia SA 232-X",
    category: "Refacciones Autoclave", // <--- Categoría NUEVA
    images: [
      {
        url: assets.spareparts.SturdyResistenciaSA232X.default,
        alt: "Sturdy - Resistencia SA 232-X",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T21:38:35.590376",
    updatedAt: "2025-02-24T21:38:35.590376",
  },
  {
    id: "Sturdy---Set-Tarjeta-Principal-PCB-SA-232",
    slug: "Sturdy---Set-Tarjeta-Principal-PCB-SA-232",
    name: "Sturdy - Set Tarjeta Principal PCB (SA-232)",
    category: "Refacciones Autoclave", // <--- Categoría NUEVA
    images: [
      {
        url: assets.spareparts.SturdySetTarjetaPrincipalPCBSA232.default,
        alt: "Sturdy - Set Tarjeta Principal PCB (SA-232)",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T21:38:35.724524",
    updatedAt: "2025-02-24T21:38:35.724524",
  },
  {
    id: "Sturdy---Set-Tarjeta-Principal-PCB-SA-232X",
    slug: "Sturdy---Set-Tarjeta-Principal-PCB-SA-232X",
    name: "Sturdy - Set Tarjeta Principal PCB (SA-232X)",
    category: "Refacciones Autoclave", // <--- Categoría NUEVA
    images: [
      {
        url: assets.spareparts.SturdySetTarjetaPrincipalPCBSA232X.default,
        alt: "Sturdy - Set Tarjeta Principal PCB (SA-232X)",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T21:38:35.855327",
    updatedAt: "2025-02-24T21:38:35.855327",
  },
  {
    id: "Sturdy---Switch-de-Temperatura",
    slug: "Sturdy---Switch-de-Temperatura",
    name: "Sturdy - Switch de Temperatura",
    category: "Refacciones Autoclave", // <--- Categoría NUEVA
    images: [
      {
        url: assets.spareparts.SturdySwitchdeTemperatura.default,
        alt: "Sturdy - Switch de Temperatura",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T21:38:35.981280",
    updatedAt: "2025-02-24T21:38:35.981280",
  },
  {
    id: "Sturdy---Valvula-solenoide-de-vapor",
    slug: "Sturdy---Valvula-solenoide-de-vapor",
    name: "Sturdy - Valvula solenoide de vapor",
    category: "Refacciones Autoclave", // <--- Categoría NUEVA
    images: [
      {
        url: assets.spareparts.SturdyValvulasolenoidedevapor.default,
        alt: "Sturdy - Valvula solenoide de vapor",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T21:38:36.089517",
    updatedAt: "2025-02-24T21:38:36.089517",
  },
  {
    id: "Sturdy---Valvula-de-seguridad-SA232-18-KG-cm2",
    slug: "Sturdy---Valvula-de-seguridad-SA232-18-KG-cm2",
    name: "Sturdy - Válvula de seguridad SA232 (1.8 KG-cm2)",
    category: "Refacciones Autoclave", // <--- Categoría NUEVA
    images: [
      {
        url: assets.spareparts.SturdyValvuladeseguridadSA23218KGcm2.default,
        alt: "Sturdy - Válvula de seguridad SA232 (1.8 KG-cm2)",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T21:38:36.194891",
    updatedAt: "2025-02-24T21:38:36.194891",
  },
  {
    id: "Sturdy---Valvula-de-vapor-principal",
    slug: "Sturdy---Valvula-de-vapor-principal",
    name: "Sturdy - Válvula de vapor principal",
    category: "Refacciones Autoclave", // <--- Categoría NUEVA
    images: [
      {
        url: assets.spareparts.SturdyValvuladevaporprincipal.default,
        alt: "Sturdy - Válvula de vapor principal",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T21:38:36.303194",
    updatedAt: "2025-02-24T21:38:36.303194",
  },
  {
    id: "TPC---Brazo-para-monitor",
    slug: "TPC---Brazo-para-monitor",
    name: "TPC - Brazo para monitor",
    category: "Partes de Sillón", // <--- Categoría NUEVA (similar al de SIGER)
    images: [
      {
        url: assets.spareparts.TPCBrazoparamonitor.default,
        alt: "TPC - Brazo para monitor",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T21:38:36.416117",
    updatedAt: "2025-02-24T21:38:36.416117",
  },
  {
    id: "TPC---Cilindro-compresor-Grande",
    slug: "TPC---Cilindro-compresor-Grande",
    name: "TPC - Cilindro compresor (Grande)",
    category: "Compresores", 
    images: [
      {
        url: assets.spareparts.TPCCilindrocompresorGrande.default,
        alt: "TPC - Cilindro compresor (Grande)",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T21:38:36.527550",
    updatedAt: "2025-02-24T21:38:36.527550",
  },
  {
    id: "TPC---Codo-manguera",
    slug: "TPC---Codo-manguera",
    name: "TPC - Codo manguera",
    category: "Mangueras", 
    images: [
      {
        url: assets.spareparts.TPCCodomanguera.default,
        alt: "TPC - Codo manguera",
        width: 1080,
        height: 1080,
        isPrimary: true,
      }
    ],
    isActive: true,
    createdAt: "2025-02-24T21:38:36.639283",
    updatedAt: "2025-02-24T21:38:36.639283",
  }
];