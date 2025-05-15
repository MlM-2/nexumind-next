
// "use client";
import Head from "next/head";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";
import { useTranslations } from "next-intl";

export const dynamic = 'force-static';


export default function PrivacyPage() {
  
  const  t  = useTranslations();
  <Head>
  <title>{t("privacy_policy_title")}</title>
</Head>
return <PrivacyPolicy />;
}

