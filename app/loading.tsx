export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-500">
      <div className="flex flex-col items-center gap-4">
        {/* 로딩 스피너 */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>
          <div
            className="absolute inset-0 rounded-full border-4 border-[rgb(94,234,212)] border-t-transparent animate-spin"
            style={{ animationDuration: "1s" }}
          ></div>
        </div>

        {/* 로딩 텍스트 */}
        <div className="flex items-center gap-1 text-slate-400">
          <span className="text-sm">로딩 중</span>
          <span className="typing-dot inline-block h-1 w-1 rounded-full bg-slate-400"></span>
          <span className="typing-dot inline-block h-1 w-1 rounded-full bg-slate-400"></span>
          <span className="typing-dot inline-block h-1 w-1 rounded-full bg-slate-400"></span>
        </div>
      </div>
    </div>
  );
}
