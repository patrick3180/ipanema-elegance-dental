import React, { useEffect } from 'react';
import { handleRobotsRequest } from '@/api/robots';

const RobotsResponse: React.FC = () => {
  useEffect(() => {
    const response = handleRobotsRequest();
    response.text().then(content => {
      // Clear the document and write robots.txt content
      document.open();
      document.write(content);
      document.close();
    });
  }, []);

  return null;
};

export default RobotsResponse;