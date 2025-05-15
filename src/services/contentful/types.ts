import { EntryFieldTypes, EntrySkeletonType } from 'contentful';

// Define Contentful content types that properly extend EntrySkeletonType
export interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: 'blogCarla';
  fields: {
    title: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    excerpt?: EntryFieldTypes.Text;
    content?: EntryFieldTypes.RichText;
    featuredImage?: EntryFieldTypes.AssetLink;
    category?: EntryFieldTypes.EntryLink<CategorySkeleton>;
    author?: EntryFieldTypes.Text;
    publishDate?: EntryFieldTypes.Date;
    metaDescription?: EntryFieldTypes.Text;
    tags?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  };
}

export interface CategorySkeleton extends EntrySkeletonType {
  contentTypeId: 'categoria';
  fields: {
    name: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
  };
}

// For backwards compatibility - we'll keep these but not use them as type arguments
export interface BlogPostFields {
  title: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
  excerpt?: EntryFieldTypes.Text;
  content?: EntryFieldTypes.RichText;
  featuredImage?: EntryFieldTypes.AssetLink;
  category?: EntryFieldTypes.EntryLink<CategorySkeleton>;
  author?: EntryFieldTypes.Text;
  publishDate?: EntryFieldTypes.Date;
  metaDescription?: EntryFieldTypes.Text;
  tags?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
}

export interface CategoryFields {
  name: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
}

export interface ContentfulAsset {
  sys: {
    id: string;
  };
  fields: {
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
    };
    title: string;
    description: string;
  };
}

// Extended entry type for the transformations
export interface ExtendedBlogPostEntry {
  sys: {
    id: string;
  };
  fields: BlogPostSkeleton['fields'] & {
    categoryName?: string;
    categorySlug?: string;
    imageUrl?: string;
  };
}
