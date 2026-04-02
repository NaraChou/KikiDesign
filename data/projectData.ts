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
import logoKiki2025Brand from '../assets/images/logo-kiki-2025-brand.webp';
import logoKiki2020 from '../assets/images/logo-kiki-2020.webp';
import namecardKiki2020 from '../assets/images/namecard-kiki-2020.webp';
import namecardMockupConcrete from '../assets/images/namecard-kiki-2025-mockup-concrete.webp';
import namecardMockupFoam from '../assets/images/namecard-kiki-2025-mockup-foam.webp';
import logoKikiCoasterMockup from '../assets/images/logo-kiki-coaster-mockup.webp';
import posterRabbitBearRecruitment from '../assets/images/poster-rabbit-bear-recruitment.webp';
import posterRabbitBearOnsite from '../assets/images/poster-rabbit-bear-onsite.webp';
import edmBehaviorLogic from '../assets/images/edm-behavior-logic.webp';
import ecommerceHomeConvenience from '../assets/images/ecommerce-home-convenience-landscape.webp';
import ecommerceFemininePink from '../assets/images/ecommerce-feminine-pink-portrait.webp';
import ecommerceLuxuryGold from '../assets/images/ecommerce-luxury-gold-landscape.webp';
import practiceComp01 from '../assets/images/practice-comp-01.webp';
import practiceComp02 from '../assets/images/practice-comp-02.webp';
import practiceCompCloud from '../assets/images/practice-comp-cloud.webp';
import practiceCompElephant from '../assets/images/practice-comp-elephant.webp';
import practiceLabCover from '../assets/images/practice-lab-cover.webp';
import practiceLogoHejia from '../assets/images/practice-logo-hejia.webp';
import practiceIllustZodiac from '../assets/images/practice-illust-zodiac.webp';
import practiceIllustRabbit from '../assets/images/practice-illust-rabbit.webp';
import practiceFontLight from '../assets/images/practice-font-light.webp';
import practiceFontAudi from '../assets/images/practice-font-audi.webp';
import practiceUiCharacter from '../assets/images/practice-ui-character.webp';
import practiceUiGame from '../assets/images/practice-ui-game.webp';
import practiceLayoutDmFront from '../assets/images/practice-layout-dm-front.webp';
import practiceLayoutDmBack from '../assets/images/practice-layout-dm-back.webp';
import practiceLayoutCol2_01 from '../assets/images/practice-layout-col2-01.webp';
import practiceLayoutCol2_02 from '../assets/images/practice-layout-col2-02.webp';
import practiceLayoutCol3_01 from '../assets/images/practice-layout-col3-01.webp';
import practiceLayoutPoster01 from '../assets/images/practice-layout-poster-01.webp';
import practiceLayoutPoster02 from '../assets/images/practice-layout-poster-02.webp';


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
  caption?: string,       // 選填說明文字，有值才在 lightbox 顯示
  coverOnly?: boolean,    // true = 只用於首頁卡片封面，作品詳情頁不顯示
  practiceCategory?: string, // 練習專區分類標籤（如 'composition'、'ui'、'typography'...）
}

