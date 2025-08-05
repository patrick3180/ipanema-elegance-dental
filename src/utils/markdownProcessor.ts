export const processMarkdown = (text: string): string => {
  if (!text) return text;
  
  // Process bold text: **text** -> <strong>text</strong>
  const processedBold = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Process links: [text](url) -> <a href="url" target="_blank" rel="noopener noreferrer">text</a>
  const processedLinks = processedBold.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g, 
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-dental-gold hover:text-dental-purple transition-colors underline">$1</a>'
  );
  
  return processedLinks;
};