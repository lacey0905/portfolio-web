import { promises as fs } from "fs";
import path from "path";
import { Profile } from "@/types/profile";

async function getProfileData(): Promise<Profile> {
  const filePath = path.join(process.cwd(), "data", "profile.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}

export default async function AboutSection() {
  const profile = await getProfileData();

  return (
    <section
      id="about"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="About me"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-navy-500/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
          About
        </h2>
      </div>
      <div>
        {profile.about.paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className={`text-[15px] leading-relaxed ${
              index < profile.about.paragraphs.length - 1 ? "mb-4" : ""
            }`}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
