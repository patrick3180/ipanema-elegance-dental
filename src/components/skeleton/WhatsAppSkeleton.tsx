import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const WhatsAppSkeleton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <Skeleton className="w-16 h-16 rounded-full" />
        <Skeleton className="absolute -top-1 -right-1 w-6 h-6 rounded-full" />
      </div>
    </div>
  );
};

export default WhatsAppSkeleton;