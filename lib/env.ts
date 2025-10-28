/**
 * 환경 변수 검증 모듈
 * 필수 환경 변수가 설정되어 있는지 확인합니다.
 */

interface EnvConfig {
  GEMINI_API_KEY: string;
}

/**
 * 필수 환경 변수 목록
 */
const requiredEnvVars = ["GEMINI_API_KEY"] as const;

/**
 * 환경 변수 검증
 * @throws {Error} 필수 환경 변수가 없는 경우
 */
export function validateEnv(): void {
  const missingVars: string[] = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missingVars.push(envVar);
    }
  }

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}\n` +
        `Please check your .env.local file and ensure all required variables are set.\n` +
        `See env.example for reference.`
    );
  }
}

/**
 * 환경 변수 가져오기 (타입 안전)
 * @returns 환경 변수 객체
 */
export function getEnv(): EnvConfig {
  return {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
  };
}

/**
 * 특정 환경 변수가 설정되어 있는지 확인
 * @param key - 환경 변수 키
 * @returns 설정 여부
 */
export function hasEnv(key: keyof EnvConfig): boolean {
  return !!process.env[key];
}

/**
 * 개발 환경 여부
 */
export const isDevelopment = process.env.NODE_ENV === "development";

/**
 * 프로덕션 환경 여부
 */
export const isProduction = process.env.NODE_ENV === "production";

/**
 * 테스트 환경 여부
 */
export const isTest = process.env.NODE_ENV === "test";
