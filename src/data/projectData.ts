// src/data/projectData.ts
/**
 * ▍資料單一來源
 * - 純靜態資料，不含排版、寬度、樣式邏輯
 * - 所有作品統一資料結構，欄位分組排列
 *
 * ▍2026.05 最終結構
 * 首頁顯示 4 個專案（projectsList 前4筆）：
 *   1. personal-branding      品牌視覺建置｜Behavior Logic
 *   2. rabbit-bear            品牌視覺設計｜小兔熊
 *   3. hejia-branding         品牌識別提案｜合家小食屋
 *   4. practice-lab           Visual Lab｜設計練習
 *
 * 隱藏路由（保留，可從 Footer / About 連結）：
 *   - kikidesign-identity     KikiDesign 品牌識別
 *   - ai-lab                  AI 數位效率實驗室
 */

// ── Behavior Logic 品牌視覺建置 ─────────────────────────────
import brandingDarkUI           from '../assets/images/branding-dark-ui-landing.webp';
import brandingMockupMain       from '../assets/images/branding-mockup-main.webp';
import brandingResponsive       from '../assets/images/branding-responsive-showcase.webp';
import brandingBehaviorLogicLogo     from '../assets/images/branding-behavior-logic-logo.webp';
import brandingBehaviorLogicNamecard from '../assets/images/branding-behavior-logic-namecard.webp';
import edmBehaviorLogic         from '../assets/images/edm-behavior-logic.webp';
import aiSlideBehaviorLogic     from '../assets/images/ai-slide-behavior-logic.webp';

// ── 小兔熊 品牌視覺設計 ──────────────────────────────────────
import posterMockupMain         from '../assets/images/poster-mockup-main.webp';
import posterRabbitBearLogo     from '../assets/images/poster-rabbit-bear-logo.webp';
import posterRabbitBearStrategyCompare from '../assets/images/poster-rabbit-bear-strategy-compare.webp';
import posterRabbitBearNamecard from '../assets/images/poster-rabbit-bear-namecard.webp';
import posterRabbitBearRecruitment from '../assets/images/poster-rabbit-bear-recruitment.webp';
import posterRabbitBearOnsite   from '../assets/images/poster-rabbit-bear-onsite.webp';
import posterRabbitBearLogoRound from '../assets/images/poster-rabbit-bear-logo-round.webp';

// ── 小琉球合家麻花捲 品牌識別提案 ──────────────────────────────────
import hejiaLogo                from '../assets/images/hojia_logo.webp';
import hejiaLogoMockup          from '../assets/images/hojia_logo_mockup.webp';
import hejiaCapMockupAll        from '../assets/images/hojia_cap_mockup_all.webp';
import hejiaMockupAll           from '../assets/images/hojia_mockup_all.webp';
import hejiaDisplayMockup       from '../assets/images/hojia_display_mockup.webp';

// ── 設計練習｜Visual Lab ─────────────────────────────────────
// 影像合成
import practiceComp01           from '../assets/images/practice-comp-01.webp';
import practiceComp02           from '../assets/images/practice-comp-02.webp';
import practiceCompElephant     from '../assets/images/practice-comp-elephant.webp';
// 字體
import practiceFontAudi         from '../assets/images/practice-font-audi.webp';
// UI
import practiceUiGame           from '../assets/images/practice-ui-game.webp';

// ── 隱藏路由：KikiDesign 個人商標 ────────────────────────────
import logoKiki2025Brand        from '../assets/images/logo-kiki-2025-brand.webp';
import logoKiki2020             from '../assets/images/logo-kiki-2020.webp';
import namecardKiki2020         from '../assets/images/namecard-kiki-2020.webp';
import namecardMockupConcrete   from '../assets/images/namecard-kiki-2025-mockup-concrete.webp';
import namecardMockupFoam       from '../assets/images/namecard-kiki-2025-mockup-foam.webp';
import logoKikiCoasterMockup    from '../assets/images/logo-kiki-coaster-mockup.webp';

// ── 隱藏路由：AI 數位效率實驗室 ──────────────────────────────
import aiLabCover               from '../assets/images/ai-lab-cover.webp';
import aiToolAccounting         from '../assets/images/ai-tool-accounting.webp';
import aiToolFortune            from '../assets/images/ai-tool-fortune.webp';

// ════════════════════════════════════════════════════════════
// 型別定義
// ════════════════════════════════════════════════════════════
export interface ProjectLinks {
  live?: string;
  github?: string;
}

