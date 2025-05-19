import { PageProps } from "../../../../.next/types/app/[locale]/privacy/page";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";
import { Metadata } from "next";

export const dynamic = 'force-static';

export async function generateMetadata(
  { params }: PageProps 
): Promise<Metadata> {

  const { locale } = await params;



  return {
    title: `Nexumind - ${locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy'}`,
  };
}

export default function PrivacyPage() {

  return <PrivacyPolicy />;
}