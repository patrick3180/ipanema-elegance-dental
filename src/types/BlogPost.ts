
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  publishedAt?: string;
  updatedAt?: string;
  imageUrl: string;
  category: string;
  categorySlug?: string;
  metaDescription?: string;
  tags: string[];
  
  // NOVOS CAMPOS
  quickAnswer?: string;
  keyTakeaways?: string[]; // Pontos-chave do artigo para AI Overview
  comparisonTable?: ComparisonTableItem[];
  faqStructured?: FAQItem[];
  peopleAlsoAsk?: PeopleAlsoAskSection;
  schemaType?: string;
  authorBio?: string;
  publishDate?: string;
}

// NOVAS INTERFACES
export interface ComparisonTableItem {
  Criterio: string;
  [key: string]: string; // Allow dynamic keys for flexible column names
}

export interface FAQItem {
  "@type": "Question";
  name: string;
  acceptedAnswer: {
    "@type": "Answer";
    text: string;
  };
}

export interface PeopleAlsoAskSection {
  questions: string[];
}
