export interface LandingPageConfig {
  campaign: string;
  
  // Hero Section
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    backgroundImage?: string;
    videoUrl?: string;
  };
  
  // Benefits/Features
  benefits: string[];
  
  // Problem Section
  problem: {
    title: string;
    description: string;
    problems: string[];
  };
  
  // Guide Section
  guide: {
    title: string;
    subtitle: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
      icon?: string;
    }>;
  };
  
  // Social Proof
  socialProof: {
    title: string;
    testimonials: Array<{
      name: string;
      text: string;
      avatar?: string;
      rating?: number;
    }>;
    stats?: Array<{
      number: string;
      label: string;
    }>;
  };
  
  // Process Section
  process: {
    title: string;
    subtitle: string;
    steps: Array<{
      title: string;
      description: string;
      image?: string;
    }>;
  };
  
  // FAQ
  faq: {
    title: string;
    questions: Array<{
      question: string;
      answer: string;
    }>;
  };
  
  // CTA Section
  cta: {
    title: string;
    subtitle: string;
    buttonText: string;
    urgency?: string;
  };
  
  // Contact Info
  contact: {
    whatsappNumber: string;
    whatsappMessage: string;
    doctorName: string;
    clinicName: string;
  };
  
  // SEO
  seo: {
    title: string;
    description: string;
    keywords?: string[];
  };
  
  // Tracking
  tracking: {
    gtagId?: string;
    gtmId?: string;
    facebookPixelId?: string;
  };
}