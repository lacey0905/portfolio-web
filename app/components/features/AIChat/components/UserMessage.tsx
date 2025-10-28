import { memo } from "react";
import type { UserMessageProps } from "../types";

function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="flex flex-col items-end gap-3">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-slate-400">
          You (Recruiter)
        </span>
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-700/50 text-slate-300">
          <span className="material-symbols-outlined text-[18px] leading-none">
            person
          </span>
        </div>
      </div>
      <div className="rounded-2xl bg-[rgb(94,234,212)]/10 px-4 py-2.5 text-sm leading-relaxed text-slate-200 whitespace-pre-wrap max-w-[85%]">
        {content}
      </div>
    </div>
  );
}

// 메모이제이션으로 불필요한 리렌더링 방지
export default memo(UserMessage);
