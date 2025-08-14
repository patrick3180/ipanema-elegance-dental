import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const FooterSkeleton = () => {
  return (
    <footer className="bg-muted/50 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Column 1 */}
          <div>
            <Skeleton className="h-6 w-24 mb-4" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <Skeleton className="h-6 w-20 mb-4" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          {/* Column 3 */}
          <div>
            <Skeleton className="h-6 w-28 mb-4" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t pt-6">
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>
      </div>
    </footer>
  );
};

export default FooterSkeleton;