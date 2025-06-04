import React from "react";
import { useTranslations } from "next-intl";

function PrivacyPolicy() {
  const t = useTranslations();

  
  return (
    <div className="container p-4">
      <section id="PrivacyPolicy">
        <h1>{t("privacy_policy_title")}</h1>
        <p>
          <strong>{t("last_updated")}:</strong> {t("last_updated_date")}
        </p>
        <p>
          {t("privacy_intro_paragraph_1_part1")}
          <a href="https://nexumind.com" target="_blank" rel="noopener noreferrer">
            {t("privacy_intro_paragraph_1_link_text")}
          </a>
          {t("privacy_intro_paragraph_1_part2")}
        </p>

        <p>{t("privacy_intro_paragraph_2")}</p>

        <hr />

        <h2>{t("privacy_1_title")}</h2>
        <p>{t("privacy_1_paragraph_1")}</p>

        <h3>{t("privacy_1_subsection_a_title")}</h3>
        <p>{t("privacy_1_subsection_a_paragraph")}</p>
        <ul>
          <li>{t("privacy_1_subsection_a_list_item_1")}</li>
          <li>{t("privacy_1_subsection_a_list_item_2")}</li>
          <li>{t("privacy_1_subsection_a_list_item_3")}</li>
          <li>{t("privacy_1_subsection_a_list_item_4")}</li>
        </ul>

        <h3>{t("privacy_1_subsection_b_title")}</h3>
        <p>{t("privacy_1_subsection_b_paragraph")}</p>
        <ul>
          <li>{t("privacy_1_subsection_b_list_item_1")}</li>
          <li>{t("privacy_1_subsection_b_list_item_2")}</li>
          <li>{t("privacy_1_subsection_b_list_item_3")}</li>
          <li>{t("privacy_1_subsection_b_list_item_4")}</li>
          <li>{t("privacy_1_subsection_b_list_item_5")}</li>
          <li>{t("privacy_1_subsection_b_list_item_6")}</li>
          <li>{t("privacy_1_subsection_b_list_item_7")}</li>
        </ul>

        <h3>{t("privacy_1_subsection_c_title")}</h3>
        <p>{t("privacy_1_subsection_c_paragraph_1")}</p>
        <p>{t("privacy_1_subsection_c_paragraph_2")}</p>

        <hr />

        <h2>{t("privacy_2_title")}</h2>
        <p>{t("privacy_2_paragraph_1")}</p>
        <ul>
           <li><strong>{t("privacy_2_list_item_1_bold")}</strong> {t("privacy_2_list_item_1_rest")}</li>
           <li><strong>{t("privacy_2_list_item_2_bold")}</strong> {t("privacy_2_list_item_2_rest")}</li>
           <li><strong>{t("privacy_2_list_item_3_bold")}</strong> {t("privacy_2_list_item_3_rest")}</li>
           <li><strong>{t("privacy_2_list_item_4_bold")}</strong> {t("privacy_2_list_item_4_rest")}</li>
           <li><strong>{t("privacy_2_list_item_5_bold")}</strong> {t("privacy_2_list_item_5_rest")}</li>
           <li><strong>{t("privacy_2_list_item_6_bold")}</strong> {t("privacy_2_list_item_6_rest")}</li>
        </ul>

        <hr />

        <h2>{t("privacy_3_title")}</h2>
        <p>{t("privacy_3_paragraph_1")}</p>

        <h3>{t("privacy_3_subsection_a_title")}</h3>
        <p>{t("privacy_3_subsection_a_paragraph")}</p>

        <h3>{t("privacy_3_subsection_b_title")}</h3>
        <p>{t("privacy_3_subsection_b_paragraph")}</p>

        <h3>{t("privacy_3_subsection_c_title")}</h3>
        <p>{t("privacy_3_subsection_c_paragraph")}</p>

        <hr />

        <h2>{t("privacy_4_title")}</h2>
        <p>{t("privacy_4_paragraph_1")}</p>
        <ul>
          <li>{t("privacy_4_list_item_1")}</li>
          <li>{t("privacy_4_list_item_2")}</li>
          <li>{t("privacy_4_list_item_3")}</li>
        </ul>
        <p>{t("privacy_4_paragraph_2")}</p>

        <hr />

        <h2>{t("privacy_5_title")}</h2>
        <p>{t("privacy_5_paragraph")}</p>

        <hr />

        <h2>{t("privacy_6_title")}</h2>
        <p>{t("privacy_6_paragraph_1")}</p>

        <h3>{t("privacy_6_subsection_a_title")}</h3>
        <p>{t("privacy_6_subsection_a_paragraph")}</p>

        <h3>{t("privacy_6_subsection_b_title")}</h3>
        <p>{t("privacy_6_subsection_b_paragraph")}</p>

        <h3>{t("privacy_6_subsection_c_title")}</h3>
        <p>{t("privacy_6_subsection_c_paragraph")}</p>

        <h3>{t("privacy_6_subsection_d_title")}</h3>
        <p>{t("privacy_6_subsection_d_paragraph")}</p>

        <h3>{t("privacy_6_subsection_e_title")}</h3>
        <p>{t("privacy_6_subsection_e_paragraph")}</p>

        <hr />

        <h2>{t("privacy_7_title")}</h2>
        <p>{t("privacy_7_paragraph")}</p>

        <hr />

        <h2>{t("privacy_8_title")}</h2>
        <p>{t("privacy_8_paragraph")}</p>

        <hr />

        <h2>{t("privacy_9_title")}</h2>
        <p>{t("privacy_9_paragraph")}</p>

        <hr />

        <h2>{t("privacy_10_title")}</h2>
        <p>{t("privacy_10_paragraph")}</p>

        <hr />

        <h2>{t("privacy_11_title")}</h2>
        <p>{t("privacy_11_paragraph_1")}</p>

        <p>
          <strong>{t("company_name")}</strong>
          <br />
          {t("email_label")}{" "}
          <a href={t("email_link_href")}>
            {t("email_link_text")}
          </a>
        </p>
      </section>
    </div>
  );
}

export default PrivacyPolicy;