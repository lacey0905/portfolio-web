"use client";

import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";
import "highlight.js/styles/github-dark.css";
import type { Message } from "./types";

interface AIChatProps {
  messages: Message[];
  input: string;
  isLoading: boolean;
  copiedIndex: number | null;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  messagesContainerRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleSubmit: (e: React.FormEvent) => void;
  handleCopy: (content: string, index: number) => void;
  handleRegenerate: (index: number) => void;
  setInput: (value: string) => void;
  scrollToBottom: () => void;
}

export default function AIChat({
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
  scrollToBottom,
}: AIChatProps) {
  return (
    <div className="mt-auto flex flex-1 flex-col lg:mt-auto lg:min-h-0 relative ">
      {/* Chat Container with Border */}
      <div className="flex flex-1 flex-col xl:bg-white/5 rounded-2xl px-1 xl:px-6 relative min-h-0">
        {/* Messages */}
        <MessageList
          messages={messages}
          isLoading={isLoading}
          copiedIndex={copiedIndex}
          onCopy={handleCopy}
          onRegenerate={handleRegenerate}
          messagesContainerRef={messagesContainerRef}
          messagesEndRef={messagesEndRef}
        />

        {/* Input Form */}
        <ChatInput
          value={input}
          isLoading={isLoading}
          onChange={setInput}
          onSubmit={handleSubmit}
          inputRef={inputRef}
        />
      </div>
    </div>
  );
}
