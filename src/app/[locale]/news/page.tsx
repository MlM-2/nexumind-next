import Head from "next/head";
import News from "../../components/News/News";
import { useTranslations } from "next-intl";

// export const dynamic = 'force-static';
// export const dynamic = 'force-dynamic';

export default function NewsPage() {
  const t = useTranslations();

  return (
    <>
      <Head>
        <title>{t("news_title")}</title>
      </Head>
      <News />
    </>
  );
}
