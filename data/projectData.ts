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
import logoKiki2025 from '../assets/images/logo-kiki-2025.webp';
import logoKiki2025Brand from '../assets/images/logo-kiki-2025-brand.webp';
import logoKiki2020 from '../assets/images/logo-kiki-2020.webp';
import namecardKiki2020 from '../assets/images/namecard-kiki-2020.webp';
import logoKikiCoasterMockup from '../assets/images/logo-kiki-coaster-mockup.webp';
import logoStationery from '../assets/images/logo-branding-stationery.webp';
import posterFlyerMain from '../assets/images/poster-flyer-main.webp';

/**
 * [中文註解] 
 * ▍作品清單主資料（唯一來源，所有顯示均來自此處）
 * - 每個作品物件欄位依主題分組：基本資訊、圖片、主題視覺設定，嚴格歸類，減少冗餘。
 * - id：唯一識別（對應路由）
 * - title/subtitle/category/year/description：基本介紹
 * - images：陣列，順序即為展示順序
 * - visual：首頁卡片 bg 與 hover 光暈統合歸為一組，便於主題色切換與擴展
 */
export interface ProjectImage {
  src: string,
  caption?: string,    // 選填說明文字，有值才在 lightbox 顯示
  coverOnly?: boolean, // true = 只用於首頁卡片封面，作品詳情頁不顯示
}

export interface ProjectData {
  id: string,
  title: string,
  subtitle: string,
  category: string,
  year: string,
  description: string,
  images: ProjectImage[],
  visual: {
    cardBg: string,
    hoverGlow: string,
    glow: string,
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
      '為身心靈教育品牌「行韋邏輯」建立一套找到自己的視覺語言。品牌核心為協助個人探索天賦、找尋自我定位，視覺以藍色為主調——象徵正義、和平與自我價值，輔以深色背景提升質感，在活潑與穩重之間建立屬於品牌的視覺平衡。',
    images: [
      { src: brandingMockupMain, coverOnly: true },
      { src: brandingAICover, coverOnly: true },
      {
        src: brandingResponsive,
        caption: '2024 年以 Wix 建置初版，讓品牌快速完成視覺落地。',
      },
      { src: brandingUIEducation, coverOnly: true },
      {
        src: brandingDarkUI,
        caption: '2025 年以 Vibe Coding 重新開發第二版，維持視覺品質的前提下，大幅降低每月平台費用。對創業初期的品牌而言，成本控制本身也是設計決策的一環。',
      },
    ],
    visual: {
      cardBg: 'bg-[rgba(26,28,46,0.50)]',
      hoverGlow: 'group-hover:shadow-[0_0_50px_rgba(59,130,246,0.3)]',
      glow: 'rgba(59,130,246,0.28)'
    }
  },
  {
    id: 'logo-design',
    title: '個人商標與名片',
    subtitle: 'Logo & Business Card',
    category: 'Visual Design / Print',
    year: '2020 – 2025',
    description:
      '以女兒英文名 Kiki 與自身溫和如兔的個性為起點，將「K」字母與兔子造型融合，打造棠想視界的品牌標誌。2020 年初版採活潑的橙紅漸層，傳遞熱情與創造力；2025 年重新優化，以書法筆觸融合兔子側臉，褪去裝飾、保留神韻，讓品牌隨著設計者一同成長。',
    images: [
      {
        src: logoKiki2025,
        caption: '2025 優化版 Logo，書法筆觸融合兔子側臉，線條更精練，品牌氣質趨於沉穩。',
      },
      {
        src: logoKiki2025Brand,
        caption: '2025 品牌視覺完整呈現，霓虹光暈強化識別記憶點。',
      },
      {
        src: namecardKiki2020,
        caption: '2020 名片設計，正面 Logo 置中，背面以大 K 字裁切構圖，資訊層次分明。',
      },
      {
        src: logoKiki2020,
        caption: '2020 初版 Logo，K 字融合兔子造型，橙紅漸層傳遞熱情與活力。',
      },
      {
        src: logoKikiCoasterMockup,
        caption: 'Logo 應用延伸，燙印於杯墊 mockup，驗證圖形在實體物料上的耐用性。',
      },
    ],
    visual: {
      cardBg: 'bg-[rgba(46,26,46,0.50)]',
      hoverGlow: 'group-hover:shadow-[0_0_50px_rgba(168,85,247,0.3)]',
      glow: 'rgba(168,85,247,0.25)'
    }
  },
  {
    id: 'poster-flyer-design',
    title: '海報、傳單設計',
    subtitle: 'Poster and Flyer Design',
    category: 'Graphic Design / Print',
    year: '2025',
    description:
      '運用大膽的視覺語言與色彩對比，創造具有強烈識別度的平面設計作品。透過版面的節奏感與留白，引導觀者的視線流動，讓資訊層次清晰且富有美感。每一份設計都傳達出品牌或活動的獨特個性。',
    images: [
      { src: posterFlyerMain },
    ],
    visual: {
      cardBg: 'bg-[rgba(46,26,26,0.50)]',
      hoverGlow: 'group-hover:shadow-[0_0_50px_rgba(255,127,80,0.3)]',
      glow: 'rgba(255,127,80,0.3)'
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
