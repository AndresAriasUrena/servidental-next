// src/app/api/wordpress/blog-config/route.ts
import { NextResponse } from 'next/server';

const WORDPRESS_CUSTOM_API = process.env.WORDPRESS_BASE_URL
  ? `${process.env.WORDPRESS_BASE_URL}/wp-json/servidental/v1`
  : 'https://wp.servidentalcr.com/wp-json/servidental/v1';

export async function GET() {
  try {
    const wpUrl = `${WORDPRESS_CUSTOM_API}/blog-config`;

    console.log('[WordPress Proxy] Fetching blog config:', wpUrl);

    const response = await fetch(wpUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('[WordPress Proxy] Blog config error:', response.status);

      // Return default config if WordPress endpoint fails
      const defaultConfig = {
        postsPerPage: 12,
        enableCategories: true,
        enableSearch: true,
        blogTitle: 'Blog ServiDental',
        blogDescription: 'Noticias y artículos sobre equipos médicos dentales'
      };

      return NextResponse.json(defaultConfig);
    }

    const data = await response.json();
    console.log('[WordPress Proxy] Blog config success');

    return NextResponse.json(data);

  } catch (error) {
    console.error('[WordPress Proxy] Blog config fetch error:', error);

    // Return default config on error
    const defaultConfig = {
      postsPerPage: 12,
      enableCategories: true,
      enableSearch: true,
      blogTitle: 'Blog ServiDental',
      blogDescription: 'Noticias y artículos sobre equipos médicos dentales'
    };

    return NextResponse.json(defaultConfig);
  }
}
