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

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
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

// Limpiar cache viejo cada 5 minutos
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now - entry.timestamp > RATE_LIMIT_WINDOW * 5) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

export async function POST(request: NextRequest) {
  try {
    // Obtener IP del cliente
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Rate limiting
    if (!checkRateLimit(ip)) {
      console.log(`[Reviews API] Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Por favor, espera un momento.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { productId, name, email, rating, comment, consent, hp } = body;

    // Validación básica
    if (!productId || !name || !email || !rating || !comment) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validar consentimiento
    if (!consent) {
      return NextResponse.json(
        { error: 'Debes aceptar el consentimiento para enviar tu valoración' },
        { status: 400 }
      );
    }

    // Honeypot check (debe estar vacío)
    if (hp && hp.trim() !== '') {
      console.log(`[Reviews API] Honeypot triggered for IP: ${ip}`);
      // Retornar éxito falso para no revelar el honeypot
      return NextResponse.json({ ok: true });
    }

    // Validar rating (1-5)
    const ratingNum = parseInt(rating, 10);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json(
        { error: 'La valoración debe ser entre 1 y 5 estrellas' },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Validar longitud de campos
    if (name.length > 100 || comment.length > 1000) {
      return NextResponse.json(
        { error: 'Los campos exceden la longitud máxima permitida' },
        { status: 400 }
      );
    }

    const productIdNum = parseInt(productId, 10);
    if (isNaN(productIdNum)) {
      return NextResponse.json(
        { error: 'ID de producto inválido' },
        { status: 400 }
      );
    }

    console.log(`[Reviews API] Submitting review for product ${productIdNum} from ${email}`);

    // Enviar review a WooCommerce (en estado "hold" para moderación)
    try {
      await createProductReview({
        product_id: productIdNum,
        review: comment.trim(),
        reviewer: name.trim(),
        reviewer_email: email.trim().toLowerCase(),
        rating: ratingNum,
      });

      console.log(`[Reviews API] ✅ Review submitted successfully for product ${productIdNum}`);

      return NextResponse.json({
        ok: true,
        message: 'Gracias, tu opinión fue enviada y quedará visible cuando sea aprobada.',
      });
    } catch (wcError) {
      // Si hay error en WooCommerce, loguear pero retornar éxito genérico
      // para no revelar información del sistema
      console.error('[Reviews API] WooCommerce error:', wcError);

      // Si el error es de duplicado o similar, aún retornar éxito
      return NextResponse.json({
        ok: true,
        message: 'Gracias, tu opinión fue enviada y quedará visible cuando sea aprobada.',
      });
    }
  } catch (error) {
    console.error('[Reviews API] Error:', error);
    return NextResponse.json(
      {
        error: 'Error al enviar la valoración. Por favor, intenta de nuevo.',
      },
      { status: 500 }
    );
  }
}
