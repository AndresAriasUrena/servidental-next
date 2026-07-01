# Diagnóstico: "Doble formulario" en el checkout de Tilopay

**Fecha:** 2026-07-01
**Alcance:** Solo diagnóstico. Sin cambios de código. Pendiente de aprobación.

---

## 1. Resumen del flujo actual

### 1.1 Diagrama del flujo real (producción)

```
┌─────────────────────────────────────────────────────────────────┐
│ /checkout  (src/app/checkout/page.tsx)                            │
│  • Carga jQuery 3.6.0  (beforeInteractive)                        │
│  • Carga https://app.tilopay.com/sdk/v1/sdk.min.js (afterInteractive)
│    ⚠️  El SDK se carga pero NUNCA se invoca (ver §2)              │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ <Checkout />  (FORMULARIO PROPIO Nº 1)                            │
│  Captura: razón social, cédula, código Hacienda, tipo cliente,   │
│  teléfono(s), correo facturación, provincia/cantón/distrito,     │
│  otras señas, Waze, datos de contacto opcionales, opción de      │
│  envío, método de pago, notas.                                   │
│  handleSubmit() → setShowTilopayCheckout(true)  (abre modal)     │
└───────────────────────────────┬─────────────────────────────────┘
                                │  pasa customerInfo + cart
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ <TilopayPaymentSDK />                                             │
│  ⚠️  El archivo se llama *SDK* pero el componente exportado es    │
│      `TilopayPaymentLink` → es un PAYMENT LINK con REDIRECT.      │
│  Botón "Pagar con TiloPay":                                       │
│   1. POST /api/woocommerce/orders   → crea orden WooCommerce      │
│   2. POST /api/tilopay/process-payment                           │
│   3. window.location.href = paymentUrl   (SALE del sitio)        │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ /api/tilopay/process-payment  →  lib/tilopay.ts::createPayment() │
│  • getAccessToken()  (POST /api/v1/login)                        │
│  • POST /api/v1/createLinkPayment  con type:1  (payment link)    │
│    payload = { key, amount, currency, reference, type:1,         │
│               description, client, callback_url }                │
│    ⚠️  SOLO envía `client` (nombre). NO envía email/teléfono/    │
│        dirección del cliente.                                    │
└───────────────────────────────┬─────────────────────────────────┘
                                │  devuelve url del link
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ PÁGINA ALOJADA DE TILOPAY  (FORMULARIO Nº 2)  ← DOBLE CAPTURA    │
│  El cliente vuelve a escribir nombre, email, teléfono y los      │
│  datos de tarjeta, porque el link NO llegó pre-poblado.          │
└───────────────────────────────┬─────────────────────────────────┘
                                │  callback_url
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ GET /api/tilopay/callback                                        │
│  • resolveWooOrderId(orderNumber) vía meta `_tilopay_order_number`│
│  • markWooOrderPaid() / markWooOrderFailed()                     │
│  • redirect a /checkout/success | /checkout/failure              │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Datos que captura nuestro formulario (Checkout.tsx)

| Campo | Estado |
|---|---|
| Nombre / razón social | ✅ (se envía como `client`) |
| Cédula física/jurídica | ✅ (solo a WooCommerce) |
| Código actividad Hacienda | ✅ (solo a WooCommerce) |
| Tipo de cliente | ✅ (solo a WooCommerce) |
| Teléfono celular / otro | ✅ (solo a WooCommerce) |
| Correo de facturación | ✅ (solo a WooCommerce) |
| Provincia / Cantón / Distrito / señas / Waze | ✅ (solo a WooCommerce) |
| Datos de contacto opcionales | ✅ (solo a WooCommerce) |
| Opción de envío / notas | ✅ (solo a WooCommerce) |

---

## 2. Ruta activa vs. código muerto

**Ruta REALMENTE activa en producción:**
`Checkout.tsx` → `TilopayPaymentSDK.tsx` (`TilopayPaymentLink`) → `POST /api/tilopay/process-payment` → `lib/tilopay.ts::createPayment()` → `POST /api/v1/createLinkPayment (type:1)` → **redirect a página alojada** → `GET /api/tilopay/callback`.

Es decir: **NO se usa el SDK embebido con `initialize()`**. Se usa el **Payment Link tipo 1 con redirect a página alojada**.

**Código muerto / roto (no participa del flujo):**

| Archivo | Estado | Motivo |
|---|---|---|
| `src/app/api/tilopay/create-payment/route.ts` | 🔴 Muerto + roto | Nadie lo llama. Importa `getTilopayBearerToken`, `tilopayConfig.paymentUrl`, `tilopayConfig.productionTest` — **ninguno existe** hoy en `lib/tilopay.ts`. Contiene bucles experimentales que prueban ~7 endpoints inventados y 3 estructuras de payload. No compilaría. |
| `src/app/api/tilopay/create-headless-payment/route.ts` | 🔴 Muerto | Nadie lo llama. Hace `HEAD` a 6 URLs adivinadas y redirige a `/tilopay-payment` (página que aparenta existir pero no forma parte del flujo real). Puro experimento. |
| `src/app/api/tilopay/auth/route.ts` | 🔴 Roto | Importa `getTilopayBearerToken` (no existe). |
| `src/app/api/tilopay/sdk-token/route.ts` | 🔴 Roto | Importa `getTilopaySDKToken` (no existe). Sería la pieza necesaria para el SDK embebido, pero está sin implementar. |
| `src/app/api/tilopay/notify/route.ts` | 🔴 Roto | Importa `getTilopayBearerToken`, `verifyTilopayTransaction`, `mapTilopayStatusToWooCommerce`, `TilopayWebhookPayload` (ninguno existe). |
| `src/app/api/tilopay/test-auth/route.ts` | 🟡 Diagnóstico | Solo para pruebas manuales de login. |

**Conclusión:** De 8 rutas bajo `/api/tilopay/`, solo **2 están vivas y sanas**: `process-payment` y `callback`. El resto es experimentación previa que quedó en el repo (los TODOs y llamadas a endpoints inventados **no reflejan la API real de Tilopay**).

---

## 3. Punto exacto de la doble captura

La doble captura ocurre en el **redirect a la página alojada de Tilopay** (`window.location.href = tilopayData.paymentUrl` en `TilopayPaymentSDK.tsx:164`), combinado con que el payload de `createLinkPayment` en `lib/tilopay.ts:142-151` **solo envía `client` (nombre)**.

Como el link de pago se genera sin `billToEmail`, `billToTelephone`, `billToAddress`, etc., la página alojada de Tilopay llega **vacía** y le pide al usuario **de nuevo** su nombre, correo y teléfono, además de los datos de tarjeta. Ese es el segundo formulario.

---

## 4. Qué datos se envían HOY a Tilopay

| Dato del cliente | ¿Se envía a Tilopay hoy? |
|---|---|
| Nombre (`client`) | ✅ Sí |
| Email (`billToEmail`) | ❌ No |
| Teléfono (`billToTelephone`) | ❌ No |
| Dirección (`billToAddress`, ciudad, provincia…) | ❌ No |
| Monto / moneda / referencia | ✅ Sí |

`TilopayPaymentSDK` sí **arma** un objeto `customerInfo` completo (email, teléfono, dirección) y lo manda a `/api/tilopay/process-payment`, **pero** `process-payment` solo reenvía `firstName/lastName/email` a `createPayment()`, y `createPayment()` a su vez **descarta todo excepto el nombre** al construir el payload de `createLinkPayment`. Los datos se pierden en dos saltos.

---

## 5. Verificación contra la documentación oficial de Tilopay

Confirmado contra documentación oficial y del plugin oficial de WooCommerce:

- **Tilopay ofrece DOS modos** de integración para el mismo comercio y credenciales (API Key + API User + API Password — las mismas que ya usamos):
  1. **"Native Payment Form" (SDK embebido / on-site):** los campos de tarjeta se renderizan **dentro de nuestra propia página**. Sin redirect.
  2. **"Redirect to the Payment Form" (payment link / hosted):** lo que usamos hoy.
- **SDK embebido** — flujo oficial:
  - `GetTokenSdk` (endpoint de la API) → devuelve un `token`.
  - `Tilopay.Init({ token, currency, language, amount, orderNumber, billToEmail (requerido), billToFirstName, billToLastName, billToTelephone, billToAddress, billToAddress2, billToCity, billToState, billToZipPostCode, billToCountry, redirect })`.
  - `Tilopay.startPayment()` procesa el cobro; `redirect` es la URL de callback con la respuesta final.
  - Los campos `billTo*` **pre-cargan** los datos del cliente → **un solo formulario real**.
- **Sobre la Opción B (pre-poblar el link):** el propio `Tilopay.Init` del SDK acepta los `billTo*`. Para el **payment link** (`createLinkPayment`) la evidencia pública de que esos campos se acepten y **efectivamente pre-llenen** la página alojada es **débil/no confirmada** en la doc abierta (el ejemplo de link se centra en `amount`/`client`/`reference`). Se requiere validar contra la cuenta real / soporte Tilopay antes de comprometerse a la Opción B.

> Nota: el PDF oficial del SDK (`app.tilopay.com/sdk/documentation.pdf`) es un documento basado en imágenes; los nombres de parámetros arriba provienen de la doc del SDK y de la doc del plugin oficial de WooCommerce. Antes de implementar conviene abrir el PDF/Postman manualmente para copiar los nombres exactos 1:1.

---

## 6. Tabla comparativa de opciones

| Criterio | **A) SDK embebido (`Init`)** | **B) Payment Link pre-poblado** | **C) Reducir campos del formulario** |
|---|---|---|---|
| **Viabilidad técnica** | ✅ Alta. Misma cuenta/credenciales; el gateway oficial lo soporta ("Native Payment Form"). Falta implementar `GetTokenSdk` (hoy roto en `sdk-token`). | ⚠️ Media/incierta. Depende de que `createLinkPayment` acepte y respete `billTo*` en la página alojada — **no confirmado** en doc abierta. | ✅ Trivial. |
| **¿Elimina el doble formulario?** | ✅ **Sí, de raíz.** Un único formulario, tarjeta incluida, sin salir del sitio. | 🟡 **Parcial.** Sigue habiendo redirect; en el mejor caso la 2ª pantalla llega pre-llena, pero el usuario igual ve otra pantalla y reingresa/verifica tarjeta. | ❌ No. Solo reduce fricción del 1er formulario. |
| **Seguridad / PCI** | ✅ Los datos de tarjeta los captura el **SDK de Tilopay** (iframe/campos gestionados por Tilopay), no tocan nuestro servidor. Alcance PCI se mantiene en **SAQ A / A-EP**, igual que hoy. | ✅ La tarjeta se captura en la página alojada de Tilopay. Sin cambio de alcance. | ✅ Sin cambio. |
| **Esfuerzo** | 🟠 Medio. Reescribir `TilopayPaymentSDK`, implementar `sdk-token` (`GetTokenSdk`), invocar `Init`/`startPayment`, cablear callback JS. | 🟢 Bajo. Añadir `billTo*` al payload de `createLinkPayment` + verificar con Tilopay. | 🟢 Muy bajo. |
| **Riesgo de regresión** | 🟠 Medio: cambia el mecanismo de confirmación (callback JS del SDK vs. redirect + `/api/tilopay/callback`). Hay que revalidar creación de orden WooCommerce, marcado paid/failed y páginas success/failure. | 🟢 Bajo: no cambia la mecánica de callback actual. | 🟢 Nulo. |
| **Cambios en variables de entorno** | Reutiliza `TILOPAY_API_USER/PASS/KEY`. Posible `NEXT_PUBLIC_TILOPAY_*` para el front y URL de `redirect`. | Ninguno nuevo. | Ninguno. |

---

## 7. Recomendación única

**Implementar la Opción A — SDK web embebido de Tilopay (`Tilopay.Init` + `startPayment`).**

Razones:
1. Es la **única opción que elimina de verdad el doble formulario**: un solo formulario, con la tarjeta capturada dentro de nuestra página, sin salir del sitio.
2. Es un **modo oficialmente soportado** por Tilopay ("Native Payment Form") con las **mismas credenciales** que ya tenemos — no requiere contrato ni cuenta nueva.
3. **No aumenta el alcance PCI**: los campos de tarjeta los gestiona el propio SDK de Tilopay; los datos sensibles no tocan nuestro servidor ni nuestro DOM directamente.
4. El `sdk.min.js` **ya está cargado** en `checkout/page.tsx` (hoy sin uso), así que la infraestructura front ya está a medio camino.

La Opción B se descarta como solución principal porque **no elimina** la segunda pantalla y su viabilidad de pre-poblado **no está confirmada**. La Opción C es un complemento cosmético, no una solución.

**Condición previa a implementar:** abrir manualmente el PDF oficial del SDK / la colección Postman de Tilopay para copiar los nombres de parámetros y el nombre exacto del endpoint `GetTokenSdk` **1:1**, y hacer una transacción de prueba en sandbox confirmando el callback.

---

## 8. Archivos a tocar en la fase de implementación (Opción A)

**Modificar:**
- `src/components/ecommerce/checkout/TilopayPaymentSDK.tsx` — reemplazar el flujo de payment-link/redirect por `Tilopay.Init({...})` con los `billTo*` pre-cargados desde `customerInfo` + `Tilopay.startPayment()` y manejo del resultado por callback JS.
- `src/lib/tilopay.ts` — implementar `getTilopaySDKToken()` (llamada a `GetTokenSdk`); el `createPayment()` (createLinkPayment) puede conservarse como fallback o retirarse.
- `src/app/api/tilopay/sdk-token/route.ts` — arreglar la importación rota y devolver el token del SDK (hoy importa una función inexistente).
- `src/app/checkout/page.tsx` — verificar el orden/estrategia de carga del SDK y que jQuery quede disponible antes de `Init`.
- `.env.example` — sincronizar con las variables reales (`TILOPAY_API_USER`, `TILOPAY_API_PASS`, `TILOPAY_API_KEY`, `TILOPAY_API_BASE`, `TILOPAY_CALLBACK_URL`, y las `NEXT_PUBLIC_*` que requiera el front). **Hoy `.env.example` está desactualizado**: solo lista `TILOPAY_API_KEY` y `TILOPAY_SECRET`, que ni siquiera coinciden con lo que el código lee.

**Revisar / revalidar (posible ajuste según el callback del SDK):**
- `src/app/api/tilopay/callback/route.ts` — confirmar que el mecanismo de confirmación del SDK sigue pasando por aquí (o adaptarlo al callback JS).
- `src/app/checkout/success/`, `src/app/checkout/failure/`, `src/app/checkout/cancel/` — validar redirecciones tras el nuevo flujo.
- Creación de orden en WooCommerce (`/api/woocommerce/orders`) y el marcado paid/failed — deben seguir funcionando con el nuevo orden de operaciones.

**Eliminar (limpieza de código muerto/roto, recomendado):**
- `src/app/api/tilopay/create-payment/route.ts`
- `src/app/api/tilopay/create-headless-payment/route.ts`
- `src/app/api/tilopay/auth/route.ts` (roto) — o arreglar si se necesita.
- `src/app/api/tilopay/notify/route.ts` (roto) — o implementar de verdad si se quiere webhook server-to-server.
- `src/app/tilopay-payment/` (página del flujo headless experimental, si no se usa).
