import React from 'react';
import { CSSOptimizer } from './CSSOptimizer';
import { JavaScriptOptimizer } from './JavaScriptOptimizer';
import { CompressionOptimizer } from './CompressionOptimizer';

interface Phase1OptimizerProps {
  enabled?: boolean;
}

export const Phase1Optimizer = ({ enabled = true }: Phase1OptimizerProps) => {
  if (!enabled) return null;

  return (
    <>
      <CSSOptimizer 
        enableCriticalCSS={false}
        enableAsyncCSS={false}
        enableUnusedCSSRemoval={false}
      />
      <JavaScriptOptimizer 
        enableCodeSplitting={false}
        enableDeferLoading={false}
        enablePreloading={false}
      />
      <CompressionOptimizer 
        enableGzipCheck={false}
        enableBrotliCheck={false}
        enableCaching={true}
      />
    </>
  );
};