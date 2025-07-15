export interface BlogAuthor {
  name: string;
  bio: string;
  avatar: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  excerpt_plain: string;
  slug: string;
  date: string;
  modified: string;
  author_details: BlogAuthor;
  featured_image_url: string | null;
  categories: number[];
  tags: number[];
  reading_time: number;
  link: string;
  status: string;
}

export interface BlogConfig {
  site_name: string;
  site_description: string;
  posts_per_page: number;
  categories: BlogCategory[];
  recent_posts: BlogPost[];
}

export interface BlogPostsResponse {
  posts: BlogPost[];
  total: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface BlogSearchParams {
  page?: number;
  category?: string;
  search?: string;
  per_page?: number;
}

export interface BlogError {
  message: string;
  status?: number;
  code?: string;
}