import React, { useEffect } from 'react';
import { handleSitemapRequest } from '@/api/sitemap';

const SitemapResponse: React.FC = () => {
  useEffect(() => {
    handleSitemapRequest().then(response => {
      response.text().then(content => {
        // Clear the document and write sitemap content
        document.open();
        document.write(content);
        document.close();
      });
    });
  }, []);

  return null;
};

export default SitemapResponse;