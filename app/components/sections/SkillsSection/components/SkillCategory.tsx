import TechTagList from "@/app/components/ui/TechTagList";

export interface SkillCategoryProps {
  title: string;
  skills: string[];
}

export default function SkillCategory({ title, skills }: SkillCategoryProps) {
  return (
    <div>
      <h3 className="text-sm font-medium leading-tight text-slate-200 sm:text-base">
        {title}
      </h3>
      <TechTagList tags={skills} ariaLabel={title} />
    </div>
  );
}
