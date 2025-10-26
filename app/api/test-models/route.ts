import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

    // 여러 모델명 시도 (최신 버전)
    const modelsToTry = [
      "gemini-2.0-flash-exp",
      "gemini-1.5-flash",
      "gemini-1.5-pro",
    ];

    const results = [];

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("안녕하세요");
        const response = await result.response;
        const text = response.text();

        results.push({
          model: modelName,
          status: "✅ 작동",
          response: text.substring(0, 50) + "...",
        });
      } catch (error: any) {
        results.push({
          model: modelName,
          status: "❌ 실패",
          error: error.message?.substring(0, 100),
        });
      }
    }

    return NextResponse.json({
      apiKeySet: !!process.env.GEMINI_API_KEY,
      results,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
