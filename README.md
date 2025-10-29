<div align="center">
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next.JS_15-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=black" alt="next.js" />
    <img src="https://img.shields.io/badge/-React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="react" />
    <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript" />
    <img src="https://img.shields.io/badge/-Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="tailwind" />
    <img src="https://img.shields.io/badge/-Clerk-6C47FF?style=for-the-badge&logoColor=white&logo=clerk" alt="clerk" />
    <img src="https://img.shields.io/badge/-Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="supabase" />
  </div>

  <h1 align="center">SaaS 템플릿</h1>
  <h3 align="center">Next.js 15 + Clerk + Supabase</h3>

  <p align="center">
    프로덕션 레디 SaaS 애플리케이션을 위한 풀스택 보일러플레이트
  </p>
</div>

## 📋 목차

1. [소개](#소개)
2. [기술 스택](#기술-스택)
3. [주요 기능](#주요-기능)
4. [시작하기](#시작하기)
5. [환경 설정](#환경-설정)
6. [프로젝트 구조](#프로젝트-구조)

## 소개

Next.js 15, Clerk, Supabase를 활용한 모던 SaaS 애플리케이션 템플릿입니다.

**핵심 특징:**
- ✨ Next.js 15 + React 19 최신 기능 활용
- 🔐 Clerk와 Supabase 네이티브 통합 (2025년 권장 방식)
- 🎨 Tailwind CSS v4 + shadcn/ui
- 📱 완전한 반응형 디자인
- 🌐 한국어 지원 (Clerk 한국어 로컬라이제이션)

## 기술 스택

### 프레임워크 & 라이브러리

- **[Next.js 15](https://nextjs.org/)** - React 프레임워크 (App Router, Server Components)
- **[React 19](https://react.dev/)** - UI 라이브러리
- **[TypeScript](https://www.typescriptlang.org/)** - 타입 안정성

### 인증 & 데이터베이스

- **[Clerk](https://clerk.com/)** - 사용자 인증 및 관리
  - Google, 이메일 등 다양한 로그인 방식 지원
  - 한국어 UI 지원
  - Supabase와 네이티브 통합
- **[Supabase](https://supabase.com/)** - PostgreSQL 데이터베이스
  - 실시간 데이터 동기화
  - Row Level Security (RLS)
  - 파일 스토리지

### UI & 스타일링

- **[Tailwind CSS v4](https://tailwindcss.com/)** - 유틸리티 우선 CSS 프레임워크
- **[shadcn/ui](https://ui.shadcn.com/)** - 재사용 가능한 컴포넌트 라이브러리
- **[Radix UI](https://www.radix-ui.com/)** - 접근성 높은 헤드리스 컴포넌트
- **[lucide-react](https://lucide.dev/)** - 아이콘 라이브러리

### 폼 & 검증

- **[React Hook Form](https://react-hook-form.com/)** - 폼 상태 관리
- **[Zod](https://zod.dev/)** - 스키마 검증

## 주요 기능

### 🔐 인증 시스템
- Clerk를 통한 안전한 사용자 인증
- 소셜 로그인 지원 (Google 등)
- Clerk 사용자 자동으로 Supabase DB에 동기화
- 한국어 UI 지원

### 🗄️ 데이터베이스 통합
- Clerk 토큰 기반 Supabase 인증 (JWT 템플릿 불필요)
- 환경별 Supabase 클라이언트 분리:
  - Client Component용 (`useClerkSupabaseClient`)
  - Server Component용 (`createClerkSupabaseClient`)
  - 관리자 권한용 (`createServiceRoleClient`)
- SQL 마이그레이션 시스템

### 🎨 UI/UX
- shadcn/ui 기반 모던 컴포넌트
- 완전한 반응형 디자인
- 다크/라이트 모드 지원 가능
- 접근성 준수 (WCAG)

### 🏗️ 아키텍처
- Server Actions 우선 사용
- 타입 안전성 보장
- 모듈화된 코드 구조
- Next.js 15 최신 패턴 적용

## 시작하기

### 필수 요구사항

시스템에 다음이 설치되어 있어야 합니다:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) (v18 이상)
- [pnpm](https://pnpm.io/) (권장 패키지 매니저)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (선택사항, 로컬 개발용)

```bash
# pnpm 설치
npm install -g pnpm

# Supabase CLI 설치 (선택사항)
npm install -g supabase
```

### 1. 저장소 클론

```bash
git clone <your-repository-url>
cd saas-template
```

### 2. 의존성 설치

```bash
pnpm install
```

### 3. 환경 변수 설정

`.env.example` 파일을 복사하여 `.env` 파일을 생성합니다:

```bash
cp .env.example .env
```

`.env` 파일을 열어 다음 값들을 설정합니다. 자세한 설정 방법은 [환경 설정](#환경-설정) 섹션을 참고하세요.

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_STORAGE_BUCKET=uploads
```

### 4. 데이터베이스 마이그레이션

Supabase 프로젝트에 데이터베이스 스키마를 적용합니다:

**옵션 A: Supabase 대시보드 사용**
1. [Supabase Dashboard](https://supabase.com/dashboard) 접속
2. 프로젝트 선택 → SQL Editor
3. `supabase/migrations/schema.sql` 내용을 복사하여 실행

**옵션 B: Supabase CLI 사용 (권장)**
```bash
# Supabase 프로젝트 링크
supabase link --project-ref your-project-ref

# 마이그레이션 적용
supabase db push
```

### 5. Clerk 설정

1. [Clerk Dashboard](https://dashboard.clerk.com/) 접속
2. 새 애플리케이션 생성
3. **User & Authentication** → **Email, Phone, Username** 설정
4. **SSO Connections** → Google 등 원하는 소셜 로그인 활성화
5. **JWT Templates** → Supabase 템플릿 추가:
   - Template name: `supabase`
   - Claims: 기본값 사용
6. API Keys 복사하여 `.env`에 추가

### 6. 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

### 개발 명령어

```bash
# 개발 서버 실행 (Turbopack)
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

# 린팅
pnpm lint
```

## 환경 설정

### Clerk 설정 상세

1. **Clerk 애플리케이션 생성**
   - [Clerk Dashboard](https://dashboard.clerk.com/) 접속
   - "Create application" 클릭
   - 애플리케이션 이름 입력
   - 원하는 로그인 방식 선택 (Email, Google 등)

2. **API Keys 복사**
   - Dashboard → **API Keys** 메뉴
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` 복사
   - `CLERK_SECRET_KEY` 복사 (절대 공개하지 말 것!)
   - **Frontend API** URL 확인 (예: `https://your-app.clerk.accounts.dev`)
     - 이 URL은 다음 단계에서 Supabase 설정에 필요합니다

3. **한국어 설정 (선택사항)**
   - 프로젝트에서 이미 `koKR` localization 적용됨
   - `app/layout.tsx`에서 확인 가능

> **⚠️ 중요:** JWT Template 생성은 **불필요**합니다. 이전 방식(JWT Template)은 보안상 권장되지 않으며, 이 프로젝트는 Clerk 토큰을 직접 사용하는 최신 방식을 채택하고 있습니다.

### Supabase 설정 상세

1. **Supabase 프로젝트 생성**
   - [Supabase Dashboard](https://supabase.com/dashboard) 접속
   - "New Project" 클릭
   - Organization 선택 (또는 새로 생성)
   - 프로젝트 이름, 데이터베이스 비밀번호, 리전 선택
   - "Create new project" 클릭

2. **API Keys 및 URL 복사**
   - Project Settings → **API** 메뉴
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY` (절대 공개하지 말 것!)

3. **Clerk Third-Party 인증 연동 (필수!)**

   이 단계는 Supabase가 Clerk 토큰을 검증하도록 설정합니다.

   - Project Settings → **Authentication** → **Providers**
   - 페이지 하단으로 스크롤하여 **"Third-Party Auth"** 또는 **"Custom"** 섹션 찾기
   - "Enable Custom Access Token" 또는 유사한 옵션 활성화
   - 다음 정보 입력:

     **JWT Issuer (Issuer URL):**
     ```
     https://your-clerk-domain.clerk.accounts.dev
     ```

     **JWKS Endpoint (JWKS URI):**
     ```
     https://your-clerk-domain.clerk.accounts.dev/.well-known/jwks.json
     ```

     > `your-clerk-domain` 부분을 Clerk Dashboard의 **API Keys** 페이지에서 확인한 "Frontend API" URL의 도메인으로 교체하세요.
     >
     > 예: Frontend API가 `https://moving-swan-12.clerk.accounts.dev`인 경우
     > - Issuer: `https://moving-swan-12.clerk.accounts.dev`
     > - JWKS: `https://moving-swan-12.clerk.accounts.dev/.well-known/jwks.json`

4. **스토리지 버킷 생성 (선택사항)**
   - Storage 메뉴에서 "New bucket" 클릭
   - Bucket name: `uploads` (`.env`의 `NEXT_PUBLIC_STORAGE_BUCKET`과 동일하게)
   - Public/Private 선택

## 프로젝트 구조

```
saas-template/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   └── sync-user/    # Clerk → Supabase 사용자 동기화
│   ├── auth-test/        # 인증 테스트 페이지
│   ├── storage-test/     # 스토리지 테스트 페이지
│   ├── layout.tsx        # Root Layout (Clerk Provider)
│   ├── page.tsx          # 홈페이지
│   └── globals.css       # 전역 스타일 (Tailwind v4 설정)
│
├── components/            # React 컴포넌트
│   ├── ui/               # shadcn/ui 컴포넌트 (자동 생성)
│   ├── providers/        # Context Providers
│   │   └── sync-user-provider.tsx
│   └── Navbar.tsx        # 네비게이션 바
│
├── lib/                   # 유틸리티 및 설정
│   ├── supabase/         # Supabase 클라이언트들
│   │   ├── clerk-client.ts    # Client Component용
│   │   ├── server.ts          # Server Component용
│   │   ├── service-role.ts    # 관리자용
│   │   └── client.ts          # 공개 데이터용
│   └── utils.ts          # 공통 유틸리티 (cn 함수 등)
│
├── hooks/                 # Custom React Hooks
│   └── use-sync-user.ts  # 사용자 동기화 훅
│
├── supabase/             # Supabase 관련 파일
│   ├── migrations/       # 데이터베이스 마이그레이션
│   │   └── schema.sql   # 초기 스키마
│   └── config.toml       # Supabase 프로젝트 설정
│
├── .cursor/              # Cursor AI 규칙
│   └── rules/           # 개발 컨벤션 및 가이드
│
├── middleware.ts         # Next.js 미들웨어 (Clerk)
├── .env.example         # 환경 변수 예시
└── CLAUDE.md            # AI 에이전트용 프로젝트 가이드
```

### 주요 파일 설명

- **`middleware.ts`**: Clerk 인증 미들웨어 설정
- **`app/layout.tsx`**: ClerkProvider와 SyncUserProvider 설정
- **`lib/supabase/`**: 환경별 Supabase 클라이언트 (매우 중요!)
- **`hooks/use-sync-user.ts`**: Clerk 사용자를 Supabase에 자동 동기화
- **`components/providers/sync-user-provider.tsx`**: 앱 전역에서 사용자 동기화 실행
- **`CLAUDE.md`**: Claude Code를 위한 프로젝트 가이드

## 추가 리소스

- [Next.js 15 문서](https://nextjs.org/docs)
- [Clerk 문서](https://clerk.com/docs)
- [Supabase 문서](https://supabase.com/docs)
- [shadcn/ui 문서](https://ui.shadcn.com/)
- [Tailwind CSS v4 문서](https://tailwindcss.com/docs)
