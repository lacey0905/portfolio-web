# 포트폴리오 웹사이트

Next.js와 TypeScript를 사용한 개인 포트폴리오 웹사이트입니다.

## 기능

- **Home 페이지**: 소개, 기술 스택, 연락처 정보
- **Archive 페이지**: 프로젝트 포트폴리오 목록
- **AI 채팅**: Gemini API를 사용한 프로필 기반 AI 어시스턴트
- **정적 데이터**: `data/archive.json`, `data/profile.json` 파일을 DB 대신 사용
- **반응형 디자인**: 모바일과 데스크톱 모두 지원

## 기술 스택

- Next.js 15.5.6 (App Router)
- React 19
- TypeScript 5
- Google Generative AI 0.24.1 (Gemini 2.0 Flash)
- Tailwind CSS 3
- SCSS (Sass)

## 설치 및 실행

1. 의존성 설치:

```bash
npm install
```

2. 환경 변수 설정:

`.env.local` 파일을 생성하고 Gemini API 키를 추가하세요:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

Gemini API 키는 [Google AI Studio](https://aistudio.google.com/app/apikey)에서 발급받을 수 있습니다.

3. 개발 서버 실행:

```bash
npm run dev
```

4. 브라우저에서 `http://localhost:3000` 접속

## 빌드 및 배포

1. 프로덕션 빌드:

```bash
npm run build
```

2. 프로덕션 서버 실행:

```bash
npm start
```

## Vercel 배포

이 프로젝트는 Vercel에 최적화되어 있습니다:

1. GitHub에 코드 푸시
2. Vercel에서 프로젝트 연결
3. Vercel 대시보드에서 환경 변수 설정:
   - `GEMINI_API_KEY`: Gemini API 키
4. 자동 배포 완료

## 프로젝트 구조

```
portfolio-web/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts              # Gemini API 채팅 라우트
│   │   └── test-models/
│   │       └── route.ts              # 모델 테스트 라우트
│   ├── archive/
│   │   ├── components/               # Archive 페이지 컴포넌트
│   │   │   ├── ArchiveHeader.tsx
│   │   │   ├── ArchiveTable.tsx
│   │   │   ├── ArchiveTableHeader.tsx
│   │   │   ├── ArchiveTableRow.tsx
│   │   │   ├── BackLink.tsx
│   │   │   ├── MadeAtCell.tsx
│   │   │   ├── ProjectInfoCell.tsx
│   │   │   ├── ProjectLinksCell.tsx
│   │   │   ├── ProjectYearCell.tsx
│   │   │   └── TechTagsCell.tsx
│   │   ├── error.tsx                 # Archive 에러 페이지
│   │   ├── loading.tsx               # Archive 로딩 페이지
│   │   └── page.tsx                  # Archive 메인 페이지
│   ├── components/
│   │   ├── features/
│   │   │   └── AIChat/               # AI 채팅 기능
│   │   │       ├── components/
│   │   │       │   ├── AssistantMessage.tsx
│   │   │       │   ├── ChatInput.tsx
│   │   │       │   ├── ChatPopup.tsx
│   │   │       │   ├── FloatingChatButton.tsx
│   │   │       │   ├── LoadingIndicator.tsx
│   │   │       │   ├── MessageActionButtons.tsx
│   │   │       │   ├── MessageList.tsx
│   │   │       │   └── UserMessage.tsx
│   │   │       ├── hooks/
│   │   │       │   └── useChatMessages.ts
│   │   │       ├── AIChat.tsx
│   │   │       ├── index.tsx
│   │   │       └── types.ts
│   │   ├── sections/                 # 메인 페이지 섹션
│   │   │   ├── AboutSection/
│   │   │   ├── ArchiveSection/
│   │   │   ├── ExperienceSection/
│   │   │   ├── SkillsSection/
│   │   │   └── Footer/
│   │   ├── ui/                       # 공통 UI 컴포넌트
│   │   │   ├── ArrowRightIcon.tsx
│   │   │   ├── ExternalLinkIcon.tsx
│   │   │   ├── SectionHeader.tsx
│   │   │   ├── Spotlight.tsx
│   │   │   ├── TechTag.tsx
│   │   │   └── TechTagList.tsx
│   │   └── ChatWrapper.tsx           # 채팅 래퍼 컴포넌트
│   ├── styles/
│   │   └── globals.scss              # 전역 SCSS 스타일
│   ├── error.tsx                     # 전역 에러 페이지
│   ├── layout.tsx                    # 루트 레이아웃
│   ├── loading.tsx                   # 전역 로딩 페이지
│   └── page.tsx                      # Home 페이지
├── data/                             # JSON 데이터 파일
│   ├── archive.json                  # 프로젝트 아카이브
│   ├── chat-messages.json            # 채팅 초기 메시지
│   ├── experience.json               # 경력 정보
│   ├── myStory.md                    # 개인 스토리
│   ├── profile.json                  # 프로필 정보
│   ├── qna.md                        # 예시 질문 답변 자료
│   └── suggested-questions.json      # 채팅 예시 질문 목록
├── lib/                              # 유틸리티 라이브러리
│   ├── ai/
│   │   ├── gemini.ts                 # Gemini AI 설정
│   │   └── prompts.ts                # AI 프롬프트 생성
│   ├── data/
│   │   ├── formatters.tsx            # 데이터 포맷터
│   │   └── loaders.ts                # 데이터 로더
│   └── env.ts                        # 환경 변수 검증
├── public/                           # 정적 파일
│   ├── archive/
│   │   ├── browndust2.jpg
│   │   └── lies_of_p.jpg
│   └── KIM-HYEON-GYOUN.jpg
├── types/                            # TypeScript 타입 정의
│   ├── experience.ts
│   ├── profile.ts
│   └── project.ts
├── .cursorrules                      # Cursor AI 규칙
├── .gitignore
├── env.example                       # 환경 변수 예시
├── next-env.d.ts
├── next.config.js                    # Next.js 설정
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js                # Tailwind CSS 설정
├── tsconfig.json                     # TypeScript 설정
└── vercel.json                       # Vercel 배포 설정
```

## 데이터 수정

### 프로젝트 정보

`data/archive.json` 파일을 편집하여 프로젝트 정보를 수정하세요:

```json
{
  "projects": [
    {
      "id": 1,
      "title": "프로젝트 제목",
      "description": "프로젝트 설명",
      "technologies": ["기술1", "기술2"],
      "image": "/images/project.jpg",
      "link": "https://project-url.com",
      "github": "https://github.com/username/project",
      "date": "2024-01-01",
      "category": "카테고리"
    }
  ]
}
```

### 프로필 정보 (AI 채팅용)

`data/profile.json` 파일을 편집하여 AI 어시스턴트가 사용할 프로필 정보를 수정하세요:

```json
{
  "name": "이름",
  "nameEn": "Name",
  "role": "역할",
  "birth": "YYYY.MM.DD",
  "about": {
    "paragraphs": ["자기소개 문단"],
    "highlights": { "키워드": "https://link" }
  },
  "skills": {
    "webDevelopment": ["React", "Next.js"],
    "aiAndAutomation": ["LLM API 연동"],
    "graphicsAndInteractive": ["WebGL"],
    "devOpsAndTools": ["Git", "CI/CD"]
  },
  "education": [],
  "certifications": [],
  "contact": {
    "email": "your@email.com",
    "github": "https://github.com/username"
  }
}
```

> 상세 경력과 프로젝트는 `data/experience.json`에서 별도로 관리합니다.

## AI 채팅 기능

홈 페이지 우측 하단의 "💬 AI와 대화하기" 버튼을 클릭하면 AI 어시스턴트와 대화할 수 있습니다.

AI는 `data/profile.json`의 정보를 기반으로 다음과 같은 질문에 답변할 수 있습니다:

- "어떤 기술 스택을 사용하시나요?"
- "경력이 어떻게 되시나요?"
- "어떤 프로젝트를 진행하셨나요?"
- "연락처가 어떻게 되나요?"

등 프로필 관련 모든 질문에 자연스럽게 답변합니다.
