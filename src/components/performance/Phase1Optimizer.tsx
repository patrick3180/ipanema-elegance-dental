import { CSSOptimizer } from './CSSOptimizer';
import { JavaScriptOptimizer } from './JavaScriptOptimizer';
import { CompressionOptimizer } from './CompressionOptimizer';
import CriticalCSSExtractor from './CriticalCSSExtractor';
import LCPOptimizer from './LCPOptimizer';

interface Phase1OptimizerProps {
  enabled?: boolean;
}

export const Phase1Optimizer = ({ enabled = true }: Phase1OptimizerProps) => {
  if (!enabled) return null;

  return (
    <>
      <LCPOptimizer 
        targetLCP={2500}
        enableEmergencyMode={true}
        enableInlineCSS={true}
      />
      <CriticalCSSExtractor 
        enableInlineCSS={true}
        enableAsyncCSS={true}
        criticalViewportHeight={800}
      />
      <CSSOptimizer 
        enableCriticalCSS={true}
        enableAsyncCSS={true}
        enableUnusedCSSRemoval={false}
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