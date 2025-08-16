import React, { useEffect, useState } from 'react';

const RobotsResponse: React.FC = () => {
  const [robotsContent, setRobotsContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Basic robots.txt content
    const basicRobots = `User-agent: *
Allow: /

Sitemap: ${window.location.origin}/sitemap.xml`;
    
    setRobotsContent(basicRobots);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Carregando robots.txt...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <pre>{robotsContent}</pre>
  );
};

export default RobotsResponse;