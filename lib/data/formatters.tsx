import React from "react";
import type { Experience } from "@/types/experience";

/**
 * 날짜 범위 포맷팅 (YYYY-MM 형식 → YYYY.MM — YYYY.MM or Present)
 * @param startDate - 시작 날짜 (YYYY-MM)
 * @param endDate - 종료 날짜 (YYYY-MM) 또는 null
 * @returns 포맷된 날짜 범위 문자열
 */
export function formatDateRange(
  startDate: string,
  endDate: string | null
): string {
  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split("-");
    return `${year}.${month}`;
  };

  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : "Present";
  return `${start} — ${end}`;
}

/**
 * 경력의 모든 프로젝트에서 사용된 태그 추출
 * @param experience - 경력 데이터
 * @returns 중복 제거된 태그 배열
 */
export function getAllTags(experience: Experience): string[] {
  const allTags = new Set<string>();
  experience.projects.forEach((project) => {
    project.tags.forEach((tag) => allTags.add(tag));
  });
  return Array.from(allTags);
}

/**
 * 텍스트에서 키워드를 하이라이트하여 링크로 변환
 * @param text - 원본 텍스트
 * @param highlights - 키워드와 URL 매핑 객체
 * @returns React 노드 배열
 */
export function highlightText(
  text: string,
  highlights: Record<string, string>
): React.ReactNode {
  if (!highlights || Object.keys(highlights).length === 0) {
    return text;
  }

  // 모든 키워드를 찾기 위한 정규식 생성
  const keywords = Object.keys(highlights);
  const pattern = new RegExp(`(${keywords.join("|")})`, "g");
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    if (highlights[part]) {
      return (
        <a
          key={index}
          href={highlights[part]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-slate-200 transition hover:text-teal-300"
        >
          {part}
        </a>
      );
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

/**
 * 날짜 문자열을 연도로 변환
 * @param dateStr - 날짜 문자열 (YYYY-MM-DD 또는 YYYY-MM)
 * @returns 연도 (YYYY)
 */
export function getYearFromDate(dateStr: string): number {
  return new Date(dateStr).getFullYear();
}

/**
 * 날짜 문자열을 한국어 형식으로 변환
 * @param dateStr - 날짜 문자열 (YYYY-MM-DD)
 * @returns 한국어 날짜 (YYYY년 MM월)
 */
export function formatDateKorean(dateStr: string): string {
  const [year, month] = dateStr.split("-");
  return `${year}년 ${month}월`;
}
