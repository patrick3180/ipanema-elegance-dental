
import React from "react";
import { MessageCircle } from "lucide-react";

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 left-8 z-50 bg-dental-purple hover:bg-dental-purple/90 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 elegant-shadow"
      aria-label="Abrir chat"
    >
      <MessageCircle size={20} className="animate-pulse" />
      <span className="hidden md:inline font-medium">Chat online</span>
    </button>
  );
};

export default ChatButton;
