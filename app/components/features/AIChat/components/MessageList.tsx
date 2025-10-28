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
      className="chat-messages flex flex-1 flex-col gap-6 overflow-y-auto min-h-0 overscroll-contain mt-0 xl:mt-6 mb-12 xl:mb-16 rounded-2xl"
    >
      {messages.map((message, index) => {
        const isLastMessage = index === messages.length - 1;
        return (
          <div
            key={message.id || index}
            className={`flex flex-col gap-3 ${isLastMessage ? "pb-12" : ""}`}
          >
            {message.role === "user" ? (
              <UserMessage content={message.content} />
            ) : (
              <AssistantMessage
                content={message.content}
                index={index}
                isLastMessage={isLastMessage}
                isFirstMessage={index === 0}
                copiedIndex={copiedIndex}
                isLoading={isLoading}
                onCopy={onCopy}
                onRegenerate={onRegenerate}
              />
            )}
          </div>
        );
      })}
      {isLoading && <LoadingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
}
