import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Gemini API 인스턴스
 */
export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

/**
 * Gemini 채팅 응답 생성
 * @param systemPrompt - 시스템 프롬프트
 * @param userMessage - 사용자 메시지
 * @returns AI 응답 텍스트
 */
export async function generateChatResponse(
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  // Gemini 2.0 Flash 모델 설정 (최신 버전)
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: systemPrompt,
  });

  // 대화 생성
  const chat = model.startChat();
  const result = await chat.sendMessage(userMessage);
  const text = result.response.text();

  return text;
}

/**
 * API 키 유효성 검증
 * @returns API 키가 설정되어 있는지 여부
 */
export function validateApiKey(): boolean {
  return !!process.env.GEMINI_API_KEY;
}
