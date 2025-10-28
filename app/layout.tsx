import "./styles/globals.scss";

export { metadata } from "./metadata";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="bg-navy-500 leading-relaxed text-slate-400 antialiased selection:bg-[rgb(94,234,212)] selection:text-navy-900">
        {children}
      </body>
    </html>
  );
}
