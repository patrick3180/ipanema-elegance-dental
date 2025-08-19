
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

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
      <main className={`pt-0 ${className}`}>{children}</main>
      <Footer />
      {!isLandingPage && <WhatsAppButton />}
    </div>
  );
};

export default PageLayout;
