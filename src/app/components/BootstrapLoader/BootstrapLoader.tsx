"use client";

import { useEffect } from 'react';

interface BootstrapLoaderProps {
  isArabic: boolean;
}

const BootstrapLoader = ({ isArabic }: BootstrapLoaderProps) => {
  useEffect(() => {
    const bootstrapHref = isArabic
      ? 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css'
      : 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';

    // Prevent re-adding the link if it already exists
    if (document.querySelector(`link[href="${bootstrapHref}"]`)) {
      return;
    }

    // Create the primary link as a preloaded stylesheet
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = bootstrapHref;
    
    // When it loads, change its rel to 'stylesheet' to apply the styles non-blockingly
    link.onload = () => {
      link.rel = 'stylesheet';
    };

    document.head.appendChild(link);

    // Preload the other stylesheet for faster language switching
    const otherBootstrapHref = isArabic
      ? 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
      : 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css';
    
    if (!document.querySelector(`link[href="${otherBootstrapHref}"]`)) {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'style';
      preloadLink.href = otherBootstrapHref;
      document.head.appendChild(preloadLink);
    }

    // No cleanup function is needed as we want the styles to persist across page navigations.
  }, [isArabic]);

  return null; // This component doesn't render anything itself
};

export default BootstrapLoader; 