/* eslint-disable @next/next/no-img-element */
"use client";

import {
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations , useLocale } from "next-intl";
import { useEffect } from "react";
// import Image from 'next/image'; // Temporarily removed to fix hydration issues

interface Link {
  text: string;
  url: string;
}

const Footer = () => {
  const  t  = useTranslations();
  const currentLang = useLocale();

  const footer_line1 = t.raw('footer_line1') as Link[];

  useEffect(() => {
   const scrollToHash = () => {
      // alert(window.scrollY);
      if (window.scrollY > 0) return;
      // console.log(location.pathname.substring(4));
      const elementId = location.pathname.substring(4);
      if (elementId) {
        // const elementId = hash.substring(1); // Remove the '#' character
        const element = document.getElementById(elementId);
        console.log(element);

        if (element) {
          // Calculate the top position and apply the offset
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = window.scrollY + elementPosition; // window.scrollY + elementPosition - 30 70px offset
          // console.log(element,elementId);

          // Scroll to the adjusted position smoothly
          // window.addEventListener("focus", () => {
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
          element.scrollIntoView({ behavior: "smooth" });
          // });

          // element.scrollIntoView({ behavior: "smooth" });

          // window.scrollTo({
          //   top: offsetPosition,
          //   behavior: "smooth",
          // });
        }
      }
      // else alert(elementId);
    };

    // Scroll when the component mounts
    scrollToHash();

    document.addEventListener("DOMContentLoaded", scrollToHash);

    // Listen for hash changes
    window.addEventListener("focus", scrollToHash);

    // Clean up event listener
    return () => {
      window.removeEventListener("focus", scrollToHash);
      document.removeEventListener("DOMContentLoaded", scrollToHash);
    };
  }, []);

  return (
    <footer
      id="footer"
      className="footer p-1"
      // style={{
      //   position: "fixed",
      //   bottom: 0,
      //   left: 0,
      //   right: 0,
      //   zIndex: 0,
      //   height: "100vh",
      // }}
    >
      <div className="footer-content ">
        <div className="row align-items-center line-one mb-5">
          <div
            className={
             currentLang == "en"
                ? "col-12 col-md text-center text-md-end"
                : "col-12 col-md text-center text-md-start"
            }
          >
            <a
              href={"/" +currentLang + footer_line1[0].url}
              className="text-decoration-none"
            >
              {footer_line1[0].text}
            </a>
            <span className="mx-2"> </span>
            <a
              href={"/" +currentLang + footer_line1[1].url}
              className="text-decoration-none"
            >
              {footer_line1[1].text}
            </a>
          </div>
          <div
            className={
             currentLang == "en"
                ? "col-12 col-md-2 text-center"
                : "col-12 col-md-2 text-center"
            }
          >
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
          <div
            className={
             currentLang == "en"
                ? "col-12 col-md text-center text-md-start text-white"
                : "col-12 col-md text-center text-md-end text-white"
            }
          >
            <div className="social-icons-container flex-md-row">
              <div>
                <a
                  href="https://x.com/NexuMind"
                  className="mx-4 my-2 my-md-0"
                  aria-label="NexuMind on X"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    icon={faTwitter}
                    className="fa-fw social-icons"
                  />
                </a>
              </div>
              <div>
                <a
                  href="https://youtube.com/@nexumind"
                  className="mx-4 my-2 my-md-0"
                  aria-label="NexuMind on Youtube"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    icon={faYoutube}
                    className="fa-fw social-icons"
                  />
                </a>
              </div>
              <div>
                <a
                  href="https://www.linkedin.com/company/nexumind/"
                  className="mx-4 my-2 my-md-0"
                  aria-label="NexuMind on Linkedin"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="fa-fw social-icons"
                  />
                </a>
              </div>
              <div>
                <a
                  href="https://www.instagram.com/nexumindai"
                  className="mx-4 my-2 my-md-0"
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
        </div>
        <div className="row align-items-center line-two">
          <div className="col text-center">
            {t("footer_copyright")}
            <br />
            {t("company_info")}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
