"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import chatMessages from "@/data/chat-messages.json";
import profile from "@/data/profile.json";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// 모든 데이터 소스를 기본으로 참조
const ALL_DATA_SOURCES = ["profile", "experience", "archive", "resume"];

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    chatMessages.initialMessage as Message,
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCopy = async (content: string, index: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIndex(index);
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleRegenerate = async (index: number) => {
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
          { role: "assistant", content: data.message },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
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
          { role: "assistant", content: data.message },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.",
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
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-auto flex flex-1 flex-col lg:mt-auto lg:min-h-0 relative mb-6">
      {/* Chat Container with Border */}
      <div className="flex flex-1 flex-col border border-slate-700/50 rounded-2xl px-6 pb-6 relative min-h-0">
        {/* Messages */}
        <div
          ref={messagesContainerRef}
          className="chat-messages flex flex-1 flex-col gap-6 overflow-y-auto min-h-0 py-6 pb-6 overscroll-contain"
        >
          {messages.map((message, index) => (
            <div key={index} className="flex flex-col gap-3">
              {message.role === "user" ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-700/50 text-slate-300">
                      <span className="material-symbols-outlined text-[18px] leading-none">
                        person
                      </span>
                    </div>
                    <span className="text-sm font-medium text-slate-400">
                      You (Recruiter)
                    </span>
                  </div>
                  <div className="rounded-2xl bg-slate-800/40 px-4 py-2.5 text-sm leading-relaxed text-slate-200 whitespace-pre-wrap">
                    {message.content}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                      <Image
                        src="/KIM-HYOUN_GYOUN.jpg"
                        alt={profile.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-slate-300">
                      {profile.name}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="rounded-2xl bg-slate-800/40 px-6 py-5 text-sm leading-relaxed text-slate-300 whitespace-pre-wrap">
                      {message.content}
                    </div>
                    {/* Action Buttons */}
                    <div className="mt-1.5 flex items-center justify-end gap-0">
                      {/* Regenerate Button - 마지막 메시지에만 표시 (첫 번째 메시지 제외) */}
                      {index === messages.length - 1 && index !== 0 && (
                        <button
                          onClick={() => handleRegenerate(index)}
                          className="p-1 rounded-md text-slate-500 hover:text-blue-400 hover:bg-slate-700/30 transition-colors"
                          title="재생성"
                          disabled={isLoading}
                        >
                          <span className="material-symbols-outlined text-[14px] leading-none">
                            refresh
                          </span>
                        </button>
                      )}

                      {/* Copy Button */}
                      <button
                        onClick={() => handleCopy(message.content, index)}
                        className="p-1 rounded-md text-slate-500 hover:text-blue-400 hover:bg-slate-700/30 transition-colors"
                        title="복사하기"
                      >
                        {copiedIndex === index ? (
                          <span className="material-symbols-outlined text-[14px] leading-none text-blue-400">
                            check
                          </span>
                        ) : (
                          <span className="material-symbols-outlined text-[14px] leading-none">
                            content_copy
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                  <Image
                    src="/KIM-HYOUN_GYOUN.jpg"
                    alt={profile.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-slate-300">
                  {profile.name}
                </span>
              </div>
              <div className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400/60"></span>
                  <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400/60"
                    style={{ animationDelay: "0.2s" }}
                  ></span>
                  <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400/60"
                    style={{ animationDelay: "0.4s" }}
                  ></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="absolute -bottom-10 left-0 right-0">
          <form onSubmit={handleSubmit}>
            <div
              onClick={() => inputRef.current?.focus()}
              className="flex items-center gap-3 rounded-full border border-slate-700/50 bg-slate-800/90 backdrop-blur-sm pl-5 pr-3 py-2.5 shadow-lg transition-all focus-within:border-blue-400/50 focus-within:bg-slate-800/95 focus-within:shadow-xl focus-within:shadow-blue-400/10 cursor-text"
            >
              <span className="material-symbols-outlined text-[14px] leading-none text-slate-500">
                auto_awesome
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="궁금한 것을 질문해 보세요"
                disabled={isLoading}
                className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-400 outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 transition-all hover:bg-blue-500/20 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <span className="material-symbols-outlined text-[22px] leading-none">
                  send
                </span>
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-xs text-slate-500/80">
            AI가 생성한 답변은 부정확할 수 있습니다. 중요한 정보는 반드시
            재확인하세요.
          </p>
        </div>
      </div>{" "}
      {/* Chat Container with Border 닫기 */}
    </div>
  );
}
