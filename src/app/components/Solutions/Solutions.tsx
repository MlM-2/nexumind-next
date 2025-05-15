
import React from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from 'next/image';
export const Solutions = () => {
  const  t  = useTranslations();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: `80px` });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 1.2 }}
      id="solutions"
      className="container-fluid"
    >
      <h2 className="solutions-title text-center">{t("solutions_title")}</h2>
      <div className="row row-cols-1 row-cols-lg-4 row-cols-md-2 row-cols-sm-2 g-2 row-gap-5">
        <div className="col">
          <div className="card h-100 rounded-4 p-4">
            <Image
              loading="lazy"
              src="/img/AI Development.webp"
              width="102"
              height="102"
              className=""
              alt="AI Development"
            />
            <div className="card-body">
              <h3 className="card-title">{t("solution2_title")}</h3>
              <p className="card-text">{t("solution2_text")}</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 rounded-4 p-4">
            <Image
              loading="lazy"
              src="/img/AI Integration.webp"
              width="102"
                height="102"
              className=""
              alt="AI Integration"
            />
            <div className="card-body">
              <h3 className="card-title">{t("solution3_title")}</h3>
              <p className="card-text">{t("solution3_text")}</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 rounded-4 p-4">
            <Image
              loading="lazy"
              src="/img/AI Consulting.webp"
              width="102"
                height="102"
              className=""
              alt="AI Consulting"
            />
            <div className="card-body">
              <h3 className="card-title">{t("solution1_title")}</h3>
              <p className="card-text">{t("solution1_text")}</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 rounded-4 p-4">
            <Image
              loading="lazy"
              src="/img/Data Analytics.webp"
              width="102"
                height="102"
              className=""
              alt="Data Analytics"
            />
            <div className="card-body">
              <h3 className="card-title">{t("solution4_title")}</h3>
              <p className="card-text">{t("solution4_text")}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Solutions;
