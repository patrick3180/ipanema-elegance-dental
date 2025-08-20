
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOMetrics {
  pageTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  hasH1: boolean;
  h1Count: number;
  imageCount: number;
  imagesWithoutAlt: number;
  internalLinks: number;
  externalLinks: number;
  pageLoadTime: number;
  contentLength: number;
  keywordDensity: { [key: string]: number };
}

export const useSEOMonitoring = () => {
  const [metrics, setMetrics] = useState<SEOMetrics | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const location = useLocation();

  const analyzePageSEO = () => {
    setIsAnalyzing(true);
    
    try {
      // Get basic page information
      const pageTitle = document.title;
      const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      const canonicalUrl = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
      
      // Analyze heading structure
      const h1Elements = document.querySelectorAll('h1');
      const hasH1 = h1Elements.length > 0;
      const h1Count = h1Elements.length;
      
      // Analyze images
      const images = document.querySelectorAll('img');
      const imageCount = images.length;
      const imagesWithoutAlt = Array.from(images).filter(img => !img.alt || img.alt.trim() === '').length;
      
      // Analyze links
      const allLinks = document.querySelectorAll('a[href]');
      const internalLinks = Array.from(allLinks).filter(link => {
        const href = link.getAttribute('href');
        return href && (href.startsWith('/') || href.includes('dracarlachristoph.com'));
      }).length;
      const externalLinks = allLinks.length - internalLinks;
      
      // Get content length
      const mainContent = document.querySelector('main') || document.body;
      const contentLength = mainContent.textContent?.length || 0;
      
      // Calculate keyword density for main keywords
      const text = mainContent.textContent?.toLowerCase() || '';
      const keywords = ['dentista', 'ipanema', 'odontologia', 'implante', 'clareamento', 'lente', 'faceta'];
      const keywordDensity: { [key: string]: number } = {};
      
      keywords.forEach(keyword => {
        const matches = (text.match(new RegExp(keyword, 'g')) || []).length;
        keywordDensity[keyword] = contentLength > 0 ? (matches / contentLength) * 100 : 0;
      });
      
      // Get page load time
      const pageLoadTime = performance.timing 
        ? performance.timing.loadEventEnd - performance.timing.navigationStart
        : 0;
      
      const newMetrics: SEOMetrics = {
        pageTitle,
        metaDescription,
        canonicalUrl,
        hasH1,
        h1Count,
        imageCount,
        imagesWithoutAlt,
        internalLinks,
        externalLinks,
        pageLoadTime,
        contentLength,
        keywordDensity
      };
      
      setMetrics(newMetrics);
      
      // Log SEO analysis for debugging
      console.log('SEO Analysis:', newMetrics);
      
      // Track SEO issues in analytics
      if (window.gtag) {
        // Track missing meta description
        if (!metaDescription) {
          window.gtag('event', 'seo_issue', {
            event_category: 'SEO',
            event_label: 'Missing Meta Description',
            value: 1
          });
        }
        
        // Track multiple H1 tags
        if (h1Count > 1) {
          window.gtag('event', 'seo_issue', {
            event_category: 'SEO',
            event_label: 'Multiple H1 Tags',
            value: h1Count
          });
        }
        
        // Track images without alt text
        if (imagesWithoutAlt > 0) {
          window.gtag('event', 'seo_issue', {
            event_category: 'SEO',
            event_label: 'Images Without Alt Text',
            value: imagesWithoutAlt
          });
        }
      }
      
    } catch (error) {
      console.error('Error analyzing page SEO:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Analyze SEO when location changes - APENAS EM DESENVOLVIMENTO
  useEffect(() => {
    // Só executa em desenvolvimento ou se explicitamente habilitado
    const isEnabled = import.meta.env.DEV || localStorage.getItem('enableSEOMonitoring') === 'true';
    
    if (!isEnabled) {
      console.log('🔇 SEO Monitoring desabilitado em produção');
      return;
    }

    const timer = setTimeout(() => {
      console.log('🔍 Executando análise SEO para:', location.pathname);
      analyzePageSEO();
    }, 1000); // Wait for page to fully load

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const getSEOScore = (): number => {
    if (!metrics) return 0;
    
    let score = 0;
    let maxScore = 0;
    
    // Title check (20 points)
    maxScore += 20;
    if (metrics.pageTitle && metrics.pageTitle.length >= 30 && metrics.pageTitle.length <= 60) {
      score += 20;
    } else if (metrics.pageTitle && metrics.pageTitle.length > 0) {
      score += 10;
    }
    
    // Meta description check (20 points)
    maxScore += 20;
    if (metrics.metaDescription && metrics.metaDescription.length >= 120 && metrics.metaDescription.length <= 160) {
      score += 20;
    } else if (metrics.metaDescription && metrics.metaDescription.length > 0) {
      score += 10;
    }
    
    // H1 check (15 points)
    maxScore += 15;
    if (metrics.hasH1 && metrics.h1Count === 1) {
      score += 15;
    } else if (metrics.hasH1) {
      score += 5;
    }
    
    // Image alt text check (15 points)
    maxScore += 15;
    if (metrics.imageCount > 0) {
      const altTextRatio = (metrics.imageCount - metrics.imagesWithoutAlt) / metrics.imageCount;
      score += Math.round(altTextRatio * 15);
    } else {
      score += 15; // No images is fine
    }
    
    // Content length check (10 points)
    maxScore += 10;
    if (metrics.contentLength >= 300) {
      score += 10;
    } else if (metrics.contentLength >= 150) {
      score += 5;
    }
    
    // Internal linking check (10 points)
    maxScore += 10;
    if (metrics.internalLinks >= 3) {
      score += 10;
    } else if (metrics.internalLinks >= 1) {
      score += 5;
    }
    
    // Canonical URL check (10 points)
    maxScore += 10;
    if (metrics.canonicalUrl && metrics.canonicalUrl.includes('dracarlachristoph.com')) {
      score += 10;
    }
    
    return Math.round((score / maxScore) * 100);
  };

  const getSEORecommendations = (): string[] => {
    if (!metrics) return [];
    
    const recommendations: string[] = [];
    
    if (!metrics.pageTitle) {
      recommendations.push('Adicione um título à página');
    } else if (metrics.pageTitle.length < 30) {
      recommendations.push('Título muito curto (mínimo 30 caracteres)');
    } else if (metrics.pageTitle.length > 60) {
      recommendations.push('Título muito longo (máximo 60 caracteres)');
    }
    
    if (!metrics.metaDescription) {
      recommendations.push('Adicione uma meta description');
    } else if (metrics.metaDescription.length < 120) {
      recommendations.push('Meta description muito curta (mínimo 120 caracteres)');
    } else if (metrics.metaDescription.length > 160) {
      recommendations.push('Meta description muito longa (máximo 160 caracteres)');
    }
    
    if (!metrics.hasH1) {
      recommendations.push('Adicione um título H1 à página');
    } else if (metrics.h1Count > 1) {
      recommendations.push('Use apenas um título H1 por página');
    }
    
    if (metrics.imagesWithoutAlt > 0) {
      recommendations.push(`${metrics.imagesWithoutAlt} imagem(ns) sem texto alternativo`);
    }
    
    if (metrics.contentLength < 300) {
      recommendations.push('Adicione mais conteúdo à página (mínimo 300 caracteres)');
    }
    
    if (metrics.internalLinks < 3) {
      recommendations.push('Adicione mais links internos (mínimo 3)');
    }
    
    if (!metrics.canonicalUrl) {
      recommendations.push('Adicione uma URL canônica');
    }
    
    return recommendations;
  };

  return {
    metrics,
    isAnalyzing,
    analyzePageSEO,
    getSEOScore,
    getSEORecommendations
  };
};
