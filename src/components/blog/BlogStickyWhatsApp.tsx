import React, { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

const BlogStickyWhatsApp = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            const footer = document.querySelector("footer");
            const footerTop = footer ? footer.getBoundingClientRect().top : Infinity;

            // Show after 30% scroll, hide near footer
            setIsVisible(scrollPercent > 30 && footerTop > window.innerHeight + 80);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden animate-fade-in">
            <a
                href="https://wa.me/5521993304045?text=Ol%C3%A1!%20Li%20seu%20artigo%20no%20blog%20e%20gostaria%20de%20agendar%20uma%20consulta."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#128C4A] hover:bg-[#0F7540] text-white py-3.5 px-4 font-medium shadow-[0_-2px_10px_rgba(0,0,0,0.1)] transition-all duration-300"
                onClick={() => {
                    if (window.dataLayer) {
                        window.dataLayer.push({
                            event: "whatsapp_click",
                            event_category: "Contact",
                            event_action: "Click",
                            event_label: "Blog Sticky CTA Mobile",
                        });
                    }
                }}
            >
                <MessageCircle size={20} className="animate-pulse" />
                <span>Agendar Consulta</span>
                <span className="text-xs text-white/80 ml-1">WhatsApp</span>
            </a>
        </div>
    );
};

export default BlogStickyWhatsApp;
