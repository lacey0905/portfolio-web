import { getProfile } from "@/lib/data/loaders";
import SectionHeader from "@/app/components/ui/SectionHeader";
import type { Profile } from "@/types/profile";
import SkillCategory from "./components/SkillCategory";

const SKILL_CATEGORIES: {
  key: keyof Profile["skills"];
  label: string;
}[] = [
  { key: "webDevelopment", label: "Web Development" },
  { key: "aiAndAutomation", label: "AI & Automation" },
  { key: "graphicsAndInteractive", label: "Graphics & Interactive" },
  { key: "devOpsAndTools", label: "DevOps & Tools" },
];

export default async function SkillsSection() {
  const profile = await getProfile();

  if (!profile) {
    return null;
  }

  return (
    <section
      id="skills"
      className="mb-16 sm:mb-20 md:mb-24 lg:mb-28 scroll-mt-16 lg:scroll-mt-24"
      aria-label="Skills"
    >
      <SectionHeader title="Skills" />
      <div className="space-y-6 sm:space-y-8">
        {SKILL_CATEGORIES.map(({ key, label }) => (
          <SkillCategory
            key={key}
            title={label}
            skills={profile.skills[key]}
          />
        ))}
      </div>
    </section>
  );
}
