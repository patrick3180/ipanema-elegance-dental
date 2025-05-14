
import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface WebhookResponse {
  response?: string;
}

const predefinedMessages = [
  "Quais são os tratamentos disponíveis?",
  "Como funciona o clareamento dental?",
  "Qual o valor da consulta?",
  "Vocês atendem planos de saúde?"
];

// Webhook URL for the online chat integration
const WEBHOOK_URL = "https://patrick3180.app.n8n.cloud/webhook/6dfd7345-82ac-46eb-9e73-01fed8f5a80f";

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      text: "Olá! Sou a assistente virtual da Dra. Carla Christoph. Como posso ajudar você hoje?",
      sender: "assistant",
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  const handleSendMessage = async (text: string) => {
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
    
    try {
      // Send message to webhook
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          timestamp: new Date().toISOString(),
          source: 'website-chat'
        }),
      });
      
      let responseText = `Agradecemos seu contato! Nossa equipe responderá sua mensagem "${text}" em breve. Para atendimento imediato, recomendamos utilizar nosso WhatsApp.`;
      
      // Try to get actual response from webhook if available
      if (response.ok) {
        try {
          const data = await response.json() as WebhookResponse;
          if (data && data.response) {
            responseText = data.response;
          }
        } catch (jsonError) {
          console.log("Webhook não retornou um JSON válido, usando resposta padrão");
        }
      }
      
      // Add assistant response
      setTimeout(() => {
        const assistantResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          sender: "assistant",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantResponse]);
      }, 1000);
      
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      toast.error("Erro ao enviar mensagem. Por favor, tente novamente.");
    }
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
      setTimeout(() => setIsChatMinimized(false), 300);
    }
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setIsChatMinimized(false);
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={handleOpenChat}
        className="fixed bottom-8 left-8 z-50 bg-dental-purple hover:bg-dental-purple/90 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 elegant-shadow"
        aria-label="Abrir chat"
      >
        <MessageCircle size={20} className="animate-pulse" />
        <span className="hidden md:inline font-medium">Chat online</span>
      </button>
      
      {/* Chat dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent 
          className={`sm:max-w-[380px] p-0 rounded-lg overflow-hidden border-none shadow-xl transition-all duration-300 ${isChatMinimized ? 'h-[72px]' : 'h-[600px] max-h-[90vh]'}`}
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
                <DialogTitle className="font-medium text-white m-0 p-0">Assistente Virtual</DialogTitle>
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
            <div className="flex flex-col h-[calc(100%-72px)]">
              {/* Chat messages */}
              <div className="p-4 overflow-y-auto flex-grow bg-white">
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
                <div ref={messagesEndRef} /> {/* Reference element for scrolling */}
              </div>
              
              {/* Quick replies */}
              <div className="px-4 py-2 bg-dental-beige/30">
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
                  <span className="sr-only">Enviar</span>
                </Button>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatAssistant;
