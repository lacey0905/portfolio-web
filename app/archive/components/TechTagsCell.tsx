interface TechTagsCellProps {
  technologies: string[];
}

export default function TechTagsCell({ technologies }: TechTagsCellProps) {
  return (
    <td className="hidden py-4 pr-4 align-top lg:table-cell">
      <ul className="flex -translate-y-1.5 flex-wrap">
        {technologies.map((tech, i) => (
          <li key={i} className="my-1 mr-1.5">
            <div className="flex items-center rounded-full bg-[rgb(94,234,212)]/10 px-3 py-1 text-xs font-medium leading-5 text-[rgb(94,234,212)]">
              {tech}
            </div>
          </li>
        ))}
      </ul>
    </td>
  );
}
