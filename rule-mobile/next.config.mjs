/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  transpilePackages: ["@ionic/react", "@ionic/core", "ionicons"],
  // output: "export",
  // rewrites: () => {
  //   return [
  //     {
  //       source: "/tabs/:path*",
  //       destination: "/",
  //     },
  //     {
  //       source: "/event",
  //       destination: "/",
  //     },
  //   ];
  // },
};

export default nextConfig;
