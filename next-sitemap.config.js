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
};
