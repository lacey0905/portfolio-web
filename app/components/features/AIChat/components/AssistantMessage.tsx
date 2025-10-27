import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import profile from "@/data/profile.json";
import MessageActionButtons from "./MessageActionButtons";
import type { AssistantMessageProps } from "../types";

export default function AssistantMessage({
  content,
  index,
  isLastMessage,
  isFirstMessage,
  copiedIndex,
  isLoading,
  onCopy,
  onRegenerate,
}: AssistantMessageProps) {
  return (
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
        <div className="markdown-content rounded-2xl bg-slate-800/40 px-6 py-5 text-sm leading-relaxed text-slate-300">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
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
