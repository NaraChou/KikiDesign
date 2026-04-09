# Frontend Architecture Guide
### Kiki Design System — React + TypeScript + Tailwind CSS + GSAP

---

## 1. Core Philosophy

三個分離原則：

1. **Structure** — React / TSX
2. **Styling** — Tailwind + CSS Token
3. **Motion** — GSAP / CSS transitions

設計系統五層架構：

```
Layer 0  globals.css    Design Token（色彩 / 字體 / 間距）
Layer 1  motion.css     語意 class（.hero-tag / .nav-link）
Layer 2  layout.ts      Layout Token（LAYOUT.container）
Layer 3  STYLES 常數    元件視覺層（per-component）
Layer 4  GSAP_SELECTORS 動畫鉤子白名單（永不 refactor）
```

---

## 2. Folder Structure

```
src/
  components/
    common/     BackgroundEffects, BackToTop, Loader, ScrollToTop
    layout/     Navigation, MobileMenu, Footer
    sections/   Hero, Works, WorkCard, WorkDetail, Philosophy
  css/
    globals.css
    motion.css
    style.css
    works.css
    work-detail.css
  data/
    projectData.ts
  styles/
    layout.ts
  utils/
    animationPresets.ts
  App.tsx
  index.tsx
  types.ts
```

---

## 3. STYLES Layer Convention

每個元件的固定結構：

```ts
// [B-0] GSAP 白名單（若有動畫，必須獨立此區）
const GSAP_SELECTORS = {
  itemClass: 'css-class-name',  // 永不 refactor
} as const;

// [B] 樣式常數
const STYLES = {
  wrapper: '',
  container: LAYOUT.container,
  title: '',
  description: '',
} as const;
```

### STYLES 命名系統

| Key | 用途 |
|---|---|
| `wrapper` | 最外層容器 |
| `container` | 寬度控制層 |
| `title` | 主標題 |
| `description` | 輔助說明文字 |
| `media` | 圖片 / 影片 |
| `meta` | 次要資訊 |

> 有命名衝突時才用情境前綴：`heroTitle`、`cardTitle`

---

## 4. Tailwind Usage Rules

排序規則（嚴格遵守）：

```
[A] Layout      flex grid w- h- p- m- position z-
[B] Visual      bg- text- border- rounded- shadow- opacity-
[C] State       hover: focus: group-hover: transition- duration-
[D] Responsive  md: lg: xl:（永遠最後）
```

範例：
```ts
'flex items-center w-full bg-black text-white opacity-0 transition-opacity hover:opacity-100 md:flex-row'
```

---

## 5. CSS Responsibility

### globals.css — Token 定義
```css
:root {
  --brand-accent: #EF4444;
  --text-dim: rgba(234, 226, 214, 0.5);
}
```

### motion.css — 語意 class
```css
/* 規則：只放跨元件共用或 Tailwind 串過長難讀的 class */
/* GSAP 初始狀態（opacity-0）不在此定義，保留在 STYLES */
.hero-tag { font-family: var(--font-family-serif-italic); ... }
.label-xs { text-transform: uppercase; font-size: 8px; ... }
```

### style.css — 結構與重置
cursor / scrollbar / container / nav 結構性 CSS

---

## 6. Animation System

### 控制權分離

| 類型 | 工具 |
|---|---|
| 頁面進場 / 捲動動畫 | GSAP |
| Hover 效果 | CSS |
| Menu / UI 開關 | CSS |

### GSAP 白名單規則

```ts
// ✅ 正確做法
const GSAP_SELECTORS = {
  waterfallItem: 'waterfall-item',  // 永不改名
} as const;

// STYLES 只放 UI class
const STYLES = {
  figureUI: 'group relative overflow-hidden cursor-pointer',
} as const;

// JSX 組合
<figure className={`${GSAP_SELECTORS.waterfallItem} ${STYLES.figureUI}`} />
```

### ctx.revert 標準模式

