
import React from "react";
import { MessageCircle } from "lucide-react";

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  const handleChatClick = () => {
    // Track event with Google Tag Manager
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'chat_button_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'Chat Online Button'
      });
    }
    
    // Call the original onClick handler
    onClick();
  };

  return (
    <button
      id="btn-chat-online"
      onClick={handleChatClick}
      className="fixed bottom-8 left-8 z-50 bg-dental-purple hover:bg-dental-purple/90 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 elegant-shadow"
      aria-label="Abrir chat"
    >
      <MessageCircle size={20} className="animate-pulse" />
      <span className="hidden md:inline font-medium">Chat online</span>
    </button>
  );
};

export default ChatButton;
