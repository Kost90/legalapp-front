const DOCUMENT_TYPE_VALUES = [
  'power-of-attorney-property',
  'power-of-attorney-documents',
  'apartment-lease-agreement',
  'power-of-attorney-vehicle',
  'llc-registration',
  'debt-collection-lawsuit',
  'petition-for-divorce',
  'spousal-consent-for-property-sale',
  'consent-for-minor-to-travel-abroad',
];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://udocument.org',
  generateRobotsTxt: true,
  exclude: ['/404', '/500'],

  transform: async (config, path) => {
    const langs = ['ua', 'en'];
    const currentLang = langs.find((lang) => path.startsWith(`/${lang}`));

    if (!currentLang) return null;

    const alternateRefs = langs.map((lang) => ({
      href: `${config.siteUrl}${path.replace(`/${currentLang}`, `/${lang}`)}`,
      hreflang: lang,
    }));

    return {
      loc: path,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs,
    };
  },

  additionalPaths: async (config) => {
    const paths = [];
    const langs = ['ua', 'en'];

    for (const lang of langs) {
      paths.push(
        {
          loc: `/${lang}`,
          changefreq: 'weekly',
          priority: 1.0,
          lastmod: new Date().toISOString(),
          alternateRefs: langs.map((alt) => ({
            href: `${config.siteUrl}/${alt}`,
            hreflang: alt,
          })),
        },
        {
          loc: `/${lang}/generate`,
          changefreq: 'weekly',
          priority: 0.9,
          lastmod: new Date().toISOString(),
          alternateRefs: langs.map((alt) => ({
            href: `${config.siteUrl}/${alt}/generate`,
            hreflang: alt,
          })),
        },
      );

      // Document types
      for (const type of DOCUMENT_TYPE_VALUES) {
        paths.push({
          loc: `/${lang}/document-types/${type}`,
          changefreq: 'monthly',
          priority: 0.7,
          lastmod: new Date().toISOString(),
          alternateRefs: langs.map((alt) => ({
            href: `${config.siteUrl}/${alt}/document-types/${type}`,
            hreflang: alt,
          })),
        });
      }
    }

    return paths;
  },
};
