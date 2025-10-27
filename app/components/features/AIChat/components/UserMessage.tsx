import type { UserMessageProps } from "../types";

export default function UserMessage({ content }: UserMessageProps) {
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-700/50 text-slate-300">
          <span className="material-symbols-outlined text-[18px] leading-none">
            person
          </span>
        </div>
        <span className="text-sm font-medium text-slate-400">
          You (Recruiter)
        </span>
      </div>
      <div className="rounded-2xl bg-slate-800/40 px-4 py-2.5 text-sm leading-relaxed text-slate-200 whitespace-pre-wrap">
        {content}
      </div>
    </>
  );
}
