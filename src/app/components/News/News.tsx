"use client";

import { motion, useInView } from "framer-motion";
import React from "react";
// import { getNews } from "../../utils/getNews";
// import { NewsItem } from "../../utils/getNews";
import { useTranslations, useLocale } from "next-intl";
import Image from 'next/image';
import Link from 'next/link';

const News = () => {
  const t = useTranslations();
  const tNews = useTranslations("News");
  const currentLang = useLocale();


  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: `80px` });


  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 1.2 }}
      id="news"
    >
      <h2 id="news-title" className="text-center">
        {t("news_title")}
      </h2>
      <br />
      <br />
      {/* {news.map((item) => ( */}
      <div className="row mb-5 align-items-center pb-5">
        <div className="row">
          <div className="d-flex justify-content-center news-img">
            <Image
            height={564}
            width={1000}
              src={tNews("image")}
              alt={tNews("product0_title")}
              className="img-fluid"
              loading="lazy"
            />
          </div>
        </div>
        <div className="col-md-12 my-1 my-md-5 px-md-5 news-content">
          <div className="news-title">
            <Link
              href={`/${currentLang}/news/arabic-ai-shopping-assistant-launch`}
              style={{
                textDecoration: "none",
                color: "var(--secondary-color)",
              }}
            >
              {tNews("title")}
            </Link>
          </div>
          <div className="news-desc lh-lg mx-2">
            {/* // dangerouslySetInnerHTML={{ __html: item.desc }} */}
            {tNews("desc_part1")}{" "}
            <a
              href="https://rakhys.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong className="text-primary">{tNews("brand")}</strong> {""}
            </a>
            {tNews("desc_part2")}
          </div>
          <div className="news-date lh-lg"> {tNews("news_date")}</div>
        </div>
      </div>
      {/* ))} */}
    </motion.section>
  );
};

export default News;
