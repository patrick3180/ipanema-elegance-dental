import React, { useEffect } from 'react';

const RobotsResponse: React.FC = () => {
  useEffect(() => {
    // Simple robots.txt content
    const robotsContent = `User-agent: *
Allow: /

Sitemap: https://dra-carla-salles.lovableproject.com/sitemap.xml`;
    
    // Clear the document and write robots.txt content
    document.open();
    document.write(robotsContent);
    document.close();
  }, []);

  return null;
};

export default RobotsResponse;