/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.placeholder.com",
      },
    ],
  },
  transpilePackages: ["common", "utils"],
};

module.exports = nextConfig;
