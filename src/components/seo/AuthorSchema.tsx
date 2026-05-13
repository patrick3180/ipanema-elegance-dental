import { Helmet } from 'react-helmet-async';

/**
 * AuthorSchema — Person schema for Dra. Carla as a standalone entity.
 *
 * Renders a top-level Person JSON-LD with stable @id so other schemas
 * (BlogPosting, Article) can reference the author via @id instead of
 * duplicating the data inline. Improves E-E-A-T signals.
 *
 * The @id `https://dracarlachristoph.com/#author` is the canonical
 * identifier for Dra. Carla across the site.
 */
const AuthorSchema = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://dracarlachristoph.com/#author",
    "name": "Carla Christoph",
    "givenName": "Carla",
    "familyName": "Christoph",
    "honorificPrefix": "Dra.",
    "jobTitle": "Dentista Especialista em Prótese e Implantodontia",
    "description":
      "Especialista em Prótese Dentária e Implantodontia com mais de duas décadas de prática clínica em Ipanema, Rio de Janeiro. Formação inicial: 8 anos na Odontoclínica Central da Marinha do Brasil.",
    "image": "https://dracarlachristoph.com/lovable-uploads/dra-carla-perfil.jpg",
    "url": "https://dracarlachristoph.com/sobre",
    "telephone": "+552199330-4045",
    "email": "contato@dracarlachristoph.com",
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "professional license",
        "name": "CRO-RJ 27.509",
        "identifier": "27509",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Conselho Regional de Odontologia do Rio de Janeiro",
          "alternateName": "CRO-RJ",
          "url": "https://cro-rj.org.br"
        }
      }
    ],
    "knowsAbout": [
      "Prótese Dentária",
      "Implantodontia",
      "Reabilitação Oral",
      "Lentes de Contato Dental",
      "Facetas de Resina",
      "Clareamento Dental",
      "Restaurações Estéticas",
      "Odontologia Estética"
    ],
    "memberOf": {
      "@type": "Organization",
      "@id": "https://dracarlachristoph.com/#organization"
    },
    "worksFor": {
      "@type": "Organization",
      "@id": "https://dracarlachristoph.com/#localbusiness"
    },
    "workLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Rua Visconde de Pirajá, 550 - Sala 1107",
        "addressLocality": "Ipanema",
        "addressRegion": "RJ",
        "postalCode": "22410-901",
        "addressCountry": "BR"
      }
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
    </Helmet>
  );
};

export default AuthorSchema;
