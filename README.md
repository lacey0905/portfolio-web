# 포트폴리오 웹사이트

Next.js와 TypeScript를 사용한 개인 포트폴리오 웹사이트입니다.

## 기능

- **Home 페이지**: 소개, 기술 스택, 연락처 정보
- **Archive 페이지**: 프로젝트 포트폴리오 목록
- **정적 데이터**: `data/archive.json` 파일을 DB 대신 사용
- **반응형 디자인**: 모바일과 데스크톱 모두 지원

## 기술 스택

- Next.js 14 (App Router)
- TypeScript
- CSS3 (커스텀 스타일링)

## 설치 및 실행

1. 의존성 설치:

```bash
npm install
```

2. 개발 서버 실행:

```bash
npm run dev
```

3. 브라우저에서 `http://localhost:3000` 접속

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
3. 자동 배포 완료

## 프로젝트 구조

```
├── app/
│   ├── archive/
│   │   └── page.tsx      # Archive 페이지
│   ├── globals.css       # 전역 스타일
│   ├── layout.tsx        # 루트 레이아웃
│   └── page.tsx          # Home 페이지
├── data/
│   └── archive.json      # 프로젝트 데이터
├── types/
│   └── project.ts        # TypeScript 타입 정의
├── next.config.js        # Next.js 설정
├── package.json          # 프로젝트 의존성
├── tsconfig.json         # TypeScript 설정
└── vercel.json           # Vercel 배포 설정
```

## 데이터 수정

프로젝트 정보를 수정하려면 `data/archive.json` 파일을 편집하세요:

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
