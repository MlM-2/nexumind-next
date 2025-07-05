import { Metadata } from 'next';
import ShowNews from '../../../components/News/ShowNews';

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export const dynamic = 'force-static';

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { locale, slug } = await params;
  
  const readableTitle = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return {
    title: locale === 'ar' 
      ? `${readableTitle} - الأخبار | Nexumind`
      : `${readableTitle} - News | Nexumind`,
    description: locale === 'ar'
      ? 'آخر أخبار وتطورات الذكاء الاصطناعي من نكسومايند'
      : 'Latest AI news and developments from Nexumind',
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  return <ShowNews slug={slug} />;
} 