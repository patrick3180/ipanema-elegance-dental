
import React, { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import QuickReplies from "./QuickReplies";
import { useIsMobile } from "@/hooks/use-mobile";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: Message[];
  onQuickReplySelect?: (message: string) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  onQuickReplySelect
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [messages]);

  const chatHeight = isMobile ? '350px' : '400px';
  
  // Sample quick replies for the chat
  const predefinedMessages = [
    "Quanto custa uma consulta?",
    "Como agendar?",
    "Horário de atendimento"
  ];

  return (
    <div className="flex flex-col flex-grow">
      <div 
        style={{
          height: chatHeight,
          minHeight: chatHeight,
          maxHeight: chatHeight,
          overflowY: 'auto',
          backgroundColor: '#fff',
          padding: '12px'
        }} 
        className="overflow-y-auto flex-grow bg-white"
      >
        {messages.map(message => <ChatMessage key={message.id} message={message} />)}
        <div ref={messagesEndRef} />
      </div>
      {onQuickReplySelect && (
        <QuickReplies 
          predefinedMessages={predefinedMessages}
          onSelectMessage={onQuickReplySelect}
        />
      )}
    </div>
  );
};

export default ChatMessages;
