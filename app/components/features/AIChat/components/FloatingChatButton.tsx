interface FloatingChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function FloatingChatButton({
  isOpen,
  onClick,
}: FloatingChatButtonProps) {
  if (isOpen) return null;

  return (
    <button
      onClick={onClick}
      className="fixed right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(94,234,212)] text-navy-900 shadow-lg transition-all hover:scale-110 hover:shadow-xl active:scale-100 active:shadow-lg xl:hidden"
      style={{
        bottom: "calc(1.5rem + var(--safe-area-inset-bottom))",
      }}
      aria-label="AI 채팅 열기"
      aria-expanded="false"
      type="button"
    >
      <span className="material-symbols-outlined text-[28px] leading-none">
        chat
      </span>
    </button>
  );
}
