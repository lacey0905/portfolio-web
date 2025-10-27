interface ProjectInfoCellProps {
  title: string;
}

export default function ProjectInfoCell({ title }: ProjectInfoCellProps) {
  return (
    <td className="min-w-[240px] py-4 pr-4 align-top font-semibold leading-snug text-slate-200">
      <span className="inline-flex items-baseline font-medium leading-tight text-slate-200 text-base">
        {title}
      </span>
    </td>
  );
}
