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
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuIndex(null);
      }
    };

    if (openMenuIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [openMenuIndex]);

  const handleCopy = async (content: string, index: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIndex(index);
      setOpenMenuIndex(null);
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDelete = (index: number) => {
    setMessages((prev) => prev.filter((_, i) => i !== index));
    setOpenMenuIndex(null);
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
      {/* Header */}
      <div className="mb-6 space-y-2">
        <p className="text-sm font-medium text-slate-300">💬 AI 어시스턴트</p>
        <p className="text-sm leading-relaxed text-slate-400">
          김현균의 경력과 기술 스택을 기반으로 답변해드립니다. <br />
          Gemini API를 활용하여 실시간으로 응답합니다.
        </p>
        <p className="text-xs text-slate-500">
          예) "주요 기술 스택이 무엇인가요?", "어떤 프로젝트 경험이 있나요?"
        </p>
      </div>

      {/* Messages */}
      <div className="chat-messages flex flex-1 flex-col gap-6 overflow-y-auto min-h-0 rounded-t-xl pb-20">
        {messages.map((message, index) => (
          <div key={index} className="flex flex-col gap-3">
            {message.role === "user" ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-700/50 text-slate-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                        clipRule="evenodd"
                      />
                    </svg>
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
                  <div className="mt-2 flex items-center justify-end gap-1">
                    {/* Regenerate Button */}
                    {index === messages.length - 1 && (
                      <button
                        onClick={() => handleRegenerate(index)}
                        className="p-2 rounded-md text-slate-500 hover:text-slate-300 hover:bg-slate-700/30 transition-colors"
                        title="재생성"
                        disabled={isLoading}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}

                    {/* Menu Button */}
                    <div ref={menuRef} className="relative">
                      <button
                        onClick={() =>
                          setOpenMenuIndex(
                            openMenuIndex === index ? null : index
                          )
                        }
                        className="p-2 rounded-md text-slate-500 hover:text-slate-300 hover:bg-slate-700/30 transition-colors"
                        title="메뉴"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                        </svg>
                      </button>

                      {/* Dropdown Menu */}
                      {openMenuIndex === index && (
                        <div className="absolute right-0 mt-1 w-32 rounded-lg bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 shadow-lg z-10">
                          <button
                            onClick={() => handleCopy(message.content, index)}
                            className="w-full px-3 py-2 text-left text-xs text-slate-300 hover:bg-slate-700/30 rounded-t-lg transition-colors flex items-center gap-2"
                          >
                            {copiedIndex === index ? (
                              <>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  className="w-4 h-4 text-green-400"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="text-green-400">복사됨!</span>
                              </>
                            ) : (
                              <>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
                                  <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
                                </svg>
                                <span>복사하기</span>
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="w-full px-3 py-2 text-left text-xs text-red-400 hover:bg-slate-700/30 rounded-b-lg transition-colors flex items-center gap-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>삭제하기</span>
                          </button>
                        </div>
                      )}
                    </div>
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
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400/60"></span>
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400/60"
                  style={{ animationDelay: "0.2s" }}
                ></span>
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400/60"
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
            className="flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-800/90 backdrop-blur-sm pl-5 pr-3 py-2.5 shadow-lg transition-all focus-within:border-cyan-400/50 focus-within:bg-slate-800/95 focus-within:shadow-xl focus-within:shadow-cyan-400/10 cursor-text"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="메시지를 입력하세요..."
              disabled={isLoading}
              className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-400 transition-all hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
              </svg>
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-xs text-slate-500/80">
          AI가 생성한 답변은 부정확할 수 있습니다. 중요한 정보는 반드시
          재확인하세요.
        </p>
      </div>
    </div>
  );
}
