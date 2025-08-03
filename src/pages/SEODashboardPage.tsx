import React from 'react';
import SEODashboardEnhanced from '@/components/SEODashboardEnhanced';
import SEOHead from '@/components/SEOHead';

const SEODashboardPage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="SEO Dashboard - Dra. Carla Christoph"
        description="Comprehensive SEO monitoring and optimization dashboard"
        canonicalUrl="https://dracarlachristoph.com/seo-dashboard"
      />
      <div className="min-h-screen bg-background">
        <SEODashboardEnhanced />
      </div>
    </>
  );
};

export default SEODashboardPage;