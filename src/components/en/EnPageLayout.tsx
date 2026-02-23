import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import EnHeader from "@/components/en/EnHeader";
import EnFooter from "@/components/en/EnFooter";
import WhatsAppButton from "@/components/WhatsAppButton";

interface EnPageLayoutProps {
    children: React.ReactNode;
    className?: string;
}

const EnPageLayout = ({ children, className = "" }: EnPageLayoutProps) => {
    const location = useLocation();

    // Scroll to top when page changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // Set <html lang="en"> for EN pages, restore on unmount
    useEffect(() => {
        const html = document.documentElement;
        const prevLang = html.getAttribute("lang") || "pt-BR";
        html.setAttribute("lang", "en");
        return () => {
            html.setAttribute("lang", prevLang);
        };
    }, []);

    return (
        <div className="bg-dental-beige min-h-screen">
            <EnHeader />
            <main id="main-content" className={`pt-0 ${className}`}>{children}</main>
            <EnFooter />
            <WhatsAppButton />
        </div>
    );
};

export default EnPageLayout;
