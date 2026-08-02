// lib/ai/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  getApiVersion,
  invalidateChatModelCache,
  resolveChatModel,
} from "./models";

/**
 * Gemini API 인스턴스
 */
export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

type ChatHistory = Array<{ role: string; content: string }>;

export interface ChatResponse {
  text: string;
  /** 실제 응답을 생성한 모델 (폴백·재시도가 일어났다면 그 결과) */
  model: string;
}

/**
 * 지정한 모델로 1회 호출
 * - system prompt는 history 첫 메시지로 전달 (v1의 systemInstruction 미지원 대응)
 * - 이전 대화 히스토리를 포함하여 컨텍스트 유지
 */
async function callModel(
  modelId: string,
  systemPrompt: string,
  userMessage: string,
  chatHistory: ChatHistory
): Promise<string> {
  const model = genAI.getGenerativeModel(
    { model: modelId },
    { apiVersion: getApiVersion() }
  );

  const geminiHistory = [
    {
      role: "user",
      parts: [{ text: `SYSTEM: ${systemPrompt}` }],
    },
    ...chatHistory.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    })),
  ];

  const chat = model.startChat({ history: geminiHistory });
  const result = await chat.sendMessage(userMessage);
  return result.response.text();
}

/**
 * Gemini 채팅 응답 생성
 * 사용할 모델은 API 키가 지원하는 목록에서 자동으로 선택된다.
 */
export async function generateChatResponse(
  systemPrompt: string,
  userMessage: string,
  chatHistory: ChatHistory = []
): Promise<ChatResponse> {
  const modelId = await resolveChatModel();

  try {
    const text = await callModel(
      modelId,
      systemPrompt,
      userMessage,
      chatHistory
    );
    return { text, model: modelId };
  } catch (error: any) {
    // 캐시해둔 모델이 사라진 경우, 목록을 다시 조회해 한 번만 재시도
    if (error?.status === 404) {
      invalidateChatModelCache();
      const retryModelId = await resolveChatModel();

      if (retryModelId !== modelId) {
        console.warn(`[gemini] ${modelId} 사용 불가, ${retryModelId}로 재시도`);
        const text = await callModel(
          retryModelId,
          systemPrompt,
          userMessage,
          chatHistory
        );
        return { text, model: retryModelId };
      }
    }

    // 공통 에러 핸들링
    if (error?.status === 429) {
      throw new Error(
        "API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요."
      );
    }
    if (error?.status === 503) {
      throw new Error(
        "AI 서버가 혼잡합니다. 잠시 후 다시 시도해주세요."
      );
    }
    if (error?.status === 404) {
      throw new Error(
        "사용 가능한 모델을 찾을 수 없습니다. API 키 권한을 확인해주세요."
      );
    }
    if (error?.status === 400) {
      throw new Error(
        "요청 형식이 모델/버전에 맞지 않습니다. system 프롬프트를 history에 넣었는지 확인해주세요."
      );
    }
    throw error;
  }
}

/**
 * API 키 유효성 검증
 */
export function validateApiKey(): boolean {
  return !!process.env.GEMINI_API_KEY;
}
