"use client";

import { useEffect, ReactNode, useState } from "react";

interface ChatPopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function ChatPopup({
  isOpen,
  onClose,
  children,
}: ChatPopupProps) {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

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

  // iOS 키보드 감지 (visualViewport API)
  useEffect(() => {
    if (!isOpen) return;

    const handleViewportResize = () => {
      if (window.visualViewport) {
        const viewportHeight = window.visualViewport.height;
        const windowHeight = window.innerHeight;
        const diff = windowHeight - viewportHeight;
        setKeyboardHeight(diff > 0 ? diff : 0);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleViewportResize);
      handleViewportResize();
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleViewportResize);
      }
      setKeyboardHeight(0);
    };
  }, [isOpen]);

  // 스크롤 방지 (iOS 대응)
  useEffect(() => {
    if (!isOpen) return;

    // 현재 스크롤 위치 저장
    const scrollY = window.scrollY;
    const body = document.body;
    const html = document.documentElement;

    // body를 고정하여 스크롤 완전 차단
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    return () => {
      // 스타일 제거
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.overflow = "";
      html.style.overflow = "";

      // 스크롤 위치 복원
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // 키보드가 열렸을 때 모든 스크롤 완전 차단
  useEffect(() => {
    if (keyboardHeight <= 0) return;

    const preventScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const preventWheel = (e: WheelEvent) => {
      e.preventDefault();
    };

    const preventTouch = (e: TouchEvent) => {
      e.preventDefault();
    };

    // 모든 스크롤 이벤트 차단
    window.addEventListener("scroll", preventScroll, { passive: false });
    window.addEventListener("wheel", preventWheel, { passive: false });
    window.addEventListener("touchmove", preventTouch, { passive: false });
    document.addEventListener("scroll", preventScroll, { passive: false });
    document.addEventListener("wheel", preventWheel, { passive: false });
    document.addEventListener("touchmove", preventTouch, { passive: false });

    return () => {
      window.removeEventListener("scroll", preventScroll);
      window.removeEventListener("wheel", preventWheel);
      window.removeEventListener("touchmove", preventTouch);
      document.removeEventListener("scroll", preventScroll);
      document.removeEventListener("wheel", preventWheel);
      document.removeEventListener("touchmove", preventTouch);
    };
  }, [keyboardHeight]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-md xl:hidden"
        onClick={onClose}
        onTouchMove={(e) => e.preventDefault()}
        style={{
          animation: "fadeIn 0.3s ease-out",
          touchAction: "none"
        }}
        aria-hidden="true"
      />

      {/* Popup - 하단에서 올라오는 디자인 */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 xl:hidden"
        style={{
          animation: "slideUpFromBottom 0.3s ease-out",
          paddingBottom: keyboardHeight > 0 ? `${keyboardHeight}px` : "var(--safe-area-inset-bottom)",
          transition: "padding-bottom 0.2s ease-out",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="AI 채팅"
      >
        <div className="relative h-[75vh] max-h-[700px] w-full rounded-t-3xl bg-slate-900/30 backdrop-blur-2xl shadow-2xl overflow-hidden border-t-2 border-x-2 border-[rgb(94,234,212)]/60 border-b-0">
          {/* Glassmorphism overlay with stronger gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 via-slate-800/10 to-transparent pointer-events-none" />

          {/* Top edge glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgb(94,234,212)]/30 to-transparent pointer-events-none" />

          {/* Chat Content */}
          <div
            className="relative h-full px-3 py-4 sm:p-4"
            style={{
              paddingBottom: "calc(1rem + var(--safe-area-inset-bottom))",
            }}
          >
            <div className="h-full [&>div]:!mb-0 [&>div]:h-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
