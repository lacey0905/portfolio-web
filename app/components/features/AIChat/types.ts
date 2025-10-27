/**
 * AIChat 관련 타입 정의
 */

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ChatInputProps {
  value: string;
  isLoading: boolean;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export interface MessageActionButtonsProps {
  messageIndex: number;
  isLastMessage: boolean;
  isFirstMessage: boolean;
  isCopied: boolean;
  isLoading: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
}

export interface UserMessageProps {
  content: string;
}

export interface AssistantMessageProps {
  content: string;
  index: number;
  isLastMessage: boolean;
  isFirstMessage: boolean;
  copiedIndex: number | null;
  isLoading: boolean;
  onCopy: (content: string, index: number) => void;
  onRegenerate: (index: number) => void;
}

export interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  copiedIndex: number | null;
  onCopy: (content: string, index: number) => void;
  onRegenerate: (index: number) => void;
  messagesContainerRef: React.RefObject<HTMLDivElement | null>;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}
