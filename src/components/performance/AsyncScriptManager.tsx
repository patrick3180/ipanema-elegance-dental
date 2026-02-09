interface AsyncScriptManagerProps {
  gtmId?: string;
  enableTracking?: boolean;
  loadDelay?: number;
}

const AsyncScriptManager = (_props: AsyncScriptManagerProps) => {
  // Disabled - GTM is loaded via index.html
  return null;
};

export default AsyncScriptManager;
