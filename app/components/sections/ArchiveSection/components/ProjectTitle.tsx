import ExternalLinkIcon from "@/app/components/ui/ExternalLinkIcon";

export interface ProjectTitleProps {
  title: string;
  link?: string;
}

export default function ProjectTitle({ title, link }: ProjectTitleProps) {
  return (
    <h3 className="font-medium leading-snug text-slate-200">
      <span className="inline-flex items-baseline font-medium leading-tight text-slate-200 group-hover:text-[rgb(94,234,212)] focus-visible:text-[rgb(94,234,212)] text-sm sm:text-base">
        <span className="inline-block">
          {title}
          {link && <ExternalLinkIcon />}
        </span>
      </span>
    </h3>
  );
}
