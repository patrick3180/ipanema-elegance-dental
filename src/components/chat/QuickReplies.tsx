
import React from "react";

interface QuickRepliesProps {
  predefinedMessages: string[];
  onSelectMessage: (message: string) => void;
}

const QuickReplies: React.FC<QuickRepliesProps> = ({ predefinedMessages, onSelectMessage }) => {
  return (
    <div className="px-4 py-2 bg-dental-beige/30">
      <p className="text-xs text-dental-gray mb-2">Perguntas frequentes:</p>
      <div className="flex flex-wrap gap-2">
        {predefinedMessages.map((message, index) => (
          <button
            key={index}
            className="bg-white text-dental-purple text-xs px-3 py-1 rounded-full border border-dental-gray/20 hover:bg-dental-beige/50 transition-colors"
            onClick={() => onSelectMessage(message)}
          >
            {message}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickReplies;
