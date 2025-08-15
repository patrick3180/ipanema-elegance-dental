
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";

const WhatsAppPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // Check if popup has been dismissed before
    const hasBeenDismissed = localStorage.getItem("whatsappPopupDismissed");
    
    if (!hasBeenDismissed) {
      // Set timeout for 30 seconds before showing popup
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 30000); // 30 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleWhatsAppClick = async () => {
    // Track event with Google Tag Manager (if available)
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_popup_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'WhatsApp Popup'
      });
    }
    
    // Send GCLID to webhook
    await sendGCLIDToWebhook('whatsapp_popup_button');
    
    // Log for development purposes
    console.log("WhatsApp popup button clicked - tracking event");
    
    // Open WhatsApp with pre-defined message
    const phoneNumber = "5521993304045"; // Updated phone number
    const message = "Olá! Gostaria de agendar uma consulta.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
    
    // Close popup and mark as dismissed
    setIsOpen(false);
    localStorage.setItem("whatsappPopupDismissed", "true");
  };
  
  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem("whatsappPopupDismissed", "true");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md rounded-lg p-0 overflow-hidden">
        <div className="bg-dental-purple text-white p-6">
          <div className="absolute right-4 top-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleDismiss}
              className="text-white hover:bg-dental-purple/20"
            >
              <X size={18} />
              <span className="sr-only">Fechar</span>
            </Button>
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl font-display text-white">Precisa de ajuda?</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-white/90 mt-2">
            Estamos prontos para responder suas dúvidas e agendar sua consulta.
          </DialogDescription>
        </div>
        <div className="p-6">
          <p className="mb-6 text-dental-purple/80">
            Clique no botão abaixo para conversar diretamente com nossa equipe pelo WhatsApp e agendar sua consulta com a Dra. Carla Christoph.
          </p>
          <DialogFooter>
            <Button 
              onClick={handleWhatsAppClick}
              className="w-full whatsapp-button hover:whatsapp-button text-white gap-2"
            >
              <MessageCircle size={18} />
              <div className="flex flex-col text-left leading-tight">
                <span>Conversar pelo WhatsApp</span>
                <span className="text-xs text-white/80">WhatsApp 24h</span>
              </div>
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppPopup;
