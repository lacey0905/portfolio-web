// lib/ai/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Gemini API 인스턴스
 */
export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

/**
 * Gemini 채팅 응답 생성 (v1 + 지원 모델 사용)
 * - system prompt는 history 첫 메시지로 전달
 */
export async function generateChatResponse(
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  try {
    // ✅ v1에서 확실히 되는 모델로 교체 (예: "gemini-2.5-flash")
    //    필요하면 "gemini-2.0-flash-001" 등 v1 목록에서 고르면 됨.
    const model = genAI.getGenerativeModel(
      { model: "gemini-2.5-flash" },
      { apiVersion: "v1" } // ← 중요: v1beta 말고 v1을 강제
    );

    // ✅ systemInstruction 대신 history로 시스템 규칙 전달
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: `SYSTEM: ${systemPrompt}` }],
        },
      ],
    });

    const result = await chat.sendMessage(userMessage);
    return result.response.text();
  } catch (error: any) {
    // 공통 에러 핸들링
    if (error?.status === 429) {
      throw new Error(
        "API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요."
      );
    }
    if (error?.status === 404) {
      throw new Error(
        "요청한 모델/버전 조합을 찾을 수 없습니다. 모델명을 v1에서 지원되는 것으로 변경해주세요."
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
