/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is stable in Next.js 15, no experimental flag needed

  // 이미지 최적화
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // 웹팩 번들 최적화
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // highlight.js를 별도 청크로 분리
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          highlight: {
            test: /[\\/]node_modules[\\/](highlight\.js)[\\/]/,
            name: "highlight",
            priority: 10,
          },
          reactMarkdown: {
            test: /[\\/]node_modules[\\/](react-markdown|remark-gfm|rehype-highlight)[\\/]/,
            name: "markdown",
            priority: 10,
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
