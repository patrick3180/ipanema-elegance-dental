
import React from 'react';

export interface FAQ {
  question: string;
  answer: string;
}

export interface Step {
  title: string;
  description: string;
}

export type SectionContent = string | React.ReactNode | string[] | Step[];

export interface TreatmentSection {
  id: string;
  title: string;
  content: SectionContent;
  type: "default" | "benefits" | "steps" | "faq";
  imageUrl?: string;
}

export interface TreatmentPageProps {
  slug: string;
  title: string;
  metaDescription: string;
  introduction: string;
  sections: TreatmentSection[];
  faqs?: FAQ[];
  whatsappMessage?: string;
  ctaHeading?: string;
}
