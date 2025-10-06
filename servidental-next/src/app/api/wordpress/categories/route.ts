// src/app/api/wordpress/categories/route.ts
import { NextResponse } from 'next/server';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://wp.servidentalcr.com/wp-json/wp/v2';

export async function GET() {
  try {
    const wpUrl = `${WORDPRESS_API_URL}/categories`;

    console.log('[WordPress Proxy] Fetching categories:', wpUrl);

    const response = await fetch(wpUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('[WordPress Proxy] Categories error:', response.status);
      return NextResponse.json([], { status: response.status });
    }

    const data = await response.json();
    console.log(`[WordPress Proxy] Success: ${data.length} categories fetched`);

    return NextResponse.json(data);

  } catch (error) {
    console.error('[WordPress Proxy] Categories fetch error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
