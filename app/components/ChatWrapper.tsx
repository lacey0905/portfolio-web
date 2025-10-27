"use client";

import { useState } from "react";
import AIChat from "./features/AIChat";
import FloatingChatButton from "./features/AIChat/components/FloatingChatButton";
import ChatPopup from "./features/AIChat/components/ChatPopup";

export default function ChatWrapper() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Desktop Chat - 1280px 이상에서만 표시 */}
      <div
        id="left-section"
        className="hidden xl:sticky xl:top-0 xl:flex xl:h-screen xl:min-h-[800px] xl:w-[45%] xl:min-w-[500px] xl:flex-col xl:gap-14 xl:pt-12 xl:pb-12"
      >
        <AIChat />
      </div>

      {/* Floating Chat Button - 1280px 미만에서만 표시 */}
      <FloatingChatButton
        isOpen={isChatOpen}
        onClick={() => setIsChatOpen(true)}
      />

      {/* Chat Popup */}
      <ChatPopup isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
