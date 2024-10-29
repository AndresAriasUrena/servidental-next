// src/assets/index.ts
import { StaticImageData } from 'next/image'

// Logos principales
import logo from './logos/Logo-servidental-medical-equipment.png'
import logoBlanco from './logos/logo-blanco-servidental.png'
import mainlyDigital from './logos/mainlydigital.png'
import pymeCostaRica from './logos/PYME_CostaRica.jpg'

// Logos de marcas
import bioartLogo from './logos/brands/bioart_logo.png'
import coxoLogo from './logos/brands/coxo_logo.png'
import dofLogo from './logos/brands/dof_logo.png'
import fengDanLogo from './logos/brands/feng_dan_logo.png'
import meyerLogo from './logos/brands/meyer.png'
import microNxLogo from './logos/brands/micro_nx_logo.png'
import sigerLogo from './logos/brands/siger_logo.png'
import sturdyLogo from './logos/brands/sturdy_logo.jpg'
import tpcLogo from './logos/brands/tpc_logo.png'
import xpectVisionLogo from './logos/brands/xpect-vision.png'

// Productos destacados
import unidadDentalS30 from './products/unidad_dental_serie_s30/serie-s30.png'
import unidadDentalS30Carrito from './products/unidad_dental_serie_s30/serie-s30-carrito.png'
import fresadora from './products/fresadora/fresadora-2.png'
import rayosX from './products/rayos_x_portatil/rayos-x-portatil-4.png'

// Anestesia
import anestesiaImg from './products/anestesia/GENI2.png';

// Bombas de vacío
import anyvacImg from './products/bomba_de_vacio_humeda/anyvac30_1.png';
import vc10Img from './products/bomba_de_vacio_seca/vc-10_1.png';

// Motores
import endomotorImg from './products/c-smart-endomotor/endomotor.jpg';

// Cámaras
import camaraIntraoral1 from './products/camara-intraoral/camara-1.png';
import camaraIntraoral2 from './products/camara-intraoral/camara-2.png';

// Carrito
import carrito1 from './products/carrito_multifuncional/carrito-1_1.png';
import carrito2 from './products/carrito_multifuncional/carrito-2_1.png';
import carrito3 from './products/carrito_multifuncional/carrito-3_1.png';

// Compresores
import compresor701 from './products/compresor/DC-701-1hp_1.png';
import compresor702 from './products/compresor/DC-702-2hp_1.jpg';
import compresor703 from './products/compresor/DC-703-3hp_1.jpg';

// Contra-ángulos
import contraangulo1 from './products/contrangulo/contrangulo-1_1.jpg';
import contraanguloImplantes from './products/contrangulo-implantes/contrangulo-para-implantes.png';

// Cortadores
import cortadorGutta from './products/cortador_gutta_percha_ultrasonico/rs=w_888,h_1184_1.jpg';
import gpCutFit from './products/gp_cut_fit/rs=w_888,h_1184 (2).jpg';

// Scanner
import eagleIOS from './products/escaner_portatil_eagle/eagle-ios-0_1.jpeg';

// Esterilizadores
import esterilizadorManual from './products/esterilizador_manual/esterilizador-manual_1.png';
import esterilizadorSemi from './products/esterilizador_semiautomatico/esterilziador-semiautomatico.png';

// Lámparas
import lamparaL500 from './products/lamparas_dentales/L500.png';
import lamparaV1 from './products/lamparas_dentales/v1.png';
import lamparaV2 from './products/lamparas_dentales/v2.png';

// Lavadora ultrasonido
import lavadora1 from './products/lavadora_ultrasonido/lavadora-1.png';
import lavadora2 from './products/lavadora_ultrasonido/lavadora-2.png';
import lavadoracesto from './products/lavadora_ultrasonido/lavadora-cesto.png';


// Imágenes de servicios
import instalacionesImg from './services/instalaciones.jpg'
import mantenimientosImg from './services/mantenimientos.jpg'
import calibracionesImg from './services/calibraciones.jpg'

const assets = {
  logos: {
    main: {
      default: logo,
      white: logoBlanco,
      mainlyDigital,
      pymeCostaRica,
    },
    brands: {
      bioart: bioartLogo,
      coxo: coxoLogo,
      dof: dofLogo,
      fengDan: fengDanLogo,
      meyer: meyerLogo,
      microNx: microNxLogo,
      siger: sigerLogo,
      sturdy: sturdyLogo,
      tpc: tpcLogo,
      xpectVision: xpectVisionLogo,
    }
  },
  products: {
    anestesia: {
      default: anestesiaImg
    },
    bombasVacio: {
      anyvac30: anyvacImg,
      vc10: vc10Img
    },
    motores: {
      endomotor: endomotorImg
    },
    camaras: {
      intraoral: [camaraIntraoral1, camaraIntraoral2]
    },
    carrito: {
      images: [carrito1, carrito2, carrito3]
    },
    compresores: {
      dc701: compresor701,
      dc702: compresor702,
      dc703: compresor703
    },
    contraangulos: {
      default: contraangulo1,
      implantes: contraanguloImplantes
    },
    cortadores: {
      gutta: cortadorGutta,
      gpCutFit: gpCutFit
    },
    scanner: {
      eagleIOS: eagleIOS
    },
    esterilizadores: {
      manual: esterilizadorManual,
      semiAuto: esterilizadorSemi
    },
    lamparasDentales: {
      l500: lamparaL500,
      v1: lamparaV1,
      v2: lamparaV2
    },
    lavadoraUltrasonido: {
      lava1: lavadora1,
      lava2: lavadora2,
      lavacesto: lavadoracesto
    },
    // ... mantener los productos que ya estaban ...
    unidadDental: {
      s30: {
        default: unidadDentalS30,
        carrito: unidadDentalS30Carrito,
      }
    },
    fresadora,
    rayosX,
  },
  services: {
    instalaciones: instalacionesImg,
    mantenimientos: mantenimientosImg,
    calibraciones: calibracionesImg,
  },
} as const

export type AssetsType = typeof assets

export default assets