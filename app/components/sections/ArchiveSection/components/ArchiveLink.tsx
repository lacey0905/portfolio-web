import Link from "next/link";
import ArrowRightIcon from "@/app/components/ui/ArrowRightIcon";

export interface ArchiveLinkProps {
  href?: string;
}

export default function ArchiveLink({ href = "/archive" }: ArchiveLinkProps) {
  return (
    <div className="mt-12">
      <Link
        className="inline-flex items-center font-semibold leading-tight text-slate-200 group"
        aria-label="View Full Project Archive"
        href={href}
      >
        <span>
          <span className="border-b border-transparent pb-px transition group-hover:border-emerald-400 motion-reduce:transition-none">
            View Full Project{" "}
          </span>
          <span className="whitespace-nowrap">
            <span className="border-b border-transparent pb-px transition group-hover:border-emerald-400 motion-reduce:transition-none">
              Archive
            </span>
            <ArrowRightIcon />
          </span>
        </span>
      </Link>
    </div>
  );
}
