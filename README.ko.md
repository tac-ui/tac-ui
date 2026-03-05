<p align="center">
  <img src="https://raw.githubusercontent.com/tac-ui/tac-ui/main/apps/docs/public/tac-logo.svg" width="64" height="64" alt="Tac UI 로고" />
</p>

<h1 align="center">Tac UI</h1>

<p align="center">
  코드가 숨을 쉬는 크로스 플랫폼 디자인 시스템.<br/>
  스프링 물리, 순차적 일루미네이션, 글라스모피즘 깊이 — 살아 숨 쉬는 인터페이스를 위해 설계되었습니다.
</p>

<p align="center">
  <a href="#설치">설치</a> ·
  <a href="#패키지">패키지</a> ·
  <a href="#빠른-시작">빠른 시작</a> ·
  <a href="#개발">개발</a> ·
  <a href="#라이선스">라이선스</a>
</p>

<p align="center">
  <a href="./README.md">English</a>
</p>

---

## 기능

- **43개 컴포넌트** — Button, Card, Modal, Chart, DatePicker, Table 등
- **디자인 토큰** — 색상, 간격, 타이포그래피, 모션, 엘리베이션 토큰
- **다크 모드** — CSS 변수 기반의 라이트/다크 테마 전환
- **접근성** — WAI-ARIA 준수 컴포넌트와 포커스 관리
- **Tailwind CSS** — Tailwind CSS v4 프리셋을 통한 통합
- **Framer Motion** — 유기적 감속의 스프링 기반 애니메이션
- **TypeScript** — strict 모드 타입과 완전한 IntelliSense 지원
- **듀얼 빌드** — tsup을 통한 ESM 및 CJS 빌드

## 패키지

| 패키지 | 설명 | 버전 |
|--------|------|------|
| [`@tac-ui/web`](./packages/web) | React 컴포넌트 라이브러리 (43개 컴포넌트) | `0.1.0` |
| [`@tac-ui/tokens`](./packages/tokens) | 디자인 토큰 (색상, 간격, 타이포그래피, 모션) | `0.1.0` |
| [`@tac-ui/icon`](./packages/icon) | 아이콘 패키지 (lucide-react + TacLogo) | `0.1.0` |
| [`@tac-ui/shared`](./packages/shared) | 공유 타입 및 인터페이스 | `0.1.0` |

## 설치

```bash
pnpm add @tac-ui/web @tac-ui/tokens @tac-ui/icon
```

## 빠른 시작

```tsx
import { TacProvider, Button } from '@tac-ui/web';

export default function App() {
  return (
    <TacProvider>
      <Button>Hello Tac UI</Button>
    </TacProvider>
  );
}
```

### Tailwind CSS 설정

```ts
// tailwind.config.ts
import { tacPreset } from '@tac-ui/web/tailwind';

export default {
  presets: [tacPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@tac-ui/web/dist/**/*.{js,mjs}',
  ],
};
```

## 컴포넌트

Accordion · Alert · AnimatedToggle · Avatar · Badge · Breadcrumb · Button · Card · Chart · Checkbox · Chip · CodeBlock · ColorPicker · Combobox · DatePicker · Dialog · Divider · Drawer · Dropdown · EmptyState · Indicator · Input · Layout · Modal · MorphingCard · PageLayouts · Pagination · Popover · Progress · Radio · SegmentController · Select · Skeleton · Slider · Snackbar · Stack · Stepper · Switch · Table · Tabs · Textarea · Toast · Tooltip

## 개발

이 프로젝트는 [pnpm](https://pnpm.io)과 [Turborepo](https://turbo.build)로 관리되는 모노레포입니다.

```bash
# 의존성 설치
pnpm install

# 모든 패키지를 개발/워치 모드로 시작
pnpm dev

# 모든 패키지 빌드
pnpm build

# 린트
pnpm lint

# 타입 체크
pnpm typecheck
```

### 프로젝트 구조

```
tac-ui/
├── packages/
│   ├── shared/      # @tac-ui/shared — 공유 타입
│   ├── tokens/      # @tac-ui/tokens — 디자인 토큰
│   ├── icon/        # @tac-ui/icon — 아이콘
│   └── web/         # @tac-ui/web — React 컴포넌트
├── apps/
│   ├── docs/        # 문서 사이트 (Next.js)
│   └── playground/  # 컴포넌트 플레이그라운드
├── turbo.json
└── pnpm-workspace.yaml
```

## 기술 스택

| 카테고리 | 기술 |
|---------|------|
| 언어 | TypeScript (strict 모드) |
| 패키지 매니저 | pnpm |
| 모노레포 | Turborepo |
| 빌드 | tsup |
| UI 프레임워크 | React 18/19 |
| 스타일링 | Tailwind CSS 4, CVA, clsx, tailwind-merge |
| 애니메이션 | Framer Motion |
| 아이콘 | lucide-react |
| 앱 프레임워크 | Next.js 16 |

## 라이선스

[MIT 라이선스](./LICENSE) - Copyright (c) 2026 Jeonhui Lee

개인 및 상업 프로젝트에서 자유롭게 사용, 수정, 배포할 수 있습니다.

---

<p align="center">
  Tac UI 팀이 정성을 담아 만들었습니다.
</p>
