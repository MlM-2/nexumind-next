// import { useLocale } from 'next-intl';

// export interface NewsItem {
//     id: number;
//     title: string;
//     content: string;
//     desc: string;
//     image: string;
//     date: string;   // ISO format like "2025-04-06"
//     author: string;
//   }
  

// export async function getNews(): Promise<NewsItem[]> {
//   const currentLang = useLocale || 'en';
//     console.log("currentLang", currentLang);
//   try {
//     const response = await fetch(`../../locales/news-${currentLang}.json`);
//     // const response = await fetch(`/locales/en/news.json`);
//     if (!response.ok) {
//       throw new Error(`Failed to load news for ${currentLang}: ${response.status}`);
//     }

//     const data: NewsItem[] = await response.json();
//     console.log("data", data);
//     return data;
//   } catch (error) {
//     console.error('Error loading news:', error);
//     return [];
//   }
// }
