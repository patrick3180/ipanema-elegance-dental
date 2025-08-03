import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SEODashboardErrorProps {
  error: Error | string;
  onRetry?: () => void;
  title?: string;
}

const SEODashboardError: React.FC<SEODashboardErrorProps> = ({ 
  error, 
  onRetry, 
  title = "Dashboard Error" 
}) => {
  const errorMessage = error instanceof Error ? error.message : error;
  
  return (
    <Card className="border-destructive/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="font-medium">
            {errorMessage}
          </AlertDescription>
        </Alert>
        
        <div className="text-sm text-muted-foreground space-y-2">
          <p>Possible solutions:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Check your internet connection</li>
            <li>Verify Contentful configuration</li>
            <li>Clear browser cache and reload</li>
            <li>Wait a moment and try again</li>
          </ul>
        </div>
        
        {onRetry && (
          <Button 
            onClick={onRetry}
            variant="outline"
            className="w-full"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SEODashboardError;