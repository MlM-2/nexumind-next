/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

// OptimizedRecaptcha: Client Component required for:
// - useState, useEffect hooks for state management
// - useInView hook for intersection observer
// - Direct DOM manipulation for script loading
// This component has minimal SEO impact as it's loaded conditionally

import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface OptimizedRecaptchaProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  theme?: 'light' | 'dark';
  size?: 'compact' | 'normal';
  badge?: 'bottomright' | 'bottomleft' | 'inline';
  className?: string;
}

declare global {
  interface Window {
    grecaptcha: {
      render: (container: HTMLElement, options: any) => number;
      reset: (widgetId: number) => void;
      execute: (widgetId: number) => void;
    };
    onRecaptchaLoad?: () => void;
  }
}

const OptimizedRecaptcha: React.FC<OptimizedRecaptchaProps> = ({
  siteKey,
  onVerify,
  onError,
  onExpire,
  theme = 'light',
  size = 'normal',
  badge = 'bottomright',
  className = '',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [widgetId, setWidgetId] = useState<number | null>(null);
  const recaptchaRef = useRef<HTMLDivElement>(null);
  
  // Use intersection observer to load reCAPTCHA only when visible (performance optimization)
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '100px',
  });

  const setRefs = useCallback((node: HTMLDivElement) => {
    recaptchaRef.current = node;
    inViewRef(node);
  }, [inViewRef]);

  // Load reCAPTCHA script dynamically only when needed
  const loadRecaptcha = useCallback(() => {
    if (typeof window !== 'undefined' && !window.grecaptcha) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit&onload=onRecaptchaLoad';
      script.async = true;
      script.defer = true;
      
      window.onRecaptchaLoad = () => {
        setIsLoaded(true);
      };
      
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
        delete window.onRecaptchaLoad;
      };
    } else if (window.grecaptcha) {
      setIsLoaded(true);
    }
  }, []);

  // Render reCAPTCHA widget when ready
  const renderRecaptcha = useCallback(() => {
    if (isLoaded && window.grecaptcha && recaptchaRef.current && widgetId === null) {
      try {
        const id = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: siteKey,
          callback: onVerify,
          'error-callback': onError,
          'expired-callback': onExpire,
          theme,
          size,
          badge,
        });
        setWidgetId(id);
      } catch (error) {
        console.error('Error rendering reCAPTCHA:', error);
        onError?.();
      }
    }
  }, [isLoaded, siteKey, onVerify, onError, onExpire, theme, size, badge, widgetId]);

  // Utility functions for external use
  const resetRecaptcha = useCallback(() => {
    if (window.grecaptcha && widgetId !== null) {
      window.grecaptcha.reset(widgetId);
    }
  }, [widgetId]);

  const executeRecaptcha = useCallback(() => {
    if (window.grecaptcha && widgetId !== null) {
      window.grecaptcha.execute(widgetId);
    }
  }, [widgetId]);

  // Load reCAPTCHA when component comes into view
  useEffect(() => {
    if (inView) {
      loadRecaptcha();
    }
  }, [inView, loadRecaptcha]);

  // Render reCAPTCHA when script is loaded
  useEffect(() => {
    if (isLoaded) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(renderRecaptcha, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, renderRecaptcha]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.grecaptcha && widgetId !== null) {
        try {
          window.grecaptcha.reset(widgetId);
        } catch (error) {
          console.error('Error cleaning up reCAPTCHA:', error);
        }
      }
    };
  }, [widgetId]);

  // Show placeholder until component is in view
  if (!inView) {
    return (
      <div ref={inViewRef} className={`recaptcha-placeholder ${className}`}>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '78px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading reCAPTCHA...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`recaptcha-container ${className}`}>
      <div ref={setRefs} />
      {!isLoaded && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '78px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading reCAPTCHA...</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Higher-order component for easier integration
export const withOptimizedRecaptcha = <P extends object>(
  Component: React.ComponentType<P & { RecaptchaComponent: typeof OptimizedRecaptcha }>
) => {
  const WrappedComponent = (props: P) => (
    <Component {...props} RecaptchaComponent={OptimizedRecaptcha} />
  );
  
  WrappedComponent.displayName = `withOptimizedRecaptcha(${Component.displayName || Component.name})`;
  return WrappedComponent;
};

export default OptimizedRecaptcha; 