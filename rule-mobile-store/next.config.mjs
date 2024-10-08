/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  transpilePackages: ["@ionic/react", "@ionic/core", "ionicons"],
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
