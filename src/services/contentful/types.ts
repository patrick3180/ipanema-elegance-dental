
import { EntryFieldTypes, EntrySkeletonType, Asset, AssetLink, ChainModifiers, Entry, EntryLink, RichTextDocument } from 'contentful';

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

// For extended entry with related content
export interface ExtendedBlogPostEntry extends Entry<BlogPostSkeleton> {
  fields: BlogPostSkeleton['fields'] & {
    categoryName?: string;
    categorySlug?: string;
    imageUrl?: string;
  };
}

// Type for Contentful assets
export interface ContentfulAsset extends Asset {
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

// Helper types for working with raw entry data
export type ContentfulFieldValue<T> = { [locale: string]: T };
export type ContentfulRichText = ContentfulFieldValue<RichTextDocument>;
