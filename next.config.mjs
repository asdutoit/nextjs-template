/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    return config;
  },
  output: "standalone",
  images: {
    domains: [
      "images.unsplash.com",
      "unsplash.com",
      "dz0iwcgjpo74k.cloudfront.net",
      "lh3.googleusercontent.com",
    ],
  },
};

export default nextConfig;
