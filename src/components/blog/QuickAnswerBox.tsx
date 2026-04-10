import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface QuickAnswerBoxProps {
  answer: string;
  className?: string;
  locale?: 'pt' | 'en';
}

const QuickAnswerBox: React.FC<QuickAnswerBoxProps> = ({ answer, className = '', locale = 'pt' }) => {
  if (!answer) return null;

  const title = locale === 'en' ? 'Quick Answer' : 'Resposta Rápida';

  return (
    <div className={`bg-gradient-to-r from-dental-purple/10 to-dental-gold/10 border border-dental-gold/30 rounded-xl p-6 mb-8 ${className}`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <CheckCircle2 className="w-6 h-6 text-dental-gold mt-1" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-dental-purple mb-2">{title}</h2>
          <p className="text-dental-gray leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default QuickAnswerBox;