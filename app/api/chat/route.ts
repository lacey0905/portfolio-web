import { NextRequest, NextResponse } from "next/server";
import { getProfileSync } from "@/lib/data/loaders";
import { generateSystemPrompt, generatePromptSections } from "@/lib/ai/prompts";
import { generateChatResponse, validateApiKey } from "@/lib/ai/gemini";
import { validateEnv } from "@/lib/env";

export async function POST(request: NextRequest) {
  try {
    // 환경 변수 검증
    try {
      validateEnv();
    } catch (envError) {
      console.error("Environment validation failed:", envError);
      return NextResponse.json(
        { error: "서버 설정 오류입니다. 관리자에게 문의하세요." },
        { status: 500 }
      );
    }

    const { message, dataSources = ["profile", "myStory"] } =
      await request.json();

    // 메시지 유효성 검증
    if (!message) {
      return NextResponse.json(
        { error: "메시지가 필요합니다." },
        { status: 400 }
      );
    }

    // API 키 검증
    if (!validateApiKey()) {
      return NextResponse.json(
        { error: "Gemini API 키가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    // 프롬프트 섹션 생성
    const promptSections = generatePromptSections(dataSources);
    if (!promptSections) {
      return NextResponse.json(
        { error: "데이터를 불러올 수 없습니다." },
        { status: 500 }
      );
    }

    // 사용자 이름 가져오기
    const profile = getProfileSync();
    const name = profile?.name || "김현균";

    // 시스템 프롬프트 생성
    const systemPrompt = generateSystemPrompt(name, promptSections);

    // AI 응답 생성
    const responseText = await generateChatResponse(systemPrompt, message);

    return NextResponse.json({ message: responseText });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "AI 응답 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
