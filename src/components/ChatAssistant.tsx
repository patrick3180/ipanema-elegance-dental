
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

const predefinedMessages = [
  "Quais são os tratamentos disponíveis?",
  "Como funciona o clareamento dental?",
  "Qual o valor da consulta?",
  "Vocês atendem planos de saúde?"
];

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      text: "Olá! Sou a assistente virtual da Dra. Carla Christoph. Como posso ajudar você hoje?",
      sender: "assistant",
      timestamp: new Date()
    }
  ]);
  
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue("");
    
    // Simulate assistant response (in a real implementation, this would be handled by N8N)
    setTimeout(() => {
      const assistantResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Agradecemos seu contato! Nossa equipe responderá sua mensagem "${text}" em breve. Para atendimento imediato, recomendamos utilizar nosso WhatsApp.`,
        sender: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantResponse]);
    }, 1000);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };
  
  const toggleChat = () => {
    if (isChatMinimized) {
      setIsChatMinimized(false);
    } else {
      setIsOpen(false);
      setTimeout(() => setIsChatMinimized(true), 300);
    }
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-50 bg-dental-purple hover:bg-dental-purple/90 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 elegant-shadow"
        aria-label="Abrir chat"
      >
        <MessageCircle size={20} className="animate-pulse" />
        <span className="hidden md:inline font-medium">Chat online</span>
      </button>
      
      {/* Chat dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent 
          className={`sm:max-w-[380px] p-0 rounded-lg overflow-hidden border-none shadow-xl transition-all duration-300 ${isChatMinimized ? 'h-[72px]' : 'h-[500px] max-h-[80vh]'}`}
          style={{ 
            position: 'fixed', 
            bottom: '24px', 
            left: '24px', 
            margin: 0,
            transform: 'translate(0, 0)'
          }}
        >
          {/* Chat header */}
          <div 
            className="bg-dental-purple text-white p-4 cursor-pointer flex items-center justify-between"
            onClick={toggleChat}
          >
            <div className="flex items-center gap-2">
              <MessageCircle size={20} />
              <div>
                <h3 className="font-medium">Assistente Virtual</h3>
                {!isChatMinimized && (
                  <p className="text-xs text-white/80">Resposta em tempo real</p>
                )}
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="text-white hover:bg-dental-purple/20 h-8 w-8"
            >
              <X size={16} />
              <span className="sr-only">Fechar</span>
            </Button>
          </div>
          
          {!isChatMinimized && (
            <>
              {/* Chat messages */}
              <div className="p-4 h-[350px] overflow-y-auto bg-white">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 ${message.sender === 'user' ? 'text-right' : ''}`}
                  >
                    <div
                      className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                        message.sender === 'user'
                          ? 'bg-dental-purple text-white'
                          : 'bg-dental-beige/80 text-dental-purple'
                      }`}
                    >
                      {message.text}
                    </div>
                    <div className="text-xs text-dental-gray mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Quick replies */}
              <div className="px-4 py-3 bg-dental-beige/30">
                <p className="text-xs text-dental-gray mb-2">Perguntas frequentes:</p>
                <div className="flex flex-wrap gap-2">
                  {predefinedMessages.map((message, index) => (
                    <button
                      key={index}
                      className="bg-white text-dental-purple text-xs px-3 py-1 rounded-full border border-dental-gray/20 hover:bg-dental-beige/50 transition-colors"
                      onClick={() => handleSendMessage(message)}
                    >
                      {message}
                    </button>
                  ))}
                </div>
              </div>
              <Separator />
              
              {/* Chat input */}
              <form onSubmit={handleSubmit} className="p-4 bg-white flex items-center gap-2">
                <Input
                  placeholder="Digite sua mensagem..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="border-dental-gray/20 focus-visible:ring-dental-gold"
                />
                <Button 
                  type="submit" 
                  size="icon"
                  className="bg-dental-gold hover:bg-dental-gold/90 text-white h-10 w-10"
                  disabled={!inputValue.trim()}
                >
                  <Send size={16} />
                  <span className="sr-only">Enviar</span>
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatAssistant;
