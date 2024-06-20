/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  crossOrigin: "anonymous",
  images: {
    domains: [
      "platform-lookaside.fbsbx.com",
      "sabomotors.nyc3.digitaloceanspaces.com",
      "sabomotorsmedia.nyc3.digitaloceanspaces.com",
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
