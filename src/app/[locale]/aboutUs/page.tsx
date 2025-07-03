import { PageProps } from '../../../../.next/types/app/[locale]/page';
import MainComponents from '../../components/MainComponents';
import { Metadata } from 'next';

export const dynamic = 'force-static';

export async function generateMetadata(
  { params }: PageProps 
): Promise<Metadata> {
  
  const { locale } = await params;

  return {
    title: `About Us - ${locale === 'ar' ? 'من نحن' : 'About Us'} | Nexumind`,
    description: locale === 'ar' 
      ? 'تعرف على نكسومايند - شركة رائدة في حلول الذكاء الاصطناعي'
      : 'Learn about Nexumind - Leading AI solutions company',
  };
}

export default function AboutUsPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const aboutUsSection = document.getElementById('aboutUs');
              if (aboutUsSection) {
                setTimeout(() => {
                  aboutUsSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            });
          `,
        }}
      />
      <MainComponents />
    </>
  );
} 