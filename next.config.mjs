/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: "c:\\Users\\NIGHTWOLF\\Documents\\cultural-event-webapp",
  },
};

export default nextConfig;
