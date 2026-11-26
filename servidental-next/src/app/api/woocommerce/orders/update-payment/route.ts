export function POST(): Response {
  return Response.json(
    { error: 'La actualización directa del estado de pago fue retirada' },
    { status: 410, headers: { 'Cache-Control': 'no-store' } },
  );
}
