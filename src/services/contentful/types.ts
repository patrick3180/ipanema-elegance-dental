
import { Asset, Entry, EntryFieldTypes, EntrySkeletonType } from 'contentful';
import { Document } from '@contentful/rich-text-types';
import { DEFAULT_LOCALE } from './client';

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

// Helper types for working with raw entry data
export type ContentfulFieldValue<T> = { [locale: string]: T };
export type ContentfulRichText = ContentfulFieldValue<Document>;

// Helper function to extract localized field value with improved locale handling
export function getLocalizedValue<T>(field: ContentfulFieldValue<T> | T | undefined): T | undefined {
  if (field === undefined || field === null) {
    return undefined;
  }
  
  // If it's an object with locale keys
  if (typeof field === 'object' && field !== null && !Array.isArray(field)) {
    // Check if it looks like a localized field (has locale keys)
    const keys = Object.keys(field as object);
    
    if (keys.length > 0) {
      // Try default locale first
      if (DEFAULT_LOCALE in (field as any)) {
        return (field as any)[DEFAULT_LOCALE];
      }
      
      // Fallback to other common locales
      for (const locale of ['pt-BR', 'en-US', keys[0]]) {
        if (locale in (field as any)) {
          return (field as any)[locale];
        }
      }
      
      // If we didn't find any of our expected locales but we have keys,
      // just use the first key as a fallback
      if (keys.length > 0) {
        const firstKey = keys[0];
        return (field as any)[firstKey];
      }
    }
  }
  
  // Return as is if not a localized field
  return field as T;
}
