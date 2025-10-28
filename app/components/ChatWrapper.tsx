"use client";

import { useState, useCallback, useEffect } from "react";
import { useChatMessages } from "./features/AIChat/hooks/useChatMessages";
import AIChat from "./features/AIChat";
import FloatingChatButton from "./features/AIChat/components/FloatingChatButton";
import ChatPopup from "./features/AIChat/components/ChatPopup";

export default function ChatWrapper() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // 채팅 상태를 최상위에서 관리 (데스크톱/모바일 공유)
  const chatState = useChatMessages();

  const handleOpenChat = useCallback(() => {
    setIsChatOpen(true);
  }, []);

  const handleCloseChat = useCallback(() => {
    setIsChatOpen(false);
  }, []);

  // 팝업이 열릴 때 스크롤을 하단으로
  useEffect(() => {
    if (isChatOpen) {
      // 팝업 애니메이션 후 스크롤 (300ms 애니메이션 + 100ms 여유)
      const timer = setTimeout(() => {
        chatState.scrollToBottom();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isChatOpen, chatState.scrollToBottom]);

  return (
    <>
      {/* Desktop Chat - 1280px 이상에서만 표시 */}
      <div
        id="left-section"
        className="hidden xl:sticky xl:top-0 xl:flex xl:h-screen xl:min-h-[800px] xl:w-[45%] xl:min-w-[500px] xl:flex-col xl:gap-14 xl:pt-12 xl:pb-12"
      >
        <AIChat {...chatState} />
      </div>

      {/* Floating Chat Button - 1280px 미만에서만 표시 */}
      <FloatingChatButton isOpen={isChatOpen} onClick={handleOpenChat} />

      {/* Chat Popup - 모바일용 */}
      <ChatPopup isOpen={isChatOpen} onClose={handleCloseChat}>
        <AIChat {...chatState} />
      </ChatPopup>
    </>
  );
}
