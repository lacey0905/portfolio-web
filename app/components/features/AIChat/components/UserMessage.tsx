import { memo } from "react";
import type { UserMessageProps } from "../types";

function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="flex flex-col items-end gap-3">
      <div className="rounded-2xl bg-[rgb(94,234,212)]/10 px-4 py-2.5 text-sm leading-relaxed text-slate-200 whitespace-pre-wrap max-w-[85%]">
        {content}
      </div>
    </div>
  );
}

// 메모이제이션으로 불필요한 리렌더링 방지
export default memo(UserMessage);
