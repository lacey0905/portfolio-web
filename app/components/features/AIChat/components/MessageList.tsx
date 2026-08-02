import UserMessage from "./UserMessage";
import AssistantMessage from "./AssistantMessage";
import LoadingIndicator from "./LoadingIndicator";
import SuggestedQuestions from "./SuggestedQuestions";
import type { MessageListProps } from "../types";

export default function MessageList({
  messages,
  isLoading,
  copiedIndex,
  onCopy,
  onRegenerate,
  messagesContainerRef,
  messagesEndRef,
  suggestedQuestions,
  showSuggestions,
  onSuggestionSelect,
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
            className={`flex min-w-0 flex-col gap-3 ${
              isLastMessage && !showSuggestions ? "pb-12" : ""
            }`}
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
      {showSuggestions && (
        <SuggestedQuestions
          questions={suggestedQuestions}
          isLoading={isLoading}
          onSelect={onSuggestionSelect}
        />
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
