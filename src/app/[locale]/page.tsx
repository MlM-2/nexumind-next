import { PageProps } from '../../../.next/types/app/[locale]/page';
import MainComponents from '../components/MainComponents';
import { Metadata } from 'next';



export const dynamic = 'force-static';


export async function generateMetadata(
  { params }: PageProps 
): Promise<Metadata> {
  
  const { locale } = await params;


  return {
    title: `Nexumind - ${locale === 'ar' ? 'الرئيسية' : 'Home'}`,
  };
}

export default function Page() {
  return <MainComponents />;
}
