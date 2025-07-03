import { PageProps } from '../../../../.next/types/app/[locale]/page';
import MainComponents from '../../components/MainComponents';
import { Metadata } from 'next';

export const dynamic = 'force-static';

export async function generateMetadata(
  { params }: PageProps 
): Promise<Metadata> {
  
  const { locale } = await params;

  return {
    title: `Get Started - ${locale === 'ar' ? 'ابدأ الآن' : 'Get Started'} | Nexumind`,
    description: locale === 'ar' 
      ? 'ابدأ رحلتك مع حلول الذكاء الاصطناعي من نكسومايند'
      : 'Start your journey with AI solutions from Nexumind',
  };
}

export default function GetStartedPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const getStartedSection = document.getElementById('getStarted');
              if (getStartedSection) {
                setTimeout(() => {
                  getStartedSection.scrollIntoView({ behavior: 'smooth' });
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