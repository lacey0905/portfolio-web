"use client";

import { useEffect, useRef, useState } from "react";

export default function Spotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const [isDesktop, setIsDesktop] = useState(false);

  // 데스크톱 감지 (1024px 이상)
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    // 데스크톱일 때만 마우스 이펙트 활성화
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          spotlightRef.current.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isDesktop]);

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed inset-0 z-30 hidden lg:block"
      style={{ willChange: "background" }}
    />
  );
}
