/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.test.nexumind.com', 
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  trailingSlash: false,

  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
  },



  alternateRefs: [
    {
      href: 'https://test.nexumind.com/ar',
      hreflang: 'ar',
    },
    {
      href: 'https://www.test.nexumind.com/en',
      hreflang: 'en',
    },
  ],
};
