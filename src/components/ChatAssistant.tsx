
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import ChatButton from "@/components/chat/ChatButton";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessages from "@/components/chat/ChatMessages";
import QuickReplies from "@/components/chat/QuickReplies";
import ChatInput from "@/components/chat/ChatInput";
import { Message, WebhookResponse } from "@/components/chat/types";

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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      text: "Olá! Sou a assistente virtual da Dra. Carla Christoph. Como posso ajudar você hoje?",
      sender: "assistant",
      timestamp: new Date()
    }
  ]);
  
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
  
  const handleCloseChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <>
      <ChatButton onClick={handleOpenChat} />
      
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
          <ChatHeader 
            isChatMinimized={isChatMinimized} 
            toggleChat={toggleChat} 
            closeChat={handleCloseChat}
          />
          
          {!isChatMinimized && (
            <div className="flex flex-col h-[calc(100%-56px)]">
              <ChatMessages messages={messages} />
              <QuickReplies 
                predefinedMessages={predefinedMessages} 
                onSelectMessage={handleSendMessage}
              />
              <Separator />
              <ChatInput onSendMessage={handleSendMessage} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatAssistant;
