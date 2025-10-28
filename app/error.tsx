"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy-500 px-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-800/50 p-8 text-center backdrop-blur-sm border border-slate-700/50">
        <div className="mb-4 flex justify-center">
          <span className="material-symbols-outlined text-6xl text-red-400">
            error
          </span>
        </div>

        <h2 className="mb-3 text-2xl font-bold text-slate-200">
          문제가 발생했습니다
        </h2>

        <p className="mb-6 text-sm text-slate-400">
          {error.message || "예상치 못한 오류가 발생했습니다."}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={reset}
            className="rounded-lg bg-[rgb(94,234,212)] px-6 py-3 text-sm font-medium text-navy-900 transition-all hover:bg-[rgb(94,234,212)]/90"
            type="button"
          >
            다시 시도
          </button>

          <a
            href="/"
            className="rounded-lg border border-slate-700 px-6 py-3 text-sm font-medium text-slate-200 transition-all hover:bg-slate-700/30"
          >
            홈으로 돌아가기
          </a>
        </div>

        {process.env.NODE_ENV === "development" && error.digest && (
          <div className="mt-4 rounded-lg bg-slate-900/50 p-3 text-left">
            <p className="text-xs font-mono text-slate-500">
              Error Digest: {error.digest}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
