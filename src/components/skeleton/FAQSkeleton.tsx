import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const FAQSkeleton = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Title */}
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-80 mx-auto" />
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border rounded-lg p-6">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSkeleton;