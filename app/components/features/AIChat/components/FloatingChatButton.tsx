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
      className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(94,234,212)] text-navy-900 shadow-lg transition-all hover:scale-110 hover:shadow-xl xl:hidden"
      aria-label="Open AI Chat"
    >
      <span className="material-symbols-outlined text-[28px] leading-none">
        chat
      </span>
    </button>
  );
}
