
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonicalUrl?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  articleTags?: string[];
  noIndex?: boolean;
  structuredData?: any;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords = "dentista Ipanema, clínica odontológica Ipanema, odontologia estética, implantes dentários, clareamento dental, lentes de contato dental, facetas de porcelana, Dra. Carla Christoph",
  ogImage = "https://dracarlachristoph.com/og-image.jpg",
  ogType = "website",
  canonicalUrl,
  author = "Dra. Carla Christoph",
  publishedTime,
  modifiedTime,
  articleTags,
  noIndex = false,
  structuredData
}) => {
  // Normalize canonical URL to always use .com domain
  const normalizeUrl = (url: string) => {
    if (!url) return url;
    return url.replace(/https?:\/\/[^\/]+/, 'https://dracarlachristoph.com');
  };

  const currentUrl = canonicalUrl || normalizeUrl(window.location.href);
  
  // Default structured data for the dental clinic
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": "Dra. Carla Christoph",
    "url": "https://dracarlachristoph.com",
    "logo": "https://dracarlachristoph.com/og-image.jpg",
    "image": "https://dracarlachristoph.com/og-image.jpg",
    "description": "Dentista especialista em Ipanema, Rio de Janeiro. Odontologia estética, implantes dentários, prótese dental e reabilitação oral com mais de 20 anos de experiência.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Visconde de Pirajá, Ipanema",
      "addressLocality": "Rio de Janeiro",
      "addressRegion": "RJ",
      "postalCode": "22410-000",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-22.9868",
      "longitude": "-43.2005"
    },
    "telephone": "+55 21 99330-4045",
    "email": "contato@dracarlachristoph.com",
    "priceRange": "$$",
    "openingHours": [
      "Mo-Fr 08:00-18:00",
      "Sa 08:00-14:00"
    ],
    "sameAs": [
      "https://instagram.com/dracarlachristoph",
      "https://wa.me/5521993304045"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços Odontológicos",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Implantes Dentários",
            "description": "Implantes dentários em Ipanema com especialista",
            "provider": {
              "@type": "Dentist",
              "name": "Dra. Carla Christoph"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Lentes de Contato Dental",
            "description": "Lentes de contato dental e facetas de porcelana",
            "provider": {
              "@type": "Dentist",
              "name": "Dra. Carla Christoph"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Clareamento Dental",
            "description": "Clareamento dental profissional",
            "provider": {
              "@type": "Dentist",
              "name": "Dra. Carla Christoph"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Prótese Dentária",
            "description": "Prótese dentária fixa e removível",
            "provider": {
              "@type": "Dentist",
              "name": "Dra. Carla Christoph"
            }
          }
        }
      ]
    }
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={noIndex ? "noindex,nofollow" : "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1"} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="language" content="pt-BR" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content="0k2ILA3P_ahn1P6bl8bGpiSLJBcIYTaia47XPl0c3AQ" />
      <meta name="google-site-verification" content="mufiI1fRvsBjdZpIg6V7PCLlw12pjd4d-zd5dzoIkN8" />
      
      {/* Canonical URL - Always use normalized .com URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="Dra. Carla Christoph - Dentista em Ipanema" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@dracarlachristoph" />
      <meta name="twitter:creator" content="@dracarlachristoph" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Article specific meta tags */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {ogType === 'article' && articleTags && articleTags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#8B4513" />
      <meta name="msapplication-TileColor" content="#8B4513" />
      <meta name="application-name" content="Dra. Carla Christoph" />
      <meta name="apple-mobile-web-app-title" content="Dra. Carla Christoph" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Geographic meta tags for local SEO */}
      <meta name="geo.region" content="BR-RJ" />
      <meta name="geo.placename" content="Ipanema, Rio de Janeiro" />
      <meta name="geo.position" content="-22.9868;-43.2005" />
      <meta name="ICBM" content="-22.9868, -43.2005" />
      
      {/* Language alternatives */}
      <link rel="alternate" hrefLang="pt-br" href={currentUrl} />
      <link rel="alternate" hrefLang="x-default" href={currentUrl} />
      
      {/* DNS prefetch for performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      
      {/* Preconnect for critical resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEOHead;
