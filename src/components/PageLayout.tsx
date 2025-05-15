
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PageLayout = ({ children, className = "" }: PageLayoutProps) => {
  return (
    <div className="bg-dental-beige min-h-screen">
      <Header />
      <main className={`pt-12 ${className}`}>{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PageLayout;
