import { Metadata } from "next";
import { PageProps } from "../../../../.next/types/app/[locale]/privacy/page";
import News from "../../components/News/News";


export const dynamic = 'force-static';

export async function generateMetadata(
  { params }: PageProps   
): Promise<Metadata> {

  const { locale } = await params;
  return {
    title: `Nexumind - ${locale === 'ar' ? 'الأخبار' : 'News'}`,
  };
}


export default function NewsPage() {
  return <News />;
}
