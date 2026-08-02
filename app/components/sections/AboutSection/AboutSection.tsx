import { getProfile } from "@/lib/data/loaders";
import { highlightText } from "@/lib/data/formatters";

export default async function AboutSection() {
  const profile = await getProfile();

  if (!profile) {
    return null;
  }

  return (
    <section
      id="about"
      className="mb-16 sm:mb-20 md:mb-24 lg:mb-28 scroll-mt-16 lg:scroll-mt-24"
      aria-label="About me"
    >
      {/* Profile Header */}
      <header className="mb-6 sm:mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-200 sm:text-4xl md:text-5xl">
          {profile.nameEn}
        </h1>
        <h2 className="mt-2 sm:mt-3 text-base font-medium tracking-tight text-slate-200 sm:text-lg md:text-xl">
          {profile.role}
        </h2>
      </header>

      {/* About Content */}
      <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
        {profile.about.paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-sm sm:text-[15px] leading-relaxed text-slate-400"
          >
            {highlightText(paragraph, profile.about.highlights)}
          </p>
        ))}
      </div>

      {/* Social Links */}
      <ul className="flex items-center gap-5" aria-label="Social media">
        <li>
          <a
            className="block text-slate-400 transition hover:text-[rgb(94,234,212)] active:text-[rgb(94,234,212)] active:scale-95"
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
            className="block text-slate-400 transition hover:text-[rgb(94,234,212)] active:text-[rgb(94,234,212)] active:scale-95"
            href={profile.contact.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
          </a>
        </li>
      </ul>
    </section>
  );
}
