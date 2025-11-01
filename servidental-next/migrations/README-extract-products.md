# Script de Extracción de Productos Mejorado

## Descripción

`extract-products-improved.js` es un script mejorado que extrae de manera robusta los 99 productos definidos en `manual-products.ts` y los convierte a formato JSON limpio.

## Características

✅ **Parser robusto**: Maneja correctamente la estructura TypeScript compleja
✅ **Referencias de assets**: Convierte las referencias a assets a strings válidos
✅ **Validación de datos**: Valida y limpia toda la estructura de productos
✅ **Estadísticas detalladas**: Genera reportes completos de la extracción
✅ **Manejo de errores**: Manejo robusto de errores y validación

## Estructura de Productos Extraídos

Cada producto incluye:
- `id`: Identificador único
- `slug`: URL slug
- `name`: Nombre del producto
- `subtitle`: Subtítulo descriptivo
- `brand`: Información de marca (nombre y logo)
- `description` y `shortDescription`: Descripciones
- `features`: Características únicas y generales
- `images`: Array de imágenes con metadata
- `category`: Categoría del producto
- `isActive`: Estado activo/inactivo
- `createdAt` y `updatedAt`: Fechas de creación y actualización
- `videoIframe`: iframe de video de YouTube (si aplica)

## Uso

```bash
# Ejecutar el script
node migrations/extract-products-improved.js

# O con permisos de ejecución
./migrations/extract-products-improved.js
```

## Archivos Generados

1. **`extracted-products.json`**: JSON con todos los productos extraídos
2. **`extraction-stats.json`**: Estadísticas detalladas de la extracción

## Resultados de la Última Extracción

- **Total de productos**: 99
- **Categorías únicas**: 27
- **Marcas únicas**: 18
- **Productos con imágenes**: 99
- **Productos con video**: 38
- **Productos activos**: 99

### Categorías Encontradas
- Pulidores, Motores de implantes, Motores de cirugías
- Motor NX-201N, Lavadoras ultrasónicas, Lámparas Dentales
- Lámparas de Fotocurado, Fresadora, Esterilización
- Mobiliario, Escáneres, Equipo de Rayos X
- Pulverizador, Equipo portátil, Equipo para endodoncia
- Compresores, Cámaras Intraorales, Bombas de vacío
- Anestesia, Activador UV para implantes, Piezas de mano
- Termoformadoras, Selladoras, Unidades Dentales
- Lámparas de blanqueamiento, Láseres dentales, Electro bisturís

### Marcas Encontradas
- COXO, BioArt, Micro NX, Siger, DOF, Sturdy
- DenTech, Meyer, DentaFilm, TPC, epdent, mdmed
- elec, whitebrand, Xpect Vision, dimed, fame, artelectron

## Funcionalidades del Script

### 1. Parser TypeScript Robusto
- Maneja imports y exports de TypeScript
- Remueve anotaciones de tipos
- Mock inteligente de assets

### 2. Procesamiento de Assets
- Convierte referencias de assets a strings
- Maneja estructuras anidadas de assets
- Genera paths consistentes para imágenes y logos

### 3. Validación de Datos
- Valida estructura de productos
- Limpia valores undefined/null
- Convierte fechas a formato ISO string
- Normaliza estructura de imágenes y marcas

### 4. Estadísticas y Reportes
- Conteo detallado por categoría y marca
- Análisis de productos con imágenes/videos
- Muestra de productos extraídos
- Timestamp de extracción

## Estructura del JSON Generado

```json
[
  {
    "id": "Pulidora-dental-por-aire-CP-1",
    "slug": "Pulidora-dental-por-aire-CP-1",
    "name": "Pulidora dental por aire CP-1",
    "subtitle": "Pieza de mano de alto rendimiento",
    "brand": {
      "name": "COXO",
      "logo": "assets/logos/brands/coxo"
    },
    "features": {
      "unique": {
        "title": "Características",
        "items": ["..."]
      },
      "general": {
        "title": "",
        "items": []
      }
    },
    "images": [
      {
        "url": "assets/products/pulidoras/PulidoraDentalPorAireCP/default",
        "alt": "Pulidora dental por aire CP-1",
        "width": 800,
        "height": 600,
        "isPrimary": true
      }
    ],
    "category": "Pulidores",
    "isActive": true,
    "createdAt": "2024-10-29T00:10:22.089Z",
    "updatedAt": "2024-10-29T00:10:22.089Z",
    "videoIframe": "<iframe...></iframe>"
  }
]
```

## Mantenimiento

El script es auto-contenido y no requiere dependencias externas más allá de Node.js. Para actualizaciones futuras del archivo `manual-products.ts`, simplemente ejecute el script nuevamente.