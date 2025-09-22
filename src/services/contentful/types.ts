
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
    
    // NOVOS CAMPOS
    resumo?: EntryFieldTypes.Text;
    conteudo?: EntryFieldTypes.RichText;
    quickAnswerBoquickAnswerBoxx?: EntryFieldTypes.Text;
    keyTakeaways?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    comparisonTable?: EntryFieldTypes.Object;
    faqStructured?: EntryFieldTypes.Object;
    peopleAlsoAsk?: EntryFieldTypes.Object;
    schemaType?: EntryFieldTypes.Text;
    authorBio?: EntryFieldTypes.Text;
    autor?: EntryFieldTypes.Text;
    dataDePublicacao?: EntryFieldTypes.Date;
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

// Enhanced helper function to extract localized field value with comprehensive locale handling
export function getLocalizedValue<T>(field: ContentfulFieldValue<T> | T | undefined): T | undefined {
  if (field === undefined || field === null) {
    console.log('getLocalizedValue: Field is undefined or null');
    return undefined;
  }
  
  // If it's a primitive value, return it directly
  if (typeof field !== 'object' || Array.isArray(field)) {
    console.log('getLocalizedValue: Returning primitive value');
    return field as T;
  }
  
  // If it's an object, check if it's a localized field
  const fieldObj = field as any;
  const keys = Object.keys(fieldObj);
  
  console.log(`getLocalizedValue: Processing object with keys: [${keys.join(', ')}]`);
  
  if (keys.length === 0) {
    console.log('getLocalizedValue: Empty object');
    return undefined;
  }
  
  // Check if this looks like a localized field (has locale-like keys)
  const hasLocaleKeys = keys.some(key => 
    key === DEFAULT_LOCALE || 
    key.includes('-') || 
    key.length === 2 || 
    key.length === 5
  );
  
  if (hasLocaleKeys) {
    console.log('getLocalizedValue: Detected localized field');
    
    // Priority order for locale fallback
    const localePriority = [
      DEFAULT_LOCALE, // pt-BR
      'pt-BR',
      'pt',
      'en-US', 
      'en',
      keys[0] // Fallback to first available
    ];
    
    for (const locale of localePriority) {
      if (locale in fieldObj && fieldObj[locale] !== null && fieldObj[locale] !== undefined) {
        console.log(`getLocalizedValue: Using locale: ${locale}`);
        return fieldObj[locale];
      }
    }
    
    // If still no value found, try the first non-null value
    for (const key of keys) {
      if (fieldObj[key] !== null && fieldObj[key] !== undefined) {
        console.log(`getLocalizedValue: Using fallback key: ${key}`);
        return fieldObj[key];
      }
    }
  } else {
    // Not a localized field - check if it has nested structure we need to handle
    console.log('getLocalizedValue: Non-localized object');
    
    // Handle special Contentful structures
    if (fieldObj.sys && fieldObj.fields) {
      console.log('getLocalizedValue: Detected Contentful entry structure');
      return field as T;
    }
    
    if (fieldObj.url || fieldObj.fileName) {
      console.log('getLocalizedValue: Detected file structure');
      return field as T;
    }
    
    // Return the object as-is for complex structures
    return field as T;
  }
  
  console.log('getLocalizedValue: No valid value found');
  return undefined;
}
