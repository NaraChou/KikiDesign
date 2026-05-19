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
      '為顧問品牌「Behavior Logic（行韋邏輯）」建立整體視覺識別，' +
      '從 Logo 重塑與名片設計延伸至官網介面與 EDM 視覺應用。' +
      '以藍色為主調，聚焦「理性、信任、專業」的品牌印象，' +
      '並依營運節奏完成官網改版，讓內容更新與版面調整更貼近課程推進，' +
      '在維持視覺一致的前提下，讓長期維運更輕鬆。',
    caseStudy: {
      problem: '顧問品牌初期缺乏一致識別，官網內容節奏與長期維運彈性不足。',
      goal: '建立可延展的品牌視覺系統，並讓線上內容更好配合課程推進。',
      solution: '重新設計 Logo 與視覺語言，並完成官網改版與版面節奏重整。',
      application: '應用於名片、官網、EDM、簡報等品牌接觸點。',
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
          '識別升級後，專業感與延展性同步提升。從圓章樣式重塑為心智圖像符號，建立雙藍主色系。',
      },
      {
        id: 'bl-namecard',
        src: brandingBehaviorLogicNamecard,
        caption:
          '名片成為品牌第一個實體接觸點。整合 QR、服務項目與舊版圓章識別排版。',
      },
      {
        id: 'bl-responsive',
        src: brandingResponsive,
        caption:
          '第一版官網先求上線與閱讀一致。以既有平台完成多裝置版面與內容節奏配置。',
      },
      {
        id: 'bl-dark-ui',
        src: brandingDarkUI,
        caption:
          '改版後降低平台限制並強化資訊層級。深色系介面延續識別色彩，版面層次更清楚。',
      },
      {
        id: 'bl-edm',
        src: edmBehaviorLogic,
        caption:
          '複雜課程資訊收斂為單欄行動閱讀。色塊分層 + 條列結構，導向報名重點。',
      },
      {
        id: 'bl-slide',
        src: aiSlideBehaviorLogic,
        caption:
          '顧問架構一頁視覺化，加速提案信任建立。半圓扇形資訊圖整合服務與講師背景。',
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
      '為 0–6 歲親子教育品牌「小兔熊」建立整體視覺識別，' +
      '從 Logo 設計延伸至名片、招生海報與實際展示應用，' +
      '透過暖色調與圓潤角色形象建立親和感，' +
      '並整合課程資訊、招生內容與 QR Code，提升品牌一致性與資訊閱讀效率。',
    caseStudy: {
      problem: '親子教育品牌缺乏一致視覺識別，招生資訊分散且接觸點不連貫。',
      goal: '建立兼具親和力與辨識度的品牌形象，讓家長快速理解課程與報名方式。',
      solution: '以兔子與熊角色建立核心識別，並延伸至招生海報與名片系統。',
      application: '應用於海報、名片、門市展示與社群導流。',
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
          '角色線條圓潤化，親和與辨識同步提升。手稿到 Illustrator 完稿，三維度策略對照。',
      },
      {
        id: 'rb-logo-spec',
        src: posterRabbitBearLogo,
        caption:
          '主色與字型規範落地，跨媒材一致。定義玫瑰/深棕主色、雙層標準字與灰階版。',
      },
      {
        id: 'rb-logo-round',
        src: posterRabbitBearLogoRound,
        caption:
          '主視覺一眼傳達課程情境與陪伴感。角色 + 課程象徵元素環繞圓形識別。',
      },
      {
        id: 'rb-namecard',
        src: posterRabbitBearNamecard,
        caption:
          '聯絡資訊層級清楚，延續海報色調。正反面分工：印象建立 + QR/社群導流。',
      },
      {
        id: 'rb-recruitment',
        src: posterRabbitBearRecruitment,
        caption:
          '招生重點無需讀全文即可掌握。彩色按鈕分類六項課程 + 三組 QR Code。',
      },
      {
        id: 'rb-onsite',
        src: posterRabbitBearOnsite,
        caption:
          '現場張貼驗證可讀性與識別度。門市玻璃門實際應用紀錄。',
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
      '以「傳承手作，獻禮心意」為核心，為小琉球合家麻花捲建立品牌識別與包裝系統提案。' +
      '從圓章式 Logo、五種口味色彩策略，到罐身與瓶蓋貼標的系列化規格，' +
      '在保留在地手作溫度的同時，提升貨架辨識與禮贈情境的整體質感。' +
      '本作品為品牌提案，聚焦視覺系統與商業陳列可行性。',
    caseStudy: {
      problem: '傳統伴手禮包裝缺乏系列辨識，口味資訊容易混亂。',
      goal: '建立兼具在地感與禮贈質感的品牌包裝系統。',
      solution: '以統一 Logo 架構搭配五色口味策略，建立系列化視覺規範。',
      application: '應用於罐身、瓶蓋貼標與陳列展示。',
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
          '在地手作與禮贈質感並重的識別核心。圓章邊框 + 書法「合家」+ homcha 英文標示。',
      },
      {
        id: 'hj-logo-mockup',
        src: hejiaLogoMockup,
        caption:
          '跨材質驗證識別一致性。名片、信封、木盒燙金延伸提案。',
      },
      {
        id: 'hj-pack-all',
        src: hejiaMockupAll,
        caption:
          '五口味系列化，貨架辨識效率提升。固定 Logo/品名/條紋骨架 + 底色分口味。',
      },
      {
        id: 'hj-cap-all',
        src: hejiaCapMockupAll,
        caption:
          '瓶蓋延續罐身五色策略。圓標確保陳列與禮盒情境皆可辨識。',
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
      '收錄影像合成、字體設計與 UI 介面等自主練習作品，' +
      '聚焦於光影氛圍、材質表現、資訊層級與互動介面的視覺探索。' +
      '透過不同媒材的持續實驗，累積畫面控制與風格轉譯能力。',
    caseStudy: {
      problem: '單一商業案無法完整呈現跨媒材視覺能力。',
      goal: '補強影像、字體與介面三類核心基礎能力，建立穩定輸出。',
      solution: '以主題化練習拆解光影、材質、排版與互動元件等視覺課題。',
      application: '反哺品牌案與 UI 專案中的構圖、層級與風格控制。',
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
          '武俠氛圍與角色張力強化宣傳視覺。水墨煙霧特效結合角色動態，以明暗對比堆疊緊張感。',
      },
      {
        id: 'pl-comp-02',
        src: practiceComp02,
        practiceCategory: '影像合成',
        caption:
          '冷調夜景的空間沉靜感。多圖層光影融合與水面倒影模擬。',
      },
      {
        id: 'pl-comp-elephant',
        src: practiceCompElephant,
        practiceCategory: '影像合成',
        caption:
          '解構美學探索自然生命力。以流沙消散效果呈現主體，營造壯闊與脆弱並存的視覺張力。',
      },

      // ── 字體 ──────────────────────────────────────────────
      {
        id: 'pl-font-audi',
        src: practiceFontAudi,
        practiceCategory: '字體',
        caption:
          '車燈格紋材質轉化為字體語言，金屬光感呼應品牌高規格調性。',
      },

      // ── UI ────────────────────────────────────────────────
      {
        id: 'pl-ui-game',
        src: practiceUiGame,
        practiceCategory: 'UI',
        caption:
          '遊戲設定彈窗資訊層級清楚，操作路徑直覺。圓角餅乾色系搭配奇幻場景，維持沉浸感又不失易讀性。',
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
      '以 AI 工具情境為主題，練習資訊視覺化與操作流程設計。' +
      '從家庭財務、數字分析到教育應用，' +
      '探索複雜資訊在數位介面中的閱讀效率與互動體驗。',
    caseStudy: {
      problem: 'AI 工具常見資訊密度高、操作門檻高，使用者容易迷失。',
      goal: '降低理解成本，讓使用者快速完成輸入、閱讀與決策。',
      solution: '以表單分層、數據視覺化與任務導向版面優化操作流程。',
      application: '應用於財務分析、數字工具與教育情境的介面設計。',
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
