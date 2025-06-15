'use client';
import "../../styles/shownews.css";
import React, { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from 'next/image';
import { useRouter } from "next/navigation";

interface ShowNewsProps {
  slug?: string;
}

export default function ShowNews({ slug }: ShowNewsProps) {
  const tNews = useTranslations("News");
  const currentLocale = useLocale();
  const router = useRouter();

  useEffect(() => {
    // التحقق من وجود slug وأنه صحيح
    if (!slug || slug !== 'arabic-ai-shopping-assistant-launch') {
      // إعادة التوجيه إلى صفحة الأخبار الرئيسية إذا كان slug غير صحيح
      router.push(`/${currentLocale}/news`);
    }
  }, [slug, router, currentLocale]);

  if (!slug) {
    return null;
  }

  return (
    <div className="ShowNewsContainer" lang={currentLocale}>
      <div id="ShowNews" className="row justify-content-center container">
        <h1>{tNews("title")}</h1>
        <div className="news-date">{tNews("news_date")}</div>
        <div className="d-flex justify-content-center news-img">
          <Image
            height={400}
            width={1000}
            src={tNews("image")}
            alt={tNews("title")}
            className="img-fluid"
            loading="lazy"
          />
        </div>
        <p>
          {tNews("paragraph_1_part1")}
          <a
            href={tNews("paragraph_1_rakhys_link_href")}
            target="_blank"
            rel="noopener noreferrer"
          >
            {tNews("paragraph_1_rakhys_link_text")}
          </a>
          {tNews("paragraph_1_part2")}
          <a
            href={tNews("paragraph_1_nexumind_link_href")}
            target="_blank"
            rel="noopener noreferrer"
          >
            {tNews("paragraph_1_nexumind_link_text")}
          </a>
          {tNews("paragraph_1_part3")}
        </p>
        <h2>{tNews("section_2_title")}</h2>
        <p>{tNews("section_2_paragraph")}</p>
        <h2>{tNews("section_3_title")}</h2>
        <p>
          {tNews("section_3_paragraph_part1")}
          <strong>{tNews("section_3_amazon_bold")}</strong>
          {tNews("section_3_part2")}
          <strong>{tNews("section_3_walmart_bold")}</strong>
          {tNews("section_3_part3")}
          <strong>{tNews("section_3_preplixty_bold")}</strong>
          {tNews("section_3_part4")}
        </p>
        <h2>{tNews("section_4_title")}</h2>
        <p>{tNews("section_4_paragraph")}</p>
        <ul lang={currentLocale}>
          <li>
            <strong>{tNews("section_4_list_item_1_bold")}</strong>{" "}
            {tNews("section_4_list_item_1_rest")}
          </li>
          <li>
            <strong>{tNews("section_4_list_item_2_bold")}</strong>{" "}
            {tNews("section_4_list_item_2_rest")}
          </li>
          <li>
            <strong>{tNews("section_4_list_item_3_bold")}</strong>{" "}
            {tNews("section_4_list_item_3_rest")}
          </li>
        </ul>
        <h2>{tNews("section_5_title")}</h2>
        <p>{tNews("section_5_paragraph")}</p>
        <h2>{tNews("section_6_title")}</h2>
        <p>{tNews("section_6_paragraph")}</p>
        <h2>{tNews("section_7_title")}</h2>
        <p>{tNews("section_7_paragraph_1")}</p>
        <p>{tNews("section_7_paragraph_2")}</p>
      </div>
    </div>
  );
}
