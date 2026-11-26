import { NextRequest, NextResponse } from 'next/server';
import { createProductReview } from '@/server/wc';

// Rate limiting simple por IP (1 review por minuto)
interface RateLimitEntry {
  count: number;
  timestamp: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const MAX_REQUESTS = 1;
const MAX_RATE_LIMIT_ENTRIES = 4096;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    if (rateLimitMap.size >= MAX_RATE_LIMIT_ENTRIES) {
      for (const [key, candidate] of rateLimitMap) {
        if (now - candidate.timestamp >= RATE_LIMIT_WINDOW) rateLimitMap.delete(key);
      }
      if (rateLimitMap.size >= MAX_RATE_LIMIT_ENTRIES) return false;
    }
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  // Limpiar si pasó la ventana
  if (now - entry.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  // Verificar límite
  if (entry.count >= MAX_REQUESTS) {
    return false;
  }

  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Obtener IP del cliente
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Por favor, espera un momento.' },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Datos de valoración inválidos' }, { status: 400 });
    }

    const { productId, name, email, rating, comment, consent, hp } = body;
    if (typeof name !== 'string' || typeof email !== 'string' || typeof comment !== 'string' ||
        (hp !== undefined && (typeof hp !== 'string' || hp.trim() !== ''))) {
      return NextResponse.json({ error: 'Datos de valoración inválidos' }, { status: 400 });
    }

    const reviewer = name.trim();
    const review = comment.trim();
    const reviewerEmail = email.trim().toLowerCase();

    if (!reviewer || reviewer.length > 100 || !review || review.length > 1000 ||
        reviewerEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reviewerEmail)) {
      return NextResponse.json({ error: 'Revisá el nombre, correo y comentario' }, { status: 400 });
    }

    if (consent !== true) {
      return NextResponse.json(
        { error: 'Debes aceptar el consentimiento para enviar tu valoración' },
        { status: 400 }
      );
    }

    const productIdNum = parseInteger(productId);
    const ratingNum = parseInteger(rating);
    if (!Number.isSafeInteger(productIdNum) || productIdNum < 1 ||
        !Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json({ error: 'Producto o valoración inválidos' }, { status: 400 });
    }

    try {
      await createProductReview({
        product_id: productIdNum,
        review,
        reviewer,
        reviewer_email: reviewerEmail,
        rating: ratingNum,
      });
    } catch {
      return NextResponse.json(
        { error: 'No se pudo guardar la valoración. Por favor, intenta de nuevo.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: 'Gracias, tu opinión fue enviada y quedará visible cuando sea aprobada.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Error al enviar la valoración. Por favor, intenta de nuevo.' },
      { status: 500 }
    );
  }
}

function parseInteger(value: unknown): number {
  if (typeof value === 'number') return value;
  return typeof value === 'string' && /^\d+$/.test(value) ? Number(value) : NaN;
}
