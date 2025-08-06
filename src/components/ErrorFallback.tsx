import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
  title?: string;
  description?: string;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ 
  error, 
  resetError, 
  title = "Algo deu errado",
  description = "Ocorreu um erro inesperado. Por favor, tente novamente."
}) => {
  const handleReload = () => {
    if (resetError) {
      resetError();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <div className="text-center max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-red-100 rounded-full">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        
        <h2 className="text-2xl font-semibold text-dental-purple mb-2">
          {title}
        </h2>
        
        <p className="text-dental-gray mb-6">
          {description}
        </p>
        
        {error && process.env.NODE_ENV === 'development' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
            <pre className="text-sm text-red-800 overflow-auto">
              {error.message}
            </pre>
          </div>
        )}
        
        <Button 
          onClick={handleReload}
          className="bg-dental-purple hover:bg-dental-purple/90 text-white"
        >
          Tentar Novamente
        </Button>
      </div>
    </div>
  );
};

export default ErrorFallback;