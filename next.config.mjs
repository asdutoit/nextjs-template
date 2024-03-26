/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: [
      "images.unsplash.com",
      "unsplash.com",
      "dz0iwcgjpo74k.cloudfront.net",
    ],
  },
};

export default nextConfig;
