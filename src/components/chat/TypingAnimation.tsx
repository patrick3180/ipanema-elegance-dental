
import React from "react";

const TypingAnimation = () => {
  return (
    <div className="flex items-center space-x-1 p-2 rounded-lg bg-dental-beige/80 inline-block max-w-[80%]">
      <div className="w-2 h-2 rounded-full bg-dental-purple animate-pulse"></div>
      <div className="w-2 h-2 rounded-full bg-dental-purple animate-pulse delay-75"></div>
      <div className="w-2 h-2 rounded-full bg-dental-purple animate-pulse delay-150"></div>
    </div>
  );
};

export default TypingAnimation;
