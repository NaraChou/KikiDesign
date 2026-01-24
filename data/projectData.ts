// src/data/projectData.ts

/**
 * [中文註解]
 * ▍資料單一來源新規範
 * - 僅提供純靜態資料，不含任何排版、寬度、樣式等邏輯。
 * - 所有作品統一資料結構，欄位分組排列，方便維護與擴充。
 * - 項目僅存在一份，所有需要 map 或查詢，皆引用同一陣列，杜絕重複來源與欄位歧義。
 *
 * ▍圖片說明
 * - 僅負責資源載入，尺寸比例與 object-fit 行為交由元件層管理（維持 aspect-ratio，禁止拉伸）。
 */

import brandingAICover from '../assets/images/branding-ai-portfolio-cover.webp';
import brandingDarkUI from '../assets/images/branding-dark-ui-landing.webp';
import brandingMockupMain from '../assets/images/branding-mockup-main.webp';
import brandingResponsive from '../assets/images/branding-responsive-showcase.webp';
import brandingUIEducation from '../assets/images/branding-ui-education-app.webp';
import logoStationery from '../assets/images/logo-branding-stationery.webp';

/**
 * [中文註解] 
 * ▍作品清單主資料（唯一來源，所有顯示均來自此處）
 * - 每個作品物件欄位依主題分組：基本資訊、圖片、主題視覺設定，嚴格歸類，減少冗餘。
 * - id：唯一識別（對應路由）
 * - title/subtitle/category/year/description：基本介紹
 * - images：陣列，順序即為展示順序
 * - visual：首頁卡片 bg 與 hover 光暈統合歸為一組，便於主題色切換與擴展
 */
export interface ProjectData {
  id: string,
  title: string,
  subtitle: string,
  category: string,
  year: string,
  description: string,
  images: string[],
  visual: {
    cardBg: string,      // 首頁卡片背景（Tailwind class）
    hoverGlow: string,   // 首頁卡片 hover 光暈（Tailwind class）
  }
}

// [單一資料陣列 — 所有元件 map 直接來源]
export const projectsList: ProjectData[] = [
  {
    id: 'personal-branding',
    title: '個人品牌形象官網',
    subtitle: 'Personal Branding Website',
    category: 'Brand Identity / UI/UX',
    year: '2024',
    description:
      '以極簡主義為核心，運用 GSAP 動畫打造流暢的視覺體驗。透過深色調與留白，展現設計師獨特的美學視角，讓網站不只是資訊的載體，更是個人特質的數位延伸。',
    images: [
      brandingMockupMain,    // 主視覺
      brandingAICover,       // 封面備圖
      brandingResponsive,    // 響應式頁面
      brandingUIEducation,   // APP UI 展示
      brandingDarkUI         // 深色登陸頁
    ],
    visual: {
      cardBg: 'bg-[rgba(26,28,46,0.50)]',
      hoverGlow: 'group-hover:shadow-[0_0_50px_rgba(59,130,246,0.3)]'
    }
  },
  {
    id: 'logo-design',
    title: '個人商標與名片',
    subtitle: 'Logo & Business Card',
    category: 'Visual Design / Print',
    year: '2025',
    description:
      '靈感源自於「棠」字與幾何線條的解構重組。標準字設計融合了傳統書法的氣韻與現代無襯線體的俐落。名片選用進口美術紙，輔以燙金工藝，在觸感與視覺上傳遞職人精神。',
    images: [
      logoStationery
    ],
    visual: {
      cardBg: 'bg-[rgba(46,26,46,0.50)]',
      hoverGlow: 'group-hover:shadow-[0_0_50px_rgba(168,85,247,0.3)]'
    }
  }
  // ...若有更多作品，請依此格式持續新增
];

/**
 * [中文註解]
 * ▍查詢方便：匯出單獨 map 用、id 查詢用
 * - 取代以往 object + 陣列雙結構。
 * - 元件如需 id -> 資料物件：projectsRecord[查詢id]
 * - 僅 projectsList 可用於 map，杜絕重複資料結構。
 */
export const projectsRecord: Record<string, ProjectData> = Object.fromEntries(
  projectsList.map(proj => [proj.id, proj])
);
