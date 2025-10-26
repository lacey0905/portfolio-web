import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "포트폴리오",
  description: "개발자 포트폴리오 웹사이트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className="bg-navy-500 leading-relaxed text-slate-400 antialiased selection:bg-cyan-400 selection:text-navy-900">
        {children}
      </body>
    </html>
  );
}
