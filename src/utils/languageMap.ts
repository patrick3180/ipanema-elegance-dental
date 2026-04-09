/**
 * Language Map — Context-aware language switching between PT and EN pages.
 * 
 * Used by:
 * - PT Header language switcher → sends user to the equivalent EN page
 * - EN Header language switcher → sends user to the equivalent PT page
 * - EnFooter "Versão em Português" link
 * 
 * If a page has no equivalent, falls back to / (PT home) or /en (EN home).
 */

interface LanguageRoute {
  pt: string;
  en: string;
}

const languageRoutes: LanguageRoute[] = [
  // Core pages
  { pt: "/", en: "/en" },
  { pt: "/sobre", en: "/en/about" },
  { pt: "/contato", en: "/en/contact" },

  // Service pages
  { pt: "/implantes-dentarios", en: "/en/dental-implants" },
  { pt: "/lentes-de-contato-dental-e-facetas-de-resina", en: "/en/veneers-and-lenses" },
  { pt: "/clinica-geral-e-prevencao", en: "/en/general-dentistry" },
  { pt: "/clareamento-dental", en: "/en/teeth-whitening" },
  { pt: "/protese-dentaria", en: "/en/dental-prosthetics" },

  // Emergency
  { pt: "/emergencia-odontologica", en: "/en/dental-emergency" },

  // Service pages with EN equivalent (future)
  { pt: "/ortodontia", en: "/en/orthodontics" },
  { pt: "/tratamento-de-canal", en: "/en/root-canal" },
  { pt: "/restauracao-dental", en: "/en/dental-restorations" },
  { pt: "/saude-da-gengiva", en: "/en/gum-health" },
];

/**
 * Get the equivalent page in the target language.
 * 
 * @param currentPath - The current page path (e.g., "/sobre" or "/en/about")
 * @param targetLang - The language to switch to ("pt" or "en")
 * @returns The equivalent path in the target language, or the default home page
 * 
 * @example
 * getEquivalentPath("/sobre", "en") → "/en/about"
 * getEquivalentPath("/en/dental-implants", "pt") → "/implantes-dentarios"
 * getEquivalentPath("/unknown-page", "en") → "/en"
 */
export const getEquivalentPath = (
  currentPath: string,
  targetLang: "pt" | "en"
): string => {
  const sourceLang = targetLang === "en" ? "pt" : "en";
  
  // Normalize path: remove trailing slashes
  const normalizedPath = currentPath.replace(/\/+$/, "") || "/";
  
  // Find matching route
  const match = languageRoutes.find(
    (route) => route[sourceLang] === normalizedPath
  );

  if (match) {
    return match[targetLang];
  }

  // Fallback to home page of target language
  return targetLang === "en" ? "/en" : "/";
};

/**
 * Check if a PT page has an EN equivalent available.
 * Useful for conditionally showing the language switcher.
 * 
 * @param ptPath - The Portuguese page path
 * @returns true if an EN page exists for this PT path
 */
export const hasEnglishVersion = (ptPath: string): boolean => {
  const normalizedPath = ptPath.replace(/\/+$/, "") || "/";
  return languageRoutes.some((route) => route.pt === normalizedPath);
};

/**
 * Check if an EN page has a PT equivalent available.
 * 
 * @param enPath - The English page path
 * @returns true if a PT page exists for this EN path
 */
export const hasPortugueseVersion = (enPath: string): boolean => {
  const normalizedPath = enPath.replace(/\/+$/, "") || "/";
  return languageRoutes.some((route) => route.en === normalizedPath);
};

export default languageRoutes;
