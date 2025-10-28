export interface TechTagProps {
  label: string;
}

export default function TechTag({ label }: TechTagProps) {
  return (
    <div className="flex items-center rounded-full bg-[rgb(94,234,212)]/10 px-2 py-0.5 sm:px-3 sm:py-1 text-xs font-medium leading-5 text-[rgb(94,234,212)]">
      {label}
    </div>
  );
}
