import { memo, useMemo } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import profile from "@/data/profile.json";
import MessageActionButtons from "./MessageActionButtons";
import type { AssistantMessageProps } from "../types";

function AssistantMessage({
  content,
  index,
  isLastMessage,
  isFirstMessage,
  copiedIndex,
  isLoading,
  onCopy,
  onRegenerate,
}: AssistantMessageProps) {
  // ReactMarkdown 플러그인을 메모이제이션
  const remarkPlugins = useMemo(() => [remarkGfm], []);
  const rehypePlugins = useMemo(() => [rehypeHighlight], []);

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="relative h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 overflow-hidden rounded-full">
          <Image
            src="/KIM-HYOUN_GYOUN.jpg"
            alt={profile.name}
            fill
            className="object-cover"
          />
        </div>
        <span className="text-sm sm:text-base font-medium text-slate-300">
          {profile.name}
        </span>
      </div>
      <div className="relative">
        <div className="markdown-content rounded-2xl bg-white/5 px-4 py-4 sm:px-6 sm:py-5 text-sm sm:text-base leading-relaxed text-slate-300">
          <ReactMarkdown
            remarkPlugins={remarkPlugins}
            rehypePlugins={rehypePlugins}
          >
            {content}
          </ReactMarkdown>
        </div>
        <MessageActionButtons
          messageIndex={index}
          isLastMessage={isLastMessage}
          isFirstMessage={isFirstMessage}
          isCopied={copiedIndex === index}
          isLoading={isLoading}
          onCopy={() => onCopy(content, index)}
          onRegenerate={() => onRegenerate(index)}
        />
      </div>
    </>
  );
}

// 메모이제이션으로 불필요한 리렌더링 방지
export default memo(AssistantMessage, (prevProps, nextProps) => {
  return (
    prevProps.content === nextProps.content &&
    prevProps.index === nextProps.index &&
    prevProps.isLastMessage === nextProps.isLastMessage &&
    prevProps.isFirstMessage === nextProps.isFirstMessage &&
    prevProps.copiedIndex === nextProps.copiedIndex &&
    prevProps.isLoading === nextProps.isLoading
  );
});
