import React from 'react';
import { CheckCircle, TrendingUp } from 'lucide-react';

interface KeyTakeawaysProps {
  takeaways: string[];
  className?: string;
}

const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({ takeaways, className = '' }) => {
  if (!takeaways || takeaways.length === 0) return null;

  return (
    <div className={`bg-gradient-to-r from-dental-purple/5 via-transparent to-dental-gold/5 border-l-4 border-dental-gold rounded-r-xl p-6 mb-8 ${className}`}>
      <div className="flex items-center mb-4">
        <TrendingUp className="w-5 h-5 text-dental-gold mr-2" />
        <h3 className="text-lg font-semibold text-dental-purple">Pontos-Chave</h3>
      </div>
      
      <ul className="space-y-3">
        {takeaways.map((takeaway, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="w-4 h-4 text-dental-gold mt-1 mr-3 flex-shrink-0" />
            <span className="text-dental-gray text-sm leading-relaxed">
              {takeaway}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeyTakeaways;