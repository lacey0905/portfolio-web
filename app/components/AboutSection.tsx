import { promises as fs } from "fs";
import path from "path";
import { Profile } from "@/types/profile";
import React from "react";

async function getProfileData(): Promise<Profile> {
  const filePath = path.join(process.cwd(), "data", "profile.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}

function highlightText(
  text: string,
  highlights: Record<string, string>
): React.ReactNode {
  if (!highlights || Object.keys(highlights).length === 0) {
    return text;
  }

  // 모든 키워드를 찾기 위한 정규식 생성
  const keywords = Object.keys(highlights);
  const pattern = new RegExp(`(${keywords.join("|")})`, "g");
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    if (highlights[part]) {
      return (
        <a
          key={index}
          href={highlights[part]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-slate-200 transition hover:text-teal-300"
        >
          {part}
        </a>
      );
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

export default async function AboutSection() {
  const profile = await getProfileData();

  return (
    <section
      id="about"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-28 lg:scroll-mt-24"
      aria-label="About me"
    >
      {/* Sticky Section Header */}
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-navy-500/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
          About
        </h2>
      </div>

      {/* Profile Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
          {profile.nameEn}
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
          {profile.role}
        </h2>
      </header>

      {/* About Content */}
      <div className="mb-6 space-y-4">
        {profile.about.paragraphs.map((paragraph, index) => (
          <p key={index} className="text-[15px] leading-relaxed text-slate-400">
            {highlightText(paragraph, profile.about.highlights)}
          </p>
        ))}
      </div>

      {/* Social Links */}
      <ul className="flex items-center gap-5" aria-label="Social media">
        <li>
          <a
            className="block text-slate-400 transition hover:text-teal-300"
            href={profile.contact.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </a>
        </li>
        <li>
          <a
            className="block text-slate-400 transition hover:text-teal-300"
            href={`mailto:${profile.contact.email}`}
            aria-label="Email"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
            </svg>
          </a>
        </li>
      </ul>
    </section>
  );
}
