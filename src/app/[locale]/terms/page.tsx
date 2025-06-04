// "use client";
import { PageProps } from "../../../../.next/types/app/[locale]/terms/page";
import TermsAndConditions from "../../components/TermsAndConditions/TermsAndConditions";
import { Metadata } from "next";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: `Nexumind - ${locale === "ar" ? "الشروط والأحكام" : "Terms"}`,
  };
}
export default function TermsPage() {
  return (
    <div className="TermsAndConditionsContainer">
      <TermsAndConditions />
    </div>
  );
}
