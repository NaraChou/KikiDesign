# 棠想視界 KIKI DESIGN (2026)

> **Create with Soul.** — 視覺設計・品牌規劃・數位創作

🔗 **線上作品集**：[https://kiki-design.vercel.app/]

目前以極簡主義（Kiki Style）為視覺核心，並透過 AI 輔助開發（Vibe Coding），打造出高效能且具備豐富動態互動的視覺設計展示平台。

---

## 🚀 技術棧與特性

- **核心框架**：React 18 + TypeScript（嚴格型別定義）
- **動態視覺**：GSAP + ScrollTrigger，高性能滾動動畫與視差效果
- **樣式系統**：Tailwind CSS 搭配五層 CSS 架構（Token → 語意 → Layout → 元件 → 動畫）
- **效能優化**：單一資料來源（SSOT）管理作品、圖片 CLS 防禦、rAF 休眠機制
- **AI 開發護欄**：雙軌制 AI 規範（`.cursorrules` + `.cursor/rules/*.mdc`），強制 Mobile First、Motion V5 效能標準與 DRY 原則

---

## 📂 專案架構

```text
kikidesign/
├── .cursor/                     # AI 防禦系統（背景防禦網）
│   └── rules/
│       ├── 01-architecture.mdc  # 架構與元件模板標準
│       ├── 02-tailwind-rwd.mdc  # Tailwind 排序與 RWD 強制規範
│       ├── 03-motion-v5.mdc     # GSAP/rAF 效能與清理機制
│       ├── 04-seo-semantic.mdc  # 語意化標籤與圖片 SEO 防線
│       └── 05-commands.mdc      # Kiki 專屬 AI 快捷指令庫
├── .github/
│   └── workflows/
│       └── deploy.yml           # CI/CD 自動化部署
├── public/                      # 靜態資源（不經 Vite 編譯）
│   ├── og-image.png
│   ├── favicon.ico
│   └── site.webmanifest
├── src/
│   ├── assets/                  # 品牌識別與作品圖片（WebP）
│   ├── components/
│   │   ├── common/              # BackgroundEffects, BackToTop, Loader, ScrollToTop
│   │   ├── layout/              # Navigation, MobileMenu, Footer
│   │   └── sections/            # Hero, Works, WorkCard, WorkDetail, Philosophy
│   ├── css/
│   │   ├── globals.css          # Layer 0：Design Token
│   │   ├── motion.css           # Layer 1：語意 class
│   │   ├── style.css            # Layer 2：結構與重置
│   │   ├── works.css            # Layer 3：作品清單
│   │   └── work-detail.css      # Layer 3：作品內頁
│   ├── data/
│   │   └── projectData.ts       # 單一資料來源（SSOT）
│   ├── styles/
│   │   └── layout.ts            # 佈局 Token
│   ├── utils/
│   │   └── animationPresets.ts  # GSAP 動畫參數模組
│   ├── App.tsx
│   ├── index.tsx
│   ├── types.ts                 # Window interface 唯一宣告來源
│   └── vite-env.d.ts
├── .cursorrules                 # Cursor 全局 AI 規則（最高指導原則）
├── CURSOR_GUIDE.md              # Cursor Agent 協作手冊（給你自己看）
├── DEVELOPER_GUIDE.md           # 架構聖經（給 AI 研讀）
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🎨 設計規範（Kiki Style）

- **色調**：高對比黑白灰為基調，`--brand-accent: #EF4444` 作為點睛色
- **排版**：Serif Italic（Playfair Display）與 Sans-serif（Noto Sans TC）交錯運用
- **動畫**：Ease `power4.inOut`，確保體感流暢且具備呼吸感

---

## 🛠️ 開發與部署

```bash
npm install      # 安裝依賴
npm run dev      # 啟動開發伺服器
npm run build    # 建置
npm run deploy   # 建置並推送至 GitHub Pages
```

---

## 📝 維護筆記

- **新增作品**：修改 `src/data/projectData.ts`，UI 自動渲染
- **調整動畫**：修改 `src/utils/animationPresets.ts`
- **全站樣式**：優先修改 `src/css/globals.css` 的 CSS 變數
- **AI 規範更新**：發現 AI 偏離標準時，更新 `.cursor/rules/` 對應的 `.mdc` 檔案

---

## 📬 聯絡設計師

- **Email**：[exloe574@gmail.com](mailto:exloe574@gmail.com)
- **Facebook**：[棠想視界](https://www.facebook.com/profile.php?id=100066728660644)
- **LINE**：[0979291388](https://line.me/ti/p/0979291388)

---

*Built with AI Collaboration.*
