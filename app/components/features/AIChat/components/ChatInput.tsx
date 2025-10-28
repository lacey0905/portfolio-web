import { memo } from "react";
import type { ChatInputProps } from "../types";

function ChatInput({
  value,
  isLoading,
  onChange,
  onSubmit,
  inputRef,
}: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && value.trim()) {
        const form = e.currentTarget.form;
        if (form) {
          onSubmit(e as any);
        }
      }
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 xl:bottom-5 xl:left-5 xl:right-5">
      <form onSubmit={onSubmit}>
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex items-center gap-3 rounded-full border border-slate-700/50 bg-slate-800/90 backdrop-blur-sm pl-5 pr-3 py-2.5 shadow-lg transition-all focus-within:border-[rgb(94,234,212)]/50 focus-within:bg-slate-800/95 focus-within:shadow-xl focus-within:shadow-[rgb(94,234,212)]/10 cursor-text"
        >
          <span className="material-symbols-outlined text-[14px] leading-none text-slate-500">
            auto_awesome
          </span>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="궁금한 것을 질문해 보세요"
            disabled={isLoading}
            enterKeyHint="send"
            className="flex-1 bg-transparent text-base text-slate-200 placeholder-slate-400 outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !value.trim()}
            aria-label="메시지 전송"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[rgb(94,234,212)]/10 text-[rgb(94,234,212)] transition-all hover:bg-[rgb(94,234,212)]/20 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <span className="material-symbols-outlined text-[22px] leading-none">
              send
            </span>
          </button>
        </div>
      </form>
      <p className="mt-2 text-center text-xs text-slate-500/80">
        <span className="inline-block">AI가 생성한 답변은 부정확할 수 있습니다.</span>{" "}
        <span className="inline-block">중요한 정보는 반드시 재확인하세요.</span>
      </p>
    </div>
  );
}

// 메모이제이션
export default memo(ChatInput);
