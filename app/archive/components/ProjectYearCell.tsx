interface ProjectYearCellProps {
  year: number;
}

export default function ProjectYearCell({ year }: ProjectYearCellProps) {
  return (
    <td className="py-4 pr-4 align-top text-sm">
      <div className="translate-y-px text-slate-400">{year}</div>
    </td>
  );
}
