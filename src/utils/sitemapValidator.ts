// Sitemap validation and monitoring utilities
import { generateSitemap } from './sitemapGenerator';
import { getAllBlogPosts } from '@/services/contentful/queries';
import { blogPosts } from '@/data/blogPosts';

interface SitemapValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    totalUrls: number;
    blogUrls: number;
    staticUrls: number;
    serviceUrls: number;
    legalUrls: number;
  };
  recommendations: string[];
}

class SitemapValidator {
  // Validate sitemap content and structure
  async validateSitemap(): Promise<SitemapValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];
    
    try {
      console.log('🔍 Validating sitemap...');
      
      // Generate current sitemap
      const sitemap = await generateSitemap();
      
      // Basic XML validation
      if (!sitemap.includes('<?xml version="1.0"')) {
        errors.push('Missing XML declaration');
      }
      
      if (!sitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
        errors.push('Missing or incorrect urlset declaration');
      }
      
      // Count URLs
      const urlMatches = sitemap.match(/<url>/g);
      const totalUrls = urlMatches ? urlMatches.length : 0;
      
      if (totalUrls === 0) {
        errors.push('No URLs found in sitemap');
      } else if (totalUrls > 50000) {
        warnings.push('Sitemap has more than 50,000 URLs (consider splitting)');
      }
      
      // Check for blog posts
      const blogUrlMatches = sitemap.match(/\/blog\//g);
      const blogUrls = blogUrlMatches ? blogUrlMatches.length : 0;
      
      // Compare with actual blog posts
      let expectedBlogCount = 0;
      try {
        const contentfulPosts = await getAllBlogPosts();
        expectedBlogCount = contentfulPosts.length;
      } catch {
        expectedBlogCount = blogPosts.length;
      }
      
      if (blogUrls !== expectedBlogCount) {
        warnings.push(`Blog URL count mismatch: sitemap has ${blogUrls}, expected ${expectedBlogCount}`);
        recommendations.push('Check Contentful connection and blog post fetching');
      }
      
      // Check for required pages
      const requiredPages = ['/', '/sobre', '/servicos', '/blog', '/contato'];
      const missingPages = requiredPages.filter(page => 
        !sitemap.includes(`<loc>https://dracarlachristoph.com${page}</loc>`)
      );
      
      if (missingPages.length > 0) {
        errors.push(`Missing required pages: ${missingPages.join(', ')}`);
      }
      
      // Check for proper lastmod dates
      const lastmodMatches = sitemap.match(/<lastmod>(.+?)<\/lastmod>/g);
      if (!lastmodMatches || lastmodMatches.length !== totalUrls) {
        warnings.push('Some URLs are missing lastmod dates');
      }
      
      // Check for proper priority values
      const priorityMatches = sitemap.match(/<priority>(.+?)<\/priority>/g);
      if (priorityMatches) {
        const invalidPriorities = priorityMatches.filter(match => {
          const value = parseFloat(match.replace(/<\/?priority>/g, ''));
          return isNaN(value) || value < 0 || value > 1;
        });
        
        if (invalidPriorities.length > 0) {
          errors.push(`Invalid priority values found: ${invalidPriorities.length} entries`);
        }
      }
      
      // Performance recommendations
      if (totalUrls > 1000) {
        recommendations.push('Consider implementing sitemap index for better organization');
      }
      
      if (blogUrls > 100) {
        recommendations.push('Consider creating a separate blog sitemap');
      }
      
      // Calculate stats
      const staticUrls = requiredPages.filter(page => 
        sitemap.includes(`<loc>https://dracarlachristoph.com${page}</loc>`)
      ).length;
      
      const serviceUrls = (sitemap.match(/lentes-de-contato|clareamento-dental|protese-dentaria|implantes-dentarios|clinica-geral|restauracoes-esteticas|tratamento-de-canal|saude-da-gengiva/g) || []).length;
      
      const legalUrls = (sitemap.match(/politica-de-privacidade|termos-de-uso/g) || []).length;
      
      const isValid = errors.length === 0;
      
      console.log(`✅ Sitemap validation complete: ${isValid ? 'VALID' : 'INVALID'}`);
      console.log(`📊 Stats: ${totalUrls} total URLs (${blogUrls} blog, ${staticUrls} static, ${serviceUrls} service, ${legalUrls} legal)`);
      
      if (errors.length > 0) {
        console.error('❌ Errors:', errors);
      }
      
      if (warnings.length > 0) {
        console.warn('⚠️ Warnings:', warnings);
      }
      
      return {
        isValid,
        errors,
        warnings,
        stats: {
          totalUrls,
          blogUrls,
          staticUrls,
          serviceUrls,
          legalUrls
        },
        recommendations
      };
      
    } catch (error) {
      console.error('❌ Sitemap validation failed:', error);
      return {
        isValid: false,
        errors: [`Validation failed: ${error}`],
        warnings: [],
        stats: {
          totalUrls: 0,
          blogUrls: 0,
          staticUrls: 0,
          serviceUrls: 0,
          legalUrls: 0
        },
        recommendations: ['Check sitemap generation and Contentful connection']
      };
    }
  }

  // Check if sitemap is accessible
  async checkSitemapAccessibility(): Promise<{
    accessible: boolean;
    statusCode?: number;
    error?: string;
    size?: number;
  }> {
    try {
      const response = await fetch('/sitemap.xml');
      const content = await response.text();
      
      return {
        accessible: response.ok,
        statusCode: response.status,
        size: content.length
      };
    } catch (error) {
      return {
        accessible: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Generate sitemap health report
  async generateHealthReport(): Promise<{
    overall: 'healthy' | 'warning' | 'critical';
    validation: SitemapValidationResult;
    accessibility: Awaited<ReturnType<typeof this.checkSitemapAccessibility>>;
    recommendations: string[];
  }> {
    const validation = await this.validateSitemap();
    const accessibility = await this.checkSitemapAccessibility();
    
    let overall: 'healthy' | 'warning' | 'critical' = 'healthy';
    const recommendations: string[] = [];
    
    if (!validation.isValid || !accessibility.accessible) {
      overall = 'critical';
      recommendations.push('Fix critical sitemap issues immediately');
    } else if (validation.warnings.length > 0) {
      overall = 'warning';
      recommendations.push('Address sitemap warnings for optimal SEO');
    }
    
    recommendations.push(...validation.recommendations);
    
    return {
      overall,
      validation,
      accessibility,
      recommendations
    };
  }
}

// Create singleton instance
export const sitemapValidator = new SitemapValidator();

// Add global utilities for debugging
if (typeof window !== 'undefined') {
  (window as any).sitemapValidator = {
    validate: () => sitemapValidator.validateSitemap(),
    checkAccess: () => sitemapValidator.checkSitemapAccessibility(),
    healthReport: () => sitemapValidator.generateHealthReport()
  };
}

// Development monitoring
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  // Validate sitemap every 10 minutes in development
  let validationInterval: NodeJS.Timeout;
  
  const startValidationMonitoring = () => {
    validationInterval = setInterval(async () => {
      const health = await sitemapValidator.generateHealthReport();
      
      if (health.overall === 'critical') {
        console.group('🚨 Critical Sitemap Issues');
        console.error('Validation errors:', health.validation.errors);
        console.error('Accessibility:', health.accessibility);
        console.groupEnd();
      } else if (health.overall === 'warning') {
        console.group('⚠️ Sitemap Warnings');
        console.warn('Warnings:', health.validation.warnings);
        console.log('Recommendations:', health.recommendations);
        console.groupEnd();
      }
    }, 10 * 60 * 1000); // 10 minutes
  };
  
  // Start monitoring after a short delay
  setTimeout(startValidationMonitoring, 5000);
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    if (validationInterval) {
      clearInterval(validationInterval);
    }
  });
}