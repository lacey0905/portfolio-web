interface MadeAtCellProps {
  company?: string;
}

export default function MadeAtCell({ company }: MadeAtCellProps) {
  return (
    <td className="hidden py-4 pr-4 align-top lg:table-cell">
      <div className="translate-y-1 text-sm text-slate-400">
        {company || "-"}
      </div>
    </td>
  );
}
