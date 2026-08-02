import { memo, useCallback, useEffect, useState } from "react";
import type { SuggestedQuestionsProps } from "../types";

// 한 번에 보여줄 질문 수
const VISIBLE_COUNT = 3;
// 자동 로테이션 간격 (ms)
const ROTATE_INTERVAL = 8000;

function SuggestedQuestions({
  questions,
  isLoading,
  onSelect,
}: SuggestedQuestionsProps) {
  // SSR/CSR 결과를 일치시키기 위해 0에서 시작하고, 마운트 후 무작위 위치로 이동
  const [offset, setOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = questions.length;
  const canRotate = total > VISIBLE_COUNT;

  const rotate = useCallback(() => {
    setOffset((prev) => (prev + VISIBLE_COUNT) % total);
  }, [total]);

  useEffect(() => {
    if (!canRotate) return;
    setOffset(Math.floor(Math.random() * total));
  }, [canRotate, total]);

  useEffect(() => {
    if (!canRotate || isPaused || isLoading) return;

    const timer = setInterval(rotate, ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [canRotate, isPaused, isLoading, rotate]);

  if (total === 0) {
    return null;
  }

  const visible = Array.from(
    { length: Math.min(VISIBLE_COUNT, total) },
    (_, index) => questions[(offset + index) % total]
  );

  return (
    <div
      className="flex flex-col gap-2.5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-slate-500">
          <span className="material-symbols-outlined text-[15px] leading-none">
            auto_awesome
          </span>
          <span className="text-xs font-medium">
            이런 걸 물어보실 수 있어요
          </span>
        </div>

        {canRotate && (
          <button
            type="button"
            onClick={rotate}
            disabled={isLoading}
            title="다른 질문 보기"
            aria-label="다른 예시 질문 보기"
            className="rounded-md p-1 text-slate-500 transition-all hover:bg-slate-700/30 hover:text-[rgb(94,234,212)] active:scale-95 active:bg-slate-700/50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-[16px] leading-none">
              autorenew
            </span>
          </button>
        )}
      </div>

      <ul key={offset} className="fade-in flex flex-col gap-1.5">
        {visible.map((question) => (
          <li key={question}>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => onSelect(question)}
              className="group/suggestion flex w-full items-center justify-between gap-3 rounded-xl border border-slate-700/50 bg-slate-800/30 px-3.5 py-2.5 text-left text-[13px] leading-snug text-slate-300 transition-all hover:border-[rgb(94,234,212)]/40 hover:bg-slate-800/70 hover:text-[rgb(94,234,212)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span>{question}</span>
              <span className="material-symbols-outlined flex-shrink-0 text-[16px] leading-none text-slate-600 transition-colors group-hover/suggestion:text-[rgb(94,234,212)]">
                arrow_forward
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(SuggestedQuestions);
