import React, { useState } from 'react';
import { MessageCircle, Plus, Minus } from 'lucide-react';
import { PeopleAlsoAskSection } from '@/types/BlogPost';

interface PeopleAlsoAskProps {
  questions: string[];
  className?: string;
  onQuestionClick?: (question: string) => void;
}

const PeopleAlsoAsk: React.FC<PeopleAlsoAskProps> = ({ 
  questions, 
  className = '',
  onQuestionClick 
}) => {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  if (!questions || questions.length === 0) return null;

  const handleQuestionClick = (question: string, index: number) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
    
    // Buscar no conteúdo por palavras-chave da pergunta
    const keywords = question.toLowerCase()
      .split(' ')
      .filter(word => word.length > 3); // apenas palavras relevantes
    
    // Tentar encontrar e destacar seção relevante
    const contentSections = document.querySelectorAll('.blog-content h2, .blog-content h3, .blog-content p');
    
    for (const section of contentSections) {
      const text = section.textContent?.toLowerCase() || '';
      if (keywords.some(keyword => text.includes(keyword))) {
        section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Adicionar destaque temporário
        section.classList.add('bg-dental-gold/10');
        section.classList.add('transition-all');
        section.classList.add('duration-500');
        
        setTimeout(() => {
          section.classList.remove('bg-dental-gold/10');
        }, 3000);
        
        break;
      }
    }
    
    if (onQuestionClick) {
      onQuestionClick(question);
    }
  };

  return (
    <div className={`mb-8 ${className}`}>
      <div className="bg-gradient-to-br from-white to-dental-beige/20 rounded-xl p-6 border border-dental-gray/10">
        <div className="flex items-center mb-4">
          <MessageCircle className="w-6 h-6 text-dental-purple mr-3" />
          <h2 className="text-xl font-semibold text-dental-purple">As pessoas também perguntam</h2>
        </div>

        <div className="space-y-3">
          {questions.map((question, index) => (
            <div key={index} className="group">
              <button
                onClick={() => handleQuestionClick(question, index)}
                className="w-full text-left flex items-center justify-between p-3 rounded-lg hover:bg-dental-purple/5 transition-colors duration-200"
              >
                <span className="text-dental-gray group-hover:text-dental-purple transition-colors flex-1 pr-3">
                  {question}
                </span>
                <div className="flex-shrink-0">
                  {expandedQuestion === index ? (
                    <Minus className="w-4 h-4 text-dental-gold" />
                  ) : (
                    <Plus className="w-4 h-4 text-dental-gray group-hover:text-dental-gold transition-colors" />
                  )}
                </div>
              </button>

              {expandedQuestion === index && (
                <div className="px-3 pb-3 text-sm text-dental-gray/80 italic">
                  Clique para ver a resposta completa no conteúdo acima.
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-dental-gray/10">
          <p className="text-xs text-dental-gray/60">
            💡 Estas são as principais dúvidas sobre o tema. Explore o artigo completo para respostas detalhadas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PeopleAlsoAsk;