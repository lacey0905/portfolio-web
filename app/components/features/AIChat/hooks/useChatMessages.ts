import { useState, useRef, useEffect, useCallback } from "react";
import chatMessages from "@/data/chat-messages.json";
import type { Message } from "../types";

// 모든 데이터 소스를 기본으로 참조
const ALL_DATA_SOURCES = [
  "profile",
  "experience",
  "archive",
  "resume",
  "myStory",
];

// 고유 ID 생성 함수
function generateMessageId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>([
    { ...chatMessages.initialMessage, id: generateMessageId() } as Message,
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 로딩 완료 시 포커스 복원
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      // 약간의 지연 후 포커스 (DOM 업데이트 대기)
      const focusTimer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);

      return () => clearTimeout(focusTimer);
    }
  }, [isLoading]);

  const handleCopy = useCallback(async (content: string, index: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIndex(index);
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, []);

  const handleRegenerate = useCallback(
    async (index: number) => {
      // 마지막 AI 응답 재생성
      const lastUserMessage = messages
        .slice(0, index)
        .reverse()
        .find((m) => m.role === "user");

      if (!lastUserMessage) return;

      // 해당 메시지 이후의 모든 메시지 제거
      setMessages((prev) => prev.slice(0, index));
      setIsLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: lastUserMessage.content,
            dataSources: ALL_DATA_SOURCES,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: data.message,
              id: generateMessageId(),
            },
          ]);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || isLoading) return;

      const userMessage = input.trim();
      setInput("");
      setMessages((prev) => [
        ...prev,
        { role: "user", content: userMessage, id: generateMessageId() },
      ]);
      setIsLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
            dataSources: ALL_DATA_SOURCES,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: data.message,
              id: generateMessageId(),
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.",
              id: generateMessageId(),
            },
          ]);
        }
      } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "네트워크 오류가 발생했습니다. 다시 시도해주세요.",
            id: generateMessageId(),
          },
        ]);
      } finally {
        setIsLoading(false);

        // 응답 완료 후 포커스 복원
        requestAnimationFrame(() => {
          inputRef.current?.focus();
        });
      }
    },
    [input, isLoading]
  );

  return {
    messages,
    input,
    isLoading,
    copiedIndex,
    messagesEndRef,
    messagesContainerRef,
    inputRef,
    handleSubmit,
    handleCopy,
    handleRegenerate,
    setInput,
  };
}
