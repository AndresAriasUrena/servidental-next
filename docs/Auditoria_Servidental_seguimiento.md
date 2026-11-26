# Auditoría de seguridad de Servidental

## Seguimiento al 23 de noviembre de 2026

Este documento amplía el informe de avance del 18 de noviembre. La revisión corresponde al commit `3baf91ff6ab660e5cf6b708b1bf30eb9195278ec`. Las rutas de evidencia son relativas a la carpeta `servidental-next`. Método empleado: lectura estática del checkout y análisis del archivo de bloqueo. Estado del despliegue y configuración de TiloPay pendientes de confirmación.

### H1–H2. Confirmación del pago y retornos de TiloPay

| Evidencia | Observación |
| --- | --- |
| `src/lib/tilopay.ts:14,150` | La solicitud de pago incluye un callback configurable por entorno. El valor por defecto señala la ruta API de callback. Falta confirmar el destino efectivo del despliegue. |
| `src/app/api/tilopay/callback/route.ts:147–152,191` | Se invoca una verificación cuyo resultado actual es fijo. |
| `src/app/api/tilopay/notify/route.ts:4,87–100` | La ruta importa un verificador que no figura entre los exports de la librería revisada. Si la llamada falla, la lógica escrita continúa y deriva el estado a partir de la notificación recibida. Queda pendiente confirmar compilación y registro del webhook. |
| `src/app/checkout/tilopay-callback/page.tsx:29,42–55` y `src/app/api/woocommerce/orders/update-payment/route.ts:39` | La vista de retorno puede solicitar una actualización de WooCommerce. El estado recibido gobierna el indicador de pago en la ruta de actualización. |

**Impacto.** El estado del pedido puede quedar desalineado con el cobro si el despliegue usa alguna de estas rutas sin confirmación del proveedor.

**Remediación.** Hacer que la vista de retorno consulte el estado del pedido. Consolidar las escrituras de estado en una operación de servidor que compruebe la transacción, su asociación al pedido, el importe, la moneda y el comercio según el contrato de TiloPay.

**Cierre.** Un pedido solo cambia a pagado cuando la confirmación verificable coincide con el pedido guardado. El despliegue debe usar el callback y el webhook documentados.

### H4. Importe y moneda en el inicio de pago

**Evidencia.** `src/app/checkout/page.tsx:116` monta Checkout. `src/components/ecommerce/checkout/Checkout.tsx:1096` monta el SDK. `src/components/ecommerce/checkout/TilopayPaymentSDK.tsx:100,154–162` crea el pedido y solicita el pago con monto y moneda del cliente. `src/app/api/tilopay/process-payment/route.ts:8–15,37–43` lee esos datos y los incorpora al pago.

**Impacto.** El monto que se solicita al proveedor puede diferir del total del pedido.

**Remediación y cierre.** Obtener importe y moneda del pedido persistido en el servidor. Confirmar que esos valores se usan al iniciar y al conciliar el cobro.

### Dependencias

`npm audit --package-lock-only --ignore-scripts --json` reportó 25 entradas, 3 críticas, 15 altas y 7 moderadas. Las críticas corresponden a `form-data`, `request` y `tar`, marcadas como transitivas. Este inventario proviene del lockfile. Falta revisar las cadenas, los avisos y la exposición de cada componente en el despliegue.

### Revisión de permisos y próximo paso

Confirmar con el responsable del despliegue el callback activo, si `notify` está registrado y el alcance de la credencial de WooCommerce que modifica pedidos. Basta con las rutas configuradas y los permisos, sin compartir valores de credenciales. Revisar el contrato de confirmación de TiloPay antes de modificar el flujo de pagos.

La búsqueda de consumidores en `src` no encontró llamadas a `create-payment` ni `create-headless-payment`. Su uso externo queda pendiente. Esta fase no efectuó cobros ni modificó pedidos.

## Contención de escrituras de pago

- H1. La ruta de actualización directa devuelve 410. La página de retorno muestra que el pago está pendiente y conserva el carrito.
- H2. El retorno redirige a la pantalla pendiente. Las notificaciones GET y POST devuelven 503 mientras falta la confirmación del proveedor.
- H5. La creación de pedidos envía `set_paid: false`.

La conciliación automática queda pendiente. Antes de desplegar este bloque, configurar una verificación TiloPay del lado servidor y comprobar en staging que el estado aprobado corresponda al comercio, pedido, moneda e importe persistidos. Verificar también una notificación repetida, una discrepancia de monto y una interrupción de la consulta. H3, H4 y los demás hallazgos permanecen abiertos.

## H4 Inicio de pago desde el pedido guardado

El checkout entrega el ID y la clave del pedido recién creado. El servidor consulta WooCommerce y verifica que la clave coincida y que el pedido esté pendiente, sin fecha de pago y registrado para TiloPay. El enlace se solicita con el monto, moneda, referencia y datos de facturación del pedido guardado.

Este cambio cubre la solicitud de enlace del checkout habitual. Queda validar cómo se calculan y guardan los precios, descuentos y envío al crear el pedido, revisar las rutas alternativas y completar la conciliación del cobro. En staging, verificar la moneda efectiva de WooCommerce y que el total guardado corresponda al total visible al comprador.

## H22 a H26 Catálogo y compilación

- H22. La búsqueda por marcas devuelve 502 si no puede consultar WordPress. Un resultado vacío se reserva para consultas exitosas sin coincidencias. La tienda muestra un error recuperable con opción de reintentar.
- H23. El filtro admite hasta diez marcas distintas por consulta. La resolución elimina duplicados, comparte un plazo de diez segundos y conserva en caché las consultas exitosas.
- H24. Las respuestas grid y completa del listado proyectan campos públicos explícitos. El listado omite los metadatos crudos y conserva los PDF procesados. La ficha por slug conserva su contrato existente.
- H25. El build vuelve a comprobar los tipos. El comando `npm run typecheck` genera los tipos de rutas y ejecuta TypeScript. Se retiraron las rutas alternativas de TiloPay sin consumidores identificados en el repositorio. Confirmar su uso externo antes de desplegar.
- H26. Los enlaces PDF se limitan a HTTPS y a los orígenes autorizados. Los predeterminados son Google Drive y los dos orígenes WordPress de Servidental. Si hay manuales en otros proveedores, configurar una lista de orígenes HTTPS exactos separados por comas en `PRODUCT_RESOURCE_ORIGINS`.

Validar en staging la recuperación de una búsqueda fallida, la visualización de productos y manuales, y la compilación completa. La conciliación de pagos y la idempotencia del servidor siguen pendientes de los bloques anteriores.

## H6 Datos personales en registros

Los flujos revisados de pedidos y pagos dejaron de registrar cuerpos completos, datos de facturación, fragmentos de tokens y enlaces de pago. Los errores del proveedor se resumen con su código HTTP cuando está disponible. Confirmar en staging el alcance de los registros históricos y la política de retención.
