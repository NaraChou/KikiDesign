// src/data/projectData.ts

/**
 * [中文註解] 
 * ▍資料結構說明（新規範整併版）
 * - 本檔專為純靜態作品資料，不含任何排版或寬度設定邏輯。
 * - 視覺展示請務必於組件層包裹 .content-width-container class，確保「主要內容區」於 Navigation、Footer、內容頁等皆左右等寬且對齊（class 細節寫於 globals.css）。
 *
 * ▍統一圖片載入說明
 * - 所有圖片僅作資源引用，須於元件層維護 aspect-ratio、object-fit: contain（嚴禁拉伸，維護設計原生比例）。
 * 
 * ▍統一結構與關鍵欄位
 * - id：唯一識別碼（與路由鍵同步）
 * - title/subtitle：中英文標題
 * - category/year：類目分類與年份
 * - description：內文說明
 * - images：傳陣列（嚴禁單獨欄位），且順序即展現順序
 */

import brandingAICover from '../assets/images/branding-ai-portfolio-cover.webp';      // 封面圖
import brandingDarkUI from '../assets/images/branding-dark-ui-landing.webp';
import brandingMockupMain from '../assets/images/branding-mockup-main.webp';
import brandingResponsive from '../assets/images/branding-responsive-showcase.webp';
import brandingUIEducation from '../assets/images/branding-ui-education-app.webp';

import logoStationery from '../assets/images/logo-branding-stationery.webp';

// ▍統一所有作品資料於同一物件下，避免重複結構
export const projects = {
  // 作品一：個人品牌官網
  'personal-branding': {
    id: 'personal-branding',
    title: '個人品牌形象官網',
    subtitle: 'Personal Branding Website',
    category: 'Brand Identity / UI/UX',
    year: '2024',
    description:
      '以極簡主義為核心，運用 GSAP 動畫打造流暢的視覺體驗。透過深色調與留白，展現設計師獨特的美學視角，讓網站不只是資訊的載體，更是個人特質的數位延伸。',
    // [視覺註解] 圖片皆必須於元件層 object-fit: contain 呈現，順序即畫面呈現順序（首圖為主圖）
    images: [
      brandingMockupMain,      // 首圖：主視覺
      brandingAICover,         // 封面備圖
      brandingResponsive,      // 響應式頁面
      brandingUIEducation,     // APP UI 展示
      brandingDarkUI           // 深色登陸頁
    ]
  },

  // 作品二：商標與名片設計
  'logo-design': {
    id: 'logo-design',
    title: '個人商標與名片',
    subtitle: 'Logo & Business Card',
    category: 'Visual Design / Print',
    year: '2025',
    description:
      '靈感源自於「棠」字與幾何線條的解構重組。標準字設計融合了傳統書法的氣韻與現代無襯線體的俐落。名片選用進口美術紙，輔以燙金工藝，在觸感與視覺上傳遞職人精神。',
    // [視覺註解] 僅一張圖片，維持陣列一致性
    images: [
      logoStationery
    ]
  },

  // ...若有更多作品，請依上述格式繼續新增
};
