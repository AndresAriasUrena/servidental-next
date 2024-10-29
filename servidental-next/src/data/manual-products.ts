// src/data/manual-products.ts
import { Product, ProductCategory, ProductBrand } from '@/types/product';
import assets from '@/assets';

export const categories: ProductCategory[] = [
  "Anestesia",
  "Bombas de succión",
  "Carrito para accesorios",
  "Compresores",
  "Contra-ángulos",
  "Cortadores",
  "Equipo de Rayos X",
  "Esterilización",
  "Fresadora",
  "Lámparas Dentales",
  "Lámparas de Fotocurado",
  "Microarenador",
  "Motores",
  "Piezas de mano",
  "Scanner",
  "Selladoras",
  "Sensores Digitales",
  "Termofomadoras",
  "Tomógrafos",
  "Unidades Dentales",
  "Vaporizadores"
];

export const brands: ProductBrand[] = [
  "BioArt",
  "COXO",
  "DOF",
  "Meyer",
  "Micro NX",
  "Siger",
  "Sturdy",
  "TPC",
  "Xpect Vision"
];

export const products: Product[] = [
    {
      id: "anestesia",
      slug: "anestesia",
      name: "Jeringa",
      subtitle: "Anestesia",
      brand: {
        name: "COXO",
        logo: "coxo_logo.png"
      },
      description: "Alta precisión",
      shortDescription: "Alta precisión",
      features: {
        unique: {
          title: "Características Únicas",
          items: [
            "Inyección estable de alta precisión",
            "Diferentes velocidades a elegir: lento, medio, rápido"
          ]
        },
        general: {
          title: "Características Generales",
          items: []
        }
      },
      images: [
        {
          url: "anestesia/GENI2.png",
          alt: "Jeringa Anestesia",
          width: 800,
          height: 600,
          isPrimary: true
        }
      ],
      category: "Anestesia",
      isActive: true,
      createdAt: "2024-10-29T00:10:22.089Z",
      updatedAt: "2024-10-29T00:10:22.089Z"
    },
    {
      id: "bomba-vacio-anyvac30",
      slug: "bomba-vacio-anyvac30",
      name: "ANYVAC 30",
      subtitle: "Bomba de vacío húmeda",
      brand: {
        name: "Siger",
        logo: "siger_logo.png"
      },
      description: "Reduce consumo de agua hasta en un tercio",
      shortDescription: "Reduce consumo de agua hasta en un tercio",
      features: {
        unique: {
          title: "Características Únicas",
          items: [
            "Crea una potente presión de vacío con menos agua",
            "Succión de 1 a 4 unidades dentales",
            "Filtro fácil de manejar",
            "Voltaje Min/Máx: 110Vac",
            "Peso neto: 18kg",
            "Dimensiones: 304x250x350mm"
          ]
        },
        general: {
          title: "Características Generales",
          items: []
        }
      },
      images: [
        {
          url: "bomba_de_vacio_humeda/anyvac30_1.png",
          alt: "ANYVAC 30",
          width: 800,
          height: 600,
          isPrimary: true
        }
      ],
      category: "Bombas de succión",
      isActive: true,
      createdAt: "2024-10-29T00:10:22.104Z",
      updatedAt: "2024-10-29T00:10:22.104Z"
    },
    {
      id: "bomba-vacio-vc10",
      slug: "bomba-vacio-vc10",
      name: "VC-10",
      subtitle: "Bomba de vacío seca",
      brand: {
        name: "Siger",
        logo: "siger_logo.png"
      },
      description: "Separación eficiente entre agua y desechos",
      shortDescription: "Separación eficiente entre agua y desechos",
      features: {
        unique: {
          title: "Características Únicas",
          items: [
            "Aplicable de trabajo: 1-2",
            "Potencia de entrada: 220v(1 ~)/50-60Hz",
            "Potencia nominal: 500W",
            "Corriente máxima: 4.8A",
            "Presión negativa: -13",
            "Max de flujo de Gas: 1000L/min",
            "Conversión de frecuencia: NO",
            "Dual-motor: NO",
            "Ruido: 56dB(A)",
            "Peso: 17kg",
            "Dimensión: 300*440*580mm"
          ]
        },
        general: {
          title: "Características Generales",
          items: []
        }
      },
      images: [
        {
          url: "bomba_de_vacio_seca/vc-10_1.png",
          alt: "VC-10",
          width: 800,
          height: 600,
          isPrimary: true
        }
      ],
      category: "Bombas de succión",
      isActive: true,
      createdAt: "2024-10-29T00:10:22.113Z",
      updatedAt: "2024-10-29T00:10:22.113Z"
    },
    // ... continuará con más productos
    {
        id: "carrito",
        slug: "carrito",
        name: "CARRITO",
        subtitle: "MULTIFUNCIONAL",
        brand: {
          name: "Siger",
          logo: "siger_logo.png"
        },
        description: "Tomacorrientes incorporados",
        shortDescription: "Tomacorrientes incorporados",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Diseño industrial",
              "Minimalista",
              "Fácil de instalar",
              "Material metálico",
              "Resistente y duradero",
              "Fácil de limpiar y desinfectar",
              "Con ruedas especiales para un movimiento flexible y silencioso"
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "carrito_multifuncional/carrito-1_1.png",
            alt: "CARRITO",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Carrito para accesorios",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.144Z",
        updatedAt: "2024-10-29T00:10:22.144Z"
      },
      {
        id: "compresor-dc701",
        slug: "compresor-dc701",
        name: "TPC DC-701",
        subtitle: "Compresor de aire super silencioso",
        brand: {
          name: "TPC",
          logo: "tpc_logo.png"
        },
        description: "Libre de Aceite",
        shortDescription: "Libre de Aceite",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Potencia: 0.75Kw(1HP)",
              "Volumen del tanque: 32L",
              "Flujo de aire: 152L/min5.37CFM)",
              "Ruido: ≤60dB",
              "Peso neto: 29.5kg",
              "Presion: 8Bar(116Psi)",
              "Dimensiones: 410*410*720mm(L*W*H)."
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "compresor/DC-701-1hp_1.png",
            alt: "TPC DC-701",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Compresores",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.151Z",
        updatedAt: "2024-10-29T00:10:22.151Z"
      },
      {
        id: "compresor-dc702",
        slug: "compresor-dc702",
        name: "TPC DC-702",
        subtitle: "Compresor de aire super silencioso",
        brand: {
          name: "TPC",
          logo: "tpc_logo.png"
        },
        description: "Libre de Aceite",
        shortDescription: "Libre de Aceite",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Potencia: 1.5KW(2HP)",
              "Volumen del tanque: 60L",
              "Flujo de aire: 152L/min5.37CFM)",
              "Ruido: ≤60dB",
              "Peso neto: 50kg",
              "Presion: 8Bar(116Psi)"
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "compresor/DC-702-2hp_1.jpg",
            alt: "TPC DC-702",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Compresores",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.163Z",
        updatedAt: "2024-10-29T00:10:22.163Z"
      },
      {
        id: "compresor-dc703",
        slug: "compresor-dc703",
        name: "TPC DC-703",
        subtitle: "Compresor de aire super silencioso",
        brand: {
          name: "TPC",
          logo: "tpc_logo.png"
        },
        description: "Libre de Aceite",
        shortDescription: "Libre de Aceite",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Potencia: 2.25KW(3HP)",
              "Volumen del tanque: 90L",
              "Flujo de aire: 152L/min5.37CFM)",
              "Ruido: ≤60dB",
              "Peso neto: 78kg",
              "Presion: 8Bar(116Psi)"
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "compresor/DC-703-3hp_1.jpg",
            alt: "TPC DC-703",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Compresores",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.169Z",
        updatedAt: "2024-10-29T00:10:22.169Z"
      },
      // ... continuará con más productos
      {
        id: "contraangulo-cirugia",
        slug: "contraangulo-cirugia",
        name: "BA250LT",
        subtitle: "Contra-ángulo 1:5",
        brand: {
          name: "COXO",
          logo: "coxo_logo.png"
        },
        description: "Diseño ergonómico",
        shortDescription: "Diseño ergonómico",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Aumento de velocidad 1:5 contra ángulo",
              "Cubierta inteligente: resistente a rayones con mejor agarre.",
              "Líder ISOs",
              "Rociador cuádruple",
              "Varilla de vidrio de fibra óptica",
              "Cuerpo de Titanio",
              "Hecho en Alemania"
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "contrangulo/contrangulo-1_1.jpg",
            alt: "BA250LT",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Contra-ángulos",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.175Z",
        updatedAt: "2024-10-29T00:10:22.175Z"
      },
      {
        id: "contraangulo-implantes",
        slug: "contraangulo-implantes",
        name: "SG200L",
        subtitle: "Contra-ángulo para implantes",
        brand: {
          name: "COXO",
          logo: "coxo_logo.png"
        },
        description: "Acero inoxidable",
        shortDescription: "Acero inoxidable",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Radio: 20:1",
              "Velocidad máxima: 2,000 RPM",
              "Torque Máximo: 70 N, cm",
              "Material: Acero inoxidable",
              "Bur: CA bur (Ø2.35)"
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "contrangulo-implantes/contrangulo-para-implantes.png",
            alt: "SG200L",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Contra-ángulos",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.183Z",
        updatedAt: "2024-10-29T00:10:22.183Z"
      },
      {
        id: "cortador-gutta-percha",
        slug: "cortador-gutta-percha",
        name: "GP CUT & FIT",
        subtitle: "CORTADOR DE GUTTA PERCHA",
        brand: {
          name: "COXO",
          logo: "coxo_logo.png"
        },
        description: "Tamaño ajustable (3 tipos)",
        shortDescription: "Tamaño ajustable (3 tipos)",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Tamaño exacto",
              "Borde cortado limpio",
              "Cuchilla incorporada de forma segura",
              "Cono GP cónico especial con tamaño de 31mm",
              "Hecho en Korea del Sur"
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "gp_cut_fit/rs=w_888,h_1184 (2).jpg",
            alt: "GP CUT & FIT",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Cortadores",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.188Z",
        updatedAt: "2024-10-29T00:10:22.188Z"
      },
      {
        id: "cortador-gutta-percha-ultrasonico",
        slug: "cortador-gutta-percha-ultrasonico",
        name: "UC CUT",
        subtitle: "CORTADOR DE GUTTA PERCHA ULTRASÓNICO",
        brand: {
          name: "COXO",
          logo: "coxo_logo.png"
        },
        description: "Punta multiusos",
        shortDescription: "Punta multiusos",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Calor instantáneo para 180°C y modo vibración",
              "El calor se produce a partir de 2 mm desde el final de la punta.",
              "Gran durabilidad de la punta",
              "Corte GP",
              "Obturación de conductos radiculares",
              "Penetración de sellador",
              "Eliminar la burbuja de un conducto radicular"
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "cortador_gutta_percha_ultrasonico/rs=w_888,h_1184_1.jpg",
            alt: "UC CUT",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Cortadores",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.193Z",
        updatedAt: "2024-10-29T00:10:22.193Z"
      },
      // ... continuará con más productos
      {
        id: "c-smart-endomotor",
        slug: "c-smart-endomotor",
        name: "C-SMART PILOT",
        subtitle: "Endomotor 2 en 1",
        brand: {
          name: "COXO",
          logo: "coxo_logo.png"
        },
        description: "Con localizador de ápice",
        shortDescription: "Con localizador de ápice",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Entrada del adaptador: AC100~240V, 50/60Hz",
              "Salida: CC 10 V, 1,5 A",
              "Batería de la unidad de control: batería de iones de litio (DC7.4v 2600mAh)",
              "Batería de la pieza de mano: batería de iones de litio (DC3.7v 1200 mAh)",
              "Rango de velocidad de rotación: 150 ~ 1000 rpm",
              "Par de torsión: 0,6 ~ 3,9 N.cm",
              "Par de torsión: 0,6 ~ 3,9 N.cm",
              "Volumen (cm): 24×24×7,5"
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "c-smart-endomotor/endomotor.jpg",
            alt: "C-SMART PILOT",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Motores",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.130Z",
        updatedAt: "2024-10-29T00:10:22.130Z"
      },
      {
        id: "camara-intraoral",
        slug: "camara-intraoral",
        name: "Intraorales",
        subtitle: "Cámaras",
        brand: {
          name: "Siger",
          logo: "siger_logo.png"
        },
        description: "Cámaras Inalámbrica de alta definición",
        shortDescription: "Cámaras Inalámbrica de alta definición",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Carga automática, video de implante de soporte",
              "Transmisión de video inalámbrica 5G, más estable",
              "Procesador HUAWEI-SILICON, imagen más clara",
              "Lente ultrafina de 6 mm",
              "Más fácil de ver los dientes posteriores",
              "Pantalla de visualización completa IPS de 21,5 pulgadas",
              "Foto clara en la pantalla desde cualquier ángulo"
            ]
          },
          general: {
            title: "Características Generales",
            items: [
              "Transferencia inalámbrica 5G",
              "Pantalla táctil de 24 pulgadas FHD",
              "Con Wifi, Bluetooth, interfaz USB de 6 piezas",
              "8 GB de RAM, SSD de 256 GB"
            ]
          }
        },
        images: [
          {
            url: "camara-intraoral/camara-1.png",
            alt: "Intraorales",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Cámaras Intraorales",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.138Z",
        updatedAt: "2024-10-29T00:10:22.138Z"
      },
      {
        id: "sensor-digital",
        slug: "sensor-digital",
        name: "CONTEO DE FOTONES",
        subtitle: "RADIOVISIÓGRAFO Intraoral",
        brand: {
          name: "Xpect Vision",
          logo: "xpect-vision.png"
        },
        description: "2 tamaños disponibles: 0.8 y 1.5",
        shortDescription: "2 tamaños disponibles: 0.8 y 1.5",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "CE aprobado",
              "Tecnología patentada de imágenes directas de alta definición",
              "Impresionante resolución y contraste de la primera imagen",
              "Durabilidad comprobada mediante pruebas de laboratorio",
              "Diseño de huella delgada para mayor comodidad y precisión",
              "Calidad respaldada por una garantía de 2 años"
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "sensor_digital/sensor-digital-3.png",
            alt: "CONTEO DE FOTONES",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Sensores Digitales",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.409Z",
        updatedAt: "2024-10-29T00:10:22.409Z"
      },
      // ... continuará con más productos
      {
        id: "eagle-ios",
        slug: "eagle-ios",
        name: "Eagle IOS",
        subtitle: "Escáner intraoral portátil",
        brand: {
          name: "DOF",
          logo: "dof_logo.png"
        },
        description: "Compacto y ergonómico",
        shortDescription: "Compacto y ergonómico",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Software amigable y fácil de usar",
              "Diseñado para una impresión más sencilla, rápida y precisa",
              "Sistema abierto, sin licencias anuales",
              "Envío rápido y sencillo a través de nuestro sistema Cloud",
              "Luz LED - Alta potencia"
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "escaner_portatil_eagle/eagle-ios-0_1.jpeg",
            alt: "Eagle IOS",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Scanner",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.210Z",
        updatedAt: "2024-10-29T00:10:22.210Z"
      },
      {
        id: "esterilizador-manual",
        slug: "esterilizador-manual",
        name: "SA-232",
        subtitle: "Esterilizador Manual",
        brand: {
          name: "Sturdy",
          logo: "sturdy_logo.jpg"
        },
        description: "Protector térmico",
        shortDescription: "Protector térmico",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Manual",
              "Cámara de 16 litros en acero inoxidable",
              "Puerta con sistema de cerrado tipo tornillo de perilla triangular",
              "Válvula de control de seguridad por alta presión",
              "Dos temperaturas de trabajo (121º y 132º)",
              "Selectores e indicadores de tiempo",
              "Selector para instrumentos envueltos o desenvueltos",
              "Protector térmico en caso de sobre calentamiento"
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "esterilizador_manual/esterilizador-manual_1.png",
            alt: "SA-232",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Esterilización",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.215Z",
        updatedAt: "2024-10-29T00:10:22.215Z"
      },
      {
        id: "esterilizador-semiautomatico",
        slug: "esterilizador-semiautomatico",
        name: "SA-232X",
        subtitle: "Esterilizador semi automático",
        brand: {
          name: "Sturdy",
          logo: "sturdy_logo.jpg"
        },
        description: "Ciclo de secado incorporado",
        shortDescription: "Ciclo de secado incorporado",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Semi automática",
              "Cámara de 16 litros en acero inoxidable",
              "Puerta con sistema de cerrado tipo tornillo de perilla hexagonal",
              "Válvula de control de seguridad por alta presión",
              "Dos temperaturas de trabajo (121º y 132º)",
              "Selectores e indicadores de tiempo",
              "Selector para instrumentos envueltos o desenvueltos",
              "Tanque para depósito de agua",
              "Sistema de condensado para economizar agua",
              "Protector térmico en caso de sobre calentamiento"
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "esterilizador_semiautomatico/esterilziador-semiautomatico.png",
            alt: "SA-232X",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Esterilización",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.222Z",
        updatedAt: "2024-10-29T00:10:22.222Z"
      },
      // ... continuará con más productos
      {
        id: "freedom-1-scanner",
        slug: "freedom-1-scanner",
        name: "FREEDOM 1",
        subtitle: "Scanner Intraoral",
        brand: {
          name: "DOF",
          logo: "dof_logo.png"
        },
        description: "5 megapíxeles con tecnología patentada",
        shortDescription: "5 megapíxeles con tecnología patentada",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "5 megapixeles",
              "Tecnología patentada",
              "Sistema de movimiento de cámara",
              "Escaneo cómodo y estable",
              "Cámara se mueve libremente",
              "Líneas de margen nítidas",
              "Resolución UHD"
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "scanner/freedom-1.png",
            alt: "FREEDOM 1",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Scanner",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.228Z",
        updatedAt: "2024-10-29T00:10:22.228Z"
      },
      {
        id: "fresadora",
        slug: "fresadora",
        name: "CRAFT 5X FRESADORA",
        subtitle: "TODO EN UNO",
        brand: {
          name: "DOF",
          logo: "dof_logo.png"
        },
        description: "Fresado húmedo y seco",
        shortDescription: "Fresado húmedo y seco",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Tanque de agua",
              "Recolector de polvo",
              "Compresor",
              "Compacto",
              "Resistencia superior",
              "Fresado circonio",
              "Fresado cera",
              "Fresado PMMA",
              "Fresado cerámica híbrida",
              "Fresado vitrocerámica",
              "Fresado titanio"
            ]
          },
          general: {
            title: "Características Generales",
            items: [
              "Software Mill Box 5X original",
              "Compresor",
              "Aspiradora",
              "Bomba de agua",
              "Kit de brocas (21 UD)",
              "Aceite refrigerante (1 L)",
              "E-Max Jig (6 slots)",
              "Garantía 12 meses general",
              "Garantía 24 meses en Drill"
            ]
          }
        },
        images: [
          {
            url: "fresadora/fresadora-2.png",
            alt: "CRAFT 5X FRESADORA",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Fresadora",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.233Z",
        updatedAt: "2024-10-29T00:10:22.233Z"
      },
      {
        id: "meyer-1-scanner",
        slug: "meyer-1-scanner",
        name: "MEYER",
        subtitle: "Scanner Intraoral",
        brand: {
          name: "Meyer",
          logo: "meyer.png"
        },
        description: "Procesamiento inteligente de imágenes",
        shortDescription: "Procesamiento inteligente de imágenes",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Escanea eficiente",
              "Procesamiento inteligente de imágenes",
              "Calibración con un clic",
              "Operación somatosensorial",
              "Datos precisos",
              "Cómoda para sostener, fácil de usar y operación flexible"
            ]
          },
          general: {
            title: "Características Generales",
            items: [
              "Peso de 245g",
              "Tecnología anti empañante en puntas",
              "Profundidad de escaneo de mas de 15mm",
              "Calidad de escaneo superior a 15 micras",
              "Incluye Maleta de transporte",
              "Incluye 5 puntas esterilizables"
            ]
          }
        },
        images: [
          {
            url: "scanner/meyer.webp",
            alt: "MEYER",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Scanner",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.302Z",
        updatedAt: "2024-10-29T00:10:22.302Z"
      },
      // ... continuará con más productos
      {
        id: "lampara-fotocurado-caries",
        slug: "lampara-fotocurado-caries",
        name: "DB686 Nano",
        subtitle: "Lámpara de fotocurado",
        brand: {
          name: "COXO",
          logo: "coxo_logo.png"
        },
        description: "Con detector de caries incorporado",
        shortDescription: "Con detector de caries incorporado",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Cuerpo metálico completo",
              "Pequeño y exquisito, solo 13,5 mm de diámetro exterior",
              "Luz indicadora y llave de control, dos en uno",
              "La cabeza puede girar 360°",
              "4 mechas, amplio espectro: 380-520 mm, adecuado para la mayoría de resinas de curado UV",
              "Núcleo de luz LED de detección de caries independiente",
              "Sistema de medición LED de alta sensibilidad incorporado",
              "Rango de curado de 10 mm de ancho",
              "Profundidad de curado de 8 mm",
              "Dos baterías de serie"
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "lampara_fotocurado_detector_caries/fotocurado-1.png",
            alt: "DB686 Nano",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Lámparas de Fotocurado",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.257Z",
        updatedAt: "2024-10-29T00:10:22.257Z"
      },
      {
        id: "lampara-fotocurado-honor",
        slug: "lampara-fotocurado-honor",
        name: "HONOR DB686",
        subtitle: "Lámpara de fotocurado",
        brand: {
          name: "COXO",
          logo: "coxo_logo.png"
        },
        description: "Alta potencia lumínica ajustable",
        shortDescription: "Alta potencia lumínica ajustable",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Potencia lumínica: de 1000 a 3.000 mW/cm2",
              "Adapter: AC100-240V, DC5V1.5A,50/60Hz",
              "Wavelength range: 385~515nm",
              "LED power: 10W",
              "Lithium battery: 3.7V 2200mAh"
            ]
          },
          general: {
            title: "Características Generales",
            items: [
              "Modo de curado",
              "Modo de ortodoncia",
              "Modo de caries"
            ]
          }
        },
        images: [
          {
            url: "lampara_fotocurado_detector_caries/fotocurado-4.png",
            alt: "HONOR DB686",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Lámparas de Fotocurado",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.262Z",
        updatedAt: "2024-10-29T00:10:22.262Z"
      },
      {
        id: "lampara-fotocurado-ortodoncia",
        slug: "lampara-fotocurado-ortodoncia",
        name: "DB686 Swift",
        subtitle: "Lámpara de fotocurado para Ortodoncia",
        brand: {
          name: "COXO",
          logo: "coxo_logo.png"
        },
        description: "Modos de trabajo: Soft up, High power y Ortodoncia",
        shortDescription: "Tres modos de trabajo especializados",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Tiempo de Curado: 5s/10s/15s/20s(Soft up mode)",
              "Tiempo de Curado: 5s (High power mode)",
              "Tiempo de Curado: 3s (Orthodontic mode)",
              "Profundidad: 8mm",
              "Potencia: 3000mw/cm2",
              "Cantidad de disparos: 785 times(10s Soft up mode)",
              "Contiene: Pieza de mano, Punta, Base de carga, Adaptador, Filtro ocular de luz, Escudos, Cobertores y Manual"
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "lampara_fotocurado_ortodoncia/lampara-ortodoncia-1.png",
            alt: "DB686 Swift",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Lámparas de Fotocurado",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.269Z",
        updatedAt: "2024-10-29T00:10:22.269Z"
      },
      // ... continuará con más productos
      {
        id: "lampara-l500",
        slug: "lampara-l500",
        name: "SIGER L500",
        subtitle: "Lámpara dental LED",
        brand: {
          name: "Siger",
          logo: "siger_logo.png"
        },
        description: "Disponible cabezal o juego completo de lámpara de techo",
        shortDescription: "Disponible cabezal o juego completo de lámpara de techo",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "ON/OFF con ajuste de 4 intensidades de luz manual y por sensor óptico",
              "Diseño de reflector brinda una luz libre de efectos de sombra",
              "Interruptor sencillo de cambio de modo standard a modo seguro de tratamiento",
              "Campo de visión con una distribución lisa y sobresaliente",
              "Sin calor, silencioso y de larga duración",
              "Diseño de 3 ejes para flexibilidad de ajuste de ángulos",
              "Iluminación: 6500-26000LUX",
              "Temperatura de color: 6000°K",
              "Campo de visión:70×140MM(@700MM)",
              "Potencia consumo:8W",
              "Voltage: 12+ 20% VAC"
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "lamparas_dentales/L500.png",
            alt: "SIGER L500",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Lámparas Dentales",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.275Z",
        updatedAt: "2024-10-29T00:10:22.275Z"
      },
      {
        id: "lampara-v1",
        slug: "lampara-v1",
        name: "SIGER V1",
        subtitle: "Lámpara dental LED",
        brand: {
          name: "Siger",
          logo: "siger_logo.png"
        },
        description: "Luz libre de efectos de sombra",
        shortDescription: "Luz libre de efectos de sombra",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "ON/OFF con ajuste de 4 intensidades de luz manual y por sensor óptico",
              "Diseño de reflector brinda una luz libre de efectos de sombra",
              "Interruptor sencillo de cambio de modo standard a modo seguro de tratamiento",
              "Campo de visión con una distribución lisa y sobresaliente",
              "Sin calor, silencioso y de larga duración",
              "Diseño de 3 ejes para flexibilidad de ajuste de ángulos",
              "Iluminación: 6500-26000LUX",
              "Temperatura de color: 6000°K",
              "Campo de visión:70×140MM(@700MM)",
              "Potencia consumo:8W",
              "Voltage: 12+ 20% VAC"
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "lamparas_dentales/v1.png",
            alt: "SIGER V1",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Lámparas Dentales",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.280Z",
        updatedAt: "2024-10-29T00:10:22.280Z"
      },
      {
        id: "motor-electronico",
        slug: "motor-electronico",
        name: "ELEC II mini",
        subtitle: "Motor Eléctrico de cirugía",
        brand: {
          name: "Micro NX",
          logo: "micro_nx_logo.png"
        },
        description: "El motor más pequeño y poderoso del mundo",
        shortDescription: "El motor más pequeño y poderoso del mundo",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Max. 200,000 RPM",
              "(1:5 pieza de mano de aumento de velocidad)",
              "Poderoso motor óptico: 25,000 ~ 33,000 LUX",
              "Función de memoria: se pueden registrar 3 memorias",
              "Preparación del diente más rápida",
              "Eliminación de prótesis dental",
              "Operación dental precisa",
              "Fácil instalación en todo tipo de unidades dentales"
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "motor_electrico_cirugia/motor-electrico-cirugia.png",
            alt: "ELEC II mini",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Motores",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.319Z",
        updatedAt: "2024-10-29T00:10:22.319Z"
      },
      // ... continuará con más productos
      {
        id: "motor-implantes",
        slug: "motor-implantes",
        name: "C-SAILOR PRO",
        subtitle: "Motor de implantes",
        brand: {
          name: "COXO",
          logo: "coxo_logo.png"
        },
        description: "Control variable de velocidad y torque",
        shortDescription: "Control variable de velocidad y torque",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Voltaje de fuente de alimentación: AC110/220V",
              "Frecuencia 50/60Hz",
              "Consumo de energía: 140VA",
              "Voltaje de entrada: 30 VCC",
              "Velocidad Máxima de 40,000rpm",
              "Par máximo: 80Ncm",
              "Temperatura de color típica: 6000K",
              "Corriente máxima del LED: 100 mA"
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "motor_implantes/sailor-pro.png",
            alt: "C-SAILOR PRO",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Motores",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.331Z",
        updatedAt: "2024-10-29T00:10:22.331Z"
      },
      {
        id: "motor-laboratorio",
        slug: "motor-laboratorio",
        name: "NX-201N",
        subtitle: "Motor de laboratorio",
        brand: {
          name: "Micro NX",
          logo: "micro_nx_logo.png"
        },
        description: "Motor con controlador y pieza de mano",
        shortDescription: "Motor con controlador y pieza de mano",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Velocidad máxima 35,000rpm",
              "Control - Modelo: New NX-201N",
              "Voltaje: 110V/220,230V",
              "Frecuencia: 50/60Hz",
              "Pieza de mano - Modelo: 1705",
              "Poder eléctrico: 120w",
              "Velocidad máxima: 35,000 rpm",
              "Torque máximo: 3.5N,cm"
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "motor_nx-210n_laboratorio/nx-201n-2.png",
            alt: "NX-201N",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Motores",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.336Z",
        updatedAt: "2024-10-29T00:10:22.336Z"
      },
      {
        id: "pieza-mano-kit",
        slug: "pieza-mano-kit",
        name: "Kit Piezas de Mano CX235",
        subtitle: "Kit de 3 piezas",
        brand: {
          name: "COXO",
          logo: "coxo_logo.png"
        },
        description: "Contra-ángulo, Pieza de mano recta y Motor de aire",
        shortDescription: "Kit completo de piezas de mano",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Canal interno de agua",
              "Compatible con la pieza de mano de la marca NSK",
              "Contra-ángulo compatible con NSK S MAX M25L",
              "Motor neumático compatible con NSK IS 205",
              "Piezas de mano recta compatible con S MAX M65",
              "Tecnología precisa de fabricación de Alemania"
            ]
          },
          general: {
            title: "Características Generales",
            items: [
              "Intercial de alta velocidad de canal de alta velocidad, 1: 1",
              "Presión de aire: 0.3Mpa",
              "Velocidad de rotación: alrededor de 20,000 rpm",
              "Bur aplicabilidad: Φ2.35-0.016mm (ISO1797-1)",
              "Ruido: ≤70dB"
            ]
          }
        },
        images: [
          {
            url: "piezas_de_mano/kit-3-partes-piezas-de-mano.png",
            alt: "Kit Piezas de Mano CX235",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Piezas de mano",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.348Z",
        updatedAt: "2024-10-29T00:10:22.348Z"
      },
      // ... continuará con más productos
      {
        id: "plast-press",
        slug: "plast-press",
        name: "PlastPress 127V",
        subtitle: "Laminadora de presión positiva",
        brand: {
          name: "BioArt",
          logo: "bioart_logo.png"
        },
        description: "Diseño compacto con mejor fidelidad de copia",
        shortDescription: "Diseño compacto con mejor fidelidad de copia",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Garantiza una mayor fidelidad de copia y un menor ruido",
              "Práctico y versátil",
              "Permite la fabricación de bandejas de diferentes materiales con hasta 6mm de espesor",
              "Acepta platos redondos y cuadrados",
              "Debe conectarse directamente a un compresor regulado",
              "Presión entre 3 y 8bar (43,5 a 116psi)"
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "termoformdoras/plast-press-1.png",
            alt: "PlastPress 127V",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Termofomadoras",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.353Z",
        updatedAt: "2024-10-29T00:10:22.353Z"
      },
      {
        id: "plastvac-p7-analogo",
        slug: "plastvac-p7-analogo",
        name: "PlastVac P7",
        subtitle: "Termoformadora análoga",
        brand: {
          name: "BioArt",
          logo: "bioart_logo.png"
        },
        description: "Sistema exclusivo de calentamiento rápido y uniforme",
        shortDescription: "Sistema exclusivo de calentamiento rápido y uniforme",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Exclusivo sistema de calentamiento que hace con que el proceso sea mas rápido y uniforme",
              "Exclusivo soporte de placas giratorio",
              "Permite calentamiento uniforme en ambos lados de la placa",
              "Porta modelos con doble función",
              "Plana y Taza. Evita distorsión y facilita la remoción del molde",
              "Mayor precisión en la copia del modelo",
              "Motor de 1400w",
              "Sistema automático que apaga el calentamiento y acciona el vacío"
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "termoformdoras/plastvac-p7-127v-analogo.png",
            alt: "PlastVac P7",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Termofomadoras",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.358Z",
        updatedAt: "2024-10-29T00:10:22.358Z"
      },
      {
        id: "plastvac-p7-digital",
        slug: "plastvac-p7-digital",
        name: "PlastVac P7 Plus",
        subtitle: "Termoformadora Digital",
        brand: {
          name: "BioArt",
          logo: "bioart_logo.png"
        },
        description: "Control digital avanzado con display programable",
        shortDescription: "Control digital avanzado con display programable",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Exclusivo sistema de calentamiento que hace con que el proceso sea mas rápido y uniforme",
              "Exclusivo soporte de placas giratorio",
              "Permite calentamiento uniforme en ambos lados de la placa",
              "Porta modelos con doble función",
              "Plana y Taza. Evita distorsión y facilita la remoción del molde",
              "Mayor precisión en la copia del modelo",
              "Motor de 1400w",
              "Sistema automático que apaga el calentamiento y acciona el vacío",
              "Posee display digital para programación del tiempo de calentamiento",
              "Proporciona mayor control del proceso"
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "termoformdoras/plastvac-p7-127v-digital-0.png",
            alt: "PlastVac P7 Plus",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Termofomadoras",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.363Z",
        updatedAt: "2024-10-29T00:10:22.363Z"
      },
      {
        id: "pt-master",
        slug: "pt-master",
        name: "PT MASTER",
        subtitle: "Raspador dental y pulidor de aire",
        brand: {
          name: "COXO",
          logo: "coxo_logo.png"
        },
        description: "Sistema multifuncional con pantalla táctil",
        shortDescription: "Sistema multifuncional con pantalla táctil",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Pulido con aire",
              "Limpieza supragingival",
              "Limpieza subgingival",
              "Escalado ultrasónico 4 modos: Escalado, Perio, Endo e irrigación",
              "Más seguro y limpio",
              "Vistoso",
              "Súper grande",
              "Pantalla táctil"
            ]
          },
          general: {
            title: "Características Generales",
            items: [
              "Sin restricciones por ángulo",
              "Presione cualquier borde del pedal para comenzar"
            ]
          }
        },
        images: [
          {
            url: "piezas_de_mano/pt-master-2.png",
            alt: "PT MASTER",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Piezas de mano",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.369Z",
        updatedAt: "2024-10-29T00:10:22.369Z"
      },
      {
        id: "rayos-x-portatil",
        slug: "rayos-x-portatil",
        name: "SIRAY Max",
        subtitle: "Rayos X Portátil",
        brand: {
          name: "Siger",
          logo: "siger_logo.png"
        },
        description: "Rayos X portátil con pantalla táctil",
        shortDescription: "Rayos X portátil con pantalla táctil",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Modelo Max",
              "Alta frecuencia",
              "Tubo: Canon D-045",
              "Voltaje del tubo: 70Kv",
              "Circulación del tubo: 2ma",
              "Punto de enfoque: 0.4mm",
              "Tiempo de exposición: 0.02-2S",
              "Vida de la batería (marca Samsung): 8 años"
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "rayos_x_portatil/rayos-x-portatil-2.png",
            alt: "SIRAY Max",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Equipo de Rayos X",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.374Z",
        updatedAt: "2024-10-29T00:10:22.374Z"
      },
      // ... continuará con más productos
      {
        id: "selladora-biostamp",
        slug: "selladora-biostamp",
        name: "BIOSTAMP 127V",
        subtitle: "Selladora con guillotina",
        brand: {
          name: "BioArt",
          logo: "bioart_logo.png"
        },
        description: "Selladora con guillotina integrada y diseño innovador",
        shortDescription: "Selladora con guillotina integrada",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Anchura de adherencia: 12 mm / Extensión de adherencia: 300 mm",
              "Guillotina embutida",
              "Soporte del rollo de papel",
              "Dimensiones del embalaje: (WxDxH) 500x320x160mm",
              "Peso: 3,6 kg",
              "Voltajes disponibles: 110V"
            ]
          },
          general: {
            title: "Características Generales",
            items: []
          }
        },
        images: [
          {
            url: "selladora_biostamp_127v/seladora_01.png",
            alt: "BIOSTAMP 127V",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Selladoras",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.394Z",
        updatedAt: "2024-10-29T00:10:22.394Z"
      },
      {
        id: "unidad-dental-serie-S30",
        slug: "unidad-dental-serie-S30",
        name: "Serie S30",
        subtitle: "Unidad Dental Premium",
        brand: {
          name: "Siger",
          logo: "siger_logo.png"
        },
        description: "Unidad dental con tapicería italiana de alta calidad",
        shortDescription: "Tapicería italiana premium",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Motor silencioso LINAK (Dinamarca)",
              "Mesa de doctor a elección (tipo carro o convencional)",
              "Panel de control tipo membrana",
              "Sensores de parada múltiples",
              "Elección de piezas de mano por sensor óptico",
              "Respaldo sólido de aluminio",
              "Soporte para hasta 150Kg"
            ]
          },
          general: {
            title: "Características Generales",
            items: [
              "Lámpara V2 LED o V1 LED",
              "Banqueta doctor",
              "Pedal multifuncional",
              "Manguera borden (2)",
              "Manguera midwest (1)",
              "Negatoscopio",
              "Kit calentador de agua",
              "Sistema auxiliar agua",
              "2 jeringas triples",
              "Sistema succión por Venturi o bomba vacío",
              "Cabecera 2 ejes",
              "Caja de previstas externa o interna",
              "5 memorias de movimiento",
              "2 descansa brazos abatibles"
            ]
          }
        },
        images: [
          {
            url: "unidad_dental_serie_s30/serie-s30.png",
            alt: "Serie S30",
            width: 800,
            height: 600,
            isPrimary: true
          },
          {
            url: "unidad_dental_serie_s30/serie-s30-tapiceria.png",
            alt: "Tapicería Serie S30",
            width: 800,
            height: 600,
            isPrimary: false
          }
        ],
        category: "Unidades Dentales",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.425Z",
        updatedAt: "2024-10-29T00:10:22.425Z"
      },
      {
        id: "unidad-dental-serie-S30-carrito",
        slug: "unidad-dental-serie-S30-carrito",
        name: "Serie S30 Carrito",
        subtitle: "Unidad Dental Premium con Carrito",
        brand: {
          name: "Siger",
          logo: "siger_logo.png"
        },
        description: "Unidad dental con mesa de doctor tipo carrito",
        shortDescription: "Mesa de doctor tipo carrito móvil",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Motor silencioso LINAK (Dinamarca)",
              "Mesa de doctor tipo carrito móvil",
              "Panel de control tipo membrana",
              "Sensores de parada múltiples",
              "Elección de piezas de mano por sensor óptico",
              "Respaldo sólido de aluminio",
              "Soporte para hasta 150Kg"
            ]
          },
          general: {
            title: "Características Generales",
            items: [
              "Lámpara V2 LED o V1 LED",
              "Banqueta doctor",
              "Pedal multifuncional",
              "Manguera borden (2)",
              "Manguera midwest (1)",
              "Negatoscopio",
              "Kit calentador de agua",
              "Sistema auxiliar agua",
              "2 jeringas triples",
              "Sistema succión por Venturi o bomba vacío",
              "Cabecera 2 ejes",
              "Caja de previstas externa o interna",
              "5 memorias de movimiento",
              "2 descansa brazos abatibles"
            ]
          }
        },
        images: [
          {
            url: "unidad_dental_serie_s30/serie-s30-carrito.png",
            alt: "Serie S30 Carrito",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Unidades Dentales",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.430Z",
        updatedAt: "2024-10-29T00:10:22.430Z"
      },
      {
        id: "unidad-dental-u100",
        slug: "unidad-dental-u100",
        name: "Serie U100",
        subtitle: "Unidad Dental Diseño Cuadrado",
        brand: {
          name: "Siger",
          logo: "siger_logo.png"
        },
        description: "Unidad dental con diseño cuadrado moderno",
        shortDescription: "Diseño cuadrado con tapicería microfibra",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Tapicería cuero microfibra",
              "Bandeja de asistente multifuncional",
              "Motores Taiwán",
              "Panel de control tipo membrana",
              "Sensor de parada por objetos debajo del sillón",
              "Soporte 130 Kg"
            ]
          },
          general: {
            title: "Características Generales",
            items: [
              "Lámpara V2 LED o V1 LED",
              "Banqueta doctor",
              "Pedal multifuncional",
              "Manguera borden (2)",
              "Manguera midwest (1)",
              "Negatoscopio",
              "Kit calentador de agua",
              "Sistema auxiliar agua",
              "2 jeringas triples",
              "Sistema succión por Venturi o bomba vacío",
              "Cabecera 2 ejes",
              "Caja de previstas externa o interna",
              "5 memorias de movimiento",
              "2 descansa brazos abatibles"
            ]
          }
        },
        images: [
          {
            url: "unidad_dental_u200/u-200.png",
            alt: "Serie U100",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Unidades Dentales",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.435Z",
        updatedAt: "2024-10-29T00:10:22.435Z"
      },
      // ... continuará con el último grupo de productos
      {
        id: "unidad-dental-v6000",
        slug: "unidad-dental-v6000",
        name: "Serie V6000",
        subtitle: "Unidad Dental Diseño Redondo",
        brand: {
          name: "Siger",
          logo: "siger_logo.png"
        },
        description: "Unidad dental de diseño redondo con panel de botones",
        shortDescription: "Diseño redondo con panel de botones",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Bandeja amplia ergonómica",
              "Panel de control de tipo botones",
              "Motores Taiwán de alta calidad",
              "Sensor de parada por objetos debajo del sillón",
              "Soporte 130 Kg",
              "Diseño moderno y funcional"
            ]
          },
          general: {
            title: "Características Generales",
            items: [
              "Lámpara V2 LED o V1 LED",
              "Banqueta doctor",
              "Pedal multifuncional",
              "Manguera borden (2)",
              "Manguera midwest (1)",
              "Negatoscopio",
              "Kit calentador de agua",
              "Sistema auxiliar agua",
              "2 jeringas triples",
              "Sistema succión por Venturi o bomba vacío",
              "Cabecera 2 ejes",
              "Caja de previstas externa o interna",
              "5 memorias de movimiento",
              "2 descansa brazos abatibles"
            ]
          }
        },
        images: [
          {
            url: "unidad_dental_v600/v-600.png",
            alt: "Serie V6000",
            width: 800,
            height: 600,
            isPrimary: true
          },
          {
            url: "unidad_dental_v600/v-6000-tapiceria.png",
            alt: "Tapicería V6000",
            width: 800,
            height: 600,
            isPrimary: false
          }
        ],
        category: "Unidades Dentales",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.441Z",
        updatedAt: "2024-10-29T00:10:22.441Z"
      },
      {
        id: "rayos-x-portatil-xv-beam-1000",
        slug: "rayos-x-portatil-xv-beam-1000",
        name: "XV beam 1000",
        subtitle: "Sistema de Rayos X Dental Portátil",
        brand: {
          name: "Xpect Vision",
          logo: "xpect-vision.png"
        },
        description: "Sistema portátil con doble protección radiológica",
        shortDescription: "Sistema portátil con protección avanzada",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Diseño de doble protección radiológica",
              "Reduce exposición del usuario a la radiación",
              "Diseño ergonómico avanzado",
              "Permite exposiciones siempre listas",
              "Estación de acoplamiento incluida",
              "Correa de seguridad incorporada",
              "Más de 300 exposiciones con una carga completa",
              "Sistema de calibración automática"
            ]
          },
          general: {
            title: "Características Generales",
            items: [
              "Batería de larga duración",
              "Display digital integrado",
              "Memoria para configuraciones personalizadas",
              "Sistema de enfriamiento eficiente"
            ]
          }
        },
        images: [
          {
            url: "rayos_x_portatil/rayos-x-portatil-4.png",
            alt: "XV beam 1000",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Equipo de Rayos X",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.379Z",
        updatedAt: "2024-10-29T00:10:22.379Z"
      },
      {
        id: "vaporizador-1-tubo",
        slug: "vaporizador-1-tubo",
        name: "Pulverizador CK-A3",
        subtitle: "Vaporizador para desinfección",
        brand: {
          name: "Siger",
          logo: "siger_logo.png"
        },
        description: "Sistema de desinfección con control remoto",
        shortDescription: "Sistema de desinfección con control remoto",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Control remoto incluido para operación a distancia",
              "Operación silenciosa optimizada",
              "Interfaz de usuario intuitiva",
              "Tecnología de última generación",
              "Rodines silenciosos para fácil movilidad",
              "Diseño profesional y elegante",
              "Sistema de distribución uniforme",
              "Temporizador programable"
            ]
          },
          general: {
            title: "Características Generales",
            items: [
              "Tanque de gran capacidad",
              "Sistema de seguridad integrado",
              "Indicadores LED de estado",
              "Mantenimiento sencillo"
            ]
          }
        },
        images: [
          {
            url: "vaporizador_desinfeccion_1tubo/CK-A3.png",
            alt: "Pulverizador CK-A3",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Vaporizadores",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.446Z",
        updatedAt: "2024-10-29T00:10:22.446Z"
      },
      {
        id: "vaporizador-2-tubos",
        slug: "vaporizador-2-tubos",
        name: "Pulverizador CK-C1",
        subtitle: "Vaporizador para desinfección doble",
        brand: {
          name: "Siger",
          logo: "siger_logo.png"
        },
        description: "Sistema de desinfección dual con panel digital",
        shortDescription: "Sistema de desinfección dual con panel digital",
        features: {
          unique: {
            title: "Características Únicas",
            items: [
              "Sistema dual de pulverización",
              "Panel de control digital avanzado",
              "Control preciso de dosificación",
              "Operación ultra silenciosa",
              "Sistema de doble tanque independiente",
              "Tecnología de atomización avanzada",
              "Diseño profesional premium",
              "Cobertura ampliada"
            ]
          },
          general: {
            title: "Características Generales",
            items: [
              "Programación avanzada",
              "Modo económico",
              "Sistema de alertas integrado",
              "Mantenimiento preventivo programado"
            ]
          }
        },
        images: [
          {
            url: "vaporizador_desinfeccion_2tubo/CK-C1.png",
            alt: "Pulverizador CK-C1",
            width: 800,
            height: 600,
            isPrimary: true
          }
        ],
        category: "Vaporizadores",
        isActive: true,
        createdAt: "2024-10-29T00:10:22.451Z",
        updatedAt: "2024-10-29T00:10:22.451Z"
      }
    ];