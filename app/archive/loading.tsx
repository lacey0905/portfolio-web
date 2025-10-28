export default function ArchiveLoading() {
  return (
    <div className="mx-auto min-h-screen max-w-screen-2xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-24">
      {/* Header Skeleton */}
      <div className="mb-12 animate-pulse">
        <div className="mb-4 h-8 w-32 rounded bg-slate-700/50"></div>
        <div className="h-6 w-48 rounded bg-slate-800/50"></div>
      </div>

      {/* Table Header Skeleton */}
      <div className="mb-4 grid grid-cols-12 gap-4 px-4 animate-pulse">
        <div className="col-span-1 h-4 rounded bg-slate-700/50"></div>
        <div className="col-span-4 h-4 rounded bg-slate-700/50"></div>
        <div className="col-span-2 h-4 rounded bg-slate-700/50"></div>
        <div className="col-span-3 h-4 rounded bg-slate-700/50"></div>
        <div className="col-span-2 h-4 rounded bg-slate-700/50"></div>
      </div>

      {/* Table Rows Skeleton */}
      <div className="space-y-2">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-12 gap-4 rounded-lg bg-slate-800/30 p-4 animate-pulse"
          >
            <div className="col-span-1 h-4 rounded bg-slate-700/50"></div>
            <div className="col-span-4 h-4 rounded bg-slate-700/50"></div>
            <div className="col-span-2 h-4 rounded bg-slate-700/50"></div>
            <div className="col-span-3 h-4 rounded bg-slate-700/50"></div>
            <div className="col-span-2 h-4 rounded bg-slate-700/50"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
