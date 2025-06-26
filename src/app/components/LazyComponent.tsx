import { lazy, Suspense, ComponentType } from 'react';

interface LazyComponentProps {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

const DefaultFallback = () => (
  <div className="d-flex justify-content-center align-items-center p-4">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

// Server Component - removed 'use client'
const LazyWrapper: React.FC<LazyComponentProps> = ({ 
  children, 
  fallback = <DefaultFallback />,
  className = ''
}) => (
  <div className={className}>
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  </div>
);

// Higher-order component for lazy loading with better SSR support
export const withLazyLoading = <P extends object>(
  importFunc: () => Promise<{ default: ComponentType<P> }>,
  fallback?: React.ReactNode
) => {
  const LazyComponent = lazy(importFunc);
  
  const LazyWrapperHOC = (props: P) => (
    <Suspense fallback={fallback || <DefaultFallback />}>
      <LazyComponent {...props} />
    </Suspense>
  );
  
  LazyWrapperHOC.displayName = 'LazyWrapper';
  return LazyWrapperHOC;
};

// Dynamic section loader for better performance and SEO
export const LazySection: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}> = ({ 
  children, 
  fallback = <DefaultFallback />,
  className = ''
}) => {
  return (
    <div className={className}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </div>
  );
};

export default LazyWrapper; 