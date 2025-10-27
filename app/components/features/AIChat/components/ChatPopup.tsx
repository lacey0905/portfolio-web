"use client";

import { useEffect } from "react";
import AIChat from "../AIChat";

interface ChatPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatPopup({ isOpen, onClose }: ChatPopupProps) {
  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // 화면 크기 변경 감지 (1280px 이상이 되면 팝업 닫기)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280 && isOpen) {
        onClose();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, onClose]);

  // 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-md xl:hidden"
        onClick={onClose}
        style={{ animation: "fadeIn 0.3s ease-out" }}
      />

      {/* Popup - 하단에서 올라오는 디자인 */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 xl:hidden"
        style={{ animation: "slideUpFromBottom 0.3s ease-out" }}
      >
        <div className="relative h-[75vh] max-h-[700px] w-full rounded-t-3xl bg-slate-900/30 backdrop-blur-2xl shadow-2xl overflow-hidden border-t-2 border-x-2 border-[rgb(94,234,212)]/60 border-b-0">
          {/* Glassmorphism overlay with stronger gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 via-slate-800/10 to-transparent pointer-events-none" />

          {/* Top edge glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgb(94,234,212)]/30 to-transparent pointer-events-none" />

          {/* Chat Content */}
          <div className="relative h-full p-4 sm:p-6 pb-[60px] sm:pb-14">
            <div className="h-full [&>div]:!mb-0 [&>div]:h-full">
              <AIChat />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
