<p align="center">
  <img src="./apps/docs/public/logo.svg" width="64" height="64" alt="Tac UI 로고" />
</p>

<h1 align="center">Tac UI</h1>

<p align="center">
  코드가 숨을 쉬는 크로스 플랫폼 디자인 시스템.<br/>
  40+ 웹 컴포넌트, 27 네이티브 컴포넌트 — 살아 숨 쉬는 인터페이스를 위해 설계되었습니다.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@tac-ui/web"><img src="https://img.shields.io/npm/v/@tac-ui/web?label=%40tac-ui%2Fweb&color=5856D6" alt="npm @tac-ui/web" /></a>
  <a href="https://www.npmjs.com/package/@tac-ui/native"><img src="https://img.shields.io/npm/v/@tac-ui/native?label=%40tac-ui%2Fnative&color=5E5CE6" alt="npm @tac-ui/native" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="License" /></a>
</p>

<p align="center">
  <a href="https://tac-ui.com">문서</a> ·
  <a href="#설치">설치</a> ·
  <a href="#패키지">패키지</a> ·
  <a href="#빠른-시작">빠른 시작</a> ·
  <a href="#개발">개발</a>
</p>

<p align="center">
  <a href="./README.md">English</a>
</p>

---

## 기능

- **크로스 플랫폼** — 하나의 디자인 시스템으로 Web (React)과 Native (React Native) 지원
- **40+ 웹 컴포넌트** — Button, Card, Modal, Chart, DatePicker, Table 등
- **27 네이티브 컴포넌트** — 완전한 기능의 React Native 컴포넌트 라이브러리
- **디자인 토큰** — 색상, 간격, 타이포그래피, 모션, 엘리베이션 공유 토큰
- **다크 모드** — 라이트/다크 테마 전환 (웹: CSS 변수, 네이티브: 컨텍스트)
- **로열 인디고 액센트** — 세련된 브랜드 팔레트 (`#5856D6` 라이트 / `#5E5CE6` 다크)
- **접근성** — WAI-ARIA 준수 컴포넌트와 포커스 관리
- **Tailwind CSS** — Tailwind CSS v4 프리셋을 통한 통합
- **애니메이션** — Framer Motion (웹), React Native Animated (네이티브)
- **TypeScript** — strict 모드 타입과 완전한 IntelliSense 지원
- **듀얼 빌드** — tsup을 통한 ESM 및 CJS 빌드

## 패키지

