import "../../styles/shownews.css";
import React from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from 'next/image';
export default function ShowNews() {
  const t = useTranslations("News");
  const currentLocale = useLocale();


  return (
    <div className="ShowNewsContainer">
      <div id="ShowNews" className="row justify-content-center">
        <h1>{t("news_title")}</h1>
        <div className="news-date">{t("news_date")}</div>
        <div className="d-flex justify-content-center news-img">
          <Image
           height={400}
           width={1000}
            src="/img/news-banner.webp"
            alt={t("news_title")}
            className="img-fluid"
            loading="lazy"
          />
        </div>
        <p>
          {t("paragraph_1_part1")}
          <a
            href={t("paragraph_1_rakhys_link_href")}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("paragraph_1_rakhys_link_text")}
          </a>
          {t("paragraph_1_part2")}
          <a
            href={t("paragraph_1_nexumind_link_href")}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("paragraph_1_nexumind_link_text")}
          </a>
          {t("paragraph_1_part3")}
        </p>
        <h2>{t("section_2_title")}</h2>
        <p>{t("section_2_paragraph")}</p>
        <h2>{t("section_3_title")}</h2>
        <p>
          {t("section_3_paragraph_part1")}
          <strong>{t("section_3_amazon_bold")}</strong>
          {t("section_3_part2")}
          <strong>{t("section_3_walmart_bold")}</strong>
          {t("section_3_part3")}
          <strong>{t("section_3_preplixty_bold")}</strong>
          {t("section_3_part4")}
        </p>
        <h2>{t("section_4_title")}</h2>
        <p>{t("section_4_paragraph")}</p>
        <ul lang={currentLocale}>
          <li>
            <strong>{t("section_4_list_item_1_bold")}</strong>{" "}
            {t("section_4_list_item_1_rest")}
          </li>
          <li>
            <strong>{t("section_4_list_item_2_bold")}</strong>{" "}
            {t("section_4_list_item_2_rest")}
          </li>
          <li>
            <strong>{t("section_4_list_item_3_bold")}</strong>{" "}
            {t("section_4_list_item_3_rest")}
          </li>
        </ul>
        <h2>{t("section_5_title")}</h2>
        <p>{t("section_5_paragraph")}</p>
        <h2>{t("section_6_title")}</h2>
        <p>{t("section_6_paragraph")}</p>
        <h2>{t("section_7_title")}</h2>
        <p>{t("section_7_paragraph_1")}</p>
        <p>{t("section_7_paragraph_2")}</p>
      </div>
    </div>
  );
}
