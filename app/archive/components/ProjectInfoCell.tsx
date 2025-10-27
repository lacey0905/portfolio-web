import ExternalLinkIcon from "@/app/components/ui/ExternalLinkIcon";

interface ProjectInfoCellProps {
  title: string;
  link?: string;
  github?: string;
}

export default function ProjectInfoCell({
  title,
  link,
  github,
}: ProjectInfoCellProps) {
  const hasLink = link || github;
  const linkUrl = link || github;

  return (
    <td className="min-w-[240px] py-4 pr-4 align-top font-semibold leading-snug text-slate-200">
      {/* PC/태블릿: 일반 텍스트 */}
      <span className="hidden sm:inline-flex items-baseline font-medium leading-tight text-slate-200 text-base">
        {title}
      </span>

      {/* 모바일: 링크가 있으면 클릭 가능한 링크, 없으면 일반 텍스트 */}
      {hasLink && linkUrl ? (
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex sm:hidden items-baseline font-medium leading-tight text-slate-200 hover:text-[rgb(94,234,212)] text-base cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          {title}
          <ExternalLinkIcon className="inline-block h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none ml-1 translate-y-px" />
        </a>
      ) : (
        <span className="inline-flex sm:hidden items-baseline font-medium leading-tight text-slate-200 text-base">
          {title}
        </span>
      )}
    </td>
  );
}
