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
        enableCriticalCSS={true}
        enableAsyncCSS={true}
        enableUnusedCSSRemoval={true}
      />
      <JavaScriptOptimizer 
        enableCodeSplitting={true}
        enableDeferLoading={true}
        enablePreloading={true}
      />
      <CompressionOptimizer 
        enableGzipCheck={true}
        enableBrotliCheck={true}
        enableCaching={true}
      />
    </>
  );
};