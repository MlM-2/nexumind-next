'use client';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import "../../styles/gototop.css";
import Image from "next/image";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "../../../i18n/navigation";
import { useTranslations, useLocale } from "next-intl";

interface Link {
  key: string;
  value: string; 
  label: string;
}

function NavBar() {
  const t = useTranslations();
  const links = (t.raw("links") as Link[]) || [];
  const [isOpen, setIsOpen] = useState(false);
  const currentLang = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  // State for managing client-side rendering and hydration
  const [mounted, setMounted] = useState(false);
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Determine the target locale for language switching
  const targetLocale = currentLang === "en" ? "ar" : "en";

  // Get the current path without the locale prefix to use for language switching
  const pathnameWithoutLocale = pathname.replace(`/${currentLang}`, '') || '/';

  useEffect(() => {
    setMounted(true);
  
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowGoToTop(true);
      } else {
        setShowGoToTop(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    const scrollToId = sessionStorage.getItem('scrollToId');
  
    if (scrollToId) {
      sessionStorage.removeItem('scrollToId');
  
      const element = document.getElementById(scrollToId);
  
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
          if (currentLang !== undefined && currentLang !== null) {
               window.history.pushState({}, '', `/${currentLang}/${scrollToId}`);
          } else {
               console.warn("currentLang is not available for history update. Using default path.");
               window.history.pushState({}, '', `/${scrollToId}`);
          }
 
  
        }, 100);
      }
    }
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  
  }, [currentLang]);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = () => {
    const preservedSections = ['aboutUs', 'products', 'solutions','news'];

    if (currentLang === 'ar' && pathname.includes('/news/arabic-')) {
      const slug = pathname.split('/news/arabic-')[1];
      const newPath = `/news/arabic-${slug}`;
      console.log("Arabic to English news path:", newPath);
      router.push(
        newPath,
    { locale: targetLocale }
  );

      return;
    }
    if (currentLang === 'en' && pathname.includes('/news/arabic-')) {
      const slug = pathname.split('/news/arabic-')[1];
      const newPath = `/news/arabic-${slug}`;
      console.log("English to Arabic news path:", newPath);
      router.push(
        newPath,
        { locale: targetLocale }
      );
    

      return;
    }
  

    // Get current section from pathname or active section state
    const currentSectionFromPath = preservedSections.find(section => 
      pathname.includes(`/${section}`)
    );
    
    // Use either the section from URL or the actively selected section
    const currentSection = currentSectionFromPath || activeSection;

    // If we're on a section that should be preserved
    if (currentSection) {
      // Store the section to navigate to after language change
      sessionStorage.setItem('scrollToId', currentSection);
      
      // Navigate to home page with the new language
      router.push('/', { locale: targetLocale });
      return;
    }
    
    // Default case - just switch the language while preserving the current path
    if (pathnameWithoutLocale === '/') {
      // If we're on the home page
      router.push('/', { locale: targetLocale });
    } else {
      // For other pages, preserve the path
      router.push(pathnameWithoutLocale, { locale: targetLocale });
    }
  };

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, linkValue: string) => {
    e.preventDefault();
    const id = linkValue.replace("/", "").replace("#", "");
    console.log(pathname);
  
    const allowedPaths = ["/en", "/ar", "/", "/aboutUs", "/solutions", "/news", "/products"];
  
    const isAllowedPath = allowedPaths.includes(pathname);
  
    const targetElement = document.getElementById(id);
  
    if (targetElement && isAllowedPath) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
      window.history.pushState({}, '', `/${currentLang}/${id}`);
    } else {
      sessionStorage.setItem('scrollToId', id);
      window.location.href = `/${currentLang}`;
    }
  };
  

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Render placeholder until hydration is complete to avoid mismatch
  if (!mounted) {
    return (
      <nav id="nav" className="navbar navbar-expand-lg bg-body-tertiary sticky-top border-bottom" style={{ opacity: 0 }}>
        <div className="container-fluid">
          <a href={`/${currentLang}`} className="navbar-brand" aria-label="Home Page">
            <Image
              width={200}
              height={200}
              loading="lazy"
              className="logo-icon"
              src="/img/Logo.svg"
              alt="NexuMind Logo"
            />
          </a>
          {/* Minimal placeholder content during initial render */}
        </div>
      </nav>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <>
        <m.nav
          id="nav"
          className="navbar navbar-expand-lg bg-body-tertiary sticky-top border-bottom"
          initial={{ y: -71, opacity: 0.3 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="container-fluid">
            <a 
              onClick={(e) => {
                e.preventDefault();
                router.push('/', { locale: currentLang });
              }}
              href={`/${currentLang}`} 
              className="navbar-brand" 
              aria-label="Home Page"
            >
              <Image
                width={200}
                height={200}
                loading="lazy"
                className="logo-icon"
                src="/img/Logo.svg"
                alt="NexuMind Logo"
              />
            </a>
            <button
              className={`navbar-toggler d-flex d-lg-none flex-column justify-content-around ${
                isOpen ? "" : "collapsed"
              }`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              onClick={toggleMenu}
              aria-controls="navbarNav"
              aria-expanded={isOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <span className="toggler-icon top-bar"></span>
              <span className="toggler-icon middle-bar"></span>
              <span className="toggler-icon bottom-bar"></span>
            </button>
            <div
              className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
              id="navbarNav"
            >
              <m.ul
                className="navbar-nav mb-md-2 mb-lg-0"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                {links.map((link) => (
                  <m.li
                    variants={itemVariants}
                    transition={{ duration: 0.5 }}
                    className="nav-item"
                    key={link.key}
                  >
                    <a
                      href={link.value}
                      onClick={(e) => handleNavLinkClick(e, link.value)}
                      className={`nav-link ${pathname.endsWith(link.value) ? "active-link" : ""}`}
                    >
                      {link.label}
                    </a>
                  </m.li>
                ))}
                <m.li
                  id="lang-icon"
                  variants={itemVariants}
                  transition={{ duration: 0.5 }}
                  className="nav-item"
                >
                  <button 
                    onClick={handleLanguageChange}
                    type="button"
                    className="nav-link bg-transparent border-0"
                  >
                    <Image
                      width={24}
                      height={24}
                      loading="lazy"
                      src={
                        currentLang === "en"
                          ? "/img/englisLang-24.svg"
                          : "/img/arabicLang-24.svg"
                      }
                      alt="Language Icon"
                      className="d-md-block d-none"
                    />
                    <span className="arabic-font lang-text px-3">
                      {currentLang === "en" ? " العربية" : " English"}
                    </span>
                  </button>
                </m.li>
              </m.ul>
            </div>
          </div>
        </m.nav>
        
        <AnimatePresence>
          {showGoToTop && (
            <m.div
              className="go-to-top"
              onClick={goToTop}
              initial={{ x: 80 }}
              animate={{ x: 0 }}
              exit={{ x: 80 }}
              transition={{ duration: 0.3 }}
            >
              <FontAwesomeIcon icon={faAngleUp} className="fa-fw" />
            </m.div>
          )}
        </AnimatePresence>
      </>
    </LazyMotion>
  );
}

export default NavBar; 