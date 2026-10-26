/**
 * Identidade do consultório e da Dra. Carla no JSON-LD — FONTE ÚNICA.
 *
 * Por que existe (26/10/2026, estudo da homônima):
 * existe uma médica com o MESMO nome — Dra. Carla Christoph, dermatologista
 * e nutróloga (CRM), na Visconde de Pirajá 547 — e ela divide a 1ª página da
 * busca pelo nome. O que separa as duas para o Google é o CRO, a profissão e
 * os perfis oficiais. Até esta data o site descrevia a Dra. Carla em 4 blocos
 * soltos, sem @id comum, com o CRO só no autor do blog, `sameAs` apontando
 * para o WhatsApp, 3 grafias do nome do consultório e 7 coordenadas
 * diferentes nas páginas — todas erradas, uma a ~1,2 km do consultório.
 *
 * Regras:
 *  - Toda página que descreve o consultório usa `'@id': CLINIC_ID`; toda que
 *    descreve a Dra. Carla usa `PERSON` (ou ao menos `'@id': PERSON_ID`).
 *    O @id só une entidades DENTRO da página — por isso o nó da pessoa vai
 *    completo onde ela aparece, e não só a referência.
 *  - Coordenada = a do Perfil da Empresa no Google (feature id
 *    0x9bd5070f90d87f:0x446370e6f29c86c4). `tests/clinicIdentity.test.ts`
 *    reprova qualquer página com outra.
 *  - Nunca citar a homônima (BRAND §7). A desambiguação é pelo que a Dra.
 *    Carla É, não pelo que a outra é.
 */
import { GOOGLE_PROFILE_URL } from './googleBusiness.ts';

export const SITE_URL = 'https://dracarlachristoph.com';

/** O mesmo @id que as LPs já usavam desde antes desta fonte única — não trocar. */
export const CLINIC_ID = `${SITE_URL}/#dentist`;
export const PERSON_ID = `${SITE_URL}/#dra-carla`;

/** Nome único do consultório (o do perfil do Google, sem o descritor). */
export const CLINIC_NAME = 'Dra. Carla Christoph';

export const CLINIC_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Rua Visconde de Pirajá, 550 - Sala 1107',
  addressLocality: 'Ipanema',
  addressRegion: 'RJ',
  postalCode: '22410-901',
  addressCountry: 'BR',
} as const;

/** Mesma coordenada do pin do Perfil da Empresa no Google. */
export const CLINIC_GEO = {
  '@type': 'GeoCoordinates',
  latitude: -22.9836633,
  longitude: -43.2116873,
} as const;

export const INSTAGRAM_URL = 'https://www.instagram.com/dracarlachristoph/';
export const FACEBOOK_URL = 'https://www.facebook.com/dracarlachristoph/';

/** Perfis oficiais do consultório. WhatsApp não entra: não é perfil de identidade. */
export const CLINIC_SAME_AS = [GOOGLE_PROFILE_URL, INSTAGRAM_URL, FACEBOOK_URL];

export const CRO_IDENTIFIER = {
  '@type': 'PropertyValue',
  propertyID: 'CRO-RJ',
  value: '27.509',
} as const;

/** Referência leve ao consultório, para `worksFor`. */
export const CLINIC_REF = {
  '@type': 'Dentist',
  '@id': CLINIC_ID,
  name: CLINIC_NAME,
  url: SITE_URL,
  address: CLINIC_ADDRESS,
} as const;

/** A Dra. Carla — nó completo, igual em todas as páginas. */
export const PERSON = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Carla Christoph',
  alternateName: 'Dra. Carla Christoph',
  honorificPrefix: 'Dra.',
  jobTitle: 'Cirurgiã-Dentista',
  disambiguatingDescription:
    'Cirurgiã-dentista (CRO-RJ 27.509), especialista em Prótese Dentária e Implantodontia, com consultório em Ipanema, Rio de Janeiro.',
  identifier: CRO_IDENTIFIER,
  url: `${SITE_URL}/sobre`,
  image: `${SITE_URL}/lovable-uploads/b1c1cbdb-bde0-4d9e-912e-74cf74cf716d.png`,
  sameAs: [INSTAGRAM_URL, FACEBOOK_URL],
  worksFor: CLINIC_REF,
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Registro profissional',
      name: 'CRO-RJ 27.509',
      recognizedBy: { '@type': 'Organization', name: 'Conselho Regional de Odontologia do Rio de Janeiro' },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Especialização Odontológica',
      name: 'Especialista em Prótese Dentária',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Especialização Odontológica',
      name: 'Especialista em Implantodontia',
    },
  ],
} as const;
