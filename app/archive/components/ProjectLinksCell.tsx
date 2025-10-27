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
    // pub-web-ivory.vercel.app 도메인은 경로만 표시
    if (url.includes("pub-web-ivory.vercel.app")) {
      const urlObj = new URL(url);
      return urlObj.pathname === "/"
        ? urlObj.hostname
        : urlObj.pathname.replace(/^\//, "").replace(/\/$/, "");
    }
    // 다른 URL은 프로토콜과 www만 제거
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
              <ExternalLinkIcon className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 motion-reduce:transition-none ml-1 translate-y-1" />
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
              <ExternalLinkIcon className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 motion-reduce:transition-none ml-1 translate-y-1" />
            </a>
          </li>
        )}
      </ul>
    </td>
  );
}
