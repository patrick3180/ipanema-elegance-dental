import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SocialProofSkeleton = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Title Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-96 mx-auto mb-4" />
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-12 w-24 mx-auto mb-2" />
              <Skeleton className="h-5 w-32 mx-auto" />
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card p-6 rounded-xl shadow-sm">
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Skeleton key={star} className="w-4 h-4" />
                ))}
              </div>
              <Skeleton className="h-20 w-full mb-4" />
              <Skeleton className="h-5 w-24" />
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-12 text-center">
          <Skeleton className="h-6 w-64 mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default SocialProofSkeleton;