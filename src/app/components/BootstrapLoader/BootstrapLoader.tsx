"use client";

import { useEffect } from 'react';

interface BootstrapLoaderProps {
  isArabic: boolean;
}

const BootstrapLoader = ({ isArabic }: BootstrapLoaderProps) => {
  useEffect(() => {
    // Bootstrap CSS URLs
    const bootstrapHref = isArabic
      ? 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css'
      : 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';

    const otherBootstrapHref = isArabic
      ? 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
      : 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css';

    // Your custom styles URLs
    const customStyleHref = isArabic
      ? '/styles/style-ar.css'
      : '/styles/style-en.css';

    const otherCustomStyleHref = isArabic
      ? '/styles/style-en.css'
      : '/styles/style-ar.css';

    // Helper function to add preload + stylesheet link
    function addStylesheet(href: string) {
      if (document.querySelector(`link[href="${href}"]`)) return;

      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      link.onload = () => {
        link.rel = 'stylesheet';
      };
      document.head.appendChild(link);
    }

    // Helper function to preload only (no onload switch)
    function preloadStylesheet(href: string) {
      if (document.querySelector(`link[href="${href}"]`)) return;

      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    }

    // Add bootstrap main stylesheet
    addStylesheet(bootstrapHref);
    // Preload the other bootstrap for faster switching
    preloadStylesheet(otherBootstrapHref);

    // Add your custom styles main stylesheet
    addStylesheet(customStyleHref);
    // Preload other custom style for faster switching
    preloadStylesheet(otherCustomStyleHref);

  }, [isArabic]);

  return null;
};

export default BootstrapLoader;
