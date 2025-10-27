import ExternalLinkIcon from "@/app/components/ui/ExternalLinkIcon";

interface ProjectLinksCellProps {
  link?: string;
  github?: string;
}

export default function ProjectLinksCell({
  link,
  github,
}: ProjectLinksCellProps) {
  const formatUrl = (url: string) => {
    return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  };

  return (
    <td className="hidden py-4 align-top sm:table-cell">
      <ul className="translate-y-1">
        {link && (
          <li className="mb-1 flex items-center">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-baseline font-medium leading-tight text-slate-400 hover:text-[rgb(94,234,212)] text-sm cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              {formatUrl(link)}
              <ExternalLinkIcon className="inline-block h-3 w-3 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
            </a>
          </li>
        )}
        {github && (
          <li className="mb-1 flex items-center">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-baseline font-medium leading-tight text-slate-400 hover:text-[rgb(94,234,212)] text-sm cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              {formatUrl(github)}
              <ExternalLinkIcon className="inline-block h-3 w-3 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
            </a>
          </li>
        )}
      </ul>
    </td>
  );
}
