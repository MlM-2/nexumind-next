"use client";

import { motion, useInView } from "framer-motion";
import React from "react";
// import { getNews } from "../../utils/getNews";
// import { NewsItem } from "../../utils/getNews";
import { useTranslations  ,useLocale} from "next-intl";
import Image from 'next/image';

const News = () => {
  const t = useTranslations("News");
  const currentLang = useLocale();

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: `80px` });


  // const [news, setNews] = useState<NewsItem[]>([]);

  // const loadNews = async () => {
  //   const items = await getNews();
  //   setNews(items);
  // };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 1.2 }}
      id="news"
      // className="bg-body-tertiary"
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
              src={t("image")}
              alt={t("product0_title")}
              className="img-fluid"
              loading="lazy"
            />
          </div>
        </div>
        <div className="col-md-12 my-1 my-md-5 px-md-5 news-content">
          <div className="news-title">
          <a
  href={`${currentLang}/news/arabic-ai-shopping-assistant-launch`}
  style={{
    textDecoration: "none",
    color: "var(--secondary-color)",
  }}
>
  {t("title")}
</a>

          </div>
          <div className="news-desc lh-lg mx-2">
            {/* // dangerouslySetInnerHTML={{ __html: item.desc }} */}
            {t("desc_part1")}{" "}
            <a
              href="https://rakhys.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong className="text-primary">{t("brand")}</strong> {""}
            </a>
            {t("desc_part2")}
          </div>
          <div className="news-date lh-lg"> {t("news_date")}</div>
        </div>
      </div>
      {/* ))} */}
    </motion.section>
  );
};

export default News;
