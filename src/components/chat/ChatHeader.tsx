
import React from "react";
import { MessageCircle, X } from "lucide-react";
import { DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  isChatMinimized: boolean;
  toggleChat: () => void;
  closeChat: (e: React.MouseEvent) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ isChatMinimized, toggleChat, closeChat }) => {
  return (
    <div 
      className="bg-dental-purple text-white p-2 cursor-pointer flex items-center justify-between"
      onClick={toggleChat}
    >
      <div className="flex items-center gap-2">
        <MessageCircle size={18} />
        <div>
          <DialogTitle className="font-medium text-white m-0 p-0 text-base">Assistente Virtual</DialogTitle>
          {!isChatMinimized && (
            <p className="text-xs text-white/80">Resposta em tempo real</p>
          )}
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={closeChat}
        className="text-white hover:bg-dental-purple/20 h-7 w-7"
      >
        <X size={14} />
        <span className="sr-only">Fechar</span>
      </Button>
    </div>
  );
};

export default ChatHeader;
