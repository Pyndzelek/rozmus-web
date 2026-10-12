module.exports = {
  siteUrl: "https://filiprozmus.pl",
  generateRobotsTxt: true,
  // Pliki metadanych App Routera i formularz nie są stronami do indeksowania
  exclude: [
    "/formularz",
    "/icon*",
    "/apple-icon*",
    "/manifest.json",
    "/favicon.ico",
  ],
  // Google ignoruje changefreq i priority, a lastmod z datą builda byłby nieprawdziwy
  autoLastmod: false,
  transform: async (config, path) => ({ loc: path }),
  robotsTxtOptions: {
    // Dyrektywę Host rozumie tylko Yandex
    transformRobotsTxt: async (config, robotsTxt) =>
      robotsTxt.replace(/# Host\nHost: .*\n\n?/, ""),
  },
};
