/* eslint-disable @next/next/no-img-element */
"use client";

import {
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations, useLocale } from "next-intl";
import { useEffect } from "react";

interface Link {
  text: string;
  url: string;
}

const Footer = () => {
  const t = useTranslations();
  const currentLang = useLocale();

  const footer_line1 = t.raw('footer_line1') as Link[];

  // ... (useEffect hook remains unchanged)
  useEffect(() => {
   const scrollToHash = () => {
      if (window.scrollY > 0) return;
      const elementId = location.pathname.substring(4);
      if (elementId) {
        const element = document.getElementById(elementId);
        if (element) {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = window.scrollY + elementPosition;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    scrollToHash();
    document.addEventListener("DOMContentLoaded", scrollToHash);
    window.addEventListener("focus", scrollToHash);
    return () => {
      window.removeEventListener("focus", scrollToHash);
      document.removeEventListener("DOMContentLoaded", scrollToHash);
    };
  }, []);


  return (
    <footer id="footer" className="footer p-1">
      <div className="footer-content ">
        {/* Changed row to use flexbox for alignment */}
        <div className="row align-items-center justify-content-between">
          
          {/* Left Elements */}
          <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-start mb-4 mb-md-0 mt-4 mt-md-0" style={{ fontSize: '1.8rem' }}>
            <a
              href={"/" + currentLang + footer_line1[0].url}
              className="text-decoration-none"
              style={{ color: 'var(--primary-color)', transition: 'color 0.5s' }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--body-color)'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--primary-color)'}
            >
              {footer_line1[0].text}
            </a>
            <a
              href={"/" + currentLang + footer_line1[1].url}
              className="text-decoration-none ms-3"
              style={{ color: 'var(--primary-color)', transition: 'color 0.5s' }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--body-color)'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--primary-color)'}
            >
              {footer_line1[1].text}
            </a>
          </div>

          {/* Center Logo */}
          <div className="col-12 col-md-auto text-center mb-4 mb-md-0">
            <img
              width={200}
              height={200}
              loading="lazy"
              className="logo-icon img-fluid"
              src="/img/Logo.svg"
              alt="NexuMind Logo"
              style={{ width: 'auto', height: 'auto', maxHeight: '60px' }}
            />
          </div>
          
          {/* Right Social Icons */}
          <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-end" style={{ fontSize: '1.5rem' }}>
            <div className="social-icons-container d-flex">
                <a
                  href="https://x.com/NexuMind"
                className="mx-3"
                  aria-label="NexuMind on X"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    icon={faTwitter}
                    className="fa-fw social-icons"
                  />
                </a>
                <a
                  href="https://youtube.com/@nexumind"
                className="mx-3"
                  aria-label="NexuMind on Youtube"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    icon={faYoutube}
                    className="fa-fw social-icons"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/nexumind/"
                className="mx-3"
                  aria-label="NexuMind on Linkedin"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="fa-fw social-icons"
                  />
                </a>
                <a
                  href="https://www.instagram.com/nexumindai"
                className="mx-3"
                  aria-label="NexuMind on Instagram"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="fa-fw social-icons"
                  />
                </a>
              </div>
            </div>
          </div>

        {/* Added horizontal line */}
        <hr style={{ borderColor: 'rgba(255, 255, 255, 0.5)', marginTop: '3.5rem', marginBottom: '1.2rem' }} />

        <div className="row align-items-center">
          <div className="col text-center" style={{ fontSize: '1.6rem', marginBottom: '2.5rem' }}>
            {t("footer_copyright")}
            <br />
            <div className="company-info " style={{ fontSize: '1.6rem' }}>
              <span className="d-block d-md-inline">{t("company_info_line1")}</span>
              <span className="d-block d-md-inline"> {t("company_info_line2")}</span>
              <span className="d-block d-md-inline"> {t("company_info_line3")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;