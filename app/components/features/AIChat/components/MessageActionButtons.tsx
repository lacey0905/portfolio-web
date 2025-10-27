import type { MessageActionButtonsProps } from "../types";

export default function MessageActionButtons({
  messageIndex,
  isLastMessage,
  isFirstMessage,
  isCopied,
  isLoading,
  onCopy,
  onRegenerate,
}: MessageActionButtonsProps) {
  return (
    <div className="mt-1.5 flex items-center justify-end gap-0">
      {/* Regenerate Button - 마지막 메시지에만 표시 (첫 번째 메시지 제외) */}
      {isLastMessage && !isFirstMessage && (
        <button
          onClick={onRegenerate}
          className="p-1 rounded-md text-slate-500 hover:text-[rgb(94,234,212)] hover:bg-slate-700/30 transition-colors"
          title="재생성"
          disabled={isLoading}
        >
          <span className="material-symbols-outlined text-[14px] leading-none">
            refresh
          </span>
        </button>
      )}

      {/* Copy Button */}
      <button
        onClick={onCopy}
        className="p-1 rounded-md text-slate-500 hover:text-[rgb(94,234,212)] hover:bg-slate-700/30 transition-colors"
        title="복사하기"
      >
        {isCopied ? (
          <span className="material-symbols-outlined text-[14px] leading-none text-[rgb(94,234,212)]">
            check
          </span>
        ) : (
          <span className="material-symbols-outlined text-[14px] leading-none">
            content_copy
          </span>
        )}
      </button>
    </div>
  );
}
