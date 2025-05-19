
import React, { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { useIsMobile } from "@/hooks/use-mobile";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages
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

  return (
    <div 
      style={{
        height: chatHeight,
        minHeight: chatHeight,
        maxHeight: chatHeight
      }} 
      className="p-4 overflow-y-auto flex-grow bg-white"
    >
      {messages.map(message => <ChatMessage key={message.id} message={message} />)}
      <div ref={messagesEndRef} /> {/* Reference element for scrolling */}
    </div>
  );
};

export default ChatMessages;
