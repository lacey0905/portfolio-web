import { memo, useEffect, useState } from "react";
import type { ResetChatButtonProps } from "../types";

// 확인 상태를 방치했을 때 자동으로 되돌아가는 시간
const CONFIRM_TIMEOUT = 4000;

function ResetChatButton({ onReset }: ResetChatButtonProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    if (!isConfirming) return;

    const timer = setTimeout(() => setIsConfirming(false), CONFIRM_TIMEOUT);
    return () => clearTimeout(timer);
  }, [isConfirming]);

  const handleConfirm = () => {
    setIsConfirming(false);
    onReset();
  };

  if (isConfirming) {
    return (
      <div className="flex items-center gap-1.5 rounded-full border border-[rgb(94,234,212)]/40 bg-slate-800/95 backdrop-blur-sm py-1 pl-3 pr-1.5 shadow-lg">
        <span className="text-xs text-slate-300">대화를 지울까요?</span>
        <button
          type="button"
          onClick={handleConfirm}
          className="rounded-full bg-[rgb(94,234,212)]/15 px-2.5 py-1 text-xs font-medium text-[rgb(94,234,212)] transition-colors hover:bg-[rgb(94,234,212)]/25 active:scale-95"
        >
          확인
        </button>
        <button
          type="button"
          onClick={() => setIsConfirming(false)}
          className="rounded-full px-2 py-1 text-xs text-slate-400 transition-colors hover:text-slate-200"
        >
          취소
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsConfirming(true)}
      aria-label="대화 초기화"
      title="대화 초기화"
      className="flex items-center gap-1 rounded-full border border-slate-700/50 bg-slate-800/90 backdrop-blur-sm py-1 pl-2 pr-3 text-xs text-slate-400 shadow-lg transition-all hover:border-[rgb(94,234,212)]/40 hover:text-[rgb(94,234,212)] active:scale-95"
    >
      <span className="material-symbols-outlined text-[16px] leading-none">
        restart_alt
      </span>
      새 대화
    </button>
  );
}

export default memo(ResetChatButton);
