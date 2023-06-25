/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["cdn.architect.io", "via.placeholder.com"],
      remotePatterns: [
        {
          hostname: "via.placeholder.com",
        },
      ],
    },
  };
  
  module.exports = nextConfig;