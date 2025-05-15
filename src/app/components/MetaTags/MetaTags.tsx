// // MetaTags.tsx
// import { t } from "i18next";
// import React from "react";
// import { Helmet } from "react-helmet-async";


// interface MetaTagsProps {
//   path: string;
//   title?: string;
// }

// const MetaTags: React.FC<MetaTagsProps> = ({ path, title }) => {
//   const baseUrl = window.location.origin;
//   if (path == "/")
//     return (
//       <Helmet htmlAttributes={{ lang: i18n.language }}>
//         <title>NexuMind</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <meta
//           name="description"
//           content="Unlocking unprecedented potential with cutting-edge artificial intelligence solutions for your business."
//         />
//         <meta property="og:title" content="NexuMind" />
//         <meta
//           property="og:description"
//           content="Unlocking unprecedented potential with cutting-edge artificial intelligence solutions for your business."
//         />
//         <meta property="og:url" content="https://www.nexumind.com" />
//         <meta property="og:type" content="website" />
//         <meta property="og:image" content="/img/og-image.png" />
//         <meta property="og:image:type" content="image/png" />
//         <meta property="og:image:alt" content="NexuMind" />

//         <meta property="twitter:card" content="summary_large_image" />
//         <meta property="twitter:url" content="https://www.nexumind.com" />
//         <meta property="twitter:title" content="NexuMind" />
//         <meta
//           property="twitter:description"
//           content="Unlocking unprecedented potential with cutting-edge artificial intelligence solutions for your business."
//         />
//         <meta property="twitter:image" content="/img/og-image.png" />
//         <meta property="twitter:image:type" content="image/png" />
//         <meta property="twitter:image:alt" content="NexuMind" />

//         <link rel="canonical" href={`${baseUrl}`} />

//         <link rel="alternate" hrefLang="en" href={`${baseUrl}/en`} />
//         <link rel="alternate" hrefLang="ar" href={`${baseUrl}/ar`} />
//       </Helmet>
//     );
//   else
//     return (
//       <Helmet>
//         <title>{`NexuMind-${title}`}</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <meta name="description" content={t("lead")} />
//         <meta property="og:title" content={`NexuMind-${title}`} />
//         <meta property="og:description" content={t("lead")} />
//         <meta property="og:url" content="https://www.nexumind.com" />
//         <meta property="og:type" content="website" />
//         <meta property="og:image" content="/img/og-image.png" />
//         <meta property="og:image:type" content="image/png" />
//         <meta property="og:image:alt" content={`NexuMind-${title}`} />

//         <meta property="twitter:card" content="summary_large_image" />
//         <meta property="twitter:url" content="https://www.nexumind.com" />
//         <meta property="twitter:title" content={`NexuMind-${title}`} />
//         <meta property="twitter:description" content={t("lead")} />
//         <meta property="twitter:image" content="/img/og-image.png" />
//         <meta property="twitter:image:type" content="image/png" />
//         <meta property="twitter:image:alt" content="NexuMind" />
//         <link rel="canonical" href={`${baseUrl}/${path}`} />

//         <link rel="alternate" hrefLang="en" href={`${baseUrl}/en/${path}`} />
//         <link rel="alternate" hrefLang="ar" href={`${baseUrl}/ar/${path}`} />
//       </Helmet>
//     );
// };

// export default MetaTags;
