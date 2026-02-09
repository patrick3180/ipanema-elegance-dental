interface LazyScriptLoaderProps {
  children?: React.ReactNode;
}

const LazyScriptLoader = ({ children }: LazyScriptLoaderProps) => {
  // Disabled - GTM is loaded via index.html
  return <>{children}</>;
};

export default LazyScriptLoader;
