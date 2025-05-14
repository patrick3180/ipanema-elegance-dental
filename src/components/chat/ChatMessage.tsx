
import React from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`mb-4 ${message.sender === 'user' ? 'text-right' : ''}`}>
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
  );
};

export default ChatMessage;
