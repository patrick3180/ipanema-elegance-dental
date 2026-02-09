import React from 'react';

interface GTMManagerProps {
  gtmId?: string;
}

export const GTMManager: React.FC<GTMManagerProps> = () => {
  // GTM is now loaded via index.html - this component is disabled to prevent duplicate loading
  return null;
};
