import { PageProps } from '../../../../.next/types/app/[locale]/page';
import MainComponents from '../../components/MainComponents';
import { Metadata } from 'next';

export const dynamic = 'force-static';

export async function generateMetadata(
  { params }: PageProps 
): Promise<Metadata> {
  
  const { locale } = await params;

  return {
    title: `Products - ${locale === 'ar' ? 'المنتجات' : 'Products'} | Nexumind`,
    description: locale === 'ar' 
      ? 'استكشف منتجات الذكاء الاصطناعي الثورية من نكسومايند'
      : 'Explore revolutionary AI products from Nexumind',
  };
}

export default function ProductsPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const productsSection = document.getElementById('products');
              if (productsSection) {
                setTimeout(() => {
                  productsSection.scrollIntoView({ behavior: 'smooth' });
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