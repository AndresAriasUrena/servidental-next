function confirmationUnavailable(): Response {
  return Response.json(
    { error: 'La confirmación del proveedor aún no está disponible' },
    { status: 503, headers: { 'Cache-Control': 'no-store' } },
  );
}

export const GET = confirmationUnavailable;
export const POST = confirmationUnavailable;
