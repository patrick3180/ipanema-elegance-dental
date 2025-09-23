import React from 'react';
import { Check, X, Minus } from 'lucide-react';
import { ComparisonTableItem } from '@/types/BlogPost';

interface ComparisonTableProps {
  data: ComparisonTableItem[];
  className?: string;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ 
  data, 
  className = '' 
}) => {
  if (!data || data.length === 0) return null;

  // Extract column names dynamically from the first item (excluding 'Criterio')
  const firstItem = data[0];
  const columnKeys = Object.keys(firstItem).filter(key => key !== 'Criterio');
  const optionALabel = columnKeys[0] || 'Opção A';
  const optionBLabel = columnKeys[1] || 'Opção B';

  const renderCellContent = (value: string | undefined | null) => {
    // Handle undefined, null, or empty values
    if (!value || value.trim() === '') {
      return <Minus className="w-5 h-5 text-gray-400 mx-auto" />;
    }
    
    const lowerValue = value.toLowerCase();
    
    if (lowerValue === 'sim' || lowerValue === 'yes' || lowerValue.includes('✓')) {
      return <Check className="w-5 h-5 text-green-600 mx-auto" />;
    }
    if (lowerValue === 'não' || lowerValue === 'no' || lowerValue.includes('✗')) {
      return <X className="w-5 h-5 text-red-600 mx-auto" />;
    }
    if (lowerValue === '-' || lowerValue === 'n/a') {
      return <Minus className="w-5 h-5 text-gray-400 mx-auto" />;
    }
    
    return <span className="text-dental-gray text-sm">{value}</span>;
  };

  return (
    <div className={`mb-8 ${className}`}>
      <h3 className="text-xl font-semibold text-dental-purple mb-4">Comparação</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-dental-purple text-white">
              <th className="px-4 py-3 text-left font-medium">Critério</th>
              <th className="px-4 py-3 text-center font-medium">{optionALabel}</th>
              <th className="px-4 py-3 text-center font-medium">{optionBLabel}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-3 text-dental-purple font-medium text-sm">
                  {row.Criterio}
                </td>
                <td className="px-4 py-3 text-center">
                  {renderCellContent(row[optionALabel])}
                </td>
                <td className="px-4 py-3 text-center">
                  {renderCellContent(row[optionBLabel])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;