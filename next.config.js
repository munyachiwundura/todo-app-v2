const withPWA = require("next-pwa");

module.exports = withPWA({
  reactStrictMode: false,
  webpack5: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  pwa: {
    dest: "public",
  },
});
