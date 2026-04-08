棠想視界 KIKI DESIGN (2026 Refactored)
Create with Soul. — 視覺設計・品牌規劃・數位創作

🔗 **線上作品集：** [https://kiki-design.vercel.app/]
這是 Kiki Design 的個人作品集網站。
目前以極簡主義（Kiki Style）為視覺核心，並透過 AI 輔助開發（Vibe Coding），打造出高效能且具備豐富動態互動的視覺設計展示平台。

🚀 技術棧與特性
核心框架： React 18 + TypeScript (嚴格型別定義)。
動態視覺： GSAP + ScrollTrigger 實現高性能滾動動畫與視差效果。
樣式系統： Tailwind CSS 搭配 三層 CSS 結構（變數層、語義層、組件層）。
效能優化： 採用單一資料來源（Single Source of Truth）管理作品，優化圖片加載與進場序列。
開發範式： 遵循 DEVELOPER_GUIDE.md 規範，實現樣式與邏輯的高度解耦。

📂 專案架構 (Project Structure)
本專案採用模組化結構，將設計系統、資料模型與 UI 組件嚴格分離。

Plaintext
kikidesign/
├── src/
│   ├── assets/             # 靜態資源（Logo, WebP 格式作品圖）
│   ├── components/         # UI 元件庫
│   │   ├── App.tsx         # 全站路由與全局動畫控制器
│   │   ├── Home.tsx        # 首頁容器
│   │   ├── Hero.tsx        # 品牌首屏
│   │   ├── Works.tsx       # 作品列表區
│   │   ├── WorkCard.tsx    # 單一作品卡片（含光暈特效）
│   │   ├── WorkDetail.tsx  # 作品內頁（瀑布流與分頁籤）
│   │   ├── Navigation.tsx  # 頂部導覽列
│   │   ├── Loader.tsx      # 全屏進場動畫
│   │   └── ...             # 其餘功能組件（Footer, BackToTop 等）
│   ├── css/                # 三層樣式系統
│   │   ├── globals.css     # Layer 1: 設計 Token (顏色、字體、尺寸變數)
│   │   ├── motion.css      # Layer 2: 語義化類名 (Hero-title, Divider 等)
│   │   ├── style.css       # Layer 3: 結構與重置 (Cursor, Scrollbar)
│   │   └── works.css       # 元件專屬樣式 (Works Grid 邏輯)
│   ├── data/
│   │   └── projectData.ts  # 單一資料來源 (SSOT): 全站作品內容管理
│   ├── styles/
│   │   └── layout.ts       # 佈局 Token: 統一全站容器寬度與間距
│   └── utils/
│       └── animationPresets.ts # GSAP 動畫參數預設集
├── index.html              # SEO Meta 標籤與字體預連線設定
├── DEVELOPER_GUIDE.md      # 團隊開發規範與維護指南
└── package.json

🎨 設計規範 (The Kiki Style)
網站遵循特定的視覺約束，以確保「專業、冷靜、質感」的氛圍：

色調： 高對比黑白灰為基調，搭配 --brand-accent: #EF4444 作為點睛色。

排版： 襯線體（Serif Italic）與無襯線體（Sans-serif）的交錯運用。

互動： 所有的進場動畫皆經過微調（Ease: power4.inOut），確保體感流暢且具備呼吸感。

🛠️ 開發與部署
本機開發
Bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
部署流程
本專案目前部署於 GitHub Pages (或 Vercel)。

Bash
# 建置並自動推送至 gh-pages 分支
npm run deploy

📬 聯絡設計師
Email： exloe574@gmail.com
Facebook： 棠想視界
LINE： 0979-291-388

📝 維護筆記
若要新增作品，請直接修改 src/data/projectData.ts。
若要調整全局動畫節奏，請修改 src/utils/animationPresets.ts。
樣式修改應優先尋找 globals.css 中的變數。

Built with AI Collaboration.