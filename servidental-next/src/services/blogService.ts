import { 
  BlogPost, 
  BlogConfig, 
  BlogPostsResponse, 
  BlogSearchParams, 
  BlogCategory 
} from '@/types/blog';

// Use local API proxy to avoid CORS issues
// For server-side rendering, we need absolute URLs
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use relative URLs
    return '';
  }
  // Server-side: use absolute URL
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';
};

const WP_POSTS_API = `${getBaseUrl()}/api/wordpress/posts`;
const WP_BLOG_CONFIG_API = `${getBaseUrl()}/api/wordpress/blog-config`;
const WP_CATEGORIES_API = `${getBaseUrl()}/api/wordpress/categories`;

// Development mode check
const isDevelopment = process.env.NODE_ENV === 'development';

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

class BlogCache {
  private cache = new Map<string, CacheItem<any>>();

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

const cache = new BlogCache();

class BlogService {
  private async fetchWithErrorHandling<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors', // Explicitly set CORS mode
        cache: 'no-cache' // Avoid caching issues during development
      });

      if (!response.ok) {
        throw new BlogError(
          `Error HTTP: ${response.status} - ${response.statusText}`,
          response.status
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Blog API Error:', error);
      
      if (error instanceof BlogError) {
        throw error;
      }
      
      // Handle different types of fetch errors
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new BlogError(
          'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
          0,
          'NETWORK_ERROR'
        );
      }
      
      throw new BlogError(
        error instanceof Error ? error.message : 'Error al cargar el contenido del blog',
        500,
        'UNKNOWN_ERROR'
      );
    }
  }

  async fetchPosts(params: BlogSearchParams = {}): Promise<BlogPostsResponse> {
    const {
      page = 1,
      category,
      search,
      per_page = 12
    } = params;

    const cacheKey = `posts-${JSON.stringify(params)}`;
    const cached = cache.get<BlogPostsResponse>(cacheKey);
    if (cached) return cached;

    try {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        per_page: per_page.toString(),
        _embed: 'true',
        status: 'publish'
      });

      if (category) {
        searchParams.append('categories', category);
      }

      if (search) {
        searchParams.append('search', search);
      }

      const url = `${WP_POSTS_API}?${searchParams}`;
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        cache: 'no-cache'
      });

      if (!response.ok) {
        throw new BlogError(
          `Error al cargar las publicaciones: ${response.status} - ${response.statusText}`,
          response.status
        );
      }

      const posts: any[] = await response.json();
      const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0');
      const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');

      const formattedPosts: BlogPost[] = await Promise.all(posts.map(post => this.formatPost(post)));

      const result: BlogPostsResponse = {
        posts: formattedPosts,
        total: totalPosts,
        totalPages,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      };

      cache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Error fetching posts:', error);
      
      if (error instanceof BlogError) {
        throw error;
      }
      
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new BlogError(
          'No se pudo conectar con el servidor del blog. Verifica tu conexión a internet.',
          0,
          'NETWORK_ERROR'
        );
      }
      
      throw new BlogError('Error al cargar las publicaciones del blog');
    }
  }

  async fetchPostBySlug(slug: string): Promise<BlogPost | null> {
    const cacheKey = `post-${slug}`;
    const cached = cache.get<BlogPost>(cacheKey);
    if (cached) return cached;

    try {
      const url = `${WP_POSTS_API}?slug=${slug}&_embed=true&status=publish`;
      const posts: any[] = await this.fetchWithErrorHandling(url);

      if (posts.length === 0) {
        return null;
      }

      const post = await this.formatPost(posts[0]);
      cache.set(cacheKey, post);
      return post;
    } catch (error) {
      console.error('Error fetching post by slug:', error);
      throw new BlogError('Error al cargar la publicación');
    }
  }

  async fetchBlogConfig(): Promise<BlogConfig> {
    const cacheKey = 'blog-config';
    const cached = cache.get<BlogConfig>(cacheKey);
    if (cached) return cached;

    try {
      // Try custom API first
      const config = await this.fetchWithErrorHandling<BlogConfig>(WP_BLOG_CONFIG_API);
      
      if (!config) {
        throw new Error('Empty config response');
      }

      cache.set(cacheKey, config);
      return config;
    } catch (error) {
      console.warn('Custom blog config API failed, using fallback:', error);
      
      // Fall back to creating config from standard WP API
      try {
        const fallbackConfig = await this.createFallbackConfig();
        cache.set(cacheKey, fallbackConfig);
        return fallbackConfig;
      } catch (fallbackError) {
        console.error('Fallback config creation failed:', fallbackError);
        
        // Return minimal working config
        const minimalConfig: BlogConfig = {
          site_name: 'Blog ServiDental',
          site_description: 'Noticias, artículos y novedades',
          posts_per_page: 12,
          categories: [],
          recent_posts: []
        };
        
        cache.set(cacheKey, minimalConfig);
        return minimalConfig;
      }
    }
  }

  async fetchCategories(): Promise<BlogCategory[]> {
    const cacheKey = 'categories';
    const cached = cache.get<BlogCategory[]>(cacheKey);
    if (cached) return cached;

    try {
      const categories: any[] = await this.fetchWithErrorHandling(WP_CATEGORIES_API);
      
      const formattedCategories: BlogCategory[] = categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        count: cat.count
      }));

      cache.set(cacheKey, formattedCategories);
      return formattedCategories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  async searchPosts(query: string, page: number = 1): Promise<BlogPostsResponse> {
    return this.fetchPosts({ search: query, page });
  }

  private async formatPost(post: any): Promise<BlogPost> {
    // Calculate reading time (assuming 200 words per minute)
    const wordCount = post.content?.rendered 
      ? post.content.rendered.replace(/<[^>]*>/g, '').split(/\s+/).length 
      : 0;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    // Extract featured image
    let featuredImageUrl = null;
    if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      featuredImageUrl = post._embedded['wp:featuredmedia'][0].source_url;
    }

    // Extract author details
    const author = post._embedded?.author?.[0];
    const authorDetails = {
      name: author?.name || 'ServiDental',
      bio: author?.description || '',
      avatar: author?.avatar_urls?.['96'] || ''
    };

    // Extract plain text excerpt
    const excerptPlain = post.excerpt?.rendered 
      ? post.excerpt.rendered.replace(/<[^>]*>/g, '').trim()
      : '';

    // Extract SEO data
    const seoData = await this.extractSEOData(post);

    return {
      id: post.id,
      title: post.title || { rendered: '' },
      content: post.content || { rendered: '' },
      excerpt: post.excerpt || { rendered: '' },
      excerpt_plain: excerptPlain,
      slug: post.slug,
      date: post.date,
      modified: post.modified,
      author_details: authorDetails,
      featured_image_url: featuredImageUrl,
      categories: post.categories || [],
      tags: post.tags || [],
      reading_time: readingTime,
      link: post.link,
      status: post.status,
      seo: seoData
    };
  }

  private async extractSEOData(post: any): Promise<any> {
    try {
      const slug = post.slug;
      const wpUrl = `https://wp.servidentalcr.com/${slug}/`;
      const rankmathUrl = `https://wp.servidentalcr.com/wp-json/rankmath/v1/getHead?url=${encodeURIComponent(wpUrl)}`;
      const response = await fetch(rankmathUrl);
      const data = await response.json();
      
      if (data.success && data.head && !data.head.includes('Page Not Found')) {
        const head = data.head;
        
        const ogTitleMatch = head.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i);
        const title = ogTitleMatch ? ogTitleMatch[1] : '';
        
        const descMatch = head.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
        const description = descMatch ? descMatch[1] : '';
        
        const schemaMatch = head.match(/"keywords":"([^"]+)"/i);
        const keywords = schemaMatch ? schemaMatch[1] : '';
        
        const canonical = `https://servidentalcr.com/blog/${slug}`;
        
        return {
          title,
          description,
          keywords,
          canonical,
        };
      }
    } catch (error) {
      console.warn('Error obteniendo SEO de RankMath:', error);
    }
    
    return {
      title: post.title?.rendered || '',
      description: post.excerpt_plain || '',
      keywords: '',
      canonical: `https://servidentalcr.com/blog/${post.slug}`,
    };
  }

  private async createFallbackConfig(): Promise<BlogConfig> {
    try {
      const [categoriesResponse, recentPostsResponse] = await Promise.all([
        this.fetchCategories(),
        this.fetchPosts({ per_page: 5 })
      ]);

      return {
        site_name: 'Blog ServiDental',
        site_description: 'Noticias, artículos y novedades',
        posts_per_page: 12,
        categories: categoriesResponse,
        recent_posts: recentPostsResponse.posts
      };
    } catch (error) {
      return {
        site_name: 'Blog ServiDental',
        site_description: 'Noticias, artículos y novedades',
        posts_per_page: 12,
        categories: [],
        recent_posts: []
      };
    }
  }

  clearCache(): void {
    cache.clear();
  }

  // Test method to check API connectivity
  async testConnection(): Promise<{ wp_api: boolean; custom_api: boolean; error?: string }> {
    const results = { wp_api: false, custom_api: false, error: undefined as string | undefined };
    
    try {
      // Test WP API
      const wpResponse = await fetch(`${WP_API_BASE}/posts?per_page=1`, {
        method: 'HEAD',
        mode: 'cors'
      });
      results.wp_api = wpResponse.ok;
    } catch (error) {
      results.error = `WP API error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
    
    try {
      // Test Custom API
      const customResponse = await fetch(`${CUSTOM_API_BASE}/blog-config`, {
        method: 'HEAD',
        mode: 'cors'
      });
      results.custom_api = customResponse.ok;
    } catch (error) {
      if (!results.error) {
        results.error = `Custom API error: ${error instanceof Error ? error.message : 'Unknown error'}`;
      }
    }
    
    return results;
  }
}

// Create and export singleton instance
export const blogService = new BlogService();

// Export error class for use in components
export class BlogError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'BlogError';
  }
}