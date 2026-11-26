import Link from 'next/link';

export default function TilopayCallback() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="mb-4 text-3xl font-bold text-gray-900">
        Pago pendiente de confirmación
      </h1>
      <p className="mb-6 text-gray-600">
        Si completaste el pago, consultá con Servidental antes de volver a intentarlo.
      </p>
      <Link href="/" className="font-medium text-servi_green underline">
        Volver al inicio
      </Link>
    </main>
  );
}
