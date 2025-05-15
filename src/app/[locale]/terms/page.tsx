"use client";
import Head from "next/head";
import TermsAndConditions from "../../components/TermsAndConditions/TermsAndConditions";
import { useTranslations } from "next-intl";


export const dynamic = "force-static";

export default function TermsPage() {
  const  t  = useTranslations();

  return (
    <>
      <Head>
        <title>{t("terms_and_conditions_title")}</title>
      </Head>
      <TermsAndConditions />
    </>
  );
}
