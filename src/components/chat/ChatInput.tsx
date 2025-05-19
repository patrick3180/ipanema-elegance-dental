
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
  
  const inputHeight = isMobile ? '120px' : '120px';
  
  return (
    <div className="bg-white p-3 border-t border-dental-gray/10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Textarea
          placeholder="Digite sua mensagem..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border border-dental-gray/20 focus-visible:ring-dental-gold resize-none text-base w-full rounded-md"
          style={{
            minHeight: inputHeight,
            maxHeight: inputHeight,
            padding: '12px'
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
          className="bg-dental-purple hover:bg-dental-purple/90 text-white self-end px-4 py-2 rounded-md"
          disabled={!inputValue.trim()}
        >
          <Send size={20} className="mr-2" />
          <span className={isMobile ? "inline" : "inline"}>Enviar</span>
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
