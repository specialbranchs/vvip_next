module.exports = {
  basePath: "/nextjs",
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          destination:"http://127.0.0.1:3000/nextjs", // Matched parameters can be used in the destination
          basePath:false
        },
      ],
    };
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
 
};
