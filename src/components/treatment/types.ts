
import React from 'react';

export interface FAQ {
  question: string;
  answer: string;
}

export interface TreatmentSection {
  id: string;
  title: string;
  content: string | React.ReactNode | string[] | { title: string; description: string }[];
  type: "default" | "benefits" | "steps" | "faq";
}

export interface TreatmentPageProps {
  slug: string;
  title: string;
  metaDescription: string;
  introduction: string;
  sections: TreatmentSection[];
  faqs?: FAQ[];
  whatsappMessage?: string;
}
