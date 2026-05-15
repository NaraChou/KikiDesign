// src/data/projectData.ts
/**
 * ▍資料單一來源
 * - 純靜態資料，不含排版、寬度、樣式邏輯
 * - 所有作品統一資料結構，欄位分組排列
 *
 * ▍2026.05 最終結構
 * 首頁顯示 4 個專案（projectsList 前4筆）：
 *   1. personal-branding  品牌視覺建置｜Behavior Logic
 *   2. rabbit-bear        品牌視覺設計｜小兔熊
 *   3. hejia-branding     品牌識別提案｜合家小食屋
 *   4. practice-lab       設計練習｜Redesign & Lab
 *
 * 隱藏路由（保留，可從 Footer / About 連結）：
 *   - logo-design         個人商標與名片｜KikiDesign
 *   - ai-lab              AI 數位效率實驗室
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
// 待備：hejia-label-original.webp / hejia-label-seaweed.webp
//       hejia-label-blacksugar.webp / hejia-label-condensedmilk.webp / hejia-label-strawberry.webp

// ── 設計練習｜Redesign & Lab ─────────────────────────────────
import practiceLabCover         from '../assets/images/practice-lab-cover.webp';
// Redesign
import brandingUiEducationApp   from '../assets/images/branding-ui-education-app.webp';
// 影像合成
import practiceComp01           from '../assets/images/practice-comp-01.webp';
import practiceComp02           from '../assets/images/practice-comp-02.webp';
import practiceCompCloud        from '../assets/images/practice-comp-cloud.webp';
import practiceCompElephant     from '../assets/images/practice-comp-elephant.webp';
// 字體
import practiceFontAudi         from '../assets/images/practice-font-audi.webp';
import practiceFontLight        from '../assets/images/practice-font-light.webp';
// UI
import practiceUiCharacter      from '../assets/images/practice-ui-character.webp';
import practiceUiGame           from '../assets/images/practice-ui-game.webp';
// Logo
import ecommerceJingshengLogo   from '../assets/images/ecommerce-jingsheng-logo.webp';

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
import brandingUiEducationAppAI from '../assets/images/branding-ui-education-app.webp';

// ════════════════════════════════════════════════════════════
// 型別定義
// ════════════════════════════════════════════════════════════
export interface ProjectImage {
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
      '並依據實際營運需求完成 Wix 到自建版本的網站升級，' +
      '在維持視覺品質下同步降低長期平台成本。',
    images: [
      { src: brandingMockupMain, coverOnly: true },
      {
        src: brandingBehaviorLogicLogo,
        caption:
          '品牌 Logo 重塑：以 Before / After 對照呈現識別優化過程，從原有圓章樣式轉為心智圖像符號，並建立雙藍主色系（#114DA0 / #44ADE0），強化辨識度與專業形象。',
      },
      {
        src: brandingBehaviorLogicNamecard,
        caption:
          '品牌名片設計（舊版 Logo 時期）：以圓章識別為基礎，整合顧問姓名、服務項目與 QR Code，' +
          '建立初期品牌與客戶之間的第一個實體接觸點。',
      },
      {
        src: brandingResponsive,
        caption:
          '官網第一版（Wix）：配合品牌快速上線需求，在 Wix 平台完成響應式網站建置，' +
          '兼顧桌機、平板與手機三個斷點的閱讀節奏與視覺一致性。',
      },
      {
        src: brandingDarkUI,
        caption:
          '官網第二版（自建）：因應客戶實際營運需求，從 Wix 遷移至自建版本。' +
          '以深色系強化專業感與資訊層級，在維持視覺品質的前提下同步降低長期平台成本。',
      },
      {
        src: edmBehaviorLogic,
        caption:
          '課程宣傳 EDM：將「生命靈數、數字 DNA、易學八卦」三個複雜概念整合進單一直式版面，' +
          '以色塊與條列結構區分重點層次，提升手機閱讀效率與報名轉換引導。',
      },
      {
        src: aiSlideBehaviorLogic,
        caption:
          '品牌簡報視覺：以半圓扇形資訊圖整合講師背景、職業歷程、服務項目與品牌核心價值，' +
          '將複雜的顧問品牌架構一頁視覺化，協助在提案與課程說明中快速建立信任感。',
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
    images: [
      { src: posterMockupMain, coverOnly: true },
      {
        src: posterRabbitBearStrategyCompare,
        caption:
          '設計前後對照／品牌策略分析：從手稿概念到 Adobe Illustrator 數位完稿，' +
          '以「親和度、識別度、延展性」三個維度驅動設計決策。' +
          '將原本較生硬的線條轉化為圓潤色塊，建立獨特的品牌記憶點，' +
          '並確保角色在名片、海報等不同媒材上皆能清楚呈現。',
      },
      {
        src: posterRabbitBearLogo,
        caption:
          '品牌識別規範：定義品牌主色（玫瑰 #ED5D7F、深棕 #5C4E3D、粉、黑）、' +
          '字型層級（小兔熊／親子工作室雙層標準字）與灰階版本，' +
          '建立品牌在不同媒材與背景下的視覺一致性基準。',
      },
      {
        src: posterRabbitBearLogoRound,
        caption:
          '品牌主視覺 Logo：以兔子與熊作為核心角色，搭配愛心傳達陪伴與互動的品牌個性。' +
          '外圍環繞積木、音符、拼圖、幼苗等元素，對應感統遊戲、音樂律動、教具操作、親子手作等課程內容，' +
          '讓家長一眼感受品牌的教育情境。',
      },
      {
        src: posterRabbitBearNamecard,
        caption:
          '品牌名片設計：正面以角色主視覺建立第一印象，' +
          '背面整合老師姓名、電話、社群帳號與 QR Code，資訊層次由主到次清楚排列，' +
          '延續海報的暖黃色調維持整體品牌一致性。',
      },
      {
        src: posterRabbitBearRecruitment,
        caption:
          '招生主視覺海報：在單一版面整合三個社群 QR Code、招生對象說明與六項課程資訊。' +
          '以彩色按鈕區分課程類別，讓家長不需閱讀全文即可快速掌握重點，' +
          '角色主視覺與暖黃底色強化親子氛圍與視覺吸引力。',
      },
      {
        src: posterRabbitBearOnsite,
        caption:
          '實際落地應用：海報於門市玻璃門展示使用，' +
          '驗證版面在真實環境中的識別度與視覺效果。' +
          '是本作品集中唯一有現場使用紀錄的印刷品。',
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
    images: [
      { src: hejiaDisplayMockup, coverOnly: true },
      {
        src: hejiaLogo,
        caption:
          '品牌 Logo 設計提案：以傳統迴紋邊框為外框，融合雲紋圖騰與「手工」字樣，' +
          '核心以書法風「合家」二字傳遞家的溫度，' +
          '並標註品牌英文名「homcha」與產地「小琉球」，建立在地識別與職人感。',
      },
      {
        src: hejiaLogoMockup,
        caption:
          'Logo 應用延伸：將識別系統落地至名片、信封與木盒燙金，' +
          '驗證品牌視覺在不同材質與尺寸下的一致性，強化伴手禮情境的整體質感。',
      },
      {
        src: hejiaMockupAll,
        caption:
          '罐身包裝系統：鎖定 Logo 位置、品名字體、條紋圖案三個不變元素，' +
          '僅以底色區分五種口味（原味、黑糖、海苔、煉乳、梅子），' +
          '讓消費者一眼辨識品牌，同時快速找到想要的口味。',
      },
      {
        src: hejiaCapMockupAll,
        caption:
          '瓶蓋貼標系統：延續罐身的五色口味策略，以圓形貼標完整呈現品牌識別與口味名稱，' +
          '確保產品在貨架陳列與禮盒包裝中皆能維持清楚的視覺辨識。',
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
  // 4｜設計練習｜Redesign & Lab（收尾）
  // ══════════════════════════════════════════════════════════
  {
    id: 'practice-lab',
    title: '設計練習｜Redesign & Lab',
    subtitle: '網站改版與版面優化練習，強化資訊整理能力',
    category: 'Practice / Experiment',
    year: '2017 – 2026',
    description:
      '持續練習是設計師的核心修煉。' +
      '這裡收錄各類視覺實驗、自主練習與改版練習作品，' +
      '聚焦影像合成、字體設計、UI 介面與網站 Redesign，' +
      '記錄每一次嘗試與突破的過程。',
    tabs: ['Redesign', '影像合成', '字體', 'UI', 'Logo'],
    images: [
      { src: practiceLabCover, coverOnly: true },

      // ── Redesign ─────────────────────────────────────────
      {
        src: brandingUiEducationApp,
        practiceCategory: 'Redesign',
        caption:
          '補習班「星育文理 H-Academy」網站視覺改版練習：' +
          '原網站資訊較分散，重新整理資訊架構，強化主標層級與版面配置，' +
          '提升使用者的閱讀動線與理解效率。（進行中）',
      },
      // 📌 待備：redesign-hacademy-before.webp（改版前）
      // 📌 待備：redesign-hacademy-after.webp（改版後）

      // ── 影像合成 ──────────────────────────────────────────
      {
        src: practiceComp01,
        practiceCategory: '影像合成',
        caption:
          '「影武者」手遊宣傳視覺：以武俠風格為核心，' +
          '運用水墨煙霧特效與角色動態捕捉進行合成，' +
          '練習虛實結合的氛圍營造與強烈明暗對比。',
      },
      {
        src: practiceComp02,
        practiceCategory: '影像合成',
        caption:
          '「幽湖古塔」場景合成：練習多圖層光影融合技術，' +
          '以冷調月光與精準的水面倒影模擬，' +
          '營造沉靜且具神祕感的超現實夜景空間。',
      },
      {
        src: practiceCompCloud,
        practiceCategory: '影像合成',
        caption:
          '「雲端夢境」奇幻敘事視覺：運用粉紫色調的光感擴散與柔焦處理，' +
          '將夢境意象具象化，練習高動態範圍色彩調和與多媒材元素統整。',
      },
      {
        src: practiceCompElephant,
        practiceCategory: '影像合成',
        caption:
          '「大地之靈」解構視覺實驗：以流沙粒子特效呈現大象主體，' +
          '運用細節筆刷與遮罩技術模擬沙化過程，' +
          '探索自然生命力與解構美學的視覺張力。',
      },

      // ── 字體 ──────────────────────────────────────────────
      {
        src: practiceFontAudi,
        practiceCategory: '字體',
        caption:
          'PS 字體設計：以奧迪車燈尾燈的格紋材質為靈感，' +
          '結合金屬邊框與鏡面倒影，詮釋 AUDI 品牌的高規格質感。',
      },
      {
        src: practiceFontLight,
        practiceCategory: '字體',
        caption:
          'PS 光效字體設計：運用星際光暈與霓虹發光效果，' +
          '呈現「NaRa Chou」文字的夢幻宇宙感，練習圖層混合模式與光效控制。',
      },

      // ── UI ────────────────────────────────────────────────
      {
        src: practiceUiCharacter,
        practiceCategory: 'UI',
        caption:
          '手遊 UI 設計：「禮包酷」角色屬性頁面。' +
          '以清新海灘場景為背景，搭配 3D 萌系忍者主角，' +
          '練習遊戲系統介面的角色展示版面與按鈕配置。',
      },
      {
        src: practiceUiGame,
        practiceCategory: 'UI',
        caption:
          '手遊設定介面 UI：以森林奇幻場景為背景，' +
          '設計圓角餅乾色系的 SETTINGS 彈窗，' +
          '包含音效音樂滑桿與語言選擇，練習遊戲 UI 的色彩系統與互動元件規格。',
      },

      // ── Logo ──────────────────────────────────────────────
      {
        src: ecommerceJingshengLogo,
        practiceCategory: 'Logo',
        caption:
          '精省便利屋品牌 Logo 設計：以卡通印章風格設計，' +
          '融合寶石與喜慶元素，傳遞趣味感與品牌個性。（品牌標誌設計）',
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

  // ── 個人商標與名片｜KikiDesign ───────────────────────────
  {
    id: 'logo-design',
    title: '個人商標與名片｜KikiDesign',
    subtitle: '品牌識別演進與印刷落地應用',
    category: 'Logo / Brand Identity',
    year: '2020 – 2025',
    description:
      '棠想視界「KikiDesign」個人品牌識別，歷經兩次視覺迭代。' +
      '2020 年以橘色系K字兔造型建立初始形象；' +
      '2025 年重新設計，以書法感的R字融合兔子側臉，' +
      '深色系呈現更沉穩成熟的品牌個性。' +
      '從設計稿到名片印刷、杯墊 Mockup，完整驗證品牌識別在實物載體上的一致性。',
    images: [
      { src: namecardMockupConcrete, coverOnly: true },
      {
        src: logoKiki2025Brand,
        caption: '2025 年新版 Logo：書法感R字融合兔子側臉，深色系傳遞沉穩成熟的品牌個性。',
      },
      {
        src: logoKiki2020,
        caption: '2020 年初版 Logo：橘色系K字兔造型，活潑明亮，適合接案初期的親切形象。',
      },
      {
        src: namecardMockupConcrete,
        caption: '2025 年名片設計：水泥板 Mockup，驗證黑底紅兔 Logo 在印刷材質上的視覺效果。',
      },
      {
        src: namecardMockupFoam,
        caption: '2025 年名片設計：泡棉板 Mockup，確認名片在不同背景質感下的辨識度。',
      },
      {
        src: namecardKiki2020,
        caption: '2020 年版名片：橘色系品牌識別延伸至名片版面，正反面配置清楚呈現聯絡資訊。',
      },
      {
        src: logoKikiCoasterMockup,
        caption: '品牌應用延伸：杯墊 Mockup，展示 Logo 在日常物件上的識別效果與品牌延展性。',
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
    subtitle: '以 AI 為輔助，探索設計與數位工具的整合應用',
    category: 'AI Application / UI Design',
    year: '2025 – 2026',
    description:
      '記錄以 AI 為輔助的設計實驗：' +
      '從顧問品牌的數字分析工具介面規劃，到個人財務 App 的視覺系統設計，' +
      '再到商業簡報的資訊視覺化重構。' +
      '每個作品都在探索如何讓設計產出更有效率、更貼近使用者需求。',
    images: [
      { src: aiLabCover, coverOnly: true },
      {
        src: aiToolAccounting,
        caption:
          '家庭財務記帳 App UI：Family Finance 介面設計，' +
          '以清晰的數字層級與圓餅圖視覺化呈現收支結構，' +
          '讓使用者不用花時間找資訊就能掌握財務狀況。',
      },
      {
        src: aiToolFortune,
        caption:
          '生日密碼分析工具 UI：行韋邏輯平台功能介面，' +
          '清楚的輸入欄位分層讓使用者快速完成資料輸入，' +
          '降低操作門檻，提升使用流暢度。',
      },
      {
        src: brandingUiEducationAppAI,
        caption:
          '教育 App 資訊架構圖：以卡片式版面整理課程邏輯與功能模組，' +
          '練習複雜資訊的視覺化整理與層次規劃。',
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