| 패키지 | 설명 | 버전 |
|--------|------|------|
| [`@tac-ui/web`](./packages/web) | React 웹 컴포넌트 라이브러리 (40+ 컴포넌트) | [![npm version](https://img.shields.io/npm/v/@tac-ui/web?style=flat-square)](https://www.npmjs.com/package/@tac-ui/web) |
| [`@tac-ui/native`](./packages/native) | React Native 컴포넌트 라이브러리 (27 컴포넌트) | [![npm version](https://img.shields.io/npm/v/@tac-ui/native?style=flat-square)](https://www.npmjs.com/package/@tac-ui/native) |
| [`@tac-ui/tokens`](./packages/tokens) | 디자인 토큰 (색상, 간격, 타이포그래피, 모션) | [![npm version](https://img.shields.io/npm/v/@tac-ui/tokens?style=flat-square)](https://www.npmjs.com/package/@tac-ui/tokens) |
| [`@tac-ui/icon`](./packages/icon) | 웹 아이콘 패키지 (lucide-react + TacLogo) | [![npm version](https://img.shields.io/npm/v/@tac-ui/icon?style=flat-square)](https://www.npmjs.com/package/@tac-ui/icon) |
| [`@tac-ui/icon-native`](./packages/icon-native) | 네이티브 아이콘 패키지 (lucide-react-native + TacLogo) | [![npm version](https://img.shields.io/npm/v/@tac-ui/icon-native?style=flat-square)](https://www.npmjs.com/package/@tac-ui/icon-native) |
| [`@tac-ui/shared`](./packages/shared) | 공유 타입 및 인터페이스 | [![npm version](https://img.shields.io/npm/v/@tac-ui/shared?style=flat-square)](https://www.npmjs.com/package/@tac-ui/shared) |

## 설치

### 웹

```bash
pnpm add @tac-ui/web @tac-ui/tokens @tac-ui/icon
```

### React Native

```bash
pnpm add @tac-ui/native @tac-ui/tokens @tac-ui/icon-native
```

## 빠른 시작

### 웹

```tsx
import { TacProvider, Button } from '@tac-ui/web';

export default function App() {
  return (
    <TacProvider defaultTheme="system">
      <Button variant="point">Hello Tac UI</Button>
    </TacProvider>
  );
}
```

#### Tailwind CSS 설정

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

### React Native

```tsx
import { TacNativeProvider, Button } from '@tac-ui/native';

export default function App() {
  return (
    <TacNativeProvider defaultPreference="system">
      <Button variant="point">Hello Tac UI</Button>
    </TacNativeProvider>
  );
}
```

## 웹 컴포넌트

Accordion · Alert · AnimatedToggle · Avatar · Badge · Breadcrumb · Button · Card · Chart (Bar, Line, Pie, Donut) · Checkbox · Chip · CodeBlock · ColorPicker · Combobox · DatePicker · Dialog · Divider · Drawer · Dropdown · EmptyState · FloatingMenuBar · Indicator · Input · Layout (Header, Sidebar, SidebarGroup, SidebarItem, Main, Footer) · Modal · MorphingCard · PageLayouts (SidebarPage, DashboardPage 등) · Pagination · Popover · Progress · Radio · SegmentController · Select · Skeleton · Slider · Snackbar · Stack · Stepper · Switch · Table · Tabs · Textarea · Toast · Toggle · Tooltip

## 네이티브 컴포넌트

Accordion · Alert · AnimatedToggle · Avatar · Badge · Breadcrumb · Button · Card · Checkbox · Chip · CodeBlock · ColorPicker · Combobox · DatePicker · Dialog · Divider · Dropdown · EmptyState · FloatingMenuBar · Indicator · Input · Progress · Radio · SegmentController · Select · Skeleton · Slider · Snackbar · Stack · Stepper · Switch · Table · Tabs · Textarea · Toast

## 개발

이 프로젝트는 [pnpm](https://pnpm.io)과 [Turborepo](https://turbo.build)로 관리되는 모노레포입니다.

```bash
# 의존성 설치
pnpm install

# 모든 패키지를 개발/워치 모드로 시작
pnpm dev

# 모든 패키지 빌드
pnpm build

# 문서 사이트 시작 (포트 3001)
pnpm --filter docs dev

# 린트 & 타입 체크
pnpm lint
pnpm typecheck
```

### 프로젝트 구조

```
tac-ui/
├── packages/
│   ├── shared/          # @tac-ui/shared — 공유 타입
│   ├── tokens/          # @tac-ui/tokens — 디자인 토큰 (웹 + 네이티브)
│   ├── icon/            # @tac-ui/icon — 웹 아이콘
│   ├── icon-native/     # @tac-ui/icon-native — 네이티브 아이콘
│   ├── web/             # @tac-ui/web — React 웹 컴포넌트
│   └── native/          # @tac-ui/native — React Native 컴포넌트
├── apps/
│   ├── docs/            # 문서 사이트 (Next.js)
│   └── native-docs-app/ # 네이티브 컴포넌트 데모 (Expo)
├── turbo.json
└── pnpm-workspace.yaml
```

## 기술 스택

| 카테고리 | 웹 | 네이티브 |
|---------|-----|---------|
| UI 프레임워크 | React 18/19 | React Native |
| 스타일링 | Tailwind CSS 4, CVA, clsx, tailwind-merge | StyleSheet, 테마 컨텍스트 |
| 애니메이션 | Framer Motion | Animated API, Reanimated |
| 아이콘 | lucide-react | lucide-react-native |
| 빌드 | tsup (CJS/ESM 듀얼) | tsup (CJS/ESM 듀얼) |

**공통**: TypeScript (strict), pnpm, Turborepo, Next.js 16 (문서)

## 라이선스

[MIT 라이선스](./LICENSE) - Copyright (c) 2026 Jeonhui Lee

---

<p align="center">
  Tac UI 팀이 정성을 담아 만들었습니다.
</p>
