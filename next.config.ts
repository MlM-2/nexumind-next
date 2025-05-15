// next.config.js
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(); // Without any additional settings

module.exports = withNextIntl({
  reactStrictMode: true,  // Ensure React Strict Mode is enabled

  
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',  // Redirect from the root to another page (if applicable)
        permanent: true,
      },
    ];
  },
});
