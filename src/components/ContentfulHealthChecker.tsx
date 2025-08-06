import React, { useEffect, useState } from 'react';
import { testContentfulConnectivity } from '@/utils/enhancedContentfulQueries';
import { AlertCircle, CheckCircle, Loader } from 'lucide-react';

const ContentfulHealthChecker: React.FC = () => {
  const [status, setStatus] = useState<'checking' | 'healthy' | 'error'>('checking');
  const [message, setMessage] = useState('Verificando conexão...');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        setStatus('checking');
        setMessage('Verificando conexão com Contentful...');
        
        const isHealthy = await testContentfulConnectivity();
        
        if (isHealthy) {
          setStatus('healthy');
          setMessage('Conexão com Contentful estabelecida');
          
          // Hide success message after 3 seconds
          setTimeout(() => {
            setStatus('healthy');
            setMessage('');
          }, 3000);
        } else {
          setStatus('error');
          setMessage('Erro na conexão com Contentful. Usando dados locais.');
        }
      } catch (error) {
        console.error('Contentful health check failed:', error);
        setStatus('error');
        setMessage('Erro na conexão com Contentful. Usando dados locais.');
      }
    };

    checkHealth();
  }, []);

  if (!message) return null;

  return (
    <div 
      className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
        status === 'checking' 
          ? 'bg-blue-100 text-blue-800 border border-blue-200'
          : status === 'healthy'
          ? 'bg-green-100 text-green-800 border border-green-200'
          : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
      }`}
    >
      <div className="flex items-center gap-2 text-sm">
        {status === 'checking' && <Loader className="w-4 h-4 animate-spin" />}
        {status === 'healthy' && <CheckCircle className="w-4 h-4" />}
        {status === 'error' && <AlertCircle className="w-4 h-4" />}
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ContentfulHealthChecker;