/** 三裝置截圖預留結構（路徑待補，不憑空造圖） */
export interface DeviceScreenshots {
  mobile?: string;
  tablet?: string;
  desktop?: string;
}

export interface ProjectImage {
  id: string;
  src: string;
  caption?: string;
  coverOnly?: boolean;
  practiceCategory?: string;
}

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  team?: string[];
  links?: ProjectLinks;
  technicalNotes?: string[];
  deviceScreenshots?: DeviceScreenshots;
  caseStudy?: {
    problem: string;
    goal: string;
    solution: string;
    application: string;
    style?: string;
  };
  responsibility?: string[];
  tools?: string[];
  outcomes?: string[];
  process?: string[];
  meta?: {
    duration?: string;
    type?: string;
    status?: string;
  };
  images: ProjectImage[];
  aspectRatio: string;
  tabs?: string[];
  visual: {
    cardBg: string;
    hoverGlow: string;
    glow: string;
  };
}

// ════════════════════════════════════════════════════════════
// 主資料陣列（唯一來源）
// ════════════════════════════════════════════════════════════
export const projectsList: ProjectData[] = [

  // ══════════════════════════════════════════════════════════
  // 1｜品牌視覺建置｜Behavior Logic（主力）
  // ══════════════════════════════════════════════════════════
  {
    id: 'personal-branding',
    title: '品牌視覺建置｜Behavior Logic',
    subtitle: '顧問品牌形象規劃 × Logo × 名片 × 網站 × EDM',
    category: 'Brand Identity / Website / EDM',
    year: '2024 – 2025',
    description:
      '整合 Logo、名片、官網與 EDM，建立顧問品牌一致視覺。' +
      '以雙藍色系與清楚版面提升專業感，讓後續宣傳素材更容易延伸。',
    caseStudy: {
      problem: '顧問品牌初期缺乏一致識別，官網內容節奏與長期維運彈性不足。',
      goal: '建立可延展的品牌視覺系統，並讓線上內容更好配合課程推進。',
      solution: '重新設計 Logo 與視覺語言，並完成官網改版與版面節奏重整。',
      application: '應用於名片、官網、EDM、簡報等品牌接觸點。',
      style: '理性、專業、乾淨的雙藍視覺語言。',
    },
    responsibility: [
      '品牌識別設計',
      '網站介面與版面規劃',
      '網頁視覺落地與多裝置閱讀節奏',
      'EDM 視覺設計',
    ],
    tools: ['Illustrator', 'Photoshop', 'Figma', '網頁視覺製作'],
    outcomes: [
      '各接觸點改以同一套色票與字級說話，品牌第一印象更一致。',
      '官網改版後版面可依課程節奏調整，內容更新更順手。',
      'EDM 與簡報版型可沿用，活動宣傳的製作時間明顯縮短。',
    ],
    process: [
      '品牌現況盤點與痛點釐清',
      '識別方向與色彩策略定義',
      '官網資訊層級與版面設計',
      '多接觸點應用與交付檢核',
    ],
    team: ['獨立承接（品牌與網頁視覺）', '客戶端：Behavior Logic 顧問團隊'],
    links: {},
    technicalNotes: [
      '舊站內容與識別節奏較分散，改版後改以同一套主視覺與字級規範貫穿官網與 EDM。',
      '新版官網延續品牌藍調與資訊層級，閱讀動線更清楚，亦方便後續換圖與換文案。',
      '手機、平板到桌機的版面會自動重排，維持舒適的閱讀節奏（見多裝置展示圖）。',
    ],
    deviceScreenshots: {},
    meta: {
      duration: '約 6 個月（分階段）',
      type: '商業委託',
      status: '已上線／持續使用',
    },
    images: [
      { id: 'bl-cover', src: brandingMockupMain, coverOnly: true },
      {
        id: 'bl-logo-ba',
        src: brandingBehaviorLogicLogo,
        caption:
          '識別升級後，品牌更專業也更好延展。' +
          '從圓章樣式重塑為心智圖像符號，並建立雙藍主色系。',
      },
      {
        id: 'bl-namecard',
        src: brandingBehaviorLogicNamecard,
        caption:
          '名片成為品牌第一個實體接觸點。' +
          '整合 QR 與服務資訊，維持識別一致性。',
      },
      {
        id: 'bl-responsive',
        src: brandingResponsive,
        caption:
          '第一版官網以快速上線與清楚閱讀為優先。' +
          '完成多裝置版面配置，維持內容節奏一致。',
      },
      {
        id: 'bl-dark-ui',
        src: brandingDarkUI,
        caption:
          '改版後降低平台限制並強化資訊層級。' +
          '延續深藍識別語言，讓版面重點更清楚。',
      },
      {
        id: 'bl-edm',
        src: edmBehaviorLogic,
        caption:
          '複雜課程資訊收斂成手機友善版面。' +
          '用色塊分層與條列結構，快速導向報名重點。',
      },
      {
        id: 'bl-slide',
        src: aiSlideBehaviorLogic,
        caption:
          '顧問架構以一頁圖像化呈現，更快建立信任。' +
          '半圓資訊圖整合講師背景與服務重點。',
      },
    ],
    aspectRatio: '16/9',
    visual: {
      cardBg: 'bg-[rgba(26,28,46,0.50)]',
      hoverGlow: 'group-hover:shadow-[0_0_50px_rgba(59,130,246,0.3)]',
      glow: 'rgba(59,130,246,0.28)',
    },
  },

  // ══════════════════════════════════════════════════════════
  // 2｜品牌視覺設計｜小兔熊（次主力）
  // ══════════════════════════════════════════════════════════
  {
    id: 'rabbit-bear',
    title: '品牌視覺設計｜小兔熊',
    subtitle: '幼兒教育品牌 × Logo × 海報 × 名片 × 落地應用',
    category: 'Brand Identity / Print',
    year: '2023',
    description:
      '完成 Logo、名片、招生海報與門市展示，建立完整親子品牌識別。' +
      '以暖色與角色化設計提高親和力，並讓招生資訊更好閱讀。',
    caseStudy: {
      problem: '親子教育品牌缺乏一致視覺識別，招生資訊分散且接觸點不連貫。',
      goal: '建立兼具親和力與辨識度的品牌形象，讓家長快速理解課程與報名方式。',
      solution: '以兔子與熊角色建立核心識別，並延伸至招生海報與名片系統。',
      application: '應用於海報、名片、門市展示與社群導流。',
      style: '暖色、圓潤、親和的親子教育視覺調性。',
    },
    responsibility: [
      '品牌識別設計',
      '印刷物版面規劃',
      '招生資訊視覺整合',
      '門市落地應用確認',
    ],
    tools: ['Illustrator', 'Photoshop', 'InDesign'],
    outcomes: [
      'Before：招生資訊分散、視覺不統一；After：海報、名片、門市展示共用角色與色票系統。',
      '家長在 3 秒內可掌握課程分類與 QR 報名入口，降低現場詢問成本。',
      '門市實際張貼驗證可讀性，遠距離仍可辨識品牌角色與主色。',
    ],
    process: [
      '品牌現況與受眾分析',
      '角色識別與色彩系統定義',
      '招生內容資訊分層與版面測試',
      '印刷輸出與現場應用檢核',
    ],
    team: ['獨立承接（品牌與印刷設計）', '客戶端：小兔熊親子教育'],
    links: {},
    meta: {
      duration: '約 1.5 個月',
      type: '商業委託',
      status: '已落地使用',
    },
    images: [
      { id: 'rb-cover', src: posterMockupMain, coverOnly: true },
      {
        id: 'rb-strategy',
        src: posterRabbitBearStrategyCompare,
        caption:
          '角色線條圓潤化，親和感與辨識度同步提升。' +
          '從手稿到完稿，對照三個核心策略方向。',
      },
      {
        id: 'rb-logo-spec',
        src: posterRabbitBearLogo,
        caption:
          '主色與字型規範落地，跨媒材視覺更一致。' +
          '定義主色、標準字與灰階版本，方便後續延伸。',
      },
      {
        id: 'rb-logo-round',
        src: posterRabbitBearLogoRound,
        caption:
          '主視覺一眼傳達親子課程與陪伴感。' +
          '角色搭配課程元素，完整包進圓形識別。',
      },
      {
        id: 'rb-namecard',
        src: posterRabbitBearNamecard,
        caption:
          '名片資訊層級清楚，延續整體暖色調。' +
          '正反面分工呈現品牌印象與聯絡導流。',
      },
      {
        id: 'rb-recruitment',
        src: posterRabbitBearRecruitment,
        caption:
          '招生重點不用讀全文也能快速掌握。' +
          '以課程分區與 QR 導流提升閱讀效率。',
      },
      {
        id: 'rb-onsite',
        src: posterRabbitBearOnsite,
        caption:
          '現場張貼後仍保有清楚可讀性與辨識度。' +
          '門市實際應用驗證設計可落地。',
      },
    ],

    aspectRatio: '3/4',

    visual: {
      cardBg: 'bg-[rgba(46,36,16,0.50)]',
      hoverGlow: 'group-hover:shadow-[0_0_50px_rgba(255,180,50,0.3)]',
      glow: 'rgba(255,180,50,0.3)',
    },
  },

  // ══════════════════════════════════════════════════════════
  // 3｜品牌識別提案｜小琉球合家麻花捲
  // ══════════════════════════════════════════════════════════
  {
    id: 'hejia-branding',
    title: '品牌識別提案｜小琉球合家麻花捲',
    subtitle: '在地伴手禮品牌 × Logo × 包裝標籤 × 口味系統 × 陳列應用',
    category: 'Brand Identity / Packaging',
    year: '2018',
    description:
      '提出在地伴手禮品牌的識別與包裝系統。' +
      '以統一骨架搭配五色口味策略，兼顧系列感與貨架辨識。',
    caseStudy: {
      problem: '傳統伴手禮包裝缺乏系列辨識，口味資訊容易混亂。',
      goal: '建立兼具在地感與禮贈質感的品牌包裝系統。',
      solution: '以統一 Logo 架構搭配五色口味策略，建立系列化視覺規範。',
      application: '應用於罐身、瓶蓋貼標與陳列展示。',
      style: '在地手作感結合禮贈質感，溫暖且易辨識。',
    },
    responsibility: [
      '品牌識別提案',
      '包裝系統規劃',
      '口味色彩策略設計',
      '情境陳列視覺提案',
    ],
    tools: ['Illustrator', 'Photoshop'],
    outcomes: [
      'Before：口味資訊易混淆、包裝缺乏系列感；After：五色策略＋固定骨架，貨架 2 秒可辨口味。',
      '新品口味僅需替換底色與文案，降低包裝延伸設計成本。',
      '提案含陳列 Mockup，可直接用於商業簡報與禮贈情境說明。',
    ],
    process: [
      '市場品類視覺盤點',
      '品牌語彙與識別骨架建立',
      '口味系統與包裝版型延展',
      '陳列情境模擬與提案呈現',
    ],
    team: ['課程／提案專案（個人執行）'],
    links: {},
    meta: {
      duration: '約 1 個月',
      type: '品牌提案',
      status: '提案完成',
    },
    images: [
      { id: 'hj-cover', src: hejiaDisplayMockup, coverOnly: true },
      {
        id: 'hj-logo',
        src: hejiaLogo,
        caption:
          '識別核心同時傳達在地手作感與禮贈質感。' +
          '以圓章結構搭配書法字建立品牌記憶點。',
      },
      {
        id: 'hj-logo-mockup',
        src: hejiaLogoMockup,
        caption:
          '跨材質應用後仍維持識別一致。' +
          '名片、信封與木盒燙金同步延伸。',
      },
      {
        id: 'hj-pack-all',
        src: hejiaMockupAll,
        caption:
          '五口味系列化後，貨架辨識更快速。' +
          '固定包裝骨架搭配底色分味，兼顧一致與差異。',
      },
      {
        id: 'hj-cap-all',
        src: hejiaCapMockupAll,
        caption:
          '瓶蓋延續罐身五色策略，系列感更完整。' +
          '圓形貼標讓陳列與禮盒情境都好辨識。',
      },
    ],
    aspectRatio: '16/9',
    visual: {
      cardBg: 'bg-[rgba(46,26,16,0.50)]',
      hoverGlow: 'group-hover:shadow-[0_0_50px_rgba(220,120,40,0.3)]',
      glow: 'rgba(220,120,40,0.3)',
    },
  },

  // ══════════════════════════════════════════════════════════
  // 4｜Visual Lab｜設計練習（收尾）
  // ══════════════════════════════════════════════════════════
  {
    id: 'practice-lab',
    title: 'Visual Exploration｜視覺研究',
    subtitle: '聚焦光影、材質與 UI 結構的視覺實驗',
    category: 'Practice / Experiment',
    year: '2017 – 2026',
    description:
      '收錄影像、字體與 UI 的視覺研究，' +
      '用不同題目持續訓練畫面控制與風格轉譯能力。',
    caseStudy: {
      problem: '單一商業案無法完整呈現跨媒材視覺能力。',
      goal: '補強影像、字體與介面三類核心基礎能力，建立穩定輸出。',
      solution: '以主題化練習拆解光影、材質、排版與互動元件等視覺課題。',
      application: '反哺品牌案與 UI 專案中的構圖、層級與風格控制。',
      style: '以氛圍、材質與層級為核心的實驗式視覺語言。',
    },
    responsibility: ['自主研究專案規劃', '視覺實驗執行', '版面與風格驗證'],
    tools: ['Photoshop', 'Illustrator', 'Figma'],
    outcomes: [
      '建立跨媒材視覺語彙，提升商業案的畫面控制穩定性。',
      '累積可重用的光影、材質與 UI 元件設計方法。',
    ],
    process: ['主題定義', '風格拆解', '視覺實驗', '回收至商業專案'],
    team: ['個人自主研究'],
    links: {
      live: 'https://kiki-design.vercel.app/',
    },
    meta: {
      duration: '長期持續',
      type: '自主研究',
      status: '持續更新',
    },
    tabs: ['影像合成', '字體', 'UI'],
    images: [

      // ── 影像合成 ──────────────────────────────────────────
      {
        id: 'pl-comp-01',
        src: practiceComp01,
        practiceCategory: '影像合成',
        caption:
          '以武俠氛圍強化角色宣傳張力。' +
          '透過水墨煙霧與明暗對比堆疊視覺節奏。',
      },
      {
        id: 'pl-comp-02',
        src: practiceComp02,
        practiceCategory: '影像合成',
        caption:
          '冷調夜景呈現沉靜而神祕的空間感。' +
          '以多圖層光影融合與倒影模擬完成畫面。',
      },
      {
        id: 'pl-comp-elephant',
        src: practiceCompElephant,
        practiceCategory: '影像合成',
        caption:
          '以解構手法探索自然生命力。' +
          '流沙消散效果呈現壯闊與脆弱並存的張力。',
      },

      // ── 字體 ──────────────────────────────────────────────
      {
        id: 'pl-font-audi',
        src: practiceFontAudi,
        practiceCategory: '字體',
        caption:
          '將車燈格紋材質轉化為字體語言。' +
          '金屬光感呼應高規格品牌調性。',
      },

      // ── UI ────────────────────────────────────────────────
      {
        id: 'pl-ui-game',
        src: practiceUiGame,
        practiceCategory: 'UI',
        caption:
          '遊戲設定彈窗維持清楚層級與直覺操作。' +
          '柔和色系搭配奇幻背景，兼顧沉浸感與易讀性。',
      },
    ],
    aspectRatio: '16/9',
    visual: {
      cardBg: 'bg-[rgba(26,26,36,0.50)]',
      hoverGlow: 'group-hover:shadow-[0_0_50px_rgba(139,92,246,0.3)]',
      glow: 'rgba(139,92,246,0.3)',
    },
  },

  // ══════════════════════════════════════════════════════════
  // ★ 隱藏路由：首頁不顯示，路由可訪問
  //   可從 Footer 或 About 頁加連結
  // ══════════════════════════════════════════════════════════

  // ── KikiDesign 品牌識別 ────────────────────────────────
  {
    id: 'kikidesign-identity',
    title: 'KikiDesign 品牌識別',
    subtitle: '個人品牌演化 × 名片設計 × 印刷應用',
    category: 'Self Branding / Identity',
    year: '2020 – 2025',
    description:
      'KikiDesign 個人品牌識別演化紀錄。' +
      '從 2020 年的橘色系 K 字兔造型，' +
      '到 2025 年重新設計的書法感兔形識別，' +
      '逐步建立更成熟的品牌語言與視覺個性。' +
      '作品涵蓋 Logo 演進、名片設計與實體印刷 Mockup，' +
      '呈現個人品牌在不同階段的識別思考與應用延展。',
    caseStudy: {
      problem: '初期品牌識別偏可愛風格，難以對應後期接案方向。',
      goal: '建立更成熟、可長期延展的個人品牌語言。',
      solution: '重新設計 Logo 與色彩系統，調整品牌調性與識別細節。',
      application: '延伸至名片、杯墊與品牌印刷物。',
    },
    responsibility: ['個人品牌策略', 'Logo 迭代設計', '印刷物應用設計'],
    tools: ['Illustrator', 'Photoshop', 'InDesign'],
    outcomes: [
      '品牌調性由早期可愛風格轉為可承接商業案的成熟視覺。',
      '建立可長期延伸的識別系統與印刷應用基準。',
    ],
    process: ['舊版識別檢視', '新定位定義', 'Logo 迭代', '印刷應用驗證'],
    team: ['個人品牌（獨立執行）'],
    links: {
      live: 'https://kiki-design.vercel.app/',
    },
    meta: {
      duration: '多階段（2020–2025）',
      type: '自有品牌',
      status: '持續使用',
    },
    images: [
      { id: 'kk-cover', src: namecardMockupConcrete, coverOnly: true },
      {
        id: 'kk-logo-2025',
        src: logoKiki2025Brand,
        caption: '識別調性轉向成熟商用。書法感 R 字 + 兔側臉，深色系。',
      },
      {
        id: 'kk-logo-2020',
        src: logoKiki2020,
        caption: '早期親和形象建立市場入口。橘色 K 字兔，適合初期接觸。',
      },
      {
        id: 'kk-namecard-concrete',
        src: namecardMockupConcrete,
        caption: '黑底印刷對比度實測。水泥板 Mockup 驗證 Logo 材質表現。',
      },
      {
        id: 'kk-namecard-foam',
        src: namecardMockupFoam,
        caption: '不同背景質感下的辨識確認。泡棉板 Mockup 對照測試。',
      },
      {
        id: 'kk-namecard-2020',
        src: namecardKiki2020,
        caption: '識別系統延伸至名片接觸點。橘系版面 + 正反面聯絡資訊配置。',
      },
      {
        id: 'kk-coaster',
        src: logoKikiCoasterMockup,
        caption: '日常物件延展品牌能見度。杯墊 Mockup 檢視小尺寸識別。',
      },
    ],
    aspectRatio: '3/4',
    visual: {
      cardBg: 'bg-[rgba(36,16,16,0.50)]',
      hoverGlow: 'group-hover:shadow-[0_0_50px_rgba(200,80,60,0.3)]',
      glow: 'rgba(200,80,60,0.3)',
    },
  },

  // ── AI 數位效率實驗室 ────────────────────────────────────
  {
    id: 'ai-lab',
    title: 'AI 數位效率實驗室',
    subtitle: 'AI 工具介面 × 資訊視覺化 × 使用流程設計',
    category: 'AI Application / UI Design',
    year: '2025 – 2026',
    description:
      '以 AI 協作輔助設計發想與版面提案，聚焦工具介面的視覺編排。' +
      '重點在讓資訊更清楚、流程更直覺。',
    caseStudy: {
      problem: 'AI 工具常見資訊密度高、操作門檻高，使用者容易迷失。',
      goal: '降低理解成本，讓使用者快速完成輸入、閱讀與決策。',
      solution: '以表單分層、數據視覺化與任務導向版面優化操作流程。',
      application: '應用於財務分析、數字工具與教育情境的介面設計。',
      style: '清楚、直覺、以資訊可讀性為優先的數位版面。',
    },
    responsibility: [
      'UI 介面規劃',
      '資訊層級設計',
      '操作流程定義',
      '視覺化元件設計',
    ],
    tools: ['Figma', 'Illustrator', 'Photoshop', '介面視覺原型'],
    outcomes: [
      '複雜資訊改為任務導向版面後，閱讀與操作路徑更清楚。',
      '建立可複用的 AI 工具介面樣式與資訊視覺化模式。',
    ],
    process: [
      '使用情境定義',
      '欄位與資訊架構規劃',
      'Wireframe 到高擬真介面迭代',
      '流程驗證與樣式收斂',
    ],
    team: ['個人 UI 研究'],
    links: {},
    meta: {
      duration: '約 2–4 週／每個題目',
      type: '概念驗證 + 實作練習',
      status: '持續迭代',
    },
    images: [
      { id: 'ai-cover', src: aiLabCover, coverOnly: true },
      {
        id: 'ai-finance',
        src: aiToolAccounting,
        caption:
          '收支結構一眼掌握，降低查找成本。圓餅圖 + 數字層級的 Family Finance UI。',
      },
      {
        id: 'ai-fortune',
        src: aiToolFortune,
        caption:
          '輸入流程精簡，完成分析更順。表單分層的行韋邏輯工具介面。',
      },
    ],
    aspectRatio: '16/9',
    visual: {
      cardBg: 'bg-[rgba(16,26,36,0.50)]',
      hoverGlow: 'group-hover:shadow-[0_0_50px_rgba(0,200,180,0.25)]',
      glow: 'rgba(0,200,180,0.25)',
    },
  },

];

// ════════════════════════════════════════════════════════════
// 查詢用（id → ProjectData）
// ════════════════════════════════════════════════════════════
export const projectsRecord: Record<string, ProjectData> = Object.fromEntries(
  projectsList.map(proj => [proj.id, proj])
);
