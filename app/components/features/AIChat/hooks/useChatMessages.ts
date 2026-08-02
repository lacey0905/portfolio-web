import { useState, useRef, useEffect, useCallback } from "react";
import chatMessages from "@/data/chat-messages.json";
import suggestedQuestionsData from "@/data/suggested-questions.json";
import type { Message } from "../types";

// 모든 데이터 소스를 기본으로 참조
const ALL_DATA_SOURCES = [
  "profile",
  "experience",
  "archive",
  "myStory",
  "qna",
];

// 고유 ID 생성 함수
function generateMessageId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function createInitialMessages(): Message[] {
  return [{ ...chatMessages.initialMessage, id: generateMessageId() } as Message];
}

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>(createInitialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  // 초기화가 일어나면 증가시켜, 이전 요청의 응답이 새 대화에 섞이지 않도록 한다
  const sessionRef = useRef(0);

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
  }, [messages, scrollToBottom]);

  // 초기 마운트 시에도 스크롤
  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  // 첫 대화 전에도 사용 모델을 표시하기 위해 미리 조회
  useEffect(() => {
    let cancelled = false;

    fetch("/api/chat")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.model) setModel(data.model);
      })
      .catch(() => {
        // 표시용 정보이므로 실패해도 채팅에는 영향을 주지 않는다
      });

    return () => {
      cancelled = true;
    };
  }, []);

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

      const session = sessionRef.current;
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        // 재생성 시점까지의 히스토리 전달 (초기 메시지 제외)
        const historyUpToIndex = messages
          .slice(0, index)
          .filter(
            (m) =>
              m.role !== "assistant" ||
              m.content !== chatMessages.initialMessage.content
          );

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: lastUserMessage.content,
            dataSources: ALL_DATA_SOURCES,
            history: historyUpToIndex,
          }),
          signal: controller.signal,
        });

        const data = await response.json();

        if (sessionRef.current !== session) return;

        if (response.ok) {
          if (data.model) setModel(data.model);
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
        if (sessionRef.current !== session) return;
        console.error("Error:", error);
      } finally {
        if (sessionRef.current === session) {
          setIsLoading(false);
        }
      }
    },
    [messages]
  );

  const sendMessage = useCallback(
    async (rawMessage: string) => {
      const userMessage = rawMessage.trim();
      if (!userMessage || isLoading) return;

      setInput("");
      setMessages((prev) => [
        ...prev,
        { role: "user", content: userMessage, id: generateMessageId() },
      ]);
      setIsLoading(true);

      const session = sessionRef.current;
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
            dataSources: ALL_DATA_SOURCES,
            history: messages.filter(
              (m) =>
                m.role !== "assistant" ||
                m.content !== chatMessages.initialMessage.content
            ),
          }),
          signal: controller.signal,
        });

        const data = await response.json();

        if (sessionRef.current !== session) return;

        if (response.ok) {
          if (data.model) setModel(data.model);
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
        if (sessionRef.current !== session) return;
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
        if (sessionRef.current === session) {
          setIsLoading(false);

          // 응답 완료 후 포커스 복원
          requestAnimationFrame(() => {
            inputRef.current?.focus();
          });
        }
      }
    },
    [isLoading, messages]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      sendMessage(input);
    },
    [sendMessage, input]
  );

  const handleSuggestionSelect = useCallback(
    (question: string) => {
      sendMessage(question);
    },
    [sendMessage]
  );

  const handleReset = useCallback(() => {
    sessionRef.current += 1;
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;

    setMessages(createInitialMessages());
    setInput("");
    setIsLoading(false);
    setCopiedIndex(null);

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, []);

  // 대화가 시작되기 전(초기 메시지만 있을 때)에만 예시 질문 노출
  const showSuggestions = messages.length === 1 && !isLoading;
  const canReset = messages.length > 1 || isLoading;

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
    handleReset,
    canReset,
    model,
    setInput,
    scrollToBottom,
    suggestedQuestions: suggestedQuestionsData.questions,
    showSuggestions,
    handleSuggestionSelect,
  };
}
