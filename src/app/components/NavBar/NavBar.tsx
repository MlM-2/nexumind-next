'use client';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import "../../styles/gototop.css";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "../../../i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";

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

  const pathSegments = pathname.split("/").filter((segment) => segment !== "");
  const currentLangFromPath = pathSegments[0] || "en";
  const initialTargetLocale = currentLangFromPath === "en" ? "ar" : "en";

  const routeSegments = pathSegments.slice(1);
  const initialTargetPathname = "/" + routeSegments.join("/");

  const [targetLocale] = useState(initialTargetLocale);
  const [targetPathname] = useState(initialTargetPathname);

  const [showGoToTop] = useState(false);
  const [, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const scrollToHash = () => {
        const hash = window.location.hash;
        if (hash) {
          const id = hash.substring(1);
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      };
 
      window.addEventListener("load", () => {
        setTimeout(scrollToHash, 100);
      });

      setTimeout(scrollToHash, 200);
  

      return () => {
        window.removeEventListener("load", () => {
          setTimeout(scrollToHash, 100);
        });
      };
    }
  }, []);
  

  const goToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // const allowedUrls = ["/terms", "/privacy"];
  // const handleScroll = (sectionId: string) => {
  //   const el = document.getElementById(sectionId);
  //   if (el) {
  //     el.scrollIntoView({ behavior: "smooth", block: "start" });
  
    
  //     router.replace(`${router.pathname}`, undefined, { shallow: true });
  //   }
  // };
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.nav
        initial={{ y: -71, opacity: 0.3 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        id="nav"
        className="navbar navbar-expand-lg bg-body-tertiary sticky-top border-bottom"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" href={"/"} aria-label="Home Page">
            <Image
              width={201}
              height={45}
              loading="lazy"
              className="logo-icon"
              src="/img/Logo.svg"
              alt="NexuMind Logo"
            />
          </Link>
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
            <motion.ul
              className="navbar-nav mb-md-2 mb-lg-0"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              transition={{
                delay: 0.2,
                duration: 0.5,
                staggerChildren: 0.1,
                delayChildren: 0.3,
              }}
            >
    {links.map((link) => (
  <motion.li
    variants={itemVariants}
    transition={{ duration: 0.5 }}
    className="nav-item"
    key={link.key}
  >
 <a
  href={link.value}
  onClick={(e) => {
    e.preventDefault();
    const id = link.value.replace("/", "").replace("#", "");
    
    if (pathname === "/en" || pathname === "/ar" || pathname === "/" || pathname === "/aboutUs" || pathname === "/solutions"  || pathname === "/news" ||  pathname === "/products"  ) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(id);
      
        window.history.pushState({}, '', `/${id}`);
      }
    } else {

      window.location.href = `/#${id}`;
    }
  }}
  className={`nav-link ${pathname.endsWith(link.value) ? "active-link" : ""}`}
>
  {link.label}
</a>




  </motion.li>
))}
              <motion.li
                id="lang-icon"
                variants={itemVariants}
                transition={{ duration: 0.5 }}
                className="nav-item"
              >
                <a
                  href={targetPathname}
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof window !== "undefined") {
                      window.location.href = `/${targetLocale}${targetPathname}`;
                    }
                  }}
                  className="nav-link"
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
                </a>
              </motion.li>
            </motion.ul>
          </div>
        </div>
      </motion.nav>
      {showGoToTop && (
        <motion.div
          initial={{ x: 80 }}
          animate={{ x: 0 }}
          exit={{ x: 80 }}
          transition={{ duration: 0.3 }}
          className="go-to-top"
          onClick={goToTop}
        >
          <FontAwesomeIcon icon={faAngleUp} className="fa-fw" />
        </motion.div>
      )}
    </>
  );
}

export default NavBar; 