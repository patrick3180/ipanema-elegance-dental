import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import ChatButton from "@/components/chat/ChatButton";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessages from "@/components/chat/ChatMessages";
import QuickReplies from "@/components/chat/QuickReplies";
import ChatInput from "@/components/chat/ChatInput";
import TypingAnimation from "@/components/chat/TypingAnimation";
import { Message, WebhookResponse } from "@/components/chat/types";
import { v4 as uuidv4 } from 'uuid';

const predefinedMessages = [
  "Quais são os tratamentos disponíveis?",
  "Como funciona o clareamento dental?",
  "Qual o valor da consulta?",
  "Vocês atendem planos de saúde?"
];

// Webhook URL for the online chat integration
const WEBHOOK_URL = "https://patrick3180.app.n8n.cloud/webhook/site_chat";

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      text: "Olá! Sou a assistente virtual da Dra. Carla Christoph. Como posso ajudar você hoje?",
      sender: "assistant",
      timestamp: new Date()
    }
  ]);
  
  // Initialize session ID when component mounts
  useEffect(() => {
    setSessionId(uuidv4());
  }, []);
  
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
    setIsTyping(true);
    
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
          session_id: sessionId,
          source: 'website-chat'
        }),
      });
      
      let responseText = "";
      
      // Try to get actual response from webhook
      if (response.ok) {
        try {
          const data = await response.json() as WebhookResponse;
          // Handle both possible response formats:
          // 1. {"response": "string"}
          // 2. {"response": {"response": "string"}}
          if (data && typeof data.response === 'string') {
            responseText = data.response;
          } else if (data && typeof data.response === 'object' && data.response && 'response' in data.response) {
            responseText = data.response.response as string;
          }
        } catch (jsonError) {
          console.log("Webhook não retornou um JSON válido", jsonError);
          toast.error("Desculpe, houve um erro na comunicação. Por favor, tente novamente.");
          setIsTyping(false);
          return; // Don't add an empty message if response isn't valid
        }
      }
      
      if (!responseText) {
        // If no response text was received, don't add a message
        setIsTyping(false);
        toast.error("Desculpe, não consegui processar sua pergunta. Por favor, tente novamente.");
        return;
      }
      
      // Add assistant response with delay for typing effect
      setTimeout(() => {
        setIsTyping(false);
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
      setIsTyping(false);
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

  // Adjusted dimensions for better component visibility
  const chatHeight = '550px';
  const chatWidth = '380px';

  return (
    <>
      <ChatButton onClick={handleOpenChat} />
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent 
          className="p-0 rounded-lg overflow-hidden border-none shadow-xl transition-all duration-300"
          style={{ 
            position: 'fixed', 
            bottom: '24px', 
            right: '24px', 
            margin: 0,
            height: isChatMinimized ? '46px' : chatHeight,
            width: chatWidth,
            maxHeight: '90vh',
            transform: 'translate(0, 0)'
          }}
        >
          <ChatHeader 
            isChatMinimized={isChatMinimized} 
            toggleChat={toggleChat} 
            closeChat={handleCloseChat}
          />
          
          {!isChatMinimized && (
            <div className="flex flex-col h-[calc(100%-46px)]">
              <div className="flex-grow overflow-hidden flex flex-col">
                <ChatMessages messages={messages} />
                {isTyping && (
                  <div className="px-4 py-2">
                    <TypingAnimation />
                  </div>
                )}
              </div>
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
