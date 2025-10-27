import ArrowRightIcon from "@/app/components/ui/ArrowRightIcon";

export interface ResumeLinkProps {
  href?: string;
}

export default function ResumeLink({ href = "/resume.pdf" }: ResumeLinkProps) {
  return (
    <div className="mt-12">
      <a
        className="inline-flex items-center font-semibold leading-tight text-slate-200 group"
        aria-label="View Full Résumé"
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        <span>
          <span className="border-b border-transparent pb-px transition group-hover:border-emerald-400 motion-reduce:transition-none">
            View Full{" "}
          </span>
          <span className="whitespace-nowrap">
            <span className="border-b border-transparent pb-px transition group-hover:border-emerald-400 motion-reduce:transition-none">
              Résumé
            </span>
            <ArrowRightIcon />
          </span>
        </span>
      </a>
    </div>
  );
}
