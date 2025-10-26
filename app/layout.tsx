import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

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
    <html lang="ko">
      <body>
        <nav className="navbar">
          <div className="nav-container">
            <Link href="/" className="nav-logo">
              포트폴리오
            </Link>
            <div className="nav-menu">
              <Link href="/" className="nav-link">
                Home
              </Link>
              <Link href="/archive" className="nav-link">
                Archive
              </Link>
            </div>
          </div>
        </nav>
        <main className="main-content">{children}</main>
        <footer className="footer">
          <p>&copy; 2024 포트폴리오. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
