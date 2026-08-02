import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "김현균 | Frontend Engineer",
  description:
    "React·TypeScript 기반 프론트엔드 엔지니어입니다. 실시간 웹 애플리케이션, 사내 업무 도구(비주얼 에디터·배포 관리), Headless CMS 기반 서비스 웹을 설계하고 개발합니다.",
  keywords: [
    "김현균",
    "Kim HYEON Gyoun",
    "Frontend Engineer",
    "프론트엔드 엔지니어",
    "웹 개발자",
    "React",
    "TypeScript",
    "Next.js",
    "사내 도구 개발",
    "어드민 개발",
    "WebSocket 실시간",
    "Headless CMS",
    "웹 성능 최적화",
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
    url: "https://portfolio-web-vert-gamma.vercel.app",
    siteName: "김현균 포트폴리오",
    title: "김현균 | Frontend Engineer",
    description:
      "React·TypeScript로 실시간 웹 애플리케이션과 사내 업무 도구를 만드는 프론트엔드 엔지니어입니다.",
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
      "React·TypeScript로 실시간 웹 애플리케이션과 사내 업무 도구를 만드는 프론트엔드 엔지니어입니다.",
    images: ["/og.png"],
    creator: "@lacey0905",
  },
  verification: {
    google: "",
  },
  category: "portfolio",
};
