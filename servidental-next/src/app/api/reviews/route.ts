import { NextRequest, NextResponse } from 'next/server';
import { getProductReviews, getProductRatingSummary } from '@/server/wc';

// Cache en memoria simple (60 segundos)
interface CacheEntry {
  data: any;
  timestamp: number;
}

const reviewsCache = new Map<string, CacheEntry>();
const CACHE_TTL = 60 * 1000; // 60 segundos

function getCacheKey(productId: string, page: string): string {
  return `${productId}:${page}`;
}

function getFromCache(key: string): any | null {
  const cached = reviewsCache.get(key);
  if (!cached) return null;

  const now = Date.now();
  if (now - cached.timestamp > CACHE_TTL) {
    reviewsCache.delete(key);
    return null;
  }

  console.log(`[Reviews API] Cache HIT for ${key}`);
  return cached.data;
}

function setCache(key: string, data: any): void {
  reviewsCache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get('productId');
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('per_page') || '10';

    if (!productId) {
      return NextResponse.json(
        { error: 'productId is required' },
        { status: 400 }
      );
    }

    const productIdNum = parseInt(productId, 10);
    const pageNum = parseInt(page, 10);
    const perPageNum = parseInt(perPage, 10);

    if (isNaN(productIdNum) || isNaN(pageNum) || isNaN(perPageNum)) {
      return NextResponse.json(
        { error: 'Invalid parameters' },
        { status: 400 }
      );
    }

    const cacheKey = getCacheKey(productId, page);
    const cached = getFromCache(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    console.log(`[Reviews API] Fetching fresh data for product ${productId}, page ${page}`);

    // Obtener resumen y reviews en paralelo
    const [summary, reviewsResponse] = await Promise.all([
      getProductRatingSummary(productIdNum),
      getProductReviews(productIdNum, pageNum, perPageNum),
    ]);

    // Formatear reviews
    const formattedReviews = reviewsResponse.data.map((review: any) => ({
      id: review.id,
      rating: review.rating,
      review: review.review,
      verified: review.verified || false,
      date: review.date_created,
      reviewer: review.reviewer || 'Anónimo',
      reviewerAvatarUrl: review.reviewer_avatar_urls?.['96'] || null,
    }));

    const response = {
      summary: {
        average: summary.average,
        count: summary.count,
      },
      data: formattedReviews,
      page: pageNum,
      total_pages: reviewsResponse.pagination?.totalPages || 1,
      per_page: perPageNum,
    };

    setCache(cacheKey, response);

    return NextResponse.json(response);
  } catch (error) {
    console.error('[Reviews API] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch reviews',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
