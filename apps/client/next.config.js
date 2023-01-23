/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "http.cat",
      },
    ],
  },
  transpilePackages: ["common", "utils"],
};

module.exports = nextConfig;
