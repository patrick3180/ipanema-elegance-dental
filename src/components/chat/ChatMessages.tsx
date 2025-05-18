import React, { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
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
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [messages]);
  return <div style={{
    height: '420px',
    // Increased height for more messages
    minHeight: '420px',
    maxHeight: '420px'
  }} className="p-4 overflow-y-auto flex-grow bg-white py-[57px]">
      {messages.map(message => <ChatMessage key={message.id} message={message} />)}
      <div ref={messagesEndRef} /> {/* Reference element for scrolling */}
    </div>;
};
export default ChatMessages;