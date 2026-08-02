/**
 * AIChat 관련 타입 정의
 */

export interface Message {
  role: "user" | "assistant";
  content: string;
  id?: string; // 고유 ID 추가 (옵셔널)
}

export interface ChatInputProps {
  value: string;
  isLoading: boolean;
  /** 현재 응답에 사용 중인 모델 ID (조회 전에는 null) */
  model: string | null;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export interface ResetChatButtonProps {
  onReset: () => void;
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

export interface SuggestedQuestionsProps {
  questions: string[];
  isLoading: boolean;
  onSelect: (question: string) => void;
}

export interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  copiedIndex: number | null;
  onCopy: (content: string, index: number) => void;
  onRegenerate: (index: number) => void;
  messagesContainerRef: React.RefObject<HTMLDivElement | null>;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  suggestedQuestions: string[];
  showSuggestions: boolean;
  onSuggestionSelect: (question: string) => void;
}
