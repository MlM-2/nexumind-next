/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.nexumind.com', 
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
      href: 'https://nexumind.com/ar',
      hreflang: 'ar',
    },
    {
      href: 'https://www.nexumind.com/en',
      hreflang: 'en',
    },
  ],
};
