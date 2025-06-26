// Font optimization utilities
export const fontDisplaySwapCSS = `
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url('https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5fBBc4.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc4.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc4.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'Tajawal';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url('https://fonts.gstatic.com/s/tajawal/v9/Iura6YBj_oCad4k1l_6gLrZjilB_-Ar1D35iEA.woff2') format('woff2');
    unicode-range: U+0600-06FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE80-FEFC;
  }
  
  @font-face {
    font-family: 'Tajawal';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('https://fonts.gstatic.com/s/tajawal/v9/Iura6YBj_oCad4k1l_6gLrZjimy_-Ar1D35iEA.woff2') format('woff2');
    unicode-range: U+0600-06FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE80-FEFC;
  }
  
  @font-face {
    font-family: 'Tajawal';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('https://fonts.gstatic.com/s/tajawal/v9/Iura6YBj_oCad4k1l_6gLrZjinC_-Ar1D35iEA.woff2') format('woff2');
    unicode-range: U+0600-06FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE80-FEFC;
  }
  
  @font-face {
    font-family: 'Tajawal';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('https://fonts.gstatic.com/s/tajawal/v9/Iura6YBj_oCad4k1l_6gLrZjimS_-Ar1D35iEA.woff2') format('woff2');
    unicode-range: U+0600-06FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE80-FEFC;
  }
`;

// Generate optimized font CSS based on locale
export const generateFontCSS = (locale: string) => {
  const isArabic = locale === 'ar';
  
  if (isArabic) {
    return `
      :root {
        --font-primary: 'Tajawal', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        --font-secondary: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }
      
      body {
        font-family: var(--font-primary);
        font-display: swap;
      }
      
      .font-en {
        font-family: var(--font-secondary);
      }
    `;
  } else {
    return `
      :root {
        --font-primary: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        --font-secondary: 'Tajawal', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }
      
      body {
        font-family: var(--font-primary);
        font-display: swap;
      }
      
      .font-ar {
        font-family: var(--font-secondary);
      }
    `;
  }
};

// Font preload links for critical fonts
export const getFontPreloadLinks = (locale: string) => {
  const isArabic = locale === 'ar';
  
  const commonLinks = [
    {
      rel: 'preload',
      href: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous'
    }
  ];
  
  const arabicLinks = [
    {
      rel: 'preload',
      href: 'https://fonts.gstatic.com/s/tajawal/v9/Iura6YBj_oCad4k1l_6gLrZjimy_-Ar1D35iEA.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous'
    }
  ];
  
  return isArabic ? [...commonLinks, ...arabicLinks] : commonLinks;
};

// CSS for preventing layout shift
export const layoutShiftPreventionCSS = `
  /* Prevent layout shift during font loading */
  .font-loading {
    font-display: swap;
    visibility: hidden;
  }
  
  .font-loaded {
    visibility: visible;
  }
  
  /* Size fallbacks for common text elements */
  h1, h2, h3, h4, h5, h6 {
    font-synthesis: none;
  }
  
  /* Optimize text rendering */
  body {
    text-rendering: optimizeSpeed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Reduce repaints */
  * {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
`; 