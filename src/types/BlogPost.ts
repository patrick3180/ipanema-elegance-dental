
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  category: string;
  categorySlug?: string;
  metaDescription?: string;
  tags: string[];
}
