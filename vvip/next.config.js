module.exports = {
  basePath: "/nextjs",
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: `/`,
          destination: !process.env.NODE_ENV || process.env.NODE_ENV === "development"
          ? "http://127.0.0.1:8000/nextjs"
          : "https://fims.specialbranch.gov.bd/nextjs", // Matched parameters can be used in the destination
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