export interface ProjectData {
  id: string,
  title: string,
  subtitle: string,
  category: string,
  year: string,
  description: string,
  images: ProjectImage[],
  tabs?: string[],  // 選填，有值則啟用頁內標籤篩選（練習專區專用）
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
        src: namecardMockupConcrete,
        caption: '2025 名片正/反面，置於深黑底色，細邊框設計增添精緻感。',
      },
      {
        src: namecardMockupFoam,
        caption: '2025 名片正/反面，置於淺白底色，更增添視覺上的層次感。',
      },
      {
        src: logoKiki2025Brand,
        caption: '2025 優化版 Logo，書法筆觸融合兔子側臉，線條更精練，霓虹光暈強化識別記憶點。',
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
    id: 'poster-design',
    title: '海報設計',
    subtitle: 'Poster Design',
    category: 'Graphic Design / Print',
    year: '2025',
    // [中文註解] 本段敘述了視覺素材如何根據客戶、產業、溝通目的做出對應調整，強調設計因應不同品牌和目標的動態性，目的是讓畫面呈現「內容服務於視覺，視覺服務於溝通」的流動感
    description:
      '為不同產業客戶量身設計宣傳物料，根據品牌調性與目標受眾調整視覺語言。從親子教育機構的活潑招生海報，到身心靈課程的資訊型長圖 EDM，每一份設計都從溝通目的出發，讓視覺服務於內容。',
    images: [
      {
        src: posterRabbitBearRecruitment,
        caption: '親子工作室招生海報，以暖黃色調搭配卡通角色，傳遞親切感與活力，吸引目標客群注意。'
      },
      {
        src: posterRabbitBearOnsite,
        caption: '實際張貼於店面玻璃門，驗證設計在真實場景中的辨識度與視覺效果。'
      },
      {
        src: edmBehaviorLogic,
        caption: '身心靈課程宣傳長圖，資訊量大但層次分明，藍色主調呼應品牌識別，引導讀者視線由上至下流動。'
      }
    ],
    visual: {
      cardBg: 'bg-[rgba(46,26,26,0.50)]',
      hoverGlow: 'group-hover:shadow-[0_0_50px_rgba(255,127,80,0.3)]',
      glow: 'rgba(255,127,80,0.3)'
    }
  },
  // ...若有更多作品，請依此格式持續新增
  {
    id: 'ecommerce-visual-design',
    title: '電商視覺設計',
    subtitle: 'E-commerce Visual Design',
    category: 'Graphic Design / E-commerce',
    year: '2025',
    description:
      '同一產品、三種視覺語言——這是電商設計的核心挑戰。為精省便利館設計同款產品的多風格素材，從居家藍調的生活感、女性粉嫩的夢幻感，到質感精品的奢華感，用色彩、排版與氛圍精準對應不同受眾的購買心理。',
    images: [
      {
        src: ecommerceHomeConvenience,
        caption: '藍灰色調呈現生活實用感，版面清晰理性，訴求母嬰日用品的信賴感。',
      },
      {
        src: ecommerceFemininePink,
        caption: '粉色系搭配飄逸翅膀意象，營造夢幻輕盈氛圍，吸引女性消費者的情感共鳴。',
      },
      {
        src: ecommerceLuxuryGold,
        caption: '金色緞面背景強化精品感，舞台式產品陳列提升品牌價值感。',
      },
    ],
    visual: {
      cardBg: 'bg-[rgba(26,46,26,0.50)]',
      hoverGlow: 'group-hover:shadow-[0_0_50px_rgba(234,179,8,0.3)]',
      glow: 'rgba(234,179,8,0.3)',
    }
  },
  {
    id: 'practice-lab',
    title: '視覺實驗室',
    subtitle: 'Visual Lab',
    category: 'Practice / Experiment',
    year: '2020 – Now',
    description:
      '持續練習是設計師的核心修煉。這裡收錄各類視覺實驗與自主練習作品，橫跨影像合成、UI 設計、排版、字體、Logo 與插圖等領域，記錄每一次嘗試與突破的過程。',
    tabs: ['Logo', '插圖', '排版設計', '字體', '影像合成', 'UI'],
    images: [
      // 首頁卡片封面（待替換為專屬封面圖）
      { src: practiceLabCover, coverOnly: true },
      // 影像合成
      { src: practiceComp01, practiceCategory: '影像合成', caption: '武俠風格遊戲宣傳視覺合成，水墨氛圍與角色動態結合。' },
      { src: practiceComp02, practiceCategory: '影像合成', caption: '古塔入湖夜景合成，以冷調光線與水面倒影營造沉靜氛圍。' },
      { src: practiceCompCloud, practiceCategory: '影像合成', caption: '雲端奇幻場景合成，粉調光感與夢境意象的視覺敘事。' },
      { src: practiceCompElephant, practiceCategory: '影像合成', caption: '大象解構合成，以流沙粒子效果呈現自然與力量的張力。' },
      // Logo & 排版
      { src: practiceLogoHejia, practiceCategory: 'Logo', caption: '合家品牌識別設計：Mockup 應用與幾何標誌。' },
      { src: practiceLogoHejia, practiceCategory: '排版設計', caption: '品牌應用版式研究。' },
      // 字體系列
      { src: practiceFontAudi, practiceCategory: '字體', caption: '字體設計練習：Audi 視覺風格研究' },
      { src: practiceFontLight, practiceCategory: '字體', caption: 'PS 直播課：光效字體設計' },
      // 插圖系列
      { src: practiceIllustRabbit, practiceCategory: '插圖', caption: '插圖練習：兔子主題視覺' },
      { src: practiceIllustZodiac, practiceCategory: '插圖', caption: '插圖練習：12 星座系列設計' },
      // UI
      { src: practiceUiCharacter, practiceCategory: 'UI', caption: '遊戲 UI：萌系角色屬性介面設計。' },
      { src: practiceUiGame, practiceCategory: 'UI', caption: '遊戲場景與系統介面風格研究。' },
      // 排版設計 (Layout)
      { src: practiceLayoutDmFront, practiceCategory: '排版設計', caption: '三折頁 DM 設計：正面版面配置。' },
      { src: practiceLayoutDmBack, practiceCategory: '排版設計', caption: '三折頁 DM 設計：背面內容資訊排版。' },
      { src: practiceLayoutCol2_01, practiceCategory: '排版設計', caption: '雜誌版式：兩欄式圖文編排練習(01)。' },
      { src: practiceLayoutCol2_02, practiceCategory: '排版設計', caption: '雜誌版式：兩欄式圖文編排練習(02)。' },
      { src: practiceLayoutCol3_01, practiceCategory: '排版設計', caption: '資訊排版：三欄式結構化設計。' },
      { src: practiceLayoutPoster01, practiceCategory: '排版設計', caption: '海報設計：1MB 視覺實驗系列(01)。' },
      { src: practiceLayoutPoster02, practiceCategory: '排版設計', caption: '海報設計：1MB 視覺實驗系列(02)。' },
    ],
    visual: {
      cardBg: 'bg-[rgba(26,26,36,0.50)]',
      hoverGlow: 'group-hover:shadow-[0_0_50px_rgba(139,92,246,0.3)]',
      glow: 'rgba(139,92,246,0.3)',
    }
  },
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