```ts
// ✅ ctx 必須在 useEffect 頂層宣告，cleanup 才能拿到
useEffect(() => {
  let ctx: ReturnType<typeof window.gsap.context> | null = null;
  const timer = setTimeout(() => {
    ctx = window.gsap.context(() => { /* 動畫 */ }, ref);
  }, 100);
  return () => {
    clearTimeout(timer);
    ctx?.revert();  // ← 正確，記憶體安全
  };
}, [dep]);
```

### animationPresets.ts 規則

```
1. 只放跨元件重複出現的動畫參數
2. 不在此處呼叫 gsap，只匯出純物件
3. selector 由各元件自行傳入
4. 定義了就要用，禁止死碼 export
```

---

## 7. Layout Token

```ts
// styles/layout.ts
export const LAYOUT = {
  container: 'content-width-container mx-auto w-full',
  colCenter: 'content-width-container flex flex-col items-center w-full',
  colCenterText: 'content-width-container w-full text-center',
  homeStack: 'content-width-container flex flex-col md:gap-48',
} as const;
```

---

## 8. Component Template

```tsx
import React from 'react';
import { LAYOUT } from '../../styles/layout';

/**
 * [A] 視覺資訊備註
 * 元件角色說明 + GSAP selector 白名單說明。
 */

// [B-0] GSAP 白名單（有動畫才需要）
// const GSAP_SELECTORS = { item: 'item-class' } as const;

// [B] 樣式常數（Tailwind 順序：Layout → Visual → State → Responsive）
const STYLES = {
  wrapper: 'min-h-screen flex flex-col',
  container: LAYOUT.container,
  title: 'text-4xl md:text-7xl',
  description: 'text-sm opacity-70',
} as const;

// [C] 元件主體
export const ComponentName: React.FC = () => (
  <section className={STYLES.wrapper}>
    <div className={STYLES.container}>
      <h2 className={STYLES.title}>Title</h2>
      <p className={STYLES.description}>Description</p>
    </div>
  </section>
);
```

---

## 9. SEO & Performance Rules

### img 必填屬性

```tsx
// 首屏圖片（LCP 優化）
<img loading="eager" fetchPriority="high" decoding="async"
     width={W} height={H} alt="描述" />

// 非首屏圖片（防止 CLS）
<img loading="lazy" decoding="async"
     width={W} height={H} alt="描述" />
```

### index.html 必填 meta

```html
<meta name="twitter:image" content="...">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

### TypeScript 型別宣告原則

```ts
// types.ts — Window interface 唯一宣告來源
// vite-env.d.ts — 只放 /// <reference types="vite/client" />
// 不使用 import './types'，由 tsconfig include 自動拾取
```

---

## 10. Anti-Patterns（絕對禁止）

```
❌ GSAP selector 混入 STYLES
❌ 元件內硬編碼色值（應用 var(--token)）
❌ ctx 宣告在 setTimeout 內（cleanup 無效，記憶體洩漏）
❌ 定義但從未使用的 export（死碼）
❌ img 缺少 width / height（CLS 扣分）
❌ 多處重複宣告 Window interface
❌ import './types'（由 tsconfig 自動處理）
❌ 重複 import 同一 CSS 檔案
```

---

## 11. Scalability Path

```
Step 1  ✅  Layout token 提取（layout.ts）
Step 2  ✅  語意層建立（motion.css）
Step 3  ✅  Animation preset 模組化（animationPresets.ts）
Step 4  ✅  Component library（WorkCard 獨立可複用）
Step 5  →   Theme system（dark/light token 切換）
Step 6  →   Storybook 元件文件化
Step 7  →   E2E 測試（Playwright）
```

---

## 12. Final Principle

```
globals.css      = 設計 Token（唯一真相來源）
motion.css       = 語意橋樑（Token → 可讀 class）
layout.ts        = 佈局 Token（容器一致性）
STYLES           = 視覺組織（元件內部）
GSAP_SELECTORS   = 動畫鉤子（絕對穩定）
animationPresets = 動畫參數（模組化）
```

---

*Kiki Design System — Last updated 2026*

