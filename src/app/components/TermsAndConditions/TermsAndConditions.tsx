
import { useTranslations  } from "next-intl";
import React from "react";


function TermsAndConditions() {

  const  t  = useTranslations();


  return (
    
    <div className="container p-4">
      <section id="TermsAndConditions">

        <h1>{t("terms_and_conditions_title")}</h1>
        <p>
          <strong>{t("last_updated")}:</strong> {t("last_updated_date")}
        </p>
        <p>

      {t('terms_intro_paragraph_0')}
      <a href="https://nexumind.com" target="_blank" rel="noopener noreferrer" className="mx-1"> 
        ({t('intro_paragraph_link')})  
      </a>
      {t('terms_intro_paragraph_1')}
 
    </p>

        <hr />
        <h2>{t("terms_1_title")}</h2>
        <p>{t("terms_1_paragraph")}</p>
        <hr />
        <h2>{t("terms_2_title")}</h2>
        <p>{t("terms_2_paragraph")}</p>
        <hr />
        <h2>{t("terms_3_title")}</h2>
        <p>{t("terms_3_paragraph")}</p>
        <ul>
          <li>{t("terms_3_list_item_1")}</li>
          <li>{t("terms_3_list_item_2")}</li>
          <li>{t("terms_3_list_item_3")}</li>
          <li>{t("terms_3_list_item_4")}</li>
          <li>{t("terms_3_list_item_5")}</li>
          <li>{t("terms_3_list_item_6")}</li>
        </ul>
        <hr />
        <h2>{t("terms_4_title")}</h2>
        <p>{t("terms_4_paragraph_1")}</p>
        <ul>
          <li>{t("terms_4_list_item_1")}</li>
          <li>{t("terms_4_list_item_2")}</li>
          <li>{t("terms_4_list_item_3")}</li>
        </ul>
        <p>{t("terms_4_paragraph_2")}</p>
        <hr />
        <h2>{t("terms_5_title")}</h2>
        <p>{t("terms_5_paragraph")}</p>
        <hr />
        <h3>{t("terms_5_subsection_a_title")}</h3>
        <p>{t("terms_5_subsection_a_paragraph")}</p>
        <hr />
        <h2>{t("terms_6_title")}</h2>
        <p>{t("terms_6_paragraph_1")}</p>
        <p>{t("terms_6_paragraph_2")}</p>
        <hr />
        <h2>{t("terms_7_title")}</h2>
        <p>{t("terms_7_paragraph")}</p>
        <hr />
        <h2>{t("terms_8_title")}</h2>
        <p>
      {t('terms_8_paragraph_1')}
      <a href="/privacy" target="_blank" rel="noopener noreferrer" className="mx-1">
        {t('terms_8_paragraph_link')}
      </a>
      {t('terms_8_paragraph_2')}
    </p>
        <hr />
        <h2>{t("terms_9_title")}</h2>
        <p>{t("terms_9_paragraph_1")}</p>
        <p>{t("terms_9_paragraph_2")}</p>
        <hr />
        <h2>{t("terms_10_title")}</h2>
        <p>{t("terms_10_paragraph_1")}</p>
        <ul>
          <li>{t("terms_10_list_item_1")}</li>
          <li>{t("terms_10_list_item_2")}</li>
          <li>{t("terms_10_list_item_3")}</li>
          <li>{t("terms_10_list_item_4")}</li>
          <li>{t("terms_10_list_item_5")}</li>
        </ul>

        <hr />
        <h2>{t("terms_11_title")}</h2>
        <p>{t("terms_11_paragraph_1")}</p>
        <ul>
          <li>{t("terms_11_list_item_1")}</li>
          <li>{t("terms_11_list_item_2")}</li>
          <li>{t("terms_11_list_item_3")}</li>
        </ul>
        <br /> 
        <h2>{t("terms_12_title")}</h2>
        <p>{t("terms_12_paragraph")}</p>
        <hr />
        <h2>{t("terms_13_title")}</h2>
        <p>{t("terms_13_paragraph")}</p>
        <hr />
        <h2>{t("terms_14_title")}</h2>
        <p>{t("terms_14_paragraph")}</p>
        <hr />
        <h2>{t("terms_15_title")}</h2>
        <p>{t("terms_15_paragraph_1")}</p>
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

export default TermsAndConditions;