
import { EntryFieldTypes } from 'contentful';

// Define Contentful content types
export interface BlogPostFields {
  title: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
  excerpt?: EntryFieldTypes.Text;
  content?: EntryFieldTypes.RichText;
  featuredImage?: EntryFieldTypes.AssetLink;
  category?: EntryFieldTypes.EntryLink<CategoryFields>;
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
