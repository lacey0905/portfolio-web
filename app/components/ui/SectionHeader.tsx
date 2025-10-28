export interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="sticky top-0 z-20 -mx-4 bg-navy-500/75 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 sm:py-5 md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
      <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
        {title}
      </h2>
    </div>
  );
}
