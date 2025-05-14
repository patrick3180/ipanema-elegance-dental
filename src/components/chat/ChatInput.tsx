
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="p-3 bg-white flex gap-2 mt-auto">
      <Textarea
        placeholder="Digite sua mensagem..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border-dental-gray/20 focus-visible:ring-dental-gold min-h-[60px] resize-none text-sm flex-1"
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
        className="bg-dental-purple hover:bg-dental-purple/90 text-white self-end min-h-[60px] px-3"
        disabled={!inputValue.trim()}
      >
        <Send size={20} />
        <span>Enviar</span>
      </Button>
    </form>
  );
};

export default ChatInput;
