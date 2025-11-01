// src/app/api/wordpress/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://wp.servidentalcr.com/wp-json/wp/v2';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Build WordPress API URL with query parameters
    const params = new URLSearchParams();

    // Forward all query parameters to WordPress
    searchParams.forEach((value, key) => {
      params.append(key, value);
    });

    const wpUrl = `${WORDPRESS_API_URL}/posts?${params.toString()}`;

    console.log('[WordPress Proxy] Fetching:', wpUrl);

    const response = await fetch(wpUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 900 }, // Cache for 15 minutes
    });

    if (!response.ok) {
      console.error('[WordPress Proxy] Error:', response.status, response.statusText);
      return NextResponse.json(
        { error: `WordPress API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Forward WordPress headers (pagination info)
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    const totalPages = response.headers.get('X-WP-TotalPages');
    const total = response.headers.get('X-WP-Total');

    if (totalPages) headers.set('X-WP-TotalPages', totalPages);
    if (total) headers.set('X-WP-Total', total);

    console.log(`[WordPress Proxy] Success: ${data.length} posts fetched`);

    return NextResponse.json(data, { headers });

  } catch (error) {
    console.error('[WordPress Proxy] Fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts from WordPress' },
      { status: 500 }
    );
  }
}
