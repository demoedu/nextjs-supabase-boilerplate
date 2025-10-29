# Conventions

- [Git Convention](#git-convention)
  - [Branch Type Description](#branch-type-description)
  - [Commit Message Convention](#commit-message-convention)
  - [Issue Label Setting](#issue-label-setting)
- [Code Style Convention](#code-style-convention)
  - [prettier](#prettier)
  - [pre-commit](#pre-commit)
- [NextJS Convention](#nextjs-convention)
  - [Package Manager](#package-manager)
  - [File Name Convention](#file-name-convention)
  - [Function/Variable Convention](#functionvariable-convention)
  - [Component Convention](#component-convention)
  - [Directory Convention](#directory-convention)
    - [src/app](#srcapp)
    - [src/actions](#srcactions)
    - [src/components](#srccomponents)
    - [src/constants](#srcconstants)
    - [src/hooks](#srchooks)
    - [src/utils](#srcutils)
  - [src/states](#srcstates)
    - [src/types](#srctypes)
- [Package Convention](#package-convention)
  - [Vitest](#vitest)
  - [TailwindCSS](#tailwindcss)
  - [ShadCN Component](#shadcn-component)
  - [lucide-react](#lucide-react)
  - [Jotai](#jotai)
  - [React Query](#react-query)
  - [Supabase](#supabase)
- [Cursor Convention](#cursor-convention)
  - [Code Writing](#code-writing)
  - [File Context](#file-context)
  - [Reference](#reference)

## Git Convention

- 깃 브랜치 전략은 [GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)를 따르며 이를 기반으로 한 브랜치 네이밍 컨벤션을 사용합니다.
- 브랜치 네이밍 형식: `type/[branch/]description[-#issue]`
  - [] 안의 내용은 선택 사항입니다.
  - `type`: 브랜치 타입
  - `branch`: 분기한 브랜치명 (e.g. `dev`, `main`)
  - `description`: 브랜치 설명
  - `issue`: 관련된 이슈 번호

### Branch Type Description

- **feat** (feature)
  새로운 기능을 추가할 때 사용합니다.
  예: `feat/login-#123`
- **fix** (bug fix)
  버그를 수정할 때 사용합니다.
  예: `fix/button-click-#456`
- **docs** (documentation)
  문서 작업(README, 주석 등)을 할 때 사용합니다.
  예: `docs/api-docs-#789`
- **style** (formatting, missing semi colons, …)
  코드 스타일(포맷 수정, 세미콜론 추가 등)을 수정할 때 사용합니다. 기능 수정은 포함되지 않습니다.
  예: `style/css-format-#101`
- **refactor**
  코드 리팩토링(기능 변경 없이 코드 구조 개선)을 할 때 사용합니다.
  예: `refactor/auth-service-#102`
- **test** (when adding missing tests)
  테스트 코드를 추가하거나 수정할 때 사용합니다.
  예: `test/unit-tests-#103`
- **chore** (maintain)
  프로젝트 유지 보수 작업(빌드 설정, 패키지 업데이트 등)을 할 때 사용합니다.
  예: `chore/dependency-update-#104`

### Commit Message Convention

`git config --local commit.template .github/.gitmessage` 명령어를 통해 커밋 메시지 템플릿을 설정할 수 있습니다.
컨벤션 내용은 [AngularJS Git Commit Message Conventions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)와 [Conventional Commits](https://www.conventionalcommits.org/ko/v1.0.0/)을 기반으로 작성되어 있으며 `.gitmessage` 파일에 작성되어 있습니다.

### Issue Label Setting

`github-label-sync --access-token <access_token> --labels .github/labels.json <owner>/<repo>`

## Code Style Convention

- [Prettier](https://prettier.io/)와 [ESLint](https://eslint.org/)를 사용하여 코드 스타일을 관리합니다.

### [prettier](https://prettier.io/docs/options)

```json
{
  "printWidth": 80, // 한 줄의 최대 길이
  "tabWidth": 2, // 들여쓰기에 사용할 공백 수
  "useTabs": false, // 탭 대신 공백 사용
  "singleQuote": false, // 문자열에 쌍따옴표 사용
  "semi": true, // 문장 끝에 세미콜론 사용
  "endOfLine": "lf", // 줄바꿈

  "proseWrap": "preserve", // 마크다운 텍스트 안 건드리기
  "bracketSpacing": true, // 객체 리터럴에서 괄호에 공백 삽입
  "arrowParens": "always", // 화살표 함수 인자에 괄호 사용
  "htmlWhitespaceSensitivity": "css", // HTML 파일의 공백 처리 방식
  "jsxSingleQuote": false, // JSX에서 쌍따옴표 사용
  "jsxBracketSameLine": false, // 여는 태그의 `>`를 다음 줄로 내림
  "quoteProps": "as-needed", // 객체 속성 이름에 따옴표가 필요한 경우에만 따옴표 사용
  "trailingComma": "all", // 마지막 요소 뒤에 쉼표 사용
  "overrides": [
    {
      "files": "*.json",
      "options": {
        "printWidth": 200
      }
    }
  ]
}
```

### pre-commit

```shell
pnpm install --save-dev husky prettier eslint lint-staged eslint-config-prettier eslint-plugin-react-hooks

pnpm dlx husky-init
pnpm pkg set scripts.prepare="husky install"
pnpm run prepare
chmod +x .husky/*
```

`package.json`에 추가

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"],
    "*.{json,css,md}": ["prettier --write"]
  }
}
```

`.husky/pre-commit` 수정

```shell
. "$(dirname -- "$0")/_/husky.sh"

pnpm lint-staged
```

## NextJS Convention

### Package Manager

[pnpm](https://pnpm.io/)을 사용합니다.

### File Name Convention

- 모든 파일 이름은 `kebab-case` 로 작성합니다.
- `not-found.tsx`, `mdx-components.tsx` 처럼, 최대한 간결하게 하되, 단어 사이는 [하이픈으로 연결](https://nextjs.org/docs/app/api-reference/file-conventions)합니다.

### Function/Variable Convention

- `camelCase` 로 작성합니다.
- TypeScript 타입은 반드시 정의해야 합니다.

### Component Convention

- Component 명은 `PascalCase` 로 작성합니다. (Component 파일명도 예외없이 `kebab-case`로 작성합니다)
- Component는 재사용 가능하도록 설계해야 합니다.

### Directory Convention

nextjs에서는 여러 디렉토리 구조를 사용할 수 있지만, [`app` 외부에 프로젝트 파일 저장](https://nextjs.org/docs/app/getting-started/project-structure#store-project-files-outside-of-app)하는 방법을 사용합니다.

- [Next.js 폴더/파일 구조 잡기](https://miriya.net/blog/cliz752zc000lwb86y5gtxstu)
- [NextJS 14 Folder Structure](https://medium.com/@mertenercan/nextjs-13-folder-structure-c3453d780366)
- [Project structure and organization](https://nextjs.org/docs/app/getting-started/project-structure)

#### src/app

- 라우팅 용으로 사용한다. (라우팅과 관련된 파일만 넣어놓는다)
- e.g., `page.tsx`, `layout.tsx`, `opengraph-image.tsx`

#### src/actions

- 무조건 API 대신 Server Action을 사용한다. 불가피한 경우에만 API를 사용한다.
- NextJS Server Action 파일들을 넣어놓는다.

#### src/components

- 여러 페이지에서 공통으로 사용할 컴포넌트
- Button, Loading...

#### src/constants

- 공통으로 사용 할 상수

#### src/hooks

- 페이지 곳곳에서 사용되는 공통 훅

#### src/utils

- 공통으로 사용되는 유틸 함수
- e.g. supabase/client.ts, supabase/server.ts ...

### src/states

- props drilling을 막기 위한 전역 state를 모아둔다.
- 전역 상태관리는 최대한 남발하지 않으며 jotai를 사용한다.

#### src/types

- 각종 타입 스크립트의 정의가 들어가는 곳

### tests

- 테스트 파일을 모아두는 곳

## Package Convention

- [2025년을 위한 필수 React 라이브러리들](https://news.hada.io/topic?id=19556)
- [React Libraries for 2025](https://www.robinwieruch.de/react-libraries/)

### Vitest

[How to set up Vitest with Next.js](https://nextjs.org/docs/pages/guides/testing/vitest)

```sh
pnpm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths
```

`vitest.config.mts`

```json
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
  },
})
```

`package.json`

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest" // 추가
  }
}
```

테스트 예시: `__tests__/page.test.tsx`

```tsx
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

test("Page", () => {
  render(<Page />);
  expect(screen.getByRole("heading", { level: 1, name: "Home" })).toBeDefined();
});
```

### TailwindCSS

- 모든 스타일은 TailwindCSS를 사용해야 합니다.
- [TailwindCSS v4](https://tailwindcss.com/blog/tailwindcss-v4/) 버전을 사용합니다.
  - 그러므로 `tailwind.config.js`, `tailwind.config.ts` 파일은 사용하지 않고 `globals.css` 파일만을 사용합니다.

### ShadCN Component

- 모든 UI 컴포넌트는 ShadCN을 사용해야 합니다.
- 컴포넌트 사용 전 설치 여부를 확인해야 합니다: `/component/ui` 디렉토리 체크
- 컴포넌트 설치 명령어를 사용해야 합니다: `pnpx shadcn@latest add [component-name]`

### lucide-react

- 모든 아이콘은 lucide-react를 사용해야 합니다.
- 아이콘 임포트 방법: `import { IconName } from 'lucide-react';`
- 예시: `import { Menu, X } from 'lucide-react';`

### Jotai

- 전역 상태관리는 Jotai를 사용해야 합니다.

### React Query

- 데이터 패칭은 React Query를 사용해야 합니다.

### Supabase

- 데이터베이스는 Supabase를 사용해야 하며 `@supabase/supabase-js`를 사용해야 합니다.
- 사용자 인증은 Supabase Auth를 사용해야 하며 `@supabase/ssr`를 사용해야 합니다.
- 클라이언트 파일은 [`utils/supabase` 폴더에 넣어야 합니다.](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)

## Cursor Convention

### Code Writing

1. 각 코드 파일의 길이를 500줄 이하로 유지하세요.

> Cursor는 기본적으로 파일의 처음 250줄을 읽고, 필요 시 추가로 250줄을 더 읽습니다. 따라서 파일 길이를 500줄 이하로 유지하면 전체 파일을 읽을 수 있어 코드 이해와 처리가 원활해집니다.

2. 각 코드 파일의 첫 100줄에 해당 파일의 기능과 구현 로직을 명확히 문서화하세요.

> Cursor는 파일 검색 시 최대 100줄의 코드를 읽습니다. 파일의 초반부에 주석을 통해 해당 파일의 목적과 주요 로직을 설명하면, Cursor 에이전트가 파일의 역할을 빠르게 파악하여 적절한 처리를 수행할 수 있습니다.

```tsx
/**
 * @file UserProfile.tsx
 * @description 사용자 프로필 페이지 컴포넌트
 *
 * 이 컴포넌트는 사용자의 프로필 정보를 표시하고 수정하는 기능을 제공합니다.
 *
 * 주요 기능:
 * 1. 사용자 기본 정보 표시 (이름, 이메일, 프로필 이미지)
 * 2. 프로필 정보 수정
 * 3. 프로필 이미지 업로드
 *
 * 구현 로직:
 * - Supabase Auth를 통한 사용자 인증 상태 확인
 * - React Query를 사용한 프로필 데이터 fetching
 * - 이미지 업로드를 위한 Supabase Storage 활용
 * - Form 상태 관리를 위한 React Hook Form 사용
 *
 * @dependencies
 * - @supabase/ssr
 * - @tanstack/react-query
 * - react-hook-form
 * - @heroicons/react
 */

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { UserCircleIcon } from "@heroicons/react/24/outline";

// ... 컴포넌트 구현 ...
```

3. 프로젝트의 상태와 구조를 `README.md`와 같은 전용 파일에 정기적으로 문서화하세요.

> 프로젝트의 전반적인 상태와 구조를 문서화하면 Cursor가 프로젝트를 빠르게 이해하고, 대화 재시작 시 불필요한 컨텍스트를 최소화할 수 있습니다.

### File Context

1. 프로젝트 구조를 이해하고 특정 파일을 대상으로 작업할 때는 Cursor의 `@` 기능을 활용하세요.

> Cursor에서 `@`를 사용하여 특정 파일을 지정하면 해당 파일을 최대한 완전히 읽으려 시도합니다. (최대 2000줄) 이를 통해 필요한 코드 컨텍스트를 확보하여 작업의 정확성을 높일 수 있습니다.

2. `@[파일/폴더]` 태그를 적극적으로 활용하세요.

> Cursor의 `@[파일/폴더]` 태그를 사용하여 특정 파일이나 폴더를 지정하면, 해당 파일들의 전체 내용(최대 2000자)을 언어 모델에 전달할 수 있습니다. 이를 통해 모델이 필요한 컨텍스트를 충분히 확보하여 더 정확한 코드를 생성하거나 수정할 수 있습니다.

3. 새로운 기능을 추가하거나 버그를 수정한 후에는 대화를 재시작하세요.

> 작업 후 대화를 재시작하면 긴 컨텍스트로 인한 혼란을 방지하고, 프로젝트의 최신 상태를 반영한 새로운 컨텍스트로 작업을 이어갈 수 있습니다.

### Reference

- [Understanding Cursor and WindSurf's Code Indexing Logic](https://www.pixelstech.net/article/1734832711-understanding-cursor-and-windsurf-s-code-indexing-logic)
- [How Cursor (AI IDE) Works](https://blog.sshh.io/p/how-cursor-ai-ide-works)
