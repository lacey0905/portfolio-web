"use client";

import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";
import ResetChatButton from "./components/ResetChatButton";
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
  handleReset: () => void;
  canReset: boolean;
  model: string | null;
  setInput: (value: string) => void;
  scrollToBottom: () => void;
  suggestedQuestions: string[];
  showSuggestions: boolean;
  handleSuggestionSelect: (question: string) => void;
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
  handleReset,
  canReset,
  model,
  setInput,
  scrollToBottom,
  suggestedQuestions,
  showSuggestions,
  handleSuggestionSelect,
}: AIChatProps) {
  return (
    <div className="mt-auto flex flex-1 flex-col lg:mt-auto lg:min-h-0 relative ">
      {/* Chat Container with Border */}
      <div className="flex flex-1 flex-col xl:bg-white/5 rounded-2xl px-1 xl:px-6 relative min-h-0">
        {/* Reset - 대화가 시작된 뒤에만 노출 */}
        {canReset && (
          <div className="absolute right-1 top-0 z-10 xl:right-6 xl:top-6">
            <ResetChatButton onReset={handleReset} />
          </div>
        )}

        {/* Messages */}
        <MessageList
          messages={messages}
          isLoading={isLoading}
          copiedIndex={copiedIndex}
          onCopy={handleCopy}
          onRegenerate={handleRegenerate}
          messagesContainerRef={messagesContainerRef}
          messagesEndRef={messagesEndRef}
          suggestedQuestions={suggestedQuestions}
          showSuggestions={showSuggestions}
          onSuggestionSelect={handleSuggestionSelect}
        />

        {/* Input Form */}
        <ChatInput
          value={input}
          isLoading={isLoading}
          model={model}
          onChange={setInput}
          onSubmit={handleSubmit}
          inputRef={inputRef}
        />
      </div>
    </div>
  );
}
