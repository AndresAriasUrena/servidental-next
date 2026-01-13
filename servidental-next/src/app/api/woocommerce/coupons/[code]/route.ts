import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/woocommerce/coupons/[code]
 * Validates and retrieves coupon information by code
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;

    if (!code) {
      return NextResponse.json(
        { error: 'Código de cupón requerido' },
        { status: 400 }
      );
    }

    const woocommerceUrl = process.env.WOOCOMMERCE_URL;
    const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
    const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

    if (!woocommerceUrl || !consumerKey || !consumerSecret) {
      return NextResponse.json(
        { error: 'Configuración de WooCommerce incompleta' },
        { status: 500 }
      );
    }

    // Search for coupon by code
    const url = new URL(`${woocommerceUrl}/wp-json/wc/v3/coupons`);
    url.searchParams.set('code', code);
    url.searchParams.set('consumer_key', consumerKey);
    url.searchParams.set('consumer_secret', consumerSecret);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error de WooCommerce:', errorText);

      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Cupón no encontrado', valid: false },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: 'Error al validar el cupón', valid: false },
        { status: response.status }
      );
    }

    const coupons = await response.json();

    // If no coupons found
    if (!coupons || coupons.length === 0) {
      return NextResponse.json(
        { error: 'Cupón no encontrado', valid: false },
        { status: 404 }
      );
    }

    const coupon = coupons[0];

    // Validate coupon expiration
    if (coupon.date_expires) {
      const expiryDate = new Date(coupon.date_expires);
      const now = new Date();

      if (expiryDate < now) {
        return NextResponse.json(
          { error: 'Este cupón ha expirado', valid: false },
          { status: 400 }
        );
      }
    }

    // Validate usage limit
    if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) {
      return NextResponse.json(
        { error: 'Este cupón ha alcanzado su límite de uso', valid: false },
        { status: 400 }
      );
    }

    // Return validated coupon data
    return NextResponse.json({
      valid: true,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        amount: coupon.amount,
        discount_type: coupon.discount_type,
        description: coupon.description,
        date_expires: coupon.date_expires,
        minimum_amount: coupon.minimum_amount,
        maximum_amount: coupon.maximum_amount,
        individual_use: coupon.individual_use,
        product_ids: coupon.product_ids,
        excluded_product_ids: coupon.excluded_product_ids,
        product_categories: coupon.product_categories,
        excluded_product_categories: coupon.excluded_product_categories,
        exclude_sale_items: coupon.exclude_sale_items,
        free_shipping: coupon.free_shipping,
      },
    });

  } catch (error) {
    console.error('Error validando cupón:', error);
    return NextResponse.json(
      {
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido',
        valid: false
      },
      { status: 500 }
    );
  }
}
