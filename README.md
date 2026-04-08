# 棠想視界 KIKI DESIGN (2026 Refactored)

> **Create with Soul.** — 視覺設計・品牌規劃・數位創作

🔗 **線上作品集：** [https://kiki-design.vercel.app/]

這是 **Kiki Design** 的個人作品集網站。
目前以極簡主義（Kiki Style）為視覺核心，並透過 AI 輔助開發（Vibe Coding），打造出高效能且具備豐富動態互動的視覺設計展示平台。

---

## 🚀 技術棧與特性

* **核心框架**：`React 18` + `TypeScript` (嚴格型別定義)。
* **動態視覺**：`GSAP` + `ScrollTrigger` 實現高性能滾動動畫與視差效果。
* **樣式系統**：`Tailwind CSS` 搭配 **三層 CSS 結構**（變數層、語義層、組件層）。
* **效能優化**：採用單一資料來源（Single Source of Truth）管理作品，優化圖片加載與進場序列。
* **開發範式**：遵循 `DEVELOPER_GUIDE.md` 規範，實現樣式與邏輯的高度解耦。

---

## 📂 專案架構 (Project Structure)

本專案採用模組化結構，將設計系統、資料模型與 UI 組件嚴格分離。

```text
kikidesign/
├── .github/                # GitHub CI/CD 自動化部署設定
│   └── workflows/
│       └── deploy.yml      # 自動化部署腳本
├── public/                 # 【靜態資源】不需編譯，由瀏覽器直接抓取
│   ├── favicon.ico         # 網站標籤圖示
│   ├── apple-touch-icon.png # iOS 主畫面圖示
│   ├── og-image.png        # 社群分享預覽圖 (Open Graph)
│   ├── robots.txt          # 搜尋引擎爬蟲指令
│   └── site.webmanifest    # PWA 網站應用程式清單
├── src/                    # 【核心原始碼】
│   ├── assets/             # 【品牌識別與優化資源】
│   │   ├── logo-kiki-main.svg # 主標誌 (參與 Vite 編譯優化)
│   │   ├── logo-kiki-2025.webp # 年度標誌變體
│   │   ├── logo-kiki-512.png  # 高解析度標誌
│   │   └── images/         # 作品集 WebP 格式圖片
│   ├── components/         # 【UI 元件庫】
│   │   ├── common/         # 功能性與通用組件
│   │   │   ├── BackgroundEffects.tsx # 背景光暈特效
│   │   │   ├── BackToTop.tsx         # 返回頂部按鈕
│   │   │   ├── Loader.tsx            # 進場動畫
│   │   │   └── ScrollToTop.tsx       # 路由切換捲動重置
│   │   ├── layout/         # 頁面框架組件
│   │   │   ├── Navigation.tsx        # 頂部導覽
│   │   │   ├── MobileMenu.tsx        # 行動版選單
│   │   │   └── Footer.tsx            # 頁尾資訊
│   │   ├── sections/       # 內容區塊組件
│   │   │   ├── Hero.tsx              # 品牌首屏
│   │   │   ├── Philosophy.tsx        # 設計理念
│   │   │   ├── Works.tsx             # 作品清單
│   │   │   ├── WorkCard.tsx          # 單一作品卡片
│   │   │   └── WorkDetail.tsx        # 作品詳情頁
│   │   └── Home.tsx        # 首頁容器 (組合 Hero, Works, Philosophy)
│   ├── css/                # 【樣式系統】
│   │   ├── globals.css     # Layer 1: 設計 Token 與變數
│   │   ├── motion.css      # Layer 2: 語義化動畫類名
│   │   ├── style.css       # Layer 3: 基礎結構與重置
│   │   ├── works.css       # 作品清單專用樣式
│   │   └── work-detail.css # 作品內頁專用樣式
│   ├── data/
│   │   └── projectData.ts  # 單一資料來源 (SSOT): 管理全站作品內容
│   ├── styles/
│   │   └── layout.ts       # 佈局 Token: 統一全站容器與間距規範
│   ├── utils/
│   │   └── animationPresets.ts # GSAP 動畫參數預設集
│   ├── App.tsx             # 全站路由與總控中心
│   ├── index.tsx           # React 掛載點
│   ├── types.ts            # 全域 TypeScript 型別定義
│   └── vite-env.d.ts       # Vite 環境定義
├── .cursorrules            # Cursor AI 規則設定
├── .env.local              # 本地環境變數
├── .gitignore              # Git 忽略清單
├── DEVELOPER_GUIDE.md      # 開發規範與維護指南
├── index.html              # 基礎 HTML 入口
├── metadata.json           # 專案元數據
├── package.json            # 專案套件與指令管理
├── tsconfig.json           # TypeScript 編譯配置
└── vite.config.ts          # Vite 建置配置
```

---

## 🎨 設計規範 (The Kiki Style)

網站遵循特定的視覺約束，以確保「專業、冷靜、質感」的氛圍：

* **色調**：高對比黑白灰為基調，搭配 `--brand-accent: #EF4444` 作為點睛色。
* **排版**：襯線體（*Serif Italic*）與無襯線體（Sans-serif）的交錯運用。
* **互動**：所有的進場動畫皆經過微調（Ease: `power4.inOut`），確保體感流暢且具備呼吸感。

---

## 🛠️ 開發與部署

### 本機開發
```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

---

### 部署流程

本專案目前部署於 **GitHub Pages** (或 Vercel)。

```bash
# 建置並自動推送至 gh-pages 分支
npm run deploy
```

---

## 📬 聯絡設計師

* **Email**：[exloe574@gmail.com](mailto:exloe574@gmail.com)
* **Facebook**：[棠想視界](https://www.facebook.com/profile.php?id=100066728660644)
* **LINE**：[0979-291-388](https://line.me/ti/p/0979291388)

---

## 📝 維護筆記

* [x] **新增作品**：請直接修改 `src/data/projectData.ts`，UI 會自動根據資料動態渲染。
* [x] **動畫節奏**：若需調整全站動畫速度或 Ease 曲線，請修改 `src/utils/animationPresets.ts`。
* [x] **樣式修改**：請優先尋找 `src/css/globals.css` 中的 **CSS 變數** 進行全局調整，避免在組件內直接硬編碼（Hard-coded）樣式。

---

*Built with AI Collaboration.*