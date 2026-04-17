# 🪄 Kiki Design x Cursor Agent: 專案級 AI 協作手冊

> **核心理念**：Cursor 不是幫你寫扣的打字機，而是受你指揮的「首席前端工程師」。透過完善的雙軌規則系統，我們能將 AI 的能力限制在 Kiki Style 的極簡、高效能、高質感框架內。

---

## 🧠 核心概念：AI 協作的「雙軌制」

### 🚂 軌道一：背景自動防禦網（`.cursor/rules/*.mdc`）
- **定位**：「交通警察 / 隨身警報器」
- **運作方式**：精準觸發的強制規則。AI 打開 `.tsx` 時才讀 `02-tailwind-rwd.mdc`；你下達指令時才讀 `05-commands.mdc`。不佔用多餘 Token。
- **優點**：你日常改 Code 時**完全不需理會它**，它在背景自動約束 AI 的 RWD、動畫清理與語意標籤。

### 🚂 軌道二：全局架構聖經（`DEVELOPER_GUIDE.md`）
- **定位**：「國家憲法 / 維基百科」
- **運作方式**：完整記錄全站脈絡、五層架構與所有工程原則。
- **使用時機**：進行**架構大改**或**一口氣生成多個新頁面**時，在對話框手動 `@DEVELOPER_GUIDE.md`，強迫 AI 先閱讀全站邏輯再動工。

---

## 📦 新專案環境繼承（Setup）

開啟全新專案時，第一時間完成「AI 腦內植入」：

1. **複製雙軌規範**：將 `.cursorrules`、`DEVELOPER_GUIDE.md`、`CURSOR_GUIDE.md` 與 `.cursor/rules/`（含 `01~05.mdc`）整個複製到新專案根目錄。
2. **驗證載入**：開啟 Cursor Chat（`Cmd+L` / `Ctrl+L`），輸入：
   > 「請確認你是否已讀取 Kiki Design System 的開發規範，並說明五層架構各層的職責。」
3. **確認 AI 回答正確**後再開始開發。

---

## 🗣️ 與 AI 的溝通心法（Prompting Rules）

### ❌ 錯誤的詠唱（AI 會偷懶、忘記 RWD、亂寫 inline style）
> 「幫我做一個作品列表，要有圖片跟標題，滑過去要有動畫。」

### ✅ 正確的詠唱（啟動防禦機制）
> 「請依照 `.cursor/rules` 的架構標準，幫我實作『作品列表元件』：
> 1. 資料用 array `.map()` 渲染（DRY 原則）。
> 2. 圖片必須具備防 CLS 保護（aspect-ratio + width + height）。
> 3. Hover 動畫使用 Tailwind `group-hover:`，禁止 JS onMouseOver。
> 4. 手機垂直排列（`flex-col`），桌機才並排（`md:flex-row`）。」

---

## 🚀 Cursor 核心功能實戰

| 快捷鍵 | 模式 | 適合情境 |
|---|---|---|
| `Cmd+L` | Chat 聊天 | 架構討論、執行快捷指令、代碼健檢 |
| `Cmd+I` | Composer 生成器 | 跨檔案大規模重構、一次建立多個元件 |
| `Cmd+K` | Inline Edit 行內編輯 | 局部微調、重排 Tailwind class |

**Composer 使用技巧**：大改時先 `@DEVELOPER_GUIDE.md`，讓 AI 讀完架構聖經再動工。

---

## ⚡ 快捷指令說明書（Kiki Commands）

⚠️ **核心觀念：隨寫隨測，不要等全站完成才檢查。**

| 快捷指令 | 執行時機 | AI 執行的防禦任務 |
|:---|:---|:---|
| **`/FormatKiki`** | 元件剛寫完時 | 強制 Tailwind 重排為 `Layout → Visual → State → Responsive`；補齊遺漏 RWD 斷點；抽離散落樣式到 `STYLES` |
| **`/CheckCLS`** | 新增圖片後 | 列出所有 `<img>`；逐一確認 `aspect-ratio`、`width`、`height`、`alt`、`loading` 策略 |
| **`/AuditV5`** | 寫完 GSAP / rAF 後 | 確認 rAF 休眠機制（`Math.abs < 0.1`）；cleanup 完整性（`revert` + `cancelAnimationFrame`）；位移使用 `translate3d` 非 `top/left` |
| **`/AuditSEO`** | 區塊結構完成時 | 語意標籤（div 過度使用？`main`/`nav`/`article` 是否到位？）；標題階層無斷層；`<a>` 具體描述；`<button>` 有 `aria-label` |

---

## 🚑 常見災情與應對指南

| 災情 | 修正指令 |
|---|---|
| AI 亂寫 `style={{...}}` | 「停！你違反了禁絕 Inline Styles 的規定。請全部改用 Tailwind 類別或寫入 `STYLES` 常數。」 |
| 手機版排版跑版 | 「你忘記 Mobile First 規則了。以手機版垂直佈局為預設，將並排邏輯移至 `md:flex-row`，重新生成。」 |
| GSAP 讓網頁變超卡 | 「對這個元件執行 `/AuditV5`，檢查是否漏寫 `cancelAnimationFrame` 或把位移寫在 `top/left`。」 |
| AI 幻覺、找不到檔案 | 在對話框輸入 `@` 選擇正確的檔案路徑（如 `@layout.ts`），強迫讀取正確上下文。 |
| 新元件偏離五層架構 | 「請先閱讀 `@DEVELOPER_GUIDE.md` 的 Section 1 和 Section 3，再重新生成這個元件。」 |

---

## 💡 日常開發起手式（Daily Workflow）

1. **大改前**：`Cmd+I` ➜ 「請閱讀 `@DEVELOPER_GUIDE.md`，規劃新功能後再動工。」
2. **建立元件**：`Cmd+I` ➜ 「依照 `01-architecture.mdc` 模板建立 `Hero.tsx`」
3. **樣式開發**：`Cmd+K` ➜ 「加上 Kiki Style 的黑底白字」
4. **加入動畫**：Chat 討論 GSAP 邏輯，selector 放進 `GSAP_SELECTORS`。
5. **驗收**：`Cmd+L` ➜ 「對 `@Hero.tsx` 執行 `/FormatKiki`、`/CheckCLS`、`/AuditSEO`」
6. **收工**。
