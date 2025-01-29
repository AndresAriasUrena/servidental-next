// src/data/manual-products.ts
import { Product, ProductCategory, ProductBrand } from '@/types/product';
import assets from '@/assets';

export const categories: ProductCategory[] = [
  "Anestesia",
  "Bombas de vacío",
  "Activador UV para implantes",
  "Compresores",
  "Equipo de Rayos X",
  "Esterilización",
  "Fresadora",
  "Lámparas Dentales",
  "Lámparas de Fotocurado",
  "Cámaras Intraorales",
  "Lámparas de blanqueamiento",
  "Piezas de mano",
  "Escáneres",
  "Selladoras",
  "Termoformadoras",
  "Motores de implantes",
  "Motores de cirugías",
  "Lavadoras ultrasónicas",
  // "Tomógrafos",
  "Pulidores",
  "Motor NX-201N",
  "Unidades Dentales",
  "Mobiliario",
  "Pulverizador",
  "Equipo portátil",
  "Equipo para endodoncia"
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
  "Xpect Vision",
  "elec",
  "DenTech",
  "DentaFilm",
  "epdent",
  "mdmed",
  "launca",
  "whitebrand"
];

export const products: Product[] = [
  {
    id: "Raspador-Dental-Y-Pulidor-De-Aire-PTMaster",
    slug: "Raspador-Dental-Y-Pulidor-De-Aire-PTMaster",
    name: "Raspador dental y pulidor de aire PT Master",
    subtitle: "Pieza de mano de alto rendimiento",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Adaptador: CA 100-240 V 50/60 Hz",
          "Potencia de entrada: 80 VA",
          "Modo de funcionamiento: funcionamiento continuo",
          "Desplazamiento de vibración de las puntas ultrasónicas: ＜200 um",
          "Frecuencia de vibración de las puntas ultrasónicas: 24-36 kHz",
          "Tamaño de la unidad de control: 30*26*13 cm",
          "Peso: 3 kg"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.pulidoras.RaspadorDentalYpulidorDeAirePTMaster.default,
        alt: "Raspador dental y pulidor de aire PT Master",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.pulidoras.RaspadorDentalYpulidorDeAirePTMaster.RaspadorDentalYpulidorDeAirePTMaster_2,
        alt: "Raspador dental y pulidor de aire PT Master",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.pulidoras.RaspadorDentalYpulidorDeAirePTMaster.RaspadorDentalYpulidorDeAirePTMaster_3,
        alt: "Raspador dental y pulidor de aire PT Master",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.pulidoras.RaspadorDentalYpulidorDeAirePTMaster.RaspadorDentalYpulidorDeAirePTMaster_4,
        alt: "Raspador dental y pulidor de aire PT Master",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.pulidoras.RaspadorDentalYpulidorDeAirePTMaster.RaspadorDentalYpulidorDeAirePTMaster_5,
        alt: "Raspador dental y pulidor de aire PT Master",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: "Pulidores",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/ze0iqKueMew?si=mY3s3TaL9icR4o76" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: "Pulidora-dental-por-aire-CP-1",
    slug: "Pulidora-dental-por-aire-CP-1",
    name: "Pulidora dental por aire CP-1",
    subtitle: "Pieza de mano de alto rendimiento",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Presión de aire de entrada: 250-450 kPa",
          "Presión de agua de entrada: 70-220 kPa",
          "Flujo de agua: >30 ml/min",
          "Calibre de boquilla para medidas de potencia: 0,7 mm",
          "Calibre de boquilla para medidas de agua: 1,4 mm",
          "Peso: 145 g"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.pulidoras.PulidoraDentalPorAireCP.default,
        alt: "Pulidora dental por aire CP-1",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.pulidoras.PulidoraDentalPorAireCP.PulidoraDentalPorAireCP_2,
        alt: "Pulidora dental por aire CP-1",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.pulidoras.PulidoraDentalPorAireCP.PulidoraDentalPorAireCP_3,
        alt: "Pulidora dental por aire CP-1",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.pulidoras.PulidoraDentalPorAireCP.PulidoraDentalPorAireCP_4,
        alt: "Pulidora dental por aire CP-1",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.pulidoras.PulidoraDentalPorAireCP.PulidoraDentalPorAireCP_5,
        alt: "Pulidora dental por aire CP-1",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: "Pulidores",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/2QqAk6oi7kw?si=CuKVKqxwssbCCG2u" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: "Microarenador-Standar-Microblaster",
    slug: "Microarenador-Standar-Microblaster",
    name: "Microarenador Standar Microblaster",
    subtitle: "Rápido y fácil de usar",
    brand: {
      name: "BioArt",
      logo: assets.logos.brands.bioart
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Rápido y fácil de usar",
          "Tiene una punta de metal duro que promueve una mayor durabilidad y precisión al trabajar",
          'Aplicaciones: micro retenciones en superficies dentales y piezas a cementar, eliminación de cemento, limpieza de brackets, limpieza o desengrase de metales o cerámicas cuando se utiliza la técnica de "reparación cerámica intraoral", chorreado oclusal para ajuste fino, reemplazando el uso de carbón, pruebas internas de ajuste y asentamiento de coronas, ajuste de contactos interproximales, limpieza de piezas fundidas, eliminación de oxidación',
          "Disponibles en acople Borden o Midwest",
          "Modo Estándar: Tiene 1 punta fija con un ángulo de 138º"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.pulidoras.MicroarenadorStandarMicroblaster.default,
        alt: "Microarenador Standar Microblaster",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.pulidoras.MicroarenadorStandarMicroblaster.MicroarenadorStandarMicroblaster_2,
        alt: "Microarenador Standar Microblaster",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Pulidores",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/o-bGnZoX71w?si=3YKEWVQPSemVJI6h" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: "Motor-de-implantes-ISE-270M",
    slug: "Motor-de-implantes-ISE-270M",
    name: "Motor de implantes ISE-270M",
    subtitle: "Potente motor óptico",
    brand: {
      name: "Micro NX",
      logo: assets.logos.brands.microNx
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Máx. 70N.cm",
          "Función de límite de par",
          'Potente motor óptico',
          "Visualización del par y las RPM en tiempo real",
          "Modos de programación",
          "Función de memoria",
          "Función de calibración automática",
          "Función de corte de hilo",
          "Corte de rosca",
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.MotordeImplantes.MotorDeImplantesISE270M.default,
        alt: "Motor de implantes ISE-270M",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.MotordeImplantes.MotorDeImplantesISE270M.MotorDeImplantesISE270M_2,
        alt: "Motor de implantes ISE-270M",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Motores de implantes",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/C-F8sxdQsuo?si=k9zLMfsqUCBG0lJw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: "Motor-de-implantes-C-SAILOR-S1",
    slug: "Motor-de-implantes-C-SAILOR-S1",
    name: "Motor de implantes C-SAILOR S1",
    subtitle: "Rendimiento y precisión",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "La pantalla táctil permite ver los parámetros en tiempo real",
          "Puede utilizarse tanto para la inserción de implantes como para las maniobras quirúrgicas",
          "Menú gráfico intuitivo que permite cambiar muchos parámetros con un solo toque, diseñado para facilitar y acelerar la cirugía",
          "Selección del caudal de refrigerante con una sola pulsación",
          "4 niveles de flujo de agua de refrigeración, hasta 50 ml/min.",
          "Bomba peristáltica de alto rendimiento incorporada",
          "Motor de nueva generación sin escobillas, de alto rendimiento y fiable, con un par máximo de 80 N.cm",
          "Cables y micromotor autoclavables",
          "Micromotor de bajo peso, lo que facilita las maniobras quirúrgicas",
          "Equipado con fibra óptica y fuente de luz LED con una luminosidad de 30.000 lux que permite realizar maniobras quirúrgicas con mayor precisión",
          "Volumen de sonido ajustable",
          "Intensidad de luz regulable",
          "Interfaz que permite la personalización de los programas",
          "Pedal multifunción con conexión metálica"
        ]
      },
      general: {
        title: "Características técnicas",
        items: [
          "Alimentación: 100 – 230 V / 50 Hz VA",
          "Frecuencia de trabajo: 24 kHz – 36 kHz",
          "Potencia máx.: 70N.cm",
          "Velocidad regulable: 300-40000 rpm",
          "Par de apriete ajustable: 5 Ncm – 55 Ncm",
          "Caudal de agua de refrigeración ajustable: 4 niveles ajustables",
          "Fuente de luz: LED 7000 lux",
          "Motor: micromotor quirúrgico de inducción"        
        ]
      }
    },
    images: [
      {
        url: assets.products.MotordeImplantes.MotorDeImplantesCSAILORS1.default,
        alt: "Motor de implantes C-SAILOR S1",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: "Motores de implantes",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
    videoIframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/wxga_pCorBI?si=_wpGZasvtwQRUviF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: "Motor-de-implantes-C-SAILOR-PRO",
    slug: "Motor-de-implantes-C-SAILOR-PRO",
    name: "Motor de implantes C-SAILOR PRO",
    subtitle: "Pantalla totalmente táctil",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Pantalla totalmente táctil",
          "Suministro de agua en 4 turnos hasta 150 ml/min",
          'Potente motor de hasta 80 N. cm',
          "Luz LED: proporciona una fuente de luz de hasta 30.000 lux",
          "Control de pedal multifuncional",
          "Voltaje de la fuente de alimentación: AC110/220V",
          "Frecuencia: 50/60Hz",
          "Consumo de energía: 110VA",
          "Voltaje de entrada: 30VDC",
          "Velocidad máxima: 40000r/min",
          "Par máximo: 6Ncm",
          "Temperatura de color típica: 6000K",
          "Corriente máxima del LED: 100mA",
          "Volumen (cm): 42×38×26",
          "Peso (kg)/PCS: 5.5",
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.MotordeImplantes.MotorDeImplantesCSAILORPRO.default,
        alt: "Motor de implantes C-SAILOR PRO",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: "Motores de implantes",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/y0BpcZnKkdQ?si=cBSbaiiG9I60iZ6d" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: "Motor-electrico-de-cirugia",
    slug: "Motor-electrico-de-cirugia",
    name: "Motor eléctrico de cirugía",
    subtitle: "Funcionamiento suave con mínima vibración",
    brand: {
      name: "Micro NX",
      logo: assets.logos.brands.microNx
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Funcionamiento suave con mínima vibración",
          "Torque adicional para un funcionamiento flexible",
          "Bajo nivel de ruido para una mejor experiencia del paciente",
          "Alta durabilidad",
          "Se pueden utilizar piezas de mano micromotores tanto rectas como contra ángulos",
          "Usos de la pieza de mano y caja de control",
          "Recorte de dentaduras postizas",
          "Recorte de coronas y puentes",
          "Acabado y pulido de prótesis",
          "Fabricación coreana",
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.MotoresDeCirugias.MotorElectricoDeCirugia.default,
        alt: "Motor eléctrico de cirugía",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: "Motores de cirugías",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/PkSTaJhn90A?si=kefCRd22a2lRNpYh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: "Motor-de-cirugia-C-Puma-Master",
    slug: "Motor-de-cirugia-C-Puma-Master",
    name: "Motor de cirugía C-Puma-Master",
    subtitle: "Rotación precisa y estable",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Entrada de alimentación:100V-240V~50/60Hz",
          "Salida:29VDC 4A",
          "Par de salida: 2 N.cm",
          "Longitud del cableado del motor(m): 1.65",
          "Temperatura de funcionamiento: +5°C a +40°C",
          "Humedad de funcionamiento:20% - 80%",
          "Presión atmosférica de funcionamiento: 80- 106 kPa",
          "Grado de protección contra descargas eléctricas: Tipo B parte aplicada",
          "ndo motor Dos en uno. Pantalla táctil, fácil de usar con un dedo",
          "Más cómodo, más estable",
          "Diseño ultra resistente refrigerado por aire",
        ]
      },
      general: {
        title: "Incluye",
        items: [
          "Motor eléctrico",
          "Contra ángulos C7-5 y C5-1M"
        ]
      }
    },
    images: [
      {
        url: assets.products.MotoresDeCirugias.MotorDeCirugiaCPumaMaster.default,
        alt: "Motor de cirugía C-Puma-Master",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.MotoresDeCirugias.MotorDeCirugiaCPumaMaster.MotorDeCirugiaCPumaMaster_2,
        alt: "Motor de cirugía C-Puma-Master",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: "Motores de cirugías",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/Y2VpKB6c8Ok?si=hkVYqoezwgGNONpI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: "Motor-NX-201N",
    slug: "Motor-NX-201N",
    name: "Motor NX-201N",
    subtitle: "Motor de laboratorio",
    brand: {
      name: "Micro NX",
      logo: assets.logos.brands.microNx
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Controlador",
        items: [
          "Modelo nuevo NX-201N",
          "Entrada CA 100 V ~ CA 240 V",
          "Salida CC 0~32 V",
          "Frecuencia 50/60 Hz",
          "Peso 1,3 kg",
          "Dimensiones 112 mm (ancho) x 190 mm (ancho) x 84 mm (alto)"
        ]
      },
      general: {
        title: "Pieza de mano (opcional)",
        items: [
          "Modelo 170S",
          "Tipo Con escobillas de carbón",
          "Velocidad 35.000 ~ 45.000 RPM",
          "Peso 200g",
          "Dimensiones Ø28 x 156 mm (largo)",
          "Fresa FresaØ2,35(mm)",
        ]
      },
      includes: {
        title: "Motor tipo E (opcional)",
        items: [
          "Modelo NX-100E",
          "Tipo Con escobillas de carbón",
          "Velocidad de hasta 35.000 RPM",
          "Peso 135g",
          "Dimensiones Ø24,5 x 111 mm (largo)",
          "Ángulo, pieza de mano con todos los estándares ISO",
        ]
      },
      optional: {
        title: "Pedal de pie",
        items: [
          "Modelo FS-30",
          "Controlador de funcionamiento del motor de función",
          "Clase de protección IPX1"
        ]
      },
    },
    images: [
      {
        url: assets.products.motores.MotorNX201N.default,
        alt: "Motor NX-201N",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.motores.MotorNX201N.MotorNX201N_2,
        alt: "Motor NX-201N",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.motores.MotorNX201N.MotorNX201N_3,
        alt: "Motor NX-201N",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.motores.MotorNX201N.MotorNX201N_4,
        alt: "Motor NX-201N",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.motores.MotorNX201N.MotorNX201N_5,
        alt: "Motor NX-201N",
        width: 800,
        height: 600,
        isPrimary: true
      },

    ],
    category: "Motor NX-201N",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
  },
  {
    id: "Lavadora-ultrasonica-BioWhash",
    slug: "Lavadora-ultrasonica-BioWhash",
    name: "Lavadora ultrasónica BioWhash",
    subtitle: "Optimiza y acelera el proceso de lavado",
    brand: {
      name: "BioArt",
      logo: assets.logos.brands.bioart
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Optimiza y acelera el proceso de lavado de aparatos, prótesis e instrumentos en general",
          "Limpieza en lugares de difícil acceso",
          "Eliminación de residuos orgánicos e inorgánicos impregnados en los instrumentos",
          "Previene el desgaste prematuro del filo de los instrumentos causado por la abrasión por métodos manuales"
        ]
      },
      general: {
        title: "Características Técnicas",
        items: [
          "Temporizador de descenso con ajuste de tiempo",
          "Sistema de calentamiento",
          "Ultrafrecuencia",
          "42 Khz de sonido",
          "Dimensiones del paquete: (LxWxH) 35x25x23 cm",
          "Peso: 3,1 kg",
          "Capacidad 2,5 litros (0,66 galones)"
        ]
      }
    },
    images: [
      {
        url: assets.products.lavadoraUltrasonido.LavadoraUltrasonicaBioWhash.default,
        alt: "Lavadora ultrasónica BioWhash",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.lavadoraUltrasonido.LavadoraUltrasonicaBioWhash.LavadoraUltrasonicaBioWhash_2,
        alt: "Lavadora ultrasónica BioWhash",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.lavadoraUltrasonido.LavadoraUltrasonicaBioWhash.LavadoraUltrasonicaBioWhash_3,
        alt: "Lavadora ultrasónica BioWhash",
        width: 800,
        height: 600,
        isPrimary: true
      },

    ],
    category: "Lavadoras ultrasónicas",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
  },
  {
    id: "Lampara-de-cirugia-L500",
    slug: "Lampara-de-cirugia-L500",
    name: "Lámpara de cirugía L500",
    subtitle: "Solo cabezal y lámpara de techo",
    brand: {
      name: "Siger",
      logo: assets.logos.brands.siger
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "ON/OFF con ajuste de 4 intensidades de luz manual y por sensor óptico",
          "Diseño de reflector brinda una luz libre de efectos de sombra",
          "Interruptor sencillo de cambio de modo standard a modo seguro de tratamiento",
          "Campo de visión con una distribución lisa y sobresaliente",
          "Sin calor, silencioso y de larga duració",
          "Diseño de 3 ejes para flexibilidad de ajuste de ángulos",
          "Iluminación: 33000-130000 LUX",
          "Temperatura de color: 3300-4300°K",
          "Campo de visión:120×200MM(@1000MM)",
          "Potencia consumo:  25 VA",
          "Voltaje: 12-24 VAC"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.lamparasDentales.LamparaDeCirugiaL500.default,
        alt: "Lámpara de cirugía L500",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: "Lámparas Dentales",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
  },
  {
    id: "Lampara-Dental-v1",
    slug: "Lampara-Dental-v1",
    name: "Lámpara dental V1",
    subtitle: "Luz libre de efectos de sombra",
    brand: {
      name: "Siger",
      logo: assets.logos.brands.siger
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Diseño óptico único, profundidad de enfoque ideal gracias a la superposición total de fuentes de luz",
          "Punto de luz distribuido uniformemente con bordes claros y suaves",
          "Similar a la luz natural con un CRI excepcional",
          "Diseño de 3 ejes con ajuste de ángulo flexible",
          "El diseño del mango se puede personalizar para ajustar el ángulo y desmontarse fácilmente para su esterilización",
          "Interruptor por sensor de movimiento y ajuste de brillo",
          "Brazo ligero: flexible, equilibrio estable",
          "Iluminación: 8000-30000 LUX",
          "Temperatura de color: 4300K",
          "Dimensión del punto: 70 × 140 mm (@ 700 mm)",
          "Potencia: 15VA",
          "Voltaje: 12 -24V CA"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.lamparasDentales.LamparaDentalV1.default,
        alt: "Lámpara dental V1",
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
    id: "Lampara-Dental-v2",
    slug: "Lampara-Dental-v2",
    name: "Lámpara dental V2",
    subtitle: "Luz libre de efectos de sombra",
    brand: {
      name: "Siger",
      logo: assets.logos.brands.siger
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "El diseño reflectante brinda un buen efecto sin espectáculo",
          "Fácil cambio del modo estándar al modo de tratamiento de seguridad",
          "El punto de luz se distribuye uniformemente con un borde liso y un CRI excepcional",
          "Sin calor, silencioso y con una larga vida útil",
          "Diseño de 3 ejes con ajuste de ángulo flexible",
          "El diseño exclusivo del mango móvil se puede personalizar para ajustar el ángulo y desmontarse fácilmente para su esterilización",
          "Encendido/apagado y atenuación mediante control de sensor como configuración estándar",
          "Brazo ligero: flexible, equilibrio estable, ajustable con amplio rango",
          "Fuente de luz: LED",
          "Iluminación: 8000-30000 LUX",
          "Temperatura de color: 5000K",
          "Punto de luz: 80X150MM(@700MM)",
          "Consumo de energía: 6VA",
          "Entrada de energía: 12 - 24V AC",
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.lamparasDentales.LamparaDentalV2.default,
        alt: "Lámpara dental V2",
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
    id: "Lampara-Dental-v5",
    slug: "Lampara-Dental-v5",
    name: "Lámpara dental V5",
    subtitle: "Luz libre de efectos de sombra",
    brand: {
      name: "Siger",
      logo: assets.logos.brands.siger
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "3 niveles de color temperatura",
          "5 niveles de brillo ajustable",
          "Con función de corte de luz azul",
          "El brillo del punto está igualado",
          "Excelente efecto sin sombra",
          "Fuente de luz: LED",
          "Iluminación: 8000-35000 LUX",
          "Temperatura de color: 3000-4500-5500K",
          "Dimensión del punto: 75 x 200 MM (@700 MM)",
          "Potencia: 10VA",
          "Voltaje: 12-24V AC"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.lamparasDentales.LamparaDentalV5.default,
        alt: "Lámpara dental V5",
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
    id: "lampara-fotocurado-caries",
    slug: "lampara-fotocurado-caries",
    name: "LED DB686HONOR",
    subtitle: "3 modelos de trabajo",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Adaptador: CA 100-240 V, CC 5 V 1,5 A, 50/60 Hz",
          "Rango de longitud de onda: 385 ~ 515 nm",
          "Área óptica efectiva: 50 mm2",
          "Potencia de luz: 3000 mW/cm2",
          "Batería de litio: Capacidad de más de 200 exposiciones en 10 segundos"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.lamparasFotocurado.LEDDB686HONOR.default,
        alt: "LED DB686HONORo",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.lamparasFotocurado.LEDDB686HONOR.LeDDB686HONOR_2,
        alt: "LED DB686HONORo",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.lamparasFotocurado.LEDDB686HONOR.LeDDB686HONOR_3,
        alt: "LED DB686HONORo",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Lámparas de Fotocurado",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.257Z",
    updatedAt: "2024-10-29T00:10:22.257Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/Xtw-NX_rVwk?si=Z-jowSqCKJisyOxi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: "NANO-DB686",
    slug: "NANO-DB686",
    name: "NANO DB686",
    subtitle: "Detector de caries",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características ",
        items: [
          "Fuente de alimentación: CA 100 ~ 240 V, CC 5 V/1,5 A, 50/60 Hz",
          "Batería: 3,7 V, 300 mAh",
          "Dimensiones de la pieza de mano (con batería y punta) (cm): 19,7 × 1,35",
          "Peso (g): 75,5",
          "Cuerpo completamente de metal, para una vida útil más larga",
          "Pequeño y perfecto para usar, solo 13,5 mm de diámetro exterior",
          "Luz indicadora y tecla de control, dos en uno",
          "El cabezal puede girar 360°",
          "4 LEDs de amplio espectro: 380-520 mm, adecuado para la mayoría de las resinas de curado UV",
          "Núcleo de luz LED de detección de caries independiente, que no deja lugar donde las caries se puedan esconder",
          "Sistema de medición LED de alta sensibilidad incorporado",
          "Rango de curado amplio de 10 mm",
          "Profundidad de curado de 8 mm",
          "Incluye dos baterías estándar, una batería completamente cargada se puede utilizar 200 veces (modo de curado de 10 s)"
        ]
      },
      general: {
        title: "Modo de curado:",
        items: [
          "Longitud de onda: 380 ~ 520 nm",
          "Tiempo de curado: 10 s, 20 s",
          "Profundidad de curado: 8 mm",
          "Rango de curado: 10 mm",
          "Potencia de la luz: ≥1500 mw/cm²",
        ]
      },
      includes: {
        title: "Modo de detección",
        items: [
          "Longitud de onda: 380 ~ 420 nm",
          "Intensidad de la luz: 40 ~ 280 mw/cm",
        ]
      },
    },
    images: [
      {
        url: assets.products.lamparasFotocurado.NaNODB686.default,
        alt: "NANO DB686",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.lamparasFotocurado.NaNODB686.NaNODB686_2,
        alt: "NANO DB686",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.lamparasFotocurado.NaNODB686.NaNODB686_3,
        alt: "NANO DB686",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Lámparas de Fotocurado",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.262Z",
    updatedAt: "2024-10-29T00:10:22.262Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/0lh9Al7h4l8?si=1U0tMZyod6RkrfQr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: "Swift-DB686",
    slug: "Swift-DB686",
    name: "Swift DB686",
    subtitle: "Lámpara de ortodoncia",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "Modos de trabajo: Soft up, High power y Ortodoncia",
    shortDescription: "Tres modos de trabajo especializados",
    features: {
      unique: {
        title: "Características",
        items: [
          "Adaptadores: CA 100-240 V, 50/60 Hz",
          "Amplio espectro: 385-515 nm",
          "Potencia luminosa: >1000 mw/cm²",
          "Volumen (cm): 19,6 × 12,8 × 5,5",
          "Peso (kg)/pieza: 0,54",
          "Cuanto más pequeño, más ligero",
          "3 Modos de trabajo. Adecuado para diversas necesidades de tratamiento",
          "Actualización de bombilla LED: potente, diseñado para uso dental",
          "Cabezal giratorio: fácil acceso a varios lugares de tratamiento",
          "Diseño de lente especial: salida de luz más uniforme",
          "Circuito de chip mejorado: control de intensidad de luz más preciso",
          "Batería de larga duración: una carga puede utilizarse 785 veces (modo de subida suave - 10 s)",
          "Longitud de onda: 385-515 nm. Adecuado para la mayoría de las resinas del mercado. Fácil curado del acabado",
          "Capacidad de súper ortodoncia: intensidad de luz de hasta 3000 mw/cm². Estable y no se cae fácilmente",
          "Curado profundo de 8 mm que proporciona un efecto de curado en cada rincón."
        ]
      },
      general: {
        title: "Tiempo de curado",
        items: [
          "5 s/10 s/15 s/20 s (modo de suavizado)",
          "5 s (modo de alta potencia)",
          "1-8 veces (modo ortodóntico)",
        ]
      }
    },
    images: [
      {
        url: assets.products.lamparasFotocurado.SwiftDB686.default,
        alt: "DB686 Swift",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.lamparasFotocurado.SwiftDB686.SwiftDB686_2,
        alt: "DB686 Swift",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.lamparasFotocurado.SwiftDB686.SwiftDB686_3,
        alt: "DB686 Swift",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: "Lámparas de Fotocurado",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.269Z",
    updatedAt: "2024-10-29T00:10:22.269Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/VsEw7oO0NS4?si=lN1bv1QrDM9Tcs9s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: "Fresadora-dental-Craft-5x",
    slug: "Fresadora-dental-Craft-5x",
    name: "Fresadora dental Craft 5x",
    subtitle: "Fresadora en húmedo y seco",
    brand: {
      name: "DOF",
      logo: assets.logos.brands.dof
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Más que una simple fresadora en seco y en húmedo convencional",
          "Todo en uno: tanques de agua, colectores de polvo y compresores en uno solo",
          "Diseño compacto y potente",
          "Molienda húmeda y seca: se pueden combinar",
          "5 ejes",
          "Robusto y con baja vibración",
          "Circuito cerrado",
          "Almacenamiento",
        ]
      },
      general: {
        title: "Incluye",
        items: [
          "Software MillBox 5X (original)",
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
        url: assets.products.fresadoras.Craft5x.default,
        alt: "CRAFT 5X FRESADORA",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.fresadoras.Craft5x.Craft5x_2,
        alt: "CRAFT 5X FRESADORA",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.fresadoras.Craft5x.Craft5x_3,
        alt: "CRAFT 5X FRESADORA",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.fresadoras.Craft5x.Craft5x_4,
        alt: "CRAFT 5X FRESADORA",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.fresadoras.Craft5x.Craft5x_5,
        alt: "CRAFT 5X FRESADORA",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Fresadora",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.233Z",
    updatedAt: "2024-10-29T00:10:22.233Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/zv0dwi0r3i0?si=ViDX4kCM-T8DmhiN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: "Fresadora-dental-Craft-Dry",
    slug: "Fresadora-dental-Craft-Dry",
    name: "Fresadora dental Craft Dry",
    subtitle: "Fresadora en seco",
    brand: {
      name: "DOF",
      logo: assets.logos.brands.dof
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Fresadora en seco",
          "Tamaño compacto de 430x620x712",
          "Compresor de aire incorporado",
          "Cambio de plantilla con un solo toque",
          "Puede cambiar a la herramienta adecuada para materiales como zirconio, PMMA y cerámica híbrida sin interrumpir su trabajo"
        ]
      },
      general: {
        title: "Incluye",
        items: []
      }
    },
    images: [
      {
        url: assets.products.fresadoras.CraftDry.default,
        alt: "CRAFT 5X FRESADORA",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.fresadoras.CraftDry.CraftDry_2,
        alt: "CRAFT 5X FRESADORA",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.fresadoras.CraftDry.CraftDry_3,
        alt: "CRAFT 5X FRESADORA",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.fresadoras.CraftDry.CraftDry_4,
        alt: "CRAFT 5X FRESADORA",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.fresadoras.CraftDry.CraftDry_5,
        alt: "CRAFT 5X FRESADORA",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Fresadora",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.233Z",
    updatedAt: "2024-10-29T00:10:22.233Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/2lWSqQ-JMX0?si=WVct9IDdwfeUsaO7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: "SA-260MB-Super-deluxe-automatico-clase-B",
    slug: "SA-260MB-Super-deluxe-automatico-clase-B",
    name: "SA-260MB - Súper deluxe automático, clase “B”",
    subtitle: "Rendimiento de primera clase con diseño compacto",
    brand: {
      name: "Sturdy",
      logo: assets.logos.brands.sturdy
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características Únicas",
        items: [
          "Panel LCD",
          "Pre y post vacío",
          "Programa de priones",
          "Fugas, Helix, B.D. Programa de prueba",
          "Programa de personalización",
          "Grabador de datos (tarjeta SD) e impresora",
          "El tanque se puede llenar manualmente o por tubería (agua filtrada)",
          "Protección contra el sobrecalentamiento",
          "Sistema de evaluación de procesos",
          "Cerradura de puerta automática a presión",
          "Botón de parada de emergencia",
          "Protección contra sobrecarga de presión",
          "Tanques de agua dobles (Sólo para SA-300MB/302MB)",
          "Volumen de la cámara: 24 L"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.esterilizadores.Sa260MB.default,
        alt: "SA-260MB - Súper deluxe automático, clase “B””",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.esterilizadores.Sa260MB.Sa260MB_2,
        alt: "SA-260MB - Súper deluxe automático, clase “B”",
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
  {
    id: "SA-232X-Semi-automatico-clase-S",
    slug: "SA-232X-Semi-automatico-clase-S",
    name: "SA-232X - Semi automático, clase “S”",
    subtitle: "Ciclo de secado incorporado",
    brand: {
      name: "Sturdy",
      logo: assets.logos.brands.sturdy
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características Únicas",
        items: [
          "Autoclave de valor",
          "Semi automática. (Con ciclo de secado)",
          "Cámara de 16 litros en acero inoxidable",
          "Puerta con sistema de cerrado tipo tornillo de perilla hexagonal",
          "Válvula de control de seguridad por alta presión",
          "Dos temperaturas de trabajo (121º y 132º)",
          "Con selectores e indicadores de tiempo",
          "Selector para instrumentos envueltos o sin envoltura",
          "Tanque para depósito de agua",
          "Sistema de condensado para economizar agua",
          "Protector térmico en caso de sobrecalentamiento"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.esterilizadores.SA232x.default,
        alt: "SA-232X - Semi automático, clase “S”",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.esterilizadores.SA232x.SA232x_2,
        alt: "SA-232X - Semi automático, clase “S”",
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
  {
    id: "SA-232-Manual-clase-N",
    slug: "SA-232-Manual-clase-N",
    name: "SA-232 - Manual, clase “N”",
    subtitle: "Acero inoxidable",
    brand: {
      name: "Sturdy",
      logo: assets.logos.brands.sturdy
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Autoclave más económica y práctica",
          "Cámara de 16 litros en acero inoxidable",
          "Puerta con sistema de cerrado tipo tornillo de perilla triangular",
          "Válvula de control de seguridad por alta presión",
          "Dos temperaturas de trabajo (121º y 132º)",
          "Con selectores e indicadores de tiempo",
          "Selector para instrumentos envueltos o desenvueltos",
          "Protector térmico en caso de sobrecalentamiento"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.esterilizadores.Sa232.default,
        alt: "SA-232",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.esterilizadores.Sa232.Sa232_2,
        alt: "SA-232",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: 'Esterilización',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z"
  },
  {
    id: "Carro-movil-multifuncional",
    slug: "Carro-movil-multifuncional",
    name: "Carro móvil multifuncional",
    subtitle: "Diseño minimalista",
    brand: {
      name: "Siger",
      logo: assets.logos.brands.siger
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Diseño industrial minimalista, hermoso y fácil de instalar",
          "Todo el material metálico, resistente y duradero, fácil de limpiar y desinfectar",
          "Ruedas médicas profesionales para un movimiento flexible y silencioso",
          "3 toma corrientes integrados"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.Mobiliario.CarroMovilMultifuncional.default,
        alt: "Carro móvil multifuncional",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.Mobiliario.CarroMovilMultifuncional.CarroMovilMultifuncional_15,
        alt: "Carro móvil multifuncional",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.Mobiliario.CarroMovilMultifuncional.CarroMovilMultifuncional_2,
        alt: "Carro móvil multifuncional",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.Mobiliario.CarroMovilMultifuncional.CarroMovilMultifuncional_3,
        alt: "Carro móvil multifuncional",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.Mobiliario.CarroMovilMultifuncional.CarroMovilMultifuncional_4,
        alt: "Carro móvil multifuncional",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.Mobiliario.CarroMovilMultifuncional.CarroMovilMultifuncional_5,
        alt: "Carro móvil multifuncional",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: 'Mobiliario',
    subcategory: 'Carritos',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z"
  },
  {
    id: "Carrito-movil-T3-3",
    slug: "Carrito-movil-T3-3",
    name: "Carrito móvil T3-3",
    subtitle: "Encimera de ABS",
    brand: {
      name: "DenTech",
      logo: assets.logos.brands.dentech
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Encimera de ABS",
          "Acero laminado en frío + ABS",
          "Largo 43 x Ancho 34 x Alto 89 cm",
          "Toma corriente en la parte trasera y un cable de alimentación de 1.8 metros"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.Mobiliario.CarritoMovilT3_3.default,
        alt: "Carrito móvil T3-3",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.Mobiliario.CarritoMovilT3_3.CarritoMovilT3_3_2,
        alt: "Carrito móvil T3-3",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: 'Mobiliario',
    subcategory: 'Carritos',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z"
  },
  {
    id: "Carrito-movil-K1",
    slug: "Carrito-movil-K1",
    name: "Carrito móvil K1",
    subtitle: "Base integrada",
    brand: {
      name: "DenTech",
      logo: assets.logos.brands.dentech
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Base integrada",
          "Columna de aleación de aluminio",
          "Largo 45 cm x Ancho 46 cm x Alto 1 metro",
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.Mobiliario.CarritoMovilK1.default,
        alt: "Carrito móvil T3-3",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.Mobiliario.CarritoMovilK1.CarritoMovilK1_2,
        alt: "Carrito móvil T3-3",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.Mobiliario.CarritoMovilK1.CarritoMovilK1_3,
        alt: "Carrito móvil T3-3",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: 'Mobiliario',
    subcategory: 'Carritos',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z"
  },
  {
    id: "Armario-G14-1",
    slug: "Armario-G14-1",
    name: "Armario G14-1",
    subtitle: "Mesa de operaciones invisible",
    brand: {
      name: "DenTech",
      logo: assets.logos.brands.dentech
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Mango en forma de C de acero inoxidable",
          "Mesa de operaciones invisible",
          "2 bandejas de instrumentos",
          "Largo 53 cm x Ancho 43 cm x Alto 86 cm",
          "Fácil de limpiar"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.Mobiliario.ArmarioG14_1.default,
        alt: "Armario G14-1",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.Mobiliario.ArmarioG14_1.ArmarioG14_1_2,
        alt: "Armario G14-1",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.Mobiliario.ArmarioG14_1.ArmarioG14_1_3,
        alt: "Armario G14-1",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.Mobiliario.ArmarioG14_1.ArmarioG14_1_4,
        alt: "Armario G14-1",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: 'Mobiliario',
    subcategory: 'Armarios',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z"
  },
  {
    id: "Armario-G16",
    slug: "Armario-G16",
    name: "Armario G16",
    subtitle: "Encimera de acrílico brillante",
    brand: {
      name: "DenTech",
      logo: assets.logos.brands.dentech
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Encimera de acrílico brillante",
          "Mango en forma de C de acero inoxidable",
          "1 bandeja de instrumentos",
          "Largo 83 cm x Ancho 44 cm x Alto 83 cm",
          "Fácil de limpiar"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.Mobiliario.ArmarioG16.default,
        alt: "Armario G16",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.Mobiliario.ArmarioG16.ArmarioG16_2,
        alt: "Armario G16",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.Mobiliario.ArmarioG16.ArmarioG16_3,
        alt: "Armario G16",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.Mobiliario.ArmarioG16.ArmarioG16_4,
        alt: "Armario G16",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: 'Mobiliario',
    subcategory: 'Armarios',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z"
  },
  {
    id: "Escaner-Intraoral-DL-300P-Coxo-Launca",
    slug: "Escaner-Intraoral-DL-300P-Coxo-Launca",
    name: "Escáner intraoral DL-300P, Coxo, Launca",
    subtitle: "Alámbrico",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo 
    },
    brand2: {
      name: "launca",
      logo: assets.logos.brands.launca 
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Algoritmo lógico avanzado que controla eficazmente el error de los datos de impresión digital hasta 10 μm",
          "Se puede escanear media boca en 30 segundos",
          "Ligero: 180g y fácil de sostener",
          "Campo de visión máximo de 17×15 mm"
        ]
      },
      general: {
        title: "Funciones",
        items: [
          "Modo Al: recircula los dientes y el tejido blando en el ámbito de exploración y elimina el tejido blando",
          "Exploración de la dentición completa maxilar y mandibular",
          "Visualización ultra clara del modelo 3D",
          "Módulo de análisis de oclusión integrado",
          "Informe de escaneado automático",
          "Función de reproducción de escaneado",
          "Función de guía de escaneado inteligente incorporada",
          "Sistema de retroalimentación del software",
          "Función de transferencia a la nube",
          "Función endoscópica 3D",
          "Evaluación de la calidad de los datos de escaneado"
        ]
      },
      includes: {
        title: "Puede incorporar (consultar el valor)",
        items: [
          "Computadora"
        ]
      },
    },
    images: [
      {
        url: assets.products.scanner.EscanerIntraoralDL300PCoxoLaunca.default,
        alt: "Esccáner intraoral DL-300P, Coxo, Launca",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.scanner.EscanerIntraoralDL300PCoxoLaunca.EscanerIntraoralDL300PCoxoLaunca_2,
        alt: "Esccáner intraoral DL-300P, Coxo, Launca",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.scanner.EscanerIntraoralDL300PCoxoLaunca.EscanerIntraoralDL300PCoxoLaunca_3,
        alt: "Esccáner intraoral DL-300P, Coxo, Launca",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: 'Escáneres',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/pkhbaw43m_w?si=gBhz80JkeDTkfYSJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: "Escaner-para-laboratorio-dental-Edge-HD-DOF",
    slug: "Escaner-para-laboratorio-dental-Edge-HD-DOF",
    name: "Escáner para laboratorio dental Edge HD, DOF",
    subtitle: "Laboratorio",
    brand: {
      name: "DOF",
      logo: assets.logos.brands.dof
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Diseño exclusivo y un rendimiento potente",
          "Velocidad de escaneo rápida y estable",
          "Se pueden trabajar todos los casos, desde coronas individuales hasta prótesis de boca completa",
          "Tecnologías sofisticadas: control automático del brillo y las funciones de ahorro de energía",
          "Escanee datos mediante el sistema de cámara dual de 2 megapíxeles"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.scanner.EscanerParaLaboratorioDentalEdgeHDDOF.default,
        alt: "Escáner para laboratorio dental Edge HD, DOF",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.scanner.EscanerParaLaboratorioDentalEdgeHDDOF.EscanerParaLaboratorioDentalEdgeHDDOF_2,
        alt: "Escáner para laboratorio dental Edge HD, DOF",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.scanner.EscanerParaLaboratorioDentalEdgeHDDOF.EscanerParaLaboratorioDentalEdgeHDDOF_3,
        alt: "Escáner para laboratorio dental Edge HD, DOF",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.scanner.EscanerParaLaboratorioDentalEdgeHDDOF.EscanerParaLaboratorioDentalEdgeHDDOF_4,
        alt: "Escáner para laboratorio dental Edge HD, DOF",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.scanner.EscanerParaLaboratorioDentalEdgeHDDOF.EscanerParaLaboratorioDentalEdgeHDDOF_5,
        alt: "Escáner para laboratorio dental Edge HD, DOF",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: 'Escáneres',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/4QPcEgtL5CU?si=2HZdesG5rYT5s_Fw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: "Escaner-intraoral-Freedom-I-DOF",
    slug: "Escaner-intraoral-Freedom-I-DOF",
    name: "Escáner intraoral Freedom I, DOF",
    subtitle: "Inalámbrico",
    brand: {
      name: "DOF",
      logo: assets.logos.brands.dof
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Escaneo en 3D con tecnología óptica",
          "Utiliza tecnología de luz estructurada para capturar imágenes de alta resolución",
          "Resolución de captura de hasta 16 µm (micrómetros)",
          "Diseño compacto y ligero: 282 g. Dimensión: 188 mm x 59.6 mm x 50mm"
        ]
      },
      general: {
        title: "Puede incorporar (consultar el valor)",
        items: [
          "Computadora"
        ]
      }
    },
    images: [
      {
        url: assets.products.scanner.EscanerIntraoralFreedomIDOF.EscanerIntraoralFreedomIDOF_2,
        alt: "Escáner intraoral Freedom I, DOF",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.scanner.EscanerIntraoralFreedomIDOF.default,
        alt: "Escáner intraoral Freedom I, DOF",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.scanner.EscanerIntraoralFreedomIDOF.EscanerIntraoralFreedomIDOF_3,
        alt: "Escáner intraoral Freedom I, DOF",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.scanner.EscanerIntraoralFreedomIDOF.EscanerIntraoralFreedomIDOF_4,
        alt: "Escáner intraoral Freedom I, DOF",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.scanner.EscanerIntraoralFreedomIDOF.EscanerIntraoralFreedomIDOF_5,
        alt: "EEscáner intraoral Freedom I, DOF",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: 'Escáneres',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/Kp6hrkkcuI8?si=OfSk90mk8SXa7pTO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: "Escaner-intraoral-Meyer",
    slug: "Escaner-intraoral-Meyer",
    name: "Escáner intraoral Meyer",
    subtitle: "Alámbrico",
    brand: {
      name: "Meyer",
      logo: assets.logos.brands.meyer
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Escaneo rápido y eficaz de toda la boca en 3 minutos",
          "Precisión de escaneo mejor que 15 μm",
          "Proceso operativo sencillo",
          "Garantiza la comodidad del paciente y ofrece resultados de escaneo ideales",
          "Dentistas o técnicos pueden obtener fácilmente impresiones digitales: facilita las aplicaciones de escaneo en implantología, odontología restauradora y ortodoncia",
          "Procesamiento inteligente de imágenes: aplicación de tecnología de procesamiento de IA para eliminar eficazmente la interferencia de los tejidos blandos",
          "Calibración con un solo clic",
          "Control de gestos: admite la operación inteligente basada en gestos, activando funciones del dispositivo en función de acciones"
        ]
      },
      general: {
        title: "Puede incorporar (consultar el valor)",
        items: [
          "Computadora"
        ]
      }
    },
    images: [
      {
        url: assets.products.scanner.EscanerIntraoralMeyer.default,
        alt: "Escáner intraoral Meyer",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.scanner.EscanerIntraoralMeyer.EscanerIntraoralMeyer_2,
        alt: "Escáner intraoral Meyer",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.scanner.EscanerIntraoralMeyer.EscanerIntraoralMeyer_3,
        alt: "Escáner intraoral Meyer",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.scanner.EscanerIntraoralMeyer.EscanerIntraoralMeyer_4,
        alt: "Escáner intraoral Meyer",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: 'Escáneres',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/wtaYM0jAuBg?si=fZR81Lxv_aLWVn-A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: "Escaner-de-placas-para-imagenes-dentales",
    slug: "Escaner-de-placas-para-imagenes-dentales",
    name: "Escáner de placas para imágenes dentales",
    subtitle: "Soporta placas de tamaño: 0 1 2 3",
    brand: {
      name: "DentaFilm",
      logo: assets.logos.brands.dentafilm
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Equipado con un sistema de procesamiento de imágenes de alta definición, los detalles de la imagen son claros",
          "Escaneo de matriz de puntos láser, obtenga imágenes de películas dentales en segundos",
          "Luces indicadoras de colores correspondientes para espera, lectura y fin, incorporando un concepto de diseño humanizado",
          "Resolución: 14 pares de línea/mm",
          "Tamaño de pixel: 35 µm",
          "Escala de grises: 16 Bit",
          "Borrado de placa: Automático",
          "Interfase de comunicación: USB",
          "Alimentación: 120 Vac 60Hz",
          "Dimensiones: 296 mm x 170 mm x 196 mm",
          "Sistema operativo: Microsoft Windows 7 o superior",
          "Datos de impresión: impresora de oficina o impresora DICOM",
          "Formato de salida de imagen: DICOM, BMP y JPG"
        ]
      },
      general: {
        title: "Película fosforescente ultrafina, segura y cómoda",
        items: [
          "La lámina fosforescente ultrafina mejora la comodidad, se puede doblar adecuadamente y reutilizar 4 tipos de tamaños de película fosforescente para satisfacer las necesidades de las tomas clínicas"
        ]
      }
    },
    images: [
      {
        url: assets.products.scanner.EscanerDePlacasParaImagenesDentales.default,
        alt: "Escáner de placas para imágenes dentales",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.scanner.EscanerDePlacasParaImagenesDentales.EscanerDePlacasParaImagenesDentales_2,
        alt: "Escáner de placas para imágenes dentales",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.scanner.EscanerDePlacasParaImagenesDentales.EscanerDePlacasParaImagenesDentales_3,
        alt: "Escáner de placas para imágenes dentales",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: 'Equipo de Rayos X',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z",
  },
  {
    id: "Pulverizador-ultrasonico-CK-C-para-desinfeccion",
    slug: "Pulverizador-ultrasonico-CK-C-para-desinfeccion",
    name: "Pulverizador ultrasónico CK-C para desinfección",
    subtitle: "Panel de control digital",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Puede atomizarse en pequeñas partículas por debajo de 20 µm, y rociarse uniformemente en el aire para que flote en estado de aerosol",
          "La capacidad de carga de 15 litros de líquido, funciona continuamente durante 20 horas",
          "Inyección fuerte, el spray de 600 ml / h cuantifica cubriendo 100 m²",
          "Tipo móvil, es especialmente adecuado para hospitales, clínicas y consultorios"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.pulverizador.PulverizadorUltrasonicoCKCparaDesinfeccion.default,
        alt: "Pulverizador ultrasónico CK-C para desinfección",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: 'Pulverizador',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z"
  },
  {
    id: "Pulverizador-ultrasonico-CK-A-para-desinfeccion",
    slug: "Pulverizador-ultrasonico-CK-A-para-desinfeccion",
    name: "Pulverizador ultrasónico CK-A para desinfección",
    subtitle: "Control remoto incluido",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Puede atomizarse en pequeñas partículas por debajo de 20 µm, y rociarse uniformemente en el aire para que flote en estado de aerosol",
          "La capacidad de carga de 16 litros de líquido, funciona continuamente durante 30 horas",
          "Inyección fuerte, el spray de 600 ml / h cuantifica cubriendo 100 m²",
          "Tipo móvil, es especialmente adecuado para hospitales, clínicas y consultorios"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.pulverizador.PulverizadorUltrasonicoCKAparaDesinfeccion.default,
        alt: "Pulverizador ultrasónico CK-A para desinfección",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: 'Pulverizador',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z"
  },
  {
    id: "Sistema-dental-portatil",
    slug: "Sistema-dental-portatil",
    name: "Sistema dental portátil",
    subtitle: "Totalmente autónomo",
    brand: {
      name: "TPC",
      logo: assets.logos.brands.tpc
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características (2 tubos)",
        items: [
          "El PC2630 es un sistema dental neumático totalmente autónomo. Fácil y rápido de instalar y operar. Listo para viajar"
        ]
      },
      general: {
        title: "Incluye",
        items: [
          "Tubos para instrumentos de 4 o 2 orificios (especifique)",
          "Jeringa de 3 vías",
          "Eyector de saliva",
          "Sistema de botella de agua autónomo",
          "Compresor sin aceite de 3/4 HP (580 W/7 L)",
          "Pedal de control",
          "Sistema de aspiración Air Venturi",
          "Estuche de transporte con asa"
        ]
      }
    },
    images: [
      {
        url: assets.products.EquipoPortatil.SistemaDentalPortatil.default,
        alt: "Sistema dental portátil",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.EquipoPortatil.SistemaDentalPortatil.SistemaDentalPortatil_2,
        alt: "Sistema dental portátil",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.EquipoPortatil.SistemaDentalPortatil.SistemaDentalPortatil_3,
        alt: "Sistema dental portátil",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: 'Equipo portátil',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z"
  },
  {
    id: "CarroMedicoMovilMirage",
    slug: "Carro-Medico-Movil-Mirage",
    name: "Carro médico móvil Mirage 2.0",
    subtitle: "Equipo portátil",
    brand: {
      name: "TPC",
      logo: assets.logos.brands.tpc
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Carro con paquete de vacío",
          "Selección automática de pieza de mano Asepsis 3 con sistema de botella",
          "Jeringa de 3 vías con punta esterilizable en autoclave de cambio rápido",
          "Alternar encendido/apagado maestro",
          "Ajuste de presión de aire/agua para cada pieza de mano",
          "Manómetro",
          "Ajuste y purga de refrigerante de agua/aire no retráctil",
          "Tubo de la pieza de mano de asepsia",
          "Marco en H pintado con ajuste de altura, 27\" a 39\"",
          "Bidón de vacío con pantalla extraíble 2 1/8\"",
          "1 eyector y tubo de Hve y saliva esterilizables en autoclave",
          "Control de pie de velocidad variable",
          "10 pies de umbilical"        ]
      },
      general: {
        title: "",
        items: [
        ]
      }
    },
    images: [
      {
        url: assets.products.EquipoPortatil.CarroMedicoMovilMirage.default,
        alt: "Carro médico móvil Mirage 2.0",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.EquipoPortatil.CarroMedicoMovilMirage.CarroMedicoMovilMirage_2,
        alt: "Carro médico móvil Mirage 2.0",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: 'Equipo portátil',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z"
  },
  {
    id: "Silla-dental-portatil",
    slug: "Silla-dental-portatil",
    name: "Silla dental portátil",
    subtitle: "Taburete ligero bandeja PC2700",
    brand: {
      name: "TPC",
      logo: assets.logos.brands.tpc
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Incluye",
        items: [
          "Compresor",
          "Lámpara de fotocurado",
          "Limpiador ultrasónico",
          "Succión de baja"
        ]
      },
      general: {
        title: "",
        items: [
        ]
      }
    },
    images: [
      {
        url: assets.products.EquipoPortatil.SillaDentalPortatil.default,
        alt: "Silla dental portátil",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.EquipoPortatil.SillaDentalPortatil.SillaDentalPortatil_2,
        alt: "Silla dental portátil",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.EquipoPortatil.SillaDentalPortatil.SillaDentalPortatil_3,
        alt: "Silla dental portátil",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: 'Equipo portátil',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z"
  },
  {
    id: "UC-One",
    slug: "UC-One",
    name: "UC One",
    subtitle: "Irrigación ultrasónica pasiva inalámbrica",
    brand: {
      name: "epdent",
      logo: assets.logos.brands.epdent
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Ayuda a implementar la irrigación del conducto radicular. Al utilizar puntas de plástico, ayuda a acceder al conducto curvo sin preocuparse por la rotura de la lima en el conducto. La activación del irrigador ayuda a acceder a áreas inaccesibles"
        ]
      },
      general: {
        title: "Punta de plástico",
        items: [
          "Solo irrigación del conducto radicular",
          "Fácil acceso al conducto curvo sin dañar el conducto radicular",
          "Gran durabilidad y potencia",
          "Capaz de doblar la punta de plástico a 90°C sin perder su potencia"
        ]
      },
      includes: {
        title: "Punta de metal",
        items: [
          "Diseñado para eliminar únicamente el archivo roto o el sellador MTA",
          "Nunca lo use para irrigar el conducto radicular",
          "Incluye una sonda de conducto radicular",
          "Advertencia: Nunca lo use para irrigación del conducto radicular, ya que puede dañar el conducto radicular"
        ]
      }
    },
    images: [
      {
        url: assets.products.EquipoParaEndodoncia.OCOne.default,
        alt: "UC One",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: 'Equipo para endodoncia',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z"
  },
  {
    id: "Succion-EP",
    slug: "Succion-EP",
    name: "Succión EP",
    subtitle: "3 unidades",
    brand: {
      name: "epdent",
      logo: assets.logos.brands.epdent
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "La succión EP ayuda a secar rápidamente el conducto radicular y reduce los costos de las puntas de papel al eliminar directamente la saliva y los residuos de la boca del paciente.",
        items: [
          "Tratamiento de conductos radiculares por calcificación",
          "Secado rápido del conducto radicular",
          "Utilice sólo una punta de papel",
          "Uso posterior"
        ]
      },
      general: {
        title: "",
        items: [
        ]
      }
    },
    images: [
      {
        url: assets.products.EquipoParaEndodoncia.SuccionEP.default,
        alt: "SuccionEP",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: 'Equipo para endodoncia',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z"
  },
  {
    id: "GP-Cut-Fit",
    slug: "GP-Cut-Fit",
    name: "GP Cut & Fit",
    subtitle: "Cortador GP",
    brand: {
      name: "epdent",
      logo: assets.logos.brands.epdent
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Excelente corte de gutapercha en cualquier medida. Es aplicable a todos los tamaños con solo 3 tipos de tamaño para hacer",
        ]
      },
      general: {
        title: "Tipo cono GP",
        items: [
          "Tamaño exacto",
          "Borde cortado limpio",
          "Cuchilla incorporada de forma segura",
          "Cono GP cónico especial con tamaño de 31 mm"
        ]
      }
    },
    images: [
      {
        url: assets.products.EquipoParaEndodoncia.GPCutFit.default,
        alt: "GP Cut & Fit",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: 'Equipo para endodoncia',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z"
  },
  {
    id: "Cortadora-UC",
    slug: "Cortadora-UC",
    name: "Cortadora UC (Cortadora Sonic GP)",
    subtitle: "Cauterización de encías / Gutapercha cortada / Empaquetadura de plumón",
    brand: {
      name: "epdent",
      logo: assets.logos.brands.epdent
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "3 funciones diferentes en un solo dispositivo",
        items: [
          "Cauterizar la encía y realizar gingivectomía (con punta Bovie)",
          "UC-CUT™ viene con función de calor y vibración para cortar gutapercha.",
          "La función de vibración ayuda a evitar que se tire de la gutapercha",
          "La condensación vertical se puede realizar con boquillas F/FM",
          "Peso ligero (1,73 oz)"
        ]
      },
      general: {
        title: "",
        items: [
        ]
      }
    },
    images: [
      {
        url: assets.products.EquipoParaEndodoncia.CortadoraUC.default,
        alt: "SuccionEP",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: 'Equipo para endodoncia',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z"
  },
  {
    id: "C-SMART-I-PILOT-con-localizador-de-apice",
    slug: "C-SMART-I-PILOT-con-localizador-de-apice",
    name: "C-SMART-I PILOT con localizador de ápice",
    subtitle: "Motor de endodoncia",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Entrada del adaptador: CA 100 ~ 240 V, 50/60 Hz",
          "Salida: CC 10 V, 1,5 A",
          "Batería de la unidad de control: batería de iones de litio (CC 7,4 V, 2600 mAh)",
          "Batería de la pieza de mano: batería de iones de litio (CC 3,7 V, 1200 mAh)",
          "Rango de velocidad de rotación: 150 ~ 1000 rpm",
          "Par motor: 0,6 ~ 3,9 N.cm",
          "Potencia de entrada: 35 VA",
          "Volumen: 24 × 24 × 7,5 cm",
          "Peso: 1,5 kg"
        ]
      },
      general: {
        title: "",
        items: [
        ]
      }
    },
    images: [
      {
        url: assets.products.EquipoParaEndodoncia.CSMARTiPILOT.default,
        alt: "C-SMART-I PILOT con localizador de ápice",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.EquipoParaEndodoncia.CSMARTiPILOT.CSMARTiPILOT_2,
        alt: "C-SMART-I PILOT con localizador de ápice",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.EquipoParaEndodoncia.CSMARTiPILOT.CSMARTiPILOT_3,
        alt: "C-SMART-I PILOT con localizador de ápice",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.EquipoParaEndodoncia.CSMARTiPILOT.CSMARTiPILOT_4,
        alt: "C-SMART-I PILOT con localizador de ápice",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.EquipoParaEndodoncia.CSMARTiPILOT.CSMARTiPILOT_5,
        alt: "C-SMART-I PILOT con localizador de ápice",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.EquipoParaEndodoncia.CSMARTiPILOT.CSMARTiPILOT_6,
        alt: "C-SMART-I PILOT con localizador de ápice",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: 'Equipo para endodoncia',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z"
  },
  {
    id: "C-Explorer",
    slug: "C-Explorer",
    name: "C-Explorer",
    subtitle: "Sistema quirúrgico ultrasónico dental",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Tensión de alimentación: 100-240 V 50/60 Hz 150 VA",
          "Dispositivo para funcionamiento intermitente: 60 s ON, 10 s OFF",
          "Fusibles: 3,15 AT 250 V",
          "Flujo: 45-100 ml/min",
          "Amplitud radial: 8-63 µm",
          "Amplitud transversal: 1,5-12 µm",
          "Frecuencia de las puntas de trabajo: 23,8 kHz-32,2 kHz",
          "Mango: 130,3 × Φ33,5 mm",
          "Volumen: 28 × 23 × 14 cm",
          "Peso: 3,4 kg",
          "Puntas incluidas (kit básico): US1, US2, US4, US5, UL3, UC1"
        ]
      },
      general: {
        title: "",
        items: [
        ]
      }
    },
    images: [
      {
        url: assets.products.EquipoParaEndodoncia.CExplorer.default,
        alt: "Sistema quirúrgico ultrasónico dental",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.EquipoParaEndodoncia.CExplorer.CExplorer_2,
        alt: "Sistema quirúrgico ultrasónico dental",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.EquipoParaEndodoncia.CExplorer.CExplorer_3,
        alt: "Sistema quirúrgico ultrasónico dental",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.EquipoParaEndodoncia.CExplorer.CExplorer_4,
        alt: "Sistema quirúrgico ultrasónico dental",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: 'Equipo para endodoncia',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/FNYXEEWeR5g?si=TDnE41uQ62wYrveB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: "DC-704-4HP-220vAC",
    slug: "DC-704-4HP-220vAC",
    name: "DC 704 (4HP) 220vAC",
    subtitle: "Compresor de aire, silencioso",
    brand: {
      name: "TPC",
      logo: assets.logos.brands.tpc
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Potencia: 3KW (4HP)",
          "Volumen del tanque: 120L",
          "Flujo de aire: 608L/min (21.47CFM)",
          "Ruido: ≤65dB",
          "Peso neto: 98kg",
          "Presión: 8Bar (120Psi)",
          "Tratamiento anti herrumbre",
          "Libre de aceite"
        ]
      },
      general: {
        title: "",
        items: [
        ]
      }
    },
    images: [
      {
        url: assets.products.compresores.DC704220vAC.default,
        alt: "DC 704 (4HP) 220vAC",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.compresores.DC704220vAC.DC704220vAC_2,
        alt: "DC 704 (4HP) 220vAC",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: 'Compresores',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z",
  },
  {
    id: "DC-703D-3HP-con-secado",
    slug: "DC-703D-3HP-con-secado",
    name: "DC 703D (3HP) con secado",
    subtitle: "Compresor de aire, silencioso",
    brand: {
      name: "TPC",
      logo: assets.logos.brands.tpc
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Potencia: 2.25KW (3HP)",
          "Volumen del tanque: 90L",
          "Flujo de aire: 152L/min (5.37CFM)",
          "Ruido: ≤60dB",
          "Peso neto: 78kg",
          "Presión: 8Bar (116Psi)",
          "Tratamiento anti herrumbre",
          "Libre de aceite"
        ]
      },
      general: {
        title: "",
        items: [
        ]
      }
    },
    images: [
      {
        url: assets.products.compresores.DC703DconSecado.default,
        alt: "DC 703D (3HP) con secado",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.compresores.DC703DconSecado.DC703DconSecado_2,
        alt: "DC 703D (3HP) con secado",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: 'Compresores',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z",
  },
  {
    id: "DC-703-3HP-110vAC",
    slug: "DC-703-3HP-110vAC",
    name: "DC 703 (3HP) 110vAC",
    subtitle: "Compresor de aire, silencioso",
    brand: {
      name: "TPC",
      logo: assets.logos.brands.tpc
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Potencia: 2.25KW (3HP)",
          "Volumen del tanque: 90L",
          "Flujo de aire: 152L/min (5.37CFM)",
          "Ruido: ≤60dB",
          "Peso neto: 78kg",
          "Presión: 8Bar (116Psi)",
          "Tratamiento anti herrumbre",
          "Libre de aceite"
        ]
      },
      general: {
        title: "",
        items: [
        ]
      }
    },
    images: [
      {
        url: assets.products.compresores.DC7033HP110vAC.default,
        alt: "DC 703 (3HP) 110vAC",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.compresores.DC7033HP110vAC.DC7033HP110vAC_2,
        alt: "DC 703 (3HP) 110vAC",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: 'Compresores',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z",
  },
  {
    id: "DC-702-2HP-con-secado",
    slug: "DC-702-2HP-con-secado",
    name: "DC 702 (2HP) con secado",
    subtitle: "Compresor de aire, silencioso",
    brand: {
      name: "TPC",
      logo: assets.logos.brands.tpc
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Potencia: 1.5KW (2HP)",
          "Volumen del tanque: 60L",
          "Flujo de aire: 152L/min (5.37CFM)",
          "Ruido: ≤60dB",
          "Peso neto: 50kg",
          "Presión: 8Bar (116Psi)",
          "Tratamiento anti herrumbre",
          "Libre de aceite"
        ]
      },
      general: {
        title: "",
        items: [
        ]
      }
    },
    images: [
      {
        url: assets.products.compresores.DC702conSecado.default,
        alt: "DC 702 (2HP) con secado",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.compresores.DC702conSecado.DC702conSecado_2,
        alt: "DC 702 (2HP) con secado",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: 'Compresores',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z",
  },
  {
    id: "DC-702-2HP-110vAC",
    slug: "DC-702-2HP-110vAC",
    name: "DC 702 (2HP) 110vAC",
    subtitle: "Compresor de aire, silencioso",
    brand: {
      name: "TPC",
      logo: assets.logos.brands.tpc
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Potencia: 1.5KW (2HP)",
          "Volumen del tanque: 60L",
          "Flujo de aire: 152L/min (5.37CFM)",
          "Ruido: ≤60dB",
          "Peso neto: 50kg",
          "Presión: 8Bar (116Psi)",
          "Tratamiento anti herrumbre",
          "Libre de aceite"

        ]
      },
      general: {
        title: "",
        items: [
        ]
      }
    },
    images: [
      {
        url: assets.products.compresores.DC702110vAC.default,
        alt: "DC 702 (2HP) 110vAC",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.compresores.DC702110vAC.DC702110vAC_2,
        alt: "DC 702 (2HP) 110vAC",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: 'Compresores',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z",
  },
  {
    id: "DC-701-1HP-110vAC",
    slug: "DC-701-1HP-110vAC",
    name: "DC 701 (1HP) 110vAC",
    subtitle: "Compresor de aire, silencioso",
    brand: {
      name: "TPC",
      logo: assets.logos.brands.tpc
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Potencia: 0.75KW (1HP)",
          "Volumen del tanque: 32L",
          "Flujo de aire: 152L/min (5.37CFM)",
          "Ruido: ≤60dB",
          "Peso neto: 29.5kg",
          "Presión: 8Bar (116Psi)",
          "Tratamiento anti herrumbre",
          "Libre de aceite"
        ]
      },
      general: {
        title: "",
        items: [
        ]
      }
    },
    images: [
      {
        url: assets.products.compresores.DC7011HP110vAC.default,
        alt: "DC 701 (1HP) 110vAC",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.compresores.DC7011HP110vAC.DC7011HP110vAC_2,
        alt: "DC 701 (1HP) 110vAC",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: 'Compresores',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z",
  },
  {
    id: "Monitor-y-camara",
    slug: "Monitor-y-camara",
    name: "Monitor y cámara",
    subtitle: "Todo en uno",
    brand: {
      name: "Siger",
      logo: assets.logos.brands.siger
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Cámara intraoral todo en uno (versión de cámara inalámbrica) con transmisión inalámbrica de alta definición",
          "Carga automática de fotos y videos",
          "Transmisión de video inalámbrica 5G, más estable",
          "Procesador HUAWEI-SILICON que proporciona imágenes más claras",
          "Lente ultra fina de 6 mm para una mejor visualización de los dientes posteriores",
          "Pantalla de visualización completa IPS de 21,5 pulgadas",
          "Imágenes claras y detalladas en la pantalla desde cualquier ángulo"
        ]
      },
      general: {
        title: "",
        items: [
        ]
      }
    },
    images: [
      {
        url: assets.products.camaras.MonitorYcamara.default,
        alt: "Monitor y cámara",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: 'Cámaras Intraorales',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z",
  },
  {
    id: "Monitor-camara-y-PC",
    slug: "Monitor-camara-y-PC",
    name: "Monitor, cámara y PC",
    subtitle: "Transferencia inalámbrica 5G",
    brand: {
      name: "Siger",
      logo: assets.logos.brands.siger
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Cámara intraoral con transferencia inalámbrica 5G",
          "Monitor PC con pantalla táctil de 24 pulgadas FHD",
          "6 interfaces USB para mayor versatilidad",
          "8 GB de RAM para un rendimiento fluido",
        ]
      },
      general: {
        title: "",
        items: [
        ]
      }
    },
    images: [
      {
        url: assets.products.camaras.MonitorCamaraYpc.default,
        alt: "Monitor, cámara y PC",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: 'Cámaras Intraorales',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z",
  },
  {
    id: "Bomba-de-vacio-VC10-seca",
    slug: "Bomba-de-vacio-VC10-seca",
    name: "Bomba de vacío VC10 (seca)",
    subtitle: "Separación eficiente de aguas residuales",
    brand: {
      name: "Siger",
      logo: assets.logos.brands.siger
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Separación eficiente de aguas residuales",
          "Separación aire/agua en dos etapas: proceso, cuidado extra por la seguridad",
          "Sistema de arranque y parada automáticos: reactivo al arranque y parada de las unidades dentales",
          "Motores dobles para bomba de vacío y drenaje",
          "Bajo nivel de ruido",
          "Tecnología de autocontrol",
          "Separación por succión altamente eficiente",
        ]
      },
      general: {
        title: "",
        items: [
        ]
      }
    },
    images: [
      {
        url: assets.products.bombasVacio.BombaDeVacioVC10.default,
        alt: "Bomba de vacío VC10 (seca)",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.bombasVacio.BombaDeVacioVC10.BombaDeVacioVC10_2,
        alt: "Bomba de vacío VC10 (seca)",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.bombasVacio.BombaDeVacioVC10.BombaDeVacioVC10_3,
        alt: "Bomba de vacío VC10 (seca)",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: 'Bombas de vacío',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z",
  },
  {
    id: "Bomba-de-vacio-ANYVAC-30-humeda",
    slug: "Bomba-de-vacio-ANYVAC-30-humeda",
    name: "Bomba de vacío ANYVAC 30 (húmeda)",
    subtitle: "Reduce el consumo de agua hasta en un tercio",
    brand: {
      name: "mdmed",
      logo: assets.logos.brands.mdmed
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "El sistema de ahorro de agua reduce el consumo hasta 1/3 en comparación con los productos existentes",
          "Crea una potente presión de vacío con menos agua",
          "Desde 1 hasta 4 unidades dentales",
          "Filtro de fácil mantenimiento",
          "Voltaje mínimo/máximo: CA 110 V",
          "Tamaño y peso: 304×250×350 mm 18 kg (120×98,5×138”.40 libras)",
          "Fabricación Coreana"
        ]
      },
      general: {
        title: "",
        items: [
        ]
      }
    },
    images: [
      {
        url: assets.products.bombasVacio.BombaDeVacioANYVAC30.default,
        alt: "Bomba de vacío ANYVAC 30 (húmeda)",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.bombasVacio.BombaDeVacioANYVAC30.BombaDeVacioANYVAC30_2,
        alt: "Bomba de vacío ANYVAC 30 (húmeda)",
        width: 800,
        height: 600,
        isPrimary: true
      },

    ],
    category: 'Bombas de vacío',
    isActive: true,
    createdAt: "2024-10-29T00:10:22.215Z",
    updatedAt: "2024-10-29T00:10:22.215Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/HwpZRMYhsqc?si=WkYVwggg8JSOOdUL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: "Jeringa-de-anestesia-dental-inteligente",
    slug: "Jeringa-de-anestesia-dental-inteligente",
    name: "Jeringa de anestesia dental inteligente",
    subtitle: "Alta precisión",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Inyección estable de alta precisión",
          "3 velocidades de inyección ajustables: lento, medio, rápido",
          "Potencia máxima: 200 VA",
          "Fuente de alimentación: 100-240V 50/60Hz",
          "Batería de litio de la pieza de mano: 3,7 V 220 mAh",
          "Batería de litio del soporte de carga: 3,7 V 800 mAh",
          "Modo de operación: corto tiempo",
          "Volumen: 2,3 × 2,3 × 16,5 cm",
          "Peso: 80g"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.anestesia.JeringaDeAnestesiaDentalInteligente.default,
        alt: "Jeringa de anestesia dental inteligente",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.anestesia.JeringaDeAnestesiaDentalInteligente.JeringaDeAnestesiaDentalInteligente_2,
        alt: "Jeringa de anestesia dental inteligente",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.anestesia.JeringaDeAnestesiaDentalInteligente.JeringaDeAnestesiaDentalInteligente_3,
        alt: "Jeringa de anestesia dental inteligente",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: "Anestesia",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/VnbQ0HjepbQ?si=kSX4qFmeyUDcendN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: "Activador-UV-para-implantes",
    slug: "Activador-UV-para-implantes",
    name: "Activador UV para implantes",
    subtitle: "Potente efecto de activación",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Adaptador: CA 100-240 V 50/60 Hz",
          "Potencia de entrada: 220 W",
          "Producción de ozono: <0,02 ppm",
          "Tiempo de activación: 10 s",
          "Longitud de onda UV: 172 nm",
          "Tamaño de la unidad de control: 18,7 x 31,6 x 33,1 cm",
          "Peso: 5,5 kg",
          "Mejorar la tasa de osteointegración",
          "Acortar el tiempo de curación ósea",
          "Acelerar la osteointegración clínica de los implantes dentales y mejorar la tasa de éxito de los implantes dentales",
          "Potente efecto de activación",
          "Activación rápida: 10 segundos",
          "El proceso de operación está acompañado de indicaciones de voz y LED",
          "Porta implantes"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.ActivadorUV.ActivadorUVparaImplantes.default,
        alt: "Activador UV para implantes",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.ActivadorUV.ActivadorUVparaImplantes.ActivadorUVparaImplantes_2,
        alt: "Activador UV para implantes",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.ActivadorUV.ActivadorUVparaImplantes.ActivadorUVparaImplantes_3,
        alt: "Activador UV para implantes",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.ActivadorUV.ActivadorUVparaImplantes.ActivadorUVparaImplantes_4,
        alt: "Activador UV para implantes",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.ActivadorUV.ActivadorUVparaImplantes.ActivadorUVparaImplantes_5,
        alt: "Activador UV para implantes",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: "Activador UV para implantes",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/88A2TDn0Z68?si=xkEyYfh8_lb5hloA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: "Pieza-de-mano-pediatrica",
    slug: "Pieza-de-mano-pediatrica",
    name: "Pieza de mano pediátrica",
    subtitle: "Cabezal pequeño",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Auto luminosa, sin fuente de alimentación externa, conveniente y económica",
          "Acople de 2 y 4 huecos",
          "3 puntos de irrigación"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.PiezasDeMano.PiezasDeManoDeAltaVelocidad.PiezaDeManoPediatrica.default,
        alt: "Pieza de mano pediátrica",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.PiezasDeMano.PiezasDeManoDeAltaVelocidad.PiezaDeManoPediatrica.PiezaDeManoPediatrica_2,
        alt: "Pieza de mano pediátrica",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.PiezasDeMano.PiezasDeManoDeAltaVelocidad.PiezaDeManoPediatrica.PiezaDeManoPediatrica_3,
        alt: "Pieza de mano pediátrica",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Piezas de mano",
    subcategory: "Piezas de mano de alta velocidad",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/980CLwlYq4w?si=YvoR-ub8xmNHOcVU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: "Pieza-de-mano-de-alta-velocidad-H75-TP2",
    slug: "Pieza-de-mano-de-alta-velocidad-H75-TP2",
    name: "Pieza de mano de alta velocidad H75-TP2",
    subtitle: "Cabezal grande",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Pieza de mano de alta velocidad: rociador de 4 vías",
          "Tipo de mandril: pulsador",
          "Bombilla: luz LED",
          "Par nominal: >0,05 N.cm",
          "Presión de aire nominal: 0,28 MPa",
          "Velocidad de rotación: 300 000 ~ 400 000 rpm"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.PiezasDeMano.PiezasDeManoDeAltaVelocidad.PiezaDeManoDeAltaVelocidadH75TP2.default,
        alt: "Pieza de mano de alta velocidad H75-TP2a",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.PiezasDeMano.PiezasDeManoDeAltaVelocidad.PiezaDeManoDeAltaVelocidadH75TP2.PiezaDeManoDeAltaVelocidadH75TP2_2,
        alt: "Pieza de mano de alta velocidad H75-TP2",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.PiezasDeMano.PiezasDeManoDeAltaVelocidad.PiezaDeManoDeAltaVelocidadH75TP2.PiezaDeManoDeAltaVelocidadH75TP2_3,
        alt: "Pieza de mano de alta velocidad H75-TP2",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Piezas de mano",
    subcategory: "Piezas de mano de alta velocidad",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/71Lm81HQWek?si=K37hgb697fGQnqAn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: "Pieza-de-mano-de-alta-velocidad",
    slug: "Pieza-de-mano-de-alta-velocidad",
    name: "Pieza de mano de alta velocidad",
    subtitle: "Cabezal estándar",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Auto luminosa, sin fuente de alimentación externa, conveniente y económica",
          "Acople de 2 y 4 huecos",
          "3 puntos de irrigación"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.PiezasDeMano.PiezasDeManoDeAltaVelocidad.PiezaDeManoDeAltaVelocidad.default,
        alt: "Pieza de mano de alta velocidad",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.PiezasDeMano.PiezasDeManoDeAltaVelocidad.PiezaDeManoDeAltaVelocidad.PiezaDeManoDeAltaVelocidad_2,
        alt: "Pieza de mano de alta velocidad",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.PiezasDeMano.PiezasDeManoDeAltaVelocidad.PiezaDeManoDeAltaVelocidad.PiezaDeManoDeAltaVelocidad_3,
        alt: "Pieza de mano de alta velocidad",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Piezas de mano",
    subcategory: "Piezas de mano de alta velocidad",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/71Lm81HQWek?si=K37hgb697fGQnqAn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: "SA-100L",
    slug: "SA-100L",
    name: "SA 100L",
    subtitle: "Diseño funcional",
    brand: {
      name: "elec",
      logo: assets.logos.brands.elec
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Eléctrico",
          "El modelo SA100L ofrece ópticas de 25.000 LUX para iluminar el campo de visión del operador",
          "Spray interno de agua",
          "El spray de agua interno proporciona un suministro de agua estable de 50ml/min (2.0 Bar)",
          "Anti-rayado Diseño funcional y tratamiento de la superficie anti-rayado",
          "Fabricación coreana"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.PiezasDeMano.PiezasDeManoRectaDeBajaVelocidad.sA100L.default,
        alt: "SA 100L",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Piezas de mano",
    subcategory: "Piezas de mano recta de baja velocidad",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
  },
  {
    id: "S-2C",
    slug: "S-2C",
    name: "S - 2C",
    subtitle: "Accionamiento 1:1",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Eléctrico",
          "Accionamiento directo 1:1",
          "Canal interior de pulverización",
          "Fresa aplicable para cirugía Ø2,35,mm",
          "Velocidad de rotación MAX 40,000rpm"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.PiezasDeMano.PiezasDeManoRectaDeBajaVelocidad.s2C.default,
        alt: "S-2C",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Piezas de mano",
    subcategory: "Piezas de mano recta de baja velocidad",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
  },
  {
    id: "CX235-S2-A",
    slug: "CX235-S2-A",
    name: "CX235 S2-A",
    subtitle: "Rociador de agua externo",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Rociador de agua externo",
          "Pieza de mano de baja velocidad: accionamiento directo 1:1",
          "Pulverización: externa",
          "Fresa aplicable: Para cirugía de 2,35 mm",
          "Velocidad de rotación: MÁX. 40 000 rpm"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.PiezasDeMano.PiezasDeManoRectaDeBajaVelocidad.CX235s2A.default,
        alt: "CX235 S2-A",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Piezas de mano",
    subcategory: "Piezas de mano recta de baja velocidad",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
  },
  {
    id: "CX235-S2",
    slug: "CX235-S2",
    name: "CX235 S2",
    subtitle: "Rociador de agua externo",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Rociador de agua externo",
          "Pieza de mano de baja velocidad: accionamiento directo 1:1",
          "Pulverización: externa",
          "Fresa aplicable: Para cirugía de 2,35 mm",
          "Velocidad de rotación: MÁX. 40 000 rpm"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.PiezasDeMano.PiezasDeManoRectaDeBajaVelocidad.CX235s2.default,
        alt: "CX235 S2-A",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Piezas de mano",
    subcategory: "Piezas de mano recta de baja velocidad",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
  },
  {
    id: "SG200L",
    slug: "SG200L",
    name: "SG200L",
    subtitle: "Contrangulo para implantes",
    brand: {
      name: "elec",
      logo: assets.logos.brands.elec
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "20:1",
          "Velocidad máxima 2000 RPM",
          "Fibra óptica"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.PiezasDeMano.Contrangulos.SG200l.default,
        alt: "SG200L",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Piezas de mano",
    subcategory: "Contrangulos",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/RfOTMrz3ars?si=avurpqojIC8jBRvm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: "CX235C6",
    slug: "CX235C6",
    name: "CX235C6",
    subtitle: "Contrangulo para implantes",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Pieza de mano de baja velocidad: velocidad 20:1",
          "Tipo de mandril: pulsador",
          "Pulverización: Canal interior y exterior",
          "Fresa aplicable: 2,35 mm (ISO1797-1)",
          "Velocidad máxima: 2000 RPM",
          "Sin riesgo de infección cruzada",
          "Con estructura de doble sellado",
          "Diseño desmontable"

        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.PiezasDeMano.Contrangulos.CX235c6.default,
        alt: "CX235C6",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Piezas de mano",
    subcategory: "Contrangulos",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
  },
  {
    id: "CX235-C1-4",
    slug: "CX235-C1-4",
    name: "CX235 C1-4",
    subtitle: "Cabeza push botton",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Cabeza push button",
          "Pieza de mano de baja velocidad: accionamiento directo 1:1",
          "Fresa aplicable: 2,35 mm",
          "Baja rotación: MAX 40.000 rpm",
          "Spray externo"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.PiezasDeMano.Contrangulos.CX235c14.default,
        alt: "CX235 C1-4",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Piezas de mano",
    subcategory: "Contrangulos",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
  },
  {
    id: "CX235-C1-2",
    slug: "CX235-C1-2",
    name: "CX235 C1-2",
    subtitle: "Cabeza de palanca",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Cabeza de palanca",
          "Pieza de mano de baja velocidad: accionamiento directo 1:1",
          "Fresa aplicable: 2,35 mm",
          "Velocidad de rotación: MAX 40.000 rpm",
          "Spray externo"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.PiezasDeMano.Contrangulos.CX235c12.default,
        alt: "CX235 C1-2",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Piezas de mano",
    subcategory: "Contrangulos",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/2lWSqQ-JMX0?si=a2Wj3d22prbfiuKd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: "CX235-C1-1",
    slug: "CX235-C1-1",
    name: "CX235 C1-1",
    subtitle: "Cabeza sellada push botton",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Cabeza sellada push botton",
          "Pieza de mano de baja velocidad: accionamiento directo 1:1",
          "Fresa aplicable: 2,35 mm",
          "Velocidad de rotación: MÁX. 40 000 rpm",
          "Tipo de mandril: pulsador",
          "Pulverización: Canal externo"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.PiezasDeMano.Contrangulos.CX235c11.default,
        alt: "CX235 C1-1",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Piezas de mano",
    subcategory: "Contrangulos",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
  },
  {
    id: "CA-100L",
    slug: "CA-100L",
    name: "CA 100L",
    subtitle: "Rotación precisa y estable",
    brand: {
      name: "elec",
      logo: assets.logos.brands.elec
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Eléctrico",
          "Rotación precisa y estable de hasta 40.000 rpm que mejora",
          "Fibra óptica",
          "Ópticas de 25.000 LUX para iluminar el campo de visión del operador",
          "Spray de agua interno: proporciona un suministro de agua estable de 50 ml/min (2.0 bar)",
          "Diseño funcional y tratamiento de la superficie anti-rayado",
          "Fabricación coreana"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.PiezasDeMano.Contrangulos.cA100L.default,
        alt: "CA 100L",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Piezas de mano",
    subcategory: "Contrangulos",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
  },
  {
    id: "C7-5",
    slug: "C7-5",
    name: "C7 - 5",
    subtitle: "Accionamiento 1:5",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Eléctrico",
          "Aumento de velocidad de 1:5",
          "Tipo de mandril: pulsador",
          "Velocidad de rotación: aproximadamente 200.000 rpm",
          "Mejor estructura impermeable",
          "Estructura de pulverización de agua",
          "Fibra óptica"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.PiezasDeMano.Contrangulos.c75.default,
        alt: "C7 - 5",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Piezas de mano",
    subcategory: "Contrangulos",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
  },
  {
    id: "C5-1M",
    slug: "C5-1M",
    name: "C5-1M",
    subtitle: "Accionamiento 6:1. Endodoncia",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Pieza de mano de baja velocidad: 6:1",
          "La velocidad se puede ajustar de 250 a 1200 rpm",
          "El par máximo puede alcanzar 5,1 newton centímetro"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.PiezasDeMano.Contrangulos.C51m.default,
        alt: "C5-1M",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Piezas de mano",
    subcategory: "Contrangulos",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
  },
  {
    id: "C-1C",
    slug: "C-1C",
    name: "C-1C",
    subtitle: "Accionamiento 1:1",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Eléctrico",
          "Accionamiento directo de 1:1",
          "Spray de Agua",
          "Fibra óptica"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.PiezasDeMano.Contrangulos.C1c.default,
        alt: "C-1C",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Piezas de mano",
    subcategory: "Contrangulos",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
  },
  {
    id: "BA250LT-1-5",
    slug: "BA250LT-1-5",
    name: "BA250LT 1:5(Red)",
    subtitle: "Pulverización cuádruple, con luz. 1:5",
    brand: {
      name: "whitebrand",
      logo: assets.logos.brands.whitebrand
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Eléctrico",
          "Pulverización cuádruple, con luz",
          "Contra ángulo con aumento de velocidad de 1:5",
          "Capa inteligente PVD para un mejor agarre",
          "Cojinetes cerámicos",
          "Válvula anti retracción",
          "Rociado cuádruple",
          "Fibra óptica",
          "Fabricación alemana"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.PiezasDeMano.Contrangulos.BA250Lt15.default,
        alt: "BA250LT 1:5(Red)",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Piezas de mano",
    subcategory: "Contrangulos",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
  },
  {
    id: "BA45LS-1-1",
    slug: "BA45LS-1-1",
    name: "BA45LS 1:1",
    subtitle: "Diseño ergonómico",
    brand: {
      name: "whitebrand",
      logo: assets.logos.brands.whitebrand
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Eléctrico",
          "Contra ángulo de relación directa 1:1",
          "Diseño ergonómico",
          "Smart Coat: para un mejor agarre",
          "Control deslizante ISO",
          "Pulverización única",
          "Varilla de fibra óptica de vidrio",
          "Cuerpo de titanio",
          "Fabricación alemana"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.PiezasDeMano.Contrangulos.BA45Ls11.default,
        alt: "BA45LS 1:1",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Piezas de mano",
    subcategory: "Contrangulos",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
  },
  {
    id: "Pieza-de-mano-dental-super-torque",
    slug: "Pieza-de-mano-dental-super-torque",
    name: "Pieza de mano dental súper torque",
    subtitle: "Rociador de cuatro orificios",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Diseño de torsión optimizado, asegura que proporcione un TORQUE más fuerte durante mucho tiempo",
          "Rociador de cuatro orificios",
          "Buen equilibrio",
          "Rechazar soldadura",
          "Gran poder de sujeción",
          "Menos ruido",
          "Ángulo especial",
          "Diseño especial"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.PiezasDeMano.PiezaDeManoDentalSuperTorque.default,
        alt: "Pieza de mano dental súper torque",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.PiezasDeMano.PiezaDeManoDentalSuperTorque.PiezaDeManoDentalSuperTorque_2,
        alt: "Pieza de mano dental súper torque",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.PiezasDeMano.PiezaDeManoDentalSuperTorque.PiezaDeManoDentalSuperTorque_3,
        alt: "Pieza de mano dental súper torque",
        width: 800,
        height: 600,
        isPrimary: true,
      },
      {
        url: assets.products.PiezasDeMano.PiezaDeManoDentalSuperTorque.PiezaDeManoDentalSuperTorque_4,
        alt: "Pieza de mano dental súper torque",
        width: 800,
        height: 600,
        isPrimary: true,
      }
    ],
    category: "Piezas de mano",
    subcategory: "Contrangulos",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
  },
  {
    id: "Kit-de-piezas-de-mano-de-baja-velocidad",
    slug: "Kit-de-piezas-de-mano-de-baja-velocidad",
    name: "Kit de piezas de mano de baja velocidad",
    subtitle: "Acople midwest (4 huecos)",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Kit de 3 partes",
        items: [
          "Motor de baja velocidad",
          "Pieza de mano recta",
          "Contra ángulo"
        ]
      },
      general: {
        title: "Características técnicas",
        items: [
          "Tipo de mandril: pulsador",
          "Ruido: ≤70dB",
          "Presión de aire: 0,30 MPa",
          "Fresa aplicable: 2,35 - 0,016 mm (ISO1797-1)",
          "Velocidad de rotación: aproximadamente 20.000 rpm",
        ]
      }
    },
    images: [
      {
        url: assets.products.PiezasDeMano.KitDePiezasDeManoDeBajaVelocidad.default,
        alt: "Kit de piezas de mano de baja velocidad",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.PiezasDeMano.KitDePiezasDeManoDeBajaVelocidad.KitDePiezasDeManoDeBajaVelocidad_2,
        alt: "Kit de piezas de mano de baja velocidad",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Piezas de mano",
    subcategory: "Kits de piezas dentales",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
  },
  {
    id: "Kit-de-piezas-de-mano-de-baja-velocidad2",
    slug: "Kit-de-piezas-de-mano-de-baja-velocidad2",
    name: "Kit de piezas de mano de baja velocidad",
    subtitle: "Acople borden (2 huecos)",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Kit de 3 partes",
        items: [
          "Motor de baja velocidad",
          "Pieza de mano recta",
          "Contra ángulo"
        ]
      },
      general: {
        title: "Características técnicas",
        items: [
          "Autoclavable a 135 C",
          "2 modos de rotación, puede girar en  ambos sentidos",
          "Presión de aire: 0,30 MPa",
          "Velocidad de rotación: aproximadamente 25.000 rpm",
        ]
      }
    },
    images: [
      {
        url: assets.products.PiezasDeMano.KitDePiezasDeManoDeBajaVelocidad2.default,
        alt: "Kit de piezas de mano de baja velocidad",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Piezas de mano",
    subcategory: "Kits de piezas dentales",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
  },
  {
    id: "CX207-F-H65",
    slug: "CX207-F-H65",
    name: "CX207-F H65",
    subtitle: "Detección de caries o resina",
    brand: {
      name: "COXO",
      logo: assets.logos.brands.coxo
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Pieza de mano de alta velocidad: pulverizador de 3 vías, 3 tipos de aire",
          "Tipo de mandril: pulsador",
          "Bombilla: luz LED",
          "Longitud de onda: 390-420 nm",
          "Ruido: ≤68 dB",
          "Presión de aire en el extremo posterior de HP: 0,25—0,27 Mpa (M4), 0,20—0,22 Mpa (B2)",
          "Fresa aplicable: Ø1,59-Ø1,6 mm x 21-23 mm",
          "Velocidad de rotación: ≥280 000 rpm",
          "Tratar mientras se revisa ¡Más rápido y mejor!",
          "Más soportable y una vida útil más larga",
          "Cabezal de una sola pieza fabricado mediante CNC",
          "Rodamientos importados El cartucho pasó la dinámica de Alemania, prueba de máquina de equilibrio",
          "Estructura a prueba de polvo",
          "El aire genera energía eléctrica"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.PiezasDeMano.CX207Fh65.default,
        alt: "CX207-F H65",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.PiezasDeMano.CX207Fh65.CX207Fh65_2,
        alt: "CX207-F H65",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Piezas de mano",
    subcategory: "Contrangulos",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.089Z",
    updatedAt: "2024-10-29T00:10:22.089Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/RAFuaOIhuPY?si=87dj7kCeje92aa5q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: "plast-press",
    slug: "plast-press",
    name: "Termoformadora a presión PlastPress",
    subtitle: "Presión positiva más compacta",
    brand: {
      name: "BioArt",
      logo: assets.logos.brands.bioart
    },
    description: "Diseño compacto con mejor fidelidad de copia",
    shortDescription: "Diseño compacto con mejor fidelidad de copia",
    features: {
      unique: {
        title: "Características",
        items: [
          "PlastPress, la máquina de presión positiva más compacta del mercado, garantiza una mayor precisión en el proceso de conformado y un menor ruido en comparación con las máquinas de vacío",
          "Práctico y versátil, permite producir láminas de diferentes materiales hasta 6 mm de espesor y acepta formas redondas y cuadradas",
          "Debe conectarse directamente a un compresor ajustado a una presión de entre 3 y 8 bar (43,5 a 116 psi). 8 Sistemas de Seguridad",
          "Para todas las especialidades odontológicas: ortodoncia, prótesis, estética, medicina dental del sueño, odontología deportiva, bruxismo y limpieza dental, clínica general, entre otros."
        ]
      },
      general: {
        title: "Técnicas",
        items: [
          "Disponible en voltaje: 110V",
          "Peso: 7,5 kg",
          "Dimensiones: (LxAnxAl) 27x24x27 cm",
        ]
      }
    },
    images: [
      {
        url: assets.products.termoformadoras.plastPress.default,
        alt: "PlastPress 127V",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.termoformadoras.plastPress.unidadDentalS30_2,
        alt: "PlastPress 127V",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Termoformadoras",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.353Z",
    updatedAt: "2024-10-29T00:10:22.353Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/4__OXSdZbQ0?si=QryJNd2NLt378rAN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: "plastvac-p7-analogo",
    slug: "plastvac-p7-analogo",
    name: "Termoformadora al vacío PlastVac P7",
    subtitle: "Rápido y práctico",
    brand: {
      name: "BioArt",
      logo: assets.logos.brands.bioart
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Un potente motor de 1400W genera automáticamente el vacío en el momento del formado",
          "El Plastvac P7 no requiere instalación especial, ya que está conectado a la red eléctrica del consultorio/laboratorio",
          "Rápido y práctico, posibilidad de confeccionar y entregar sábanas al paciente en una sola sesión",
          "El Plastvac P7 dispone de un adaptador universal para chapas redondas y cuadradas de diferentes dimensiones, espesores y materiales",
          "Aplicaciones: Protector bucal, matriz para resina compuesta, puente tempora, gorras, corrección de paréntesis, moho de fluoración, guía quirúrgica, placa de mordida (bruxismo), placa base, hoja individual, sábanas blanqueadoras caseras, empaquetado de modelos de estudio",
        ]
      },
      general: {
        title: "Características Técnicas",
        items: [
          "Activación automática del vacío",
          "Disponible en voltaje: 110V",
          "Peso: 5,4 kg",
          "Dimensiones: (AnxPrxAl) 24x27x19 cm"
        ]
      }
    },
    images: [
      {
        url: assets.products.termoformadoras.PlastVacP7.default,
        alt: "PlastVac P7",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.termoformadoras.PlastVacP7.plastVacP7_2,
        alt: "PlastVac P7",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: "Termoformadoras",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.363Z",
    updatedAt: "2024-10-29T00:10:22.363Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/RvY5QHmJ5Qg?si=547eGlAe67LjJNem" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: "plastvac-p7-digital",
    slug: "plastvac-p7-digital",
    name: "Termoformadora al vacío PlastVac P7 Plus",
    subtitle: "Termoformadora Digital",
    brand: {
      name: "BioArt",
      logo: assets.logos.brands.bioart
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Al igual que el modelo PlastVacP7, la P7 Plus cuenta con un temporizador digital que ayuda a controlar el tiempo de laminación. Esta es una verificación adicional del control del termoformado",
          "Aplicaciones: protector bucal, matriz para resina compuesta, puentes temporales, tampones, soportes de fijación, moho de fluoración, guía quirúrgica, placa de mordida (bruxismo), hoja base, hoja individual, sábanas blanqueadoras caseras, empaquetado de modelos de estudio",
        ]
      },
      general: {
        title: "Características Técnicas",
        items: [
          "Activación automática del vacío",
          "Disponible en voltaje: 110V",
          "Peso: 5,4 kg",
          "Dimensiones: (AnxPrxAl) 24x27x19 cm"
        ]
      }
    },
    images: [
      {
        url: assets.products.termoformadoras.PlastVacP7Plus.default,
        alt: "PlastVac P7 Plus",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.termoformadoras.PlastVacP7Plus.plastVacP7_2Plus,
        alt: "PlastVac P7 Plus",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Termoformadoras",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.363Z",
    updatedAt: "2024-10-29T00:10:22.363Z",
  },
  {
    id: "selladora-X330",
    slug: "selladora-X330",
    name: "Selladora-X330",
    subtitle: "Diseño ergonómico",
    brand: {
      name: "Siger",
      logo: assets.logos.brands.siger
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Excelente rendimiento",
        items: [
          "El calentador especial hace que la bolsa de esterilización se caliente uniformemente y tenga un buen rendimiento de sellado",
          "La banda selladora de 12 mm crea un sellado más fuerte",
          "La hoja de acero inoxidable incorporada realiza un corte plano",
        ]
      },
      general: {
        title: "Mejor experiencia de uso",
        items: [
          "El diseño integrado de la máquina selladora es firme y estable",
          "El diseño optimizado del eje del rodillo hace que la bolsa de esterilización ruede suavemente",
          "El mango bidireccional proporciona una operación cómoda",
          "El simple reemplazo de la hoja ahorra costos de mantenimiento",
          "La abrazadera se puede ajustar en cualquier momento para lograr un buen efecto de sellado",
          "La cubierta de plástico ASA no envejece ni se decolora fácilmente"
        ]
      },
      includes: {
        title: "Diseño ergonómico",
        items: [
          "La máquina selladora pasa al modo de espera cuando no se utiliza durante media hora, lo que la hace segura y evita el desperdicio de electricidad.",
          "La capa de bandeja opcional con escala graduada serigrafiada ayuda a empacar varias bolsas al mismo tiempo y obtener la dimensión de las bolsas selladas",
          "El puerto de operación de 34 cm de ancho puede satisfacer las necesidades de sellar bolsas de esterilización de varios tamaños."
        ]
      },
      optional: {
        title: "Opciones de rollo de papel de esterilización",
        items: [
          "Dimensión: 75 mm x 100 mm 100 mm x 200 mm 250 mm x 100 mm"
        ]
      }
    },
    images: [
      {
        url: assets.products.selladoras.SelladoraX330.default,
        alt: "selladora-X330",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.selladoras.SelladoraX330.selladoraX330_2,
        alt: "selladora-X330",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.selladoras.SelladoraX330.selladoraX330_3,
        alt: "selladora-X330",
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
    id: "Selladora-Smart-127V",
    slug: "Selladora-Smart-127V",
    name: "Selladora Smart 127V",
    subtitle: "Resistencia blindada y control automático de tiempo",
    brand: {
      name: "BioArt",
      logo: assets.logos.brands.bioart
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Posee la misma tecnología de la Selladora BioStamp, con resistencia blindada y control automático de tiempo, garantiza el calentamiento uniforme, eficacia en la adherencia y evita la quemadura del papel",
          "Por medio de la personalización de los embalajes en diferentes tamaños, la Selladora Smart proporciona economía de papel y un mejor aprovechamiento de espacio en la autoclave",
        ]
      },
      general: {
        title: "Características Técnicas",
        items: [
          "Diseño innovador",
          "Resistencia de cartucho",
          "Anchura de adherencia: 12mm",
          "Extensión de adherencia: 300mm",
          "Guillotina embutida",
          "Dimensiones del embalaje: (CxLxH) 480x170x100mm",
          "Peso: 3,6kg",
          "Voltajes disponibles: 110 o 220V"
        ]
      }
    },
    images: [
      {
        url: assets.products.selladoras.selladoraSmart127V.default,
        alt: "Selladora Smart 127V",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.selladoras.selladoraSmart127V.SelladoraSmart127V_2,
        alt: "Selladora Smart 127V",
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
    id: "Selladora-Biostamp-127V",
    slug: "Selladora-Biostamp-127V",
    name: "Selladora Biostamp 127V",
    subtitle: "Personalice los paquetes en diferentes tamaños",
    brand: {
      name: "BioArt",
      logo: assets.logos.brands.bioart
    },
    description: "Selladora con guillotina integrada y diseño innovador",
    shortDescription: "Selladora con guillotina integrada",
    features: {
      unique: {
        title: "Características",
        items: [
          "Moderno y práctico, cumple con los estándares y normas de calidad de los mercados más exigentes",
          "Posee resistencia blindada con control de temperatura, activación a través de palanca de bloqueo, porta rodillos y control de tiempo automático, sistema que garantiza calentamiento uniforme, adherencia efectiva y evita que el papel se queme.",
          "Al personalizar los paquetes en diferentes tamaños, BioStamp brinda ahorro de papel y un mejor uso del espacio en el autoclave",
          "Dimensiones del embalaje: (WxDxH) 500x320x160mm",
          "Peso: 3,6 kg",
          "Voltajes disponibles: 110V"
        ]
      },
      general: {
        title: "Características Técnicas",
        items: [
          "Diseño innovador",
          "Anchura de adherencia: 12mm",
          "Extensión de adherencia: 300mm",
          "Equipo con Guillotina",
          "Dimensiones del embalaje: (CxLxH) 480x170x100mm",
          "Peso: 3,6kg",
        ]
      }
    },
    images: [
      {
        url: assets.products.selladoras.SelladoraBiostamp127V.default,
        alt: "BIOSTAMP 127V",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.selladoras.SelladoraBiostamp127V.SelladoraBiostamp127V_2,
        alt: "BIOSTAMP 127V",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Selladoras",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.394Z",
    updatedAt: "2024-10-29T00:10:22.394Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/CjXZMjFCKdc?si=N46MGX-yoQ4x-FXG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: "unidad-dental-serie-S30",
    slug: "unidad-dental-serie-S30",
    name: "Unidad dental S30",
    subtitle: "Suave tapicería italiana",
    brand: {
      name: "Siger",
      logo: assets.logos.brands.siger
    },
    description: "Silla dental con tapicería italiana de alta calidad",
    shortDescription: "Tapicería italiana premium",
    features: {
      unique: {
        title: "Características",
        items: [
          "Tapicería lisa italiana (suave)",
          "Motor LINAK (Dinamarca)",
          "Panel de control tipo (digital)",
          "Sensores de parada en respaldo, sillón y tazón de escupidera",
          "Elección de piezas de mano por sensor óptico",
          "Respaldo sólido de aluminio",
          "Soporte para hasta 150Kg",
          "Pedal multifuncional",
          "Reclinación supina"
        ]
      },
      general: {
        title: "Otros detalles",
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
          "Memorias de movimiento",
          "2 descansa brazos, 1 abatible"
        ]
      },
      includes: {
        title: "Incluye",
        items: [
          "Limpiador ultrasónico Kit E2 (LED)",
          "Lámpara de Fotocurado (LED G)",
          "Banqueta para doctor"
        ]
      },
      optional: {
        title: "Puede incorporar (consultar el valor)",
        items: [
          "Banqueta Asistente",
          "Cámara Intraoral (Monitor y cámara)",
          "Cámara Intraoral (Monitor Touch, PC)"
        ]
      }
    },
    images: [
      {
        url: assets.products.unidadesDentales.s30.default,
        alt: "Serie S30",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.unidadesDentales.s30.unidadDentalS30_2,
        alt: "Serie S30",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.unidadesDentales.s30.unidadDentalS30_3,
        alt: "Serie S30",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.unidadesDentales.s30.unidadDentalS30_4,
        alt: "Serie S30",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.unidadesDentales.s30.unidadDentalS30_5,
        alt: "Serie S30",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: "Unidades Dentales",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.425Z",
    updatedAt: "2024-10-29T00:10:22.425Z",
    videoIframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/HAD7M8gRl5w?si=YYIxY1h6yXuDF4XZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: "unidad-dental-serie-S30-carrito",
    slug: "unidad-dental-serie-S30-carrito",
    name: "Unidad dental S30 con carrito",
    subtitle: "Mesa de doctor tipo carro",
    brand: {
      name: "Siger",
      logo: assets.logos.brands.siger
    },
    description: "Silla dental con mesa de doctor tipo carrito",
    shortDescription: "Mesa de doctor tipo carrito móvil",
    features: {
      unique: {
        title: "Características",
        items: [
          "Tapicería lisa italiana (suave)",
          "Motor LINAK (Dinamarca)",
          "Mesa de doctor tipo carro o convencional",
          "Panel de control tipo membrana",
          "Sensores de parada en respaldo, sillón y tazón de escupidera",
          "Elección de piezas de mano por sensor óptico",
          "Respaldo sólido de aluminio",
          "Soporte para hasta 150Kg",
          "Pedal multifuncional",
          "Bandeja de acero inoxidable",
          "Reclinación supina"
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
          "Memorias de movimiento",
          "2 descansa brazos, 1 abatible"
        ]
      },
      includes: {
        title: "Incluye",
        items: [
          "Limpiador ultrasónico Kit E2 (LED)",
          "Lámpara de Fotocurado (LED G)",
          "Banqueta para doctor"
        ]
      },
      optional: {
        title: "Puede incorporar (consultar el valor)",
        items: [
          "Banqueta Asistente",
          "Cámara Intraoral (Monitor y cámara)",
          "Cámara Intraoral (Monitor Touch, PC)"
        ]
      }
    },
    images: [
      {
        url: assets.products.unidadesDentales.s30Carrito.default,
        alt: "Serie S30 Carrito",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.unidadesDentales.s30Carrito.unidadDentalS30Carrito_2,
        alt: "Serie S30 Carrito",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.unidadesDentales.s30Carrito.unidadDentalS30Carrito_3,
        alt: "Serie S30 Carrito",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.unidadesDentales.s30Carrito.unidadDentalS30Carrito_4,
        alt: "Serie S30 Carrito",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.unidadesDentales.s30Carrito.unidadDentalS30Carrito_5,
        alt: "Serie S30 Carrito",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: "Unidades Dentales",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.430Z",
    updatedAt: "2024-10-29T00:10:22.430Z"
  },
  {
    id: "unidad-dental-u100",
    slug: "unidad-dental-u100",
    name: "Unidad dental U100",
    subtitle: "Diseño Cuadrado",
    brand: {
      name: "Siger",
      logo: assets.logos.brands.siger
    },
    description: "Silla dental con diseño cuadrado moderno con tapicería microfibra",
    shortDescription: "Diseño cuadrado con tapicería microfibra",
    features: {
      unique: {
        title: "Características",
        items: [
          "Diseño cuadrado",
          "Tapicería cuero microfibra",
          "Bandeja de asistente multifuncional",
          "Motores Taiwán",
          "Panel de control tipo membrana",
          "Sensor de parada por objetos debajo del sillón",
          "Soporte 130 Kg",
          "Pedal multifuncional"
        ]
      },
      general: {
        title: "Otros detalles",
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
          "Memorias de movimiento",
          "2 descansa brazos, 1 abatible"
        ]
      },
      includes: {
        title: "Incluye",
        items: [
          "Limpiador ultrasónico Kit E2 (LED)",
          "Lámpara de Fotocurado (LED G)",
          "Banqueta para doctor"
        ]
      },
      optional: {
        title: "Puede incorporar (consultar el valor)",
        items: [
          "Banqueta Asistente",
          "Cámara Intraoral (Monitor y cámara)",
          "Cámara Intraoral (Monitor Touch, PC)"
        ]
      }
    },
    images: [
      {
        url: assets.products.unidadesDentales.u100.default,
        alt: "Serie U100",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.unidadesDentales.u100.unidadDentalU100_2,
        alt: "Serie U100",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.unidadesDentales.u100.unidadDentalU100_3,
        alt: "Serie U100",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.unidadesDentales.u100.unidadDentalU100_4,
        alt: "Serie U100",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.unidadesDentales.u100.unidadDentalU100_5,
        alt: "Serie U100",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: "Unidades Dentales",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.435Z",
    updatedAt: "2024-10-29T00:10:22.435Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/Y2X8JytLsGA?si=ppOE9FagjapRkqaY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: "unidad-dental-v6000",
    slug: "unidad-dental-v6000",
    name: "Unidad dental V6000",
    subtitle: "Diseño redondo",
    brand: {
      name: "Siger",
      logo: assets.logos.brands.siger
    },
    description: "Silla dental de diseño redondo con panel de botones y con variedad de colores",
    shortDescription: "Diseño redondo con panel de botones ",
    features: {
      unique: {
        title: "Características",
        items: [
          "Diseño redondo",
          "Bandeja amplia",
          "Panel de control de tipo (botones)",
          "Motores Taiwán",
          "Sensor de parada, por objetos debajo del sillón",
          "Soporte 130Kg",
          "Pedal multifuncional"
        ]
      },
      general: {
        title: "Otros detalles",
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
          "Memorias de movimiento",
          "2 descansabrazos, 1 abatible"
        ]
      },
      includes: {
        title: "Incluye",
        items: [
          "Limpiador ultrasónico Kit E2 (LED)",
          "Lámpara de Fotocurado (LED G)",
          "Banqueta para doctor"
        ]
      },
      optional: {
        title: "Puede incorporar (consultar el valor)",
        items: [
          "Banqueta Asistente",
          "Cámara Intraoral (Monitor y cámara)",
          "Cámara Intraoral (Monitor Touch, PC)"
        ]
      }
    },
    images: [
      {
        url: assets.products.unidadesDentales.v600.default,
        alt: "Serie V6000",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.unidadesDentales.v600.unidadDentalV600_2,
        alt: "Control inteligente V6000",
        width: 800,
        height: 600,
        isPrimary: false
      },
      {
        url: assets.products.unidadesDentales.v600.unidadDentalV600_3,
        alt: "Tapicería V6000",
        width: 800,
        height: 600,
        isPrimary: false
      },
      {
        url: assets.products.unidadesDentales.v600.unidadDentalV600_4,
        alt: "Diseño ergonomico V6000",
        width: 800,
        height: 600,
        isPrimary: false
      },
      {
        url: assets.products.unidadesDentales.v600.unidadDentalV600_5,
        alt: "Calidad e higiene V6000",
        width: 800,
        height: 600,
        isPrimary: false
      }
    ],
    category: "Unidades Dentales",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.441Z",
    updatedAt: "2024-10-29T00:10:22.441Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/qIfQZhXNwdQ?si=cTvdszIcehTxS30d" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: "Banquetas",
    slug: "Banquetas",
    name: "Banquetas",
    subtitle: "Cómodas",
    brand: {
      name: "Siger",
      logo: assets.logos.brands.siger
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Banqueta para doctor",
        items: [
          "La altura del asiento y la inclinación del respaldo se pueden ajustar para adaptarse a la ergonomía.",
          "La estrella es de aluminio colado y están equipadas con ruedas giratorias silenciosas y de alto tránsito."
        ]
      },
      general: {
        title: "Banqueta para asistente",
        items: [
          "La estrella es de aluminio colado y están equipadas con ruedas giratorias silenciosas y de alto tránsito.",
          "El descansabrazos puede moverse.",
        ]
      }
      },
      images: [
      {
        url: assets.products.unidadesDentales.Banquetas.default,
        alt: "Banquetas",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.unidadesDentales.Banquetas.Banquetas_2,
        alt: "Banquetas",
        width: 800,
        height: 600,
        isPrimary: false
      }
    ],
    category: "Unidades Dentales",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.441Z",
    updatedAt: "2024-10-29T00:10:22.441Z",
  },
  {
    id: "rayos-x-portatil-xv-beam-1000",
    slug: "rayos-x-portatil-xv-beam-1000",
    name: "Rayos X portátil XVbeam1000",
    subtitle: "Diseño de doble protección",
    brand: {
      name: "Xpect Vision",
      logo: assets.logos.brands.xpectVision
    },
    description: "Sistema portátil con doble protección radiológica",
    shortDescription: "Sistema portátil con protección avanzada",
    features: {
      unique: {
        title: "Características",
        items: [
          "El diseño de doble protección reduce la exposición del usuario a la radiación",
          "Protección interna",
          "Dosis de exposición preestablecida",
          "Más de 300 exposiciones con una carga completa",
        ]
      },
      general: {
        title: "La potencia estable permite obtener imágenes claras",
        items: [
          "El voltaje y la corriente de 65 Kv y 2,6 mA generan más potencia para penetrar los dientes y obtener imágenes claras",
          "El tamaño del punto focal de 0,4 mm enfoca significativamente más rayos X en los dientes objetivo y produce una imagen de mayor calidad",
        ]
      },
      includes: {
        title: "Blindaje de retrodispersión externa",
        items: [
          "El escudo anti reflejo minimiza significativamente la dosis de radiación para el operador",
        ]
      },
      optional: {
        title: "Estación de acoplamiento",
        items: [
          "Permite su uso siempre que se necesite exposición. Al devolver el dispositivo a su estación de acoplamiento después de cada uso, se recargará automáticamente",
        ]
      },
      additional: {
        title: "Correa de seguridad",
        items: [
          "Más seguro para usuarios con manos pequeñas",
        ]
      },
  },
    images: [
      {
        url: assets.products.rayosX.RayosXportatilXVbeam1000.default,
        alt: "XV beam 1000",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.rayosX.RayosXportatilXVbeam1000.RayosXportatilXVbeam1000_2,
        alt: "XV beam 1000",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Equipo de Rayos X",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.379Z",
    updatedAt: "2024-10-29T00:10:22.379Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/23L77sHGOwk?si=_3zB5XxKJEzEfnAc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: "Tomografo-Meyer-SS-X9010Dpro-3DE",
    slug: "Tomografo-Meyer-SS-X9010Dpro-3DE",
    name: "Tomógrafo Meyer, SS-X9010Dpro-3DE",
    subtitle: "CBCT + Panorámica + Cefalea",
    brand: {
      name: "Meyer",
      logo: assets.logos.brands.meyer
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Tomografía computarizada dental de Haz Cónico",
          "Diseño inteligente y configuraciones: experimenta eficiencia, precisión y confiabilidad",
          "IA: Tecnología de imagen de vanguardia",
          "Mejora la atención al paciente y la comunicación",
          "Escaneo panorámico IA de múltiples capas",
          "Escaneo cefalométrico y de modelos",
          "Endo mode: calidad de imagen"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.rayosX.TomografoMeyerSSX9010Dpro3DE.default,
        alt: "Tomógrafo Meyer, SS-X9010Dpro-3DE",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.rayosX.TomografoMeyerSSX9010Dpro3DE.TomografoMeyerSSX9010Dpro3DE_2,
        alt: "Tomógrafo Meyer, SS-X9010Dpro-3DE",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.rayosX.TomografoMeyerSSX9010Dpro3DE.TomografoMeyerSSX9010Dpro3DE_3,
        alt: "Tomógrafo Meyer, SS-X9010Dpro-3DE",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.rayosX.TomografoMeyerSSX9010Dpro3DE.TomografoMeyerSSX9010Dpro3DE_4,
        alt: "Tomógrafo Meyer, SS-X9010Dpro-3DE",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.rayosX.TomografoMeyerSSX9010Dpro3DE.TomografoMeyerSSX9010Dpro3DE_5,
        alt: "Tomógrafo Meyer, SS-X9010Dpro-3DE",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.rayosX.TomografoMeyerSSX9010Dpro3DE.TomografoMeyerSSX9010Dpro3DE_6,
        alt: "Tomógrafo Meyer, SS-X9010Dpro-3DE",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.rayosX.TomografoMeyerSSX9010Dpro3DE.TomografoMeyerSSX9010Dpro3DE_7,
        alt: "Tomógrafo Meyer, SS-X9010Dpro-3DE",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: "Equipo de Rayos X",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.374Z",
    updatedAt: "2024-10-29T00:10:22.374Z",
    videoIframes: [
      '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/6k9BbFCkb9k?si=kIUkpQVm6NdTu_9m" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
      '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/Rv2jMH74AIU?si=YEHBQVZ7Eudyq8nr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
      '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/0Y9IY9mIV3c?si=RZEvTM4JTSbCu56g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    ],
  },
  {
    id: "SensorDental",
    slug: "SensorDental",
    name: "Sensor Dental",
    subtitle: "Tecnología APS CMOS",
    brand: {
      name: "Siger",
      logo: assets.logos.brands.siger
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Tecnología APS CMOS",
          "Compatible con DEA inteligente para diversas fuentes de rayos X",
          "CSI de deposición directa - Imágenes de dosis más bajas",
          "Conexión directa USB 2.0",
          "Esquinas delgadas y redondeadas y posición del pulgar",
          "P68 - Alta confiabilidad",
          "Sensores digitales 2 tamaños: universal / adulto",
          "Cómodo: esquinas y bordes redondeados para una mejor experiencia del paciente",
          "Ultrafino: sensor digital de 4,4 mm",
          "Durable: Construcción confiable",
          "Opción de centellador de alta resolución (HR) o de baja dosis (LD)",
          "Eficiente y asequible",
          "Potente software de procesamiento de imágenes: Inteligente, práctico y eficiente",
          "Circuitos integrados híbridos en placa de circuito",
          "Sensor de imagen CMOS APS",
          "Diseñado para una alta confiabilidad",
          "Conexión de cable reforzada > Prueba de flexión de 70.000 (±90°) aprobada",
          "Protección IP68 biocompatible: fácil control de infecciones"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.rayosX.SensorDental.default,
        alt: "Sensor Dental",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.rayosX.SensorDental.SensorDental_2,
        alt: "Sensor Dental",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.rayosX.SensorDental.SensorDental_3,
        alt: "Sensor Dental",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.rayosX.SensorDental.SensorDental_4,
        alt: "Sensor Dental",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Equipo de Rayos X",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.374Z",
    updatedAt: "2024-10-29T00:10:22.374Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/dfPXpyl9DfQ?si=DmJ1qdJyXNKx2lEF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: "Sensor-de-rayos-X-intraoral-digital",
    slug: "Sensor-de-rayos-X-intraoral-digital",
    name: "Sensor de rayos X intraoral digital",
    subtitle: "Con conteo de fotones",
    brand: {
      name: "Xpect Vision",
      logo: assets.logos.brands.xpectVision
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "La obtención de imágenes directas permite obtener imágenes más claras y una alta confiabilidad",
          "El amplio rango dinámico elimina el lento ajuste fino de la exposición para producir una imagen clínica",
          "Ajuste el contraste y el brillo para satisfacer diferentes requisitos clínicos",
          "Tecnología de vanguardia y pruebas estrictas ofrecen una durabilidad inigualable, una carcasa resistente a golpes y al agua protege de forma segura el sensor",
          "Diseño ergonómico para maximizar la comodidad del paciente",
          "Sistema fácil de utilizar; permite una óptima edición de imágenes e incluye mejoramiento de imagen con inteligencia artificial",
          "Área de imagen efectiva: 2,1 x 2,1 cm (S) 2,5 x 3,0 cm (L)",
          "Escala de grises ≥16 bits (la más alta de la industria)",
          "Resolución espacial probada: 12-14 Lp/mm",
          "Conexión USB/Inalámbrica",
          "Cable de conexión 3m (Extensible)",
          "Sistema compatible: Windows 7, 8 y 10"
        ]
      },
      general: {
        title: "",
        items: []
      }
    },
    images: [
      {
        url: assets.products.rayosX.SensordeRayosXintraoralDigital.default,
        alt: "Sensor Dental",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.rayosX.SensordeRayosXintraoralDigital.SensordeRayosXintraoralDigital_2,
        alt: "Sensor de rayos X intraoral digital",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.rayosX.SensordeRayosXintraoralDigital.SensordeRayosXintraoralDigital_3,
        alt: "Sensor de rayos X intraoral digital ",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.rayosX.SensordeRayosXintraoralDigital.SensordeRayosXintraoralDigital_4,
        alt: "Sensor de rayos X intraoral digital",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Equipo de Rayos X",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.374Z",
    updatedAt: "2024-10-29T00:10:22.374Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/mMw9WIq47H8?si=BS475TJutt6Eo-4N" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: "rayos-x-portatil",
    slug: "rayos-x-portatil",
    name: "Siray Max",
    subtitle: "Pantalla táctil, portátil",
    brand: {
      name: "Siger",
      logo: assets.logos.brands.siger
    },
    description: "Rayos X portátil con pantalla táctil",
    shortDescription: "Rayos X portátil con pantalla táctil",
    features: {
      unique: {
        title: "Características ",
        items: [
          "Aspecto compacto, más fácil de manejar",
          "Diseño liviano de 1,9 kg, más cómodo de sostener",
          "Tecnología de control de voltaje constante CC de alta frecuencia",
          "Imagen de alta calidad",
          "Interfaz de operación clara y sensible",
          "Mayor calidad de imagen",
          "Menor cantidad de radiación",
          "La salida de radiación no se ve afectada por la fluctuación del voltaje de la línea",
        ]
      },
      general: {
        title: "Imagen de alta calidad",
        items: [
          "Generador DC avanzado de alta frecuencia y voltaje constante",
          "Punto focal de 0,4 mm, imagen más clara",
          "Corriente del tubo de 2 mA y voltaje del tubo de 70 kV para garantizar una calidad de imagen estable",
        ]
      },
      includes: {
        title: "Opciones de imágenes convenientes",
        items: [
          "Modo adulto/niño",
          "El tiempo de exposición se puede ajustar y memorizar",
          "Modo basado en película, CR y modo de imagen digital",
        ]
      },
      optional: {
        title: "Diseño humanizado",
        items: [
          "El tiempo de exposición se puede ajustar entre 0,02～2,00S",
          "Batería de alta capacidad",
          "Diseño liviano de 1,9 kg",
        ]
      },
    },
    images: [
      {
        url: assets.products.rayosX.rayos_x_portatil_siraymax.default,
        alt: "SIRAY Max",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.rayosX.rayos_x_portatil_siraymax.rayos_x_portatil_siraymax_2,
        alt: "SIRAY Max",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.rayosX.rayos_x_portatil_siraymax.rayos_x_portatil_siraymax_3,
        alt: "SIRAY Max",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.rayosX.rayos_x_portatil_siraymax.rayos_x_portatil_siraymax_4,
        alt: "SIRAY Max",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.rayosX.rayos_x_portatil_siraymax.rayos_x_portatil_siraymax_5,
        alt: "SIRAY Max",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Equipo de Rayos X",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.374Z",
    updatedAt: "2024-10-29T00:10:22.374Z",
    videoIframe: '<iframe width="100%;" height="415" src="https://www.youtube.com/embed/FCCA9G_AzKk?si=oxjAlR_mOe890iWr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: "ChalecoPlomadoSinCuello",
    slug: "ChalecoPlomadoSinCuello",
    name: "Chaleco plomado sin cuello",
    subtitle: "Para tubos de Rayos X de hasta 100 Kv",
    brand: {
      name: "whitebrand",
      logo: assets.logos.brands.whitebrand
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características ",
        items: [
          "Para tubos de Rayos X de hasta 100 Kv",
          "Equivalente de plomo: 0,35 mmPb",
          "Peso: 2,8 kilos",
          "Altura adecuada: 1,6-1,7 m",
          "Material: Plomo Caucho",
          "Tamaño: L90 x W60 cm (ajustable con cinturón)",
          "Talla: M",
        ]
      },
      general: {
        title: "",
        items: []
      },
    },
    images: [
      {
        url: assets.products.rayosX.ChalecoPlomadoSinCuello.default,
        alt: "SIRAY Max",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.rayosX.ChalecoPlomadoSinCuello.ChalecoPlomadoSinCuello_2,
        alt: "SIRAY Max",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Equipo de Rayos X",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.374Z",
    updatedAt: "2024-10-29T00:10:22.374Z",
  },
  {
    id: "BolsoParaRayosXportatil",
    slug: "Bolso-Para-RayosX-portatil",
    name: "Bolso para rayos X portátil",
    subtitle: "Accesorio",
    brand: {
      name: "Xpect Vision",
      logo: assets.logos.brands.xpectVision
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características ",
        items: [
          "Cómodo",
          "Varios compartimientos",
          "Incluye espumas para proteger su equipo"
        ]
      },
      general: {
        title: "",
        items: []
      },
    },
    images: [
      {
        url: assets.products.rayosX.BolsoParaRayosXportatil.default,
        alt: "Bolso para rayos X portátil",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.rayosX.BolsoParaRayosXportatil.BolsoParaRayosXportatil_2,
        alt: "Bolso para rayos X portátil",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.rayosX.BolsoParaRayosXportatil.BolsoParaRayosXportatil_3,
        alt: "Bolso para rayos X portátil",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Equipo de Rayos X",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.374Z",
    updatedAt: "2024-10-29T00:10:22.374Z",
  },
  {
    id: "scaner-de-modelos-Freedom-X5",
    slug: "Escaner-de-modelos-Freedom-X5",
    name: "Escáner de modelos Freedom X5",
    subtitle: "Laboratorio",
    brand: {
      name: "DOF",
      logo: assets.logos.brands.dof
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Escáner de modelos en movimiento con cámara",
          "Cámara de 5MP para completar detalles",
          "Velocidad de escaneo",
          "Tecnología patentada",
          "Sistema de movimiento de cámara",
          "Escaneo cómodo y estable",
          "La cámara se mueve libremente sin fijar el modelo",
          "Líneas de margen nítidas con la cámara con resolución UHD"
        ]
      },
      general: {
        title: "",
        items: []
      },
    },
    images: [
      {
        url: assets.products.scanner.EscanerDeModelosFreedomX5.default,
        alt: "Escáner de modelos Freedom X5",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.scanner.EscanerDeModelosFreedomX5.EscanerDeModelosFreedomX5_2,
        alt: "Escáner de modelos Freedom X5",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.scanner.EscanerDeModelosFreedomX5.EscanerDeModelosFreedomX5_3,
        alt: "Escáner de modelos Freedom X5",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.scanner.EscanerDeModelosFreedomX5.EscanerDeModelosFreedomX5_4,
        alt: "Escáner de modelos Freedom X5",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.scanner.EscanerDeModelosFreedomX5.EscanerDeModelosFreedomX5_5,
        alt: "Escáner de modelos Freedom X5",
        width: 800,
        height: 600,
        isPrimary: true
      },
    ],
    category: "Escáneres",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.374Z",
    updatedAt: "2024-10-29T00:10:22.374Z",
    videoIframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/DymkQYZtKFg?si=G7nukrlzoe9N1GI2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> '
  },
  {
    id: "Lampara-de-blanqueamiento-LED-Advance-2505",
    slug: "Lampara-de-blanqueamiento-LED-Advance-2505",
    name: "Lámpara de blanqueamiento LED Advance 2505",
    subtitle: "3 modelos de trabajo",
    brand: {
      name: "TPC",
      logo: assets.logos.brands.tpc
    },
    description: "",
    shortDescription: "",
    features: {
      unique: {
        title: "Características",
        items: [
          "Funcionamiento silencioso del ventilador",
          "Aplicación de blanqueamiento multiarco",
          "Tres LED de alta intensidad",
          "Pantalla digital con respuesta de audio",
          "Diodos emisores de luz azul y ultravioleta de alta potencia",
          "Soporte móvil compacto para fácil almacenamiento",
          "Tiempo de blanqueo ajustable con temporizador controlado por microprocesador",
          "Selección automática inteligente de potencia: 110-240 voltios CA, 50/60 Hz",
          "El sistema de blanqueamiento LED incluye iluminador, base móvil, brazo ajustable, cable de alimentación y manual de usuario"
        ]
      },
      general: {
        title: "Incluye",
        items: [
          "Lámpara blanqueadora Advance 2505LED",
          "Soporte móvil",
          "Fuente de alimentación de CA",
          "1 año de garantía"
        ]
      },
    },
    images: [
      {
        url: assets.products.LamparaDeBlanqueamientoLEDAdvance2505.default,
        alt: "Lámpara de blanqueamiento LED Advance 2505",
        width: 800,
        height: 600,
        isPrimary: true
      },
      {
        url: assets.products.LamparaDeBlanqueamientoLEDAdvance2505.LamparaDeBlanqueamientoLEDAdvance2505_2,
        alt: "Lámpara de blanqueamiento LED Advance 2505",
        width: 800,
        height: 600,
        isPrimary: true
      }
    ],
    category: "Lámparas de blanqueamiento",
    isActive: true,
    createdAt: "2024-10-29T00:10:22.374Z",
    updatedAt: "2024-10-29T00:10:22.374Z",
  },
];