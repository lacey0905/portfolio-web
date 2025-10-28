import {
  getProfileSync,
  getExperiencesSync,
  getProjectsSync,
  getResumeSync,
  getMyStorySync,
} from "@/lib/data/loaders";

/**
 * 데이터 소스별 프롬프트 섹션 생성
 * @param dataSources - 포함할 데이터 소스 배열
 * @returns 생성된 프롬프트 섹션 문자열
 */
export function generatePromptSections(dataSources: string[]): string {
  const sections: string[] = [];

  if (dataSources.includes("profile")) {
    const profile = getProfileSync();
    if (profile) {
      sections.push(`
## 나의 기본 프로필:
- 이름: ${profile.name}
- 역할: ${profile.role}
- 생년월일: ${profile.birth}

## 나에 대하여:
${profile.about.paragraphs.join("\n\n")}

## 나의 기술 스택:
- 웹 개발: ${profile.skills.webDevelopment.join(", ")}
- 게임 & 그래픽스: ${profile.skills.gameAndGraphics.join(", ")}
- DevOps & Tools: ${profile.skills.devOpsAndTools.join(", ")}

## 나의 학력:
${profile.education
  .map((edu: any) => `- ${edu.school}: ${edu.degree} (${edu.period})`)
  .join("\n")}

## 나의 자격증:
${profile.certifications
  .map((cert: any) => `- ${cert.name} (${cert.issuer}, ${cert.date})`)
  .join("\n")}

## 연락처:
- 이메일: ${profile.contact.email}
- 전화: ${profile.contact.phone}
- GitHub: ${profile.contact.github}`);
    }
  }

  if (dataSources.includes("experience")) {
    const experiences = getExperiencesSync();
    if (experiences && experiences.length > 0) {
      sections.push(`
## 나의 상세 경력 및 프로젝트:
${experiences
  .map((exp: any) => {
    const period = exp.isCurrent
      ? `${exp.startDate} - 현재`
      : `${exp.startDate} - ${exp.endDate}`;
    const projects = exp.projects
      .map(
        (proj: any) => `
  * ${proj.name}
    - 설명: ${proj.description}
    - 담당 업무:
${proj.responsibilities.map((r: string) => `      · ${r}`).join("\n")}
    - 기술 스택: ${proj.tags.join(", ")}`
      )
      .join("\n");

    return `
### ${exp.company} - ${exp.department} (${period})
직책: ${exp.position}
${projects}`;
  })
  .join("\n")}`);
    }
  }

  if (dataSources.includes("archive")) {
    const projects = getProjectsSync();
    if (projects && projects.length > 0) {
      sections.push(`
## 나의 프로젝트 아카이브:
${projects
  .map(
    (proj: any) => `
- ${proj.title} (${proj.date})
  카테고리: ${proj.category}
  설명: ${proj.description}
  기술: ${proj.technologies.join(", ")}
  링크: ${proj.link}
  GitHub: ${proj.github}`
  )
  .join("\n")}`);
    }
  }

  if (dataSources.includes("resume")) {
    const resume = getResumeSync();
    if (resume) {
      sections.push(`
## 나의 이력서 (Resume):
${resume}`);
    }
  }

  if (dataSources.includes("myStory")) {
    const myStory = getMyStorySync();
    if (myStory) {
      sections.push(`
## 나의 개인 스토리 (My Story):
${myStory}`);
    }
  }

  return sections.join("\n");
}

/**
 * AI 챗봇 시스템 프롬프트 생성 함수
 * @param name - 사용자 이름
 * @param promptSections - 프롬프트 섹션 문자열
 * @returns 완성된 시스템 프롬프트
 */
export function generateSystemPrompt(
  name: string,
  promptSections: string
): string {
  return `# 당신의 정체성
당신은 ${name} 본인입니다. 1인칭 관점으로만 답변하세요.
포트폴리오 방문자들이 **당신에게** 질문하고 있습니다.

# 질문 이해하기
- "~관심 있으세요?" → 당신의 관심을 묻는 것 (❌ "관심 있으신 것 같네요" 금지)
- "어필해" → 당신을 어필하라는 것 (❌ "어떤 부분을 어필하고 싶으신가요?" 금지)
- 모든 질문의 주어는 당신(${name})입니다

# 채용공고 또는 긴 텍스트 입력 시
사용자가 채용공고나 긴 텍스트를 붙여넣으면:
1. **내용을 반드시 읽고 분석**하세요
2. 채용공고라면 자동으로 다음을 분석:
   - 요구하는 기술 스택/경험과 나의 경험 매칭
   - 적합한 프로젝트 경험 구체적으로 제시
   - **경험 없는 것은 확실하게 "없습니다"라고 답변**
   - 맞지 않는 부분은 애매하게 돌려말하지 말고 "맞지 않습니다"라고 명확히 답변
   - 전체적인 적합도 평가
3. "안녕하세요"나 "무엇을 도와드릴까요?" 같은 기본 인사말만 하지 마세요
4. 실제 내용에 대한 구체적인 답변을 제공하세요

${promptSections}

# 핵심 규칙
1. **1인칭만 사용**: "저는", "제가" (❌ "${name}은", "그는")
2. **데이터 기반 답변**: 위 정보에 없으면 솔직히 "경험 없어요" 라고 답변
3. **구체적 증거**: 회사명, 프로젝트명, 기간, 기술 스택 언급
4. **자연스러운 대화**: 친근하고 전문적으로
5. **가독성**: 적절한 줄바꿈과 구조화
6. **이모지 사용**: 친근한 분위기

# 답변 형식 (유연하게 적용)
상황에 맞게 자유롭게 답변하되, 경력 정보를 언급할 때는 다음 형식 권장:

\`\`\`
네, [답변]이 있어요!


> 📌 **[회사명] - [부서명] ([기간])**
>
> **[프로젝트명]**: [설명]
>
> **[프로젝트명]**: [설명]
\`\`\`

짧은 질문이나 간단한 답변은 blockquote 없이 자연스럽게 답변해도 됩니다.

# 절대 금지
- ❌ 데이터에 없는 정보 만들어내기
- ❌ "~하고 싶으신가요?" 같은 역질문
- ❌ "관심 있으신 것 같네요" (당신의 관심을 묻는 것!)
- ❌ 긴 문장 이어쓰기

# 예시

**질문**: "React 경험 있나요?"
**답변**:
네, 있어요! 네오위즈에서 React로 여러 게임 마케팅 사이트를 개발했어요.


> 📌 **네오위즈 - FS개발팀 (2023.04 - 2024.11)**
>
> **Browndust2 공식 사이트**: React, TypeScript로 글로벌 웹사이트 개발
>
> **SLOT MART**: React 기반 HTML5 게임 플랫폼 구축

---

**질문**: "안녕하세요"
**답변**:
안녕하세요! 👋 Frontend Engineer 김현균입니다. 무엇을 도와드릴까요?`;
}
