'use client';

import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from "../../../i18n/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const LandingSection = () => {
  const pathname = usePathname();
  const [, setActiveSection] = useState<string | null>(null);
  const currentLang = useLocale();
  const t = useTranslations();

  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, 1200); 
    return () => clearTimeout(timer);
  }, []);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, linkValue: string) => {
    e.preventDefault();
    const id = linkValue.replace("/", "").replace("#", "");

    const allowedPaths = ["/en", "/ar", "/", "/aboutUs", "/solutions", "/news", "/products", "/getStarted"];
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

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 2 }}
      id="landingPage"
      className="row section-hidden"
    >
      <div className="landing-page-text">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="display-1 fw-bold fs-0 fs-md-1 fs-lg-3"
        >
          {t('landing_title_line1')}
          {currentLang === 'en' && <br />}
          {t('landing_title_line2')}{" "}
          <span className="title-highlited">{t('landing_title_highlight')}</span>
        </motion.h1>

        <motion.p
          initial={{ y: -30, opacity: 0 }}
          animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="display-1 fs-1 fs-md-2 fs-lg-4"
        >
          {t("lead")}
          <Link
            className="button"
            onClick={(e) => handleNavLinkClick(e, "/getStarted")}
            aria-label="Get Started"
            href=""
          >
            <span className="button-text">{t("get_started")}</span>
          </Link>
        </motion.p>
      </div>

      <div className="landing-page-img">
        <motion.div
          initial={{
            scaleX: currentLang === "ar" ? -1 : 1,
            x: currentLang === "ar" ? -100 : 100,
            opacity: 0.0,
          }}
          animate={shouldAnimate ? { x: 0, opacity: 1 } : { x: currentLang === "ar" ? -100 : 100, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: "inline-block" }}
        >
          <LazyLoadImage
            placeholderSrc="/img/landing-sm.webp"
            src="/img/landing.webp"
            alt="Revolutionizing the Future with AI"
            effect="blur"
            style={{ width: '100%', height: '100%' }}
            visibleByDefault={true}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default LandingSection;
