import { Helmet } from 'react-helmet-async';

/**
 * GlobalSchemas - Organization + LocalBusiness structured data
 *
 * SEO IMPACT:
 * - Enables Google Knowledge Panel with logo, contact info, reviews
 * - Shows business hours, phone, location in search results
 * - Improves local SEO for "dentista Ipanema" searches
 * - Displays star ratings in Google Search
 *
 * CRITICAL for SEO Audit Score (was missing - Issue #1)
 */
const GlobalSchemas = () => {
  // Organization Schema - Brand identity, logo, social profiles
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://dracarlachristoph.com/#organization",
    "name": "Dra. Carla Christoph - Dentista em Ipanema",
    "alternateName": "Clínica Dra. Carla Christoph",
    "url": "https://dracarlachristoph.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://dracarlachristoph.com/og-image.jpg",
      "width": 1200,
      "height": 630
    },
    "image": "https://dracarlachristoph.com/og-image.jpg",
    "description": "Dentista especialista em Ipanema, Rio de Janeiro. Odontologia estética, implantes dentários, prótese dental e reabilitação oral com atenção personalizada e mais de 20 anos de experiência.",
    "email": "contato@dracarlachristoph.com",
    "telephone": "+552199330-4045",
    "sameAs": [
      "https://instagram.com/dracarlachristoph",
      "https://wa.me/5521993304045",
      "https://www.facebook.com/dracarlachristoph"
    ],
    "founder": {
      "@type": "Person",
      "name": "Carla Christoph",
      "jobTitle": "Dentista Especialista",
      "description": "Dentista com mais de 20 anos de experiência, especialista em odontologia estética e reabilitação oral. 8 anos de experiência na Marinha do Brasil.",
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Universidade Federal do Rio de Janeiro"
      }
    }
  };

  // LocalBusiness Schema - Local SEO, Google Maps, business hours
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["Dentist", "LocalBusiness", "MedicalBusiness"],
    "@id": "https://dracarlachristoph.com/#localbusiness",
    "name": "Dra. Carla Christoph",
    "image": "https://dracarlachristoph.com/og-image.jpg",
    "url": "https://dracarlachristoph.com",
    "telephone": "+552199330-4045",
    "email": "contato@dracarlachristoph.com",
    "priceRange": "$$-$$$",

    // Address & Location
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Visconde de Pirajá",
      "addressLocality": "Ipanema",
      "addressRegion": "RJ",
      "postalCode": "22410-000",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -22.9868,
      "longitude": -43.2005
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": -22.9868,
        "longitude": -43.2005
      },
      "geoRadius": "10000" // 10km radius
    },

    // Business hours
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "14:00"
      }
    ],

    // Ratings & Reviews (Real data from Google)
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "23",
      "bestRating": "5",
      "worstRating": "1"
    },

    // Services offered
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços Odontológicos",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Clareamento Dental",
            "description": "Clareamento dental profissional com tecnologia avançada"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Implantes Dentários",
            "description": "Implantes dentários com tecnologia de ponta"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Lentes de Contato Dental",
            "description": "Lentes de contato dental e facetas de porcelana"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Prótese Dentária",
            "description": "Prótese fixa, removível e protocolo sobre implantes"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Saúde Gengival",
            "description": "Tratamento periodontal e saúde das gengivas"
          }
        }
      ]
    },

    // Payment methods
    "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "Bank Transfer"],

    // Additional properties
    "currenciesAccepted": "BRL",
    "slogan": "Odontologia estética com atenção personalizada em Ipanema",
    "foundingDate": "2003",
    "knowsAbout": [
      "Odontologia Estética",
      "Implantodontia",
      "Prótese Dentária",
      "Periodontia",
      "Clareamento Dental",
      "Lentes de Contato Dental",
      "Facetas de Porcelana",
      "Reabilitação Oral"
    ]
  };

  return (
    <Helmet>
      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* LocalBusiness Schema */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
};

export default GlobalSchemas;
