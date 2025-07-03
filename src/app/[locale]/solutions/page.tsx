import { PageProps } from '../../../../.next/types/app/[locale]/page';
import MainComponents from '../../components/MainComponents';
import { Metadata } from 'next';

export const dynamic = 'force-static';

export async function generateMetadata(
  { params }: PageProps 
): Promise<Metadata> {
  
  const { locale } = await params;

  return {
    title: `Solutions - ${locale === 'ar' ? 'الحلول' : 'Solutions'} | Nexumind`,
    description: locale === 'ar' 
      ? 'اكتشف حلول الذكاء الاصطناعي المتقدمة من نكسومايند'
      : 'Discover advanced AI solutions from Nexumind',
  };
}

export default function SolutionsPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const solutionsSection = document.getElementById('solutions');
              if (solutionsSection) {
                setTimeout(() => {
                  solutionsSection.scrollIntoView({ behavior: 'smooth' });
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