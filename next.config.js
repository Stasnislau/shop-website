/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["via.placeholder.com", "cdn.architect.io", "res.cloudinary.com"],
    remotePatterns: [
      {
        hostname: "via.placeholder.com",
        protocol: "https",
        port: "",
        pathname: "/account123/**",
      },
      {
        hostname: "cdn.architect.io",
        protocol: "https",
        port: "",
        pathname: "/account123/**",
      },
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
        port: "",
        pathname: "/account123/**",
      },
    ],
  },
};

module.exports = nextConfig;
