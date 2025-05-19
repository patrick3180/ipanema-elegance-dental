
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState("");
  const isMobile = useIsMobile();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };
  
  const inputHeight = isMobile ? '60px' : '80px';
  const buttonHeight = isMobile ? '60px' : '80px';
  
  return (
    <form onSubmit={handleSubmit} className="p-3 bg-white flex gap-2 border-t border-dental-gray/10">
      <Textarea
        placeholder="Digite sua mensagem..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={`border border-dental-gray/20 focus-visible:ring-dental-gold resize-none text-sm flex-1 rounded-md`}
        style={{
          minHeight: inputHeight,
          maxHeight: inputHeight
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (inputValue.trim()) {
              handleSubmit(e);
            }
          }
        }}
      />
      <Button 
        type="submit" 
        className="bg-dental-purple hover:bg-dental-purple/90 text-white self-end px-3 rounded-md"
        style={{ height: buttonHeight }}
        disabled={!inputValue.trim()}
      >
        <Send size={isMobile ? 16 : 20} className={isMobile ? "mr-1" : "mr-2"} />
        <span>{isMobile ? "" : "Enviar"}</span>
      </Button>
    </form>
  );
};

export default ChatInput;
