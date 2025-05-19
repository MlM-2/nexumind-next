'use client';

import { useParams } from 'next/navigation';
import ShowNews from '../../../components/News/ShowNews';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';

export default function NewsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const locale = useLocale();

  useEffect(() => {
    const readableTitle = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    const title = locale === 'ar' 
      ? `نكسومايند - الأخبار: ${readableTitle}`
      : `Nexumind - News: ${readableTitle}`;
      
    document.title = title;
    
    console.log(`Setting page title to: ${title}`);
  }, [locale, slug]);
  
  return <ShowNews slug={slug} />;
} 