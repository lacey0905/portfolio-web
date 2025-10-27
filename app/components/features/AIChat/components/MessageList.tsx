import UserMessage from "./UserMessage";
import AssistantMessage from "./AssistantMessage";
import LoadingIndicator from "./LoadingIndicator";
import type { MessageListProps } from "../types";

export default function MessageList({
  messages,
  isLoading,
  copiedIndex,
  onCopy,
  onRegenerate,
  messagesContainerRef,
  messagesEndRef,
}: MessageListProps) {
  return (
    <div
      ref={messagesContainerRef}
      className="chat-messages flex flex-1 flex-col gap-6 overflow-y-auto min-h-0 py-6 pb-6 overscroll-contain"
    >
      {messages.map((message, index) => (
        <div key={index} className="flex flex-col gap-3">
          {message.role === "user" ? (
            <UserMessage content={message.content} />
          ) : (
            <AssistantMessage
              content={message.content}
              index={index}
              isLastMessage={index === messages.length - 1}
              isFirstMessage={index === 0}
              copiedIndex={copiedIndex}
              isLoading={isLoading}
              onCopy={onCopy}
              onRegenerate={onRegenerate}
            />
          )}
        </div>
      ))}
      {isLoading && <LoadingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
}
