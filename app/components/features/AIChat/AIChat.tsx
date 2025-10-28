"use client";

import { useChatMessages } from "./hooks/useChatMessages";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";
import "highlight.js/styles/github-dark.css";

export default function AIChat() {
  const {
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
  } = useChatMessages();

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
