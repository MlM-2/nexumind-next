"use client";

import { useEffect, useState } from "react";


import { AnimatePresence, motion, useInView } from "framer-motion";
import React from "react";
import { useTranslations } from "next-intl";
import Image from 'next/image';
const AboutUs = () => {
  const  t  = useTranslations();
  const [isMobile, setIsMobile] = useState(false);

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, margin: `0px` });

  const itemVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2 },
    },
  };

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    };

    updateIsMobile();

    const mediaQuery = window.matchMedia("(max-width: 767px)");

    mediaQuery.addEventListener("change", updateIsMobile);

    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
    };
  }, []);


  return (
    <motion.section id="aboutUs" className="bg-body-tertiary">
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10 col-sm-12 ">
          <div className="col-md-1"></div>
          <AnimatePresence mode="sync">
            <motion.div
              ref={ref}
              initial={{ width: "55%" }}
              animate={{ width: isInView ? (isMobile ? "100%" : "80%") : (isMobile ? "80%" : "55%") }}
              transition={{ duration: 1, delay: 0.5 }}
              className="row about-us-section"
              id="NexuMind"
            >
              <div className="col-md-8">
                <motion.h2
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="title"
                >
                  {t("about_us_title")}
                </motion.h2>
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                   exit="exit"
                  className="content"
                >
                  {t("about_us_content")}
                </motion.div>
              </div>
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                 exit="exit"
                className="col-md-4 about-us-section-img-container"
              >
                <Image 
                  loading="lazy"
                  className="about-us-section-img"
                  src="/img/about.webp"
                  width="360"
                  height="360"
                  alt="About us section"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutUs;