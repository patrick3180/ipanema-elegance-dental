
import React, { useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import LazySection from "@/components/performance/LazySection";

// Lazy-loaded components below the fold
const Footer = lazy(() => import("@/components/Footer"));
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PageLayout = ({ children, className = "" }: PageLayoutProps) => {
  const location = useLocation();

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Don't render WhatsAppButton on landing pages (they have their own)
  const isLandingPage = location.pathname.startsWith('/lp/');

  return (
    <div className="bg-dental-beige min-h-screen">
      <Header />
      <main id="main-content" className={`pt-0 ${className}`}>{children}</main>
      
      {/* Lazy-load Footer below the fold to save TBT/LCP */}
      <LazySection 
        fallback={<div className="h-64 bg-[#381F47]" />}
        threshold={0}
        rootMargin="300px"
      >
        <Suspense fallback={<div className="h-64 bg-[#381F47]" />}>
          <Footer />
        </Suspense>
      </LazySection>

      {!isLandingPage && (
        <LazySection
          fallback={null}
          threshold={0}
          rootMargin="100px"
        >
          <Suspense fallback={null}>
            <WhatsAppButton />
          </Suspense>
        </LazySection>
      )}
    </div>
  );
};

export default PageLayout;
