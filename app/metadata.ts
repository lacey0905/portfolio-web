import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "김현균 | Frontend Engineer",
  description:
    "네오위즈에서 HTML5 웹 게임과 마케팅 웹사이트를 개발하는 프론트엔드 엔지니어입니다. SLOT MART, Browndust2, Lies of P 등의 프로젝트를 통해 게임 서비스의 완성도를 높이고 있습니다.",
  keywords: [
    "김현균",
    "Kim Hyoun Gyoun",
    "Frontend Engineer",
    "프론트엔드 엔지니어",
    "웹 개발자",
    "React",
    "TypeScript",
    "Next.js",
    "네오위즈",
    "웹 게임 개발",
    "HTML5 게임",
  ],
  authors: [{ name: "김현균", url: "https://github.com/lacey0905" }],
  creator: "김현균",
  publisher: "김현균",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://portfolio-web-lacey0905.vercel.app",
    siteName: "김현균 포트폴리오",
    title: "김현균 | Frontend Engineer",
    description:
      "네오위즈에서 HTML5 웹 게임과 마케팅 웹사이트를 개발하는 프론트엔드 엔지니어입니다.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "김현균 포트폴리오",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "김현균 | Frontend Engineer",
    description:
      "네오위즈에서 HTML5 웹 게임과 마케팅 웹사이트를 개발하는 프론트엔드 엔지니어입니다.",
    images: ["/og.png"],
    creator: "@lacey0905",
  },
  verification: {
    google: "",
  },
  category: "portfolio",
};
