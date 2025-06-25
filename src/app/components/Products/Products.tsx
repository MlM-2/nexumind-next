import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import React from "react";
import Image from 'next/image';

const Products = () => {
  const  t  = useTranslations();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: `80px` });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 1.2 }}
      id="products"
      // className="bg-body-tertiary"
    >
      <h2 className="products-title text-center">{t("products_title")}</h2>
      <br />
      <br />
      <div className="row mb-5 product align-items-center pb-5">
        {}
        <div className="col-md-5 order-md-1 px-md-3">
          <div className="product-img px-md-3">
            <Image
            width={500}
            height={200}
              src={t("product0_img")}
              alt={t("product0_title")}
              className="img-fluid"
             priority
            />
          </div>
        </div>
        <div className="col-md-7 order-md-2 my-1 my-md-5 px-md-5">
          <div className="product-title">
            <a
              href={t("product0_url")}
              style={{
                textDecoration: "none",
                color: "var(--secondary-color)",
              }}
              target="_blank"
            >
              {t("product0_title")} <Image width={24}height={24}src="/img/ext-link.webp" alt="" />
            </a>
          </div>
          <div className="product-desc lh-lg">{t("product0_text")}</div>
        </div>
        {}
      </div>
      <div className="row mb-5 product align-items-center pt-5">
        {}
        <div className="col-md-5 order-md-2 px-md-3">
          <div className="product-img px-md-3">
            <Image
                    width={500}
                    height={200}
              src={t("product1_img")}
              alt={t("product1_title")}
              className="img-fluid"
              loading="lazy"
              
            />
          </div>
        </div>
        <div className="col-md-7 order-md-1 my-1 my-md-5 px-md-5">
          <div className="product-title">
          <a
  href={t("product1_url")}
  style={{
    textDecoration: "none",
    color: "var(--secondary-color)",
  }}
  target="_blank"
  rel="noopener noreferrer"
>
  {t("product1_title")}
  <Image
    width={24}
    height={24}
    src="/img/ext-link.webp"
    alt=""
    style={{ display: "inline", marginLeft: 8 }}
  />
</a>

          </div>
          <div className="product-desc lh-lg">{t("product1_text")}</div>
        </div>
        {}
      </div>
      <div className="row mb-5 product align-items-center pb-5">
        {}
        <div className="col-md-5 order-md-1 px-md-3">
          <div className="product-img px-md-3">
            <Image
                    width={500}
                    height={200}
              src={t("product2_img")}
              alt={t("product2_title")}
              className="img-fluid"
              loading="lazy"
            />
          </div>
        </div>
        <div className="col-md-7 order-md-2 my-1 my-md-5 px-md-5">
          <div className="product-title">
            <a
              href={t("product2_url")}
              style={{
                textDecoration: "none",
                color: "var(--secondary-color)",
              }}
              target="_blank"
            >
              {t("product2_title")} <Image width={24}height={24}src="/img/ext-link.webp" alt="" />
            </a>
          </div>
          <div className="product-desc lh-lg">{t("product2_text")}</div>
        </div>
        {}
      </div>
    </motion.section>
  );
};

export default Products;
