import brandingDarkUI from '../assets/images/branding-dark-ui-landing.webp';
import brandingMockupMain from '../assets/images/branding-mockup-main.webp';
import brandingResponsive from '../assets/images/branding-responsive-showcase.webp';
import brandingBehaviorLogicLogo from '../assets/images/branding-behavior-logic-logo.webp';
import brandingBehaviorLogicNamecard from '../assets/images/branding-behavior-logic-namecard.webp';
import edmBehaviorLogic from '../assets/images/edm-behavior-logic.webp';
import aiSlideBehaviorLogic from '../assets/images/ai-slide-behavior-logic.webp';

import posterMockupMain from '../assets/images/poster-mockup-main.webp';
import posterRabbitBearLogo from '../assets/images/poster-rabbit-bear-logo.webp';
import posterRabbitBearStrategyCompare from '../assets/images/poster-rabbit-bear-strategy-compare.webp';
import posterRabbitBearNamecard from '../assets/images/poster-rabbit-bear-namecard.webp';
import posterRabbitBearRecruitment from '../assets/images/poster-rabbit-bear-recruitment.webp';
import posterRabbitBearOnsite from '../assets/images/poster-rabbit-bear-onsite.webp';
import posterRabbitBearLogoRound from '../assets/images/poster-rabbit-bear-logo-round.webp';

import hejiaLogo from '../assets/images/hojia_logo.webp';
import hejiaLogoMockup from '../assets/images/hojia_logo_mockup.webp';
import hejiaCapMockupAll from '../assets/images/hojia_cap_mockup_all.webp';
import hejiaMockupAll from '../assets/images/hojia_mockup_all.webp';
import hejiaDisplayMockup from '../assets/images/hojia_display_mockup.webp';

import practiceComp01 from '../assets/images/practice-comp-01.webp';
import practiceComp02 from '../assets/images/practice-comp-02.webp';
import practiceCompElephant from '../assets/images/practice-comp-elephant.webp';
import practiceFontAudi from '../assets/images/practice-font-audi.webp';
import practiceUiGame from '../assets/images/practice-ui-game.webp';

import logoKiki2025Brand from '../assets/images/logo-kiki-2025-brand.webp';
import logoKiki2020 from '../assets/images/logo-kiki-2020.webp';
import namecardKiki2020 from '../assets/images/namecard-kiki-2020.webp';
import namecardMockupConcrete from '../assets/images/namecard-kiki-2025-mockup-concrete.webp';
import namecardMockupFoam from '../assets/images/namecard-kiki-2025-mockup-foam.webp';
import logoKikiCoasterMockup from '../assets/images/logo-kiki-coaster-mockup.webp';

import aiLabCover from '../assets/images/ai-lab-cover.webp';
import aiToolAccounting from '../assets/images/ai-tool-accounting.webp';
import aiToolFortune from '../assets/images/ai-tool-fortune.webp';

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
  summary?: string;
  style?: string;
  tools?: string[];
  images: ProjectImage[];
  aspectRatio: string;
  tabs?: string[];
  visual: {
    cardBg: string;
    hoverGlow: string;
    glow: string;
  };
}

const CORE_TOOLS = ['Illustrator', 'Photoshop', 'AI 協作（ChatGPT / Gemini / Claude）'];
const DESIGN_TOOLS = ['Illustrator', 'Photoshop'];
const PHOTOSHOP_ONLY = ['Photoshop'];
const AI_ONLY = ['AI 協作（ChatGPT / Gemini / Claude）'];

export const projectsList: ProjectData[] = [
  {
    id: 'personal-branding',
    title: '品牌視覺設計｜Behavior Logic',
    subtitle: '顧問品牌 × Logo × 名片 × 官網 × EDM',
    category: 'Brand Identity / Website / EDM',
    year: '2024 – 2025',
    description: '為顧問品牌建立識別與數位主視覺，整合 Logo、名片、官網與 EDM。',
    summary: '重新整理顧問品牌的資訊層級，讓課程與服務溝通更容易建立信任感。',
    style: '雙藍系理性視覺，兼顧專業感與親和度。',
    tools: CORE_TOOLS,
    images: [
      { id: 'bl-cover', src: brandingMockupMain, coverOnly: true },
      { id: 'bl-logo-ba', src: brandingBehaviorLogicLogo, caption: '雙藍識別重塑，提升品牌辨識。Before/After 對照呈現策略調整。' },
      { id: 'bl-namecard', src: brandingBehaviorLogicNamecard, caption: '名片延伸品牌語言，建立一致接觸點。版面整合資訊與 QR 導流。' },
      { id: 'bl-responsive', src: brandingResponsive, caption: 'WIX網站視覺跨裝置一致，強化閱讀流暢度。手機與桌機維持同一品牌調性。' },
      { id: 'bl-dark-ui', src: brandingDarkUI, caption: '深色介面強化專業感與層級。重整後維持視覺質感與品牌一致。' },
      { id: 'bl-edm', src: edmBehaviorLogic, caption: 'EDM 版面聚焦重點訊息與導流。色塊分層提升手機閱讀效率。' },
      { id: 'bl-slide', src: aiSlideBehaviorLogic, caption: '品牌架構視覺化，清楚說明服務脈絡。複雜資訊轉為易讀圖像。' },
    ],
    aspectRatio: '16/9',
    visual: {
      cardBg: 'bg-[rgba(26,28,46,0.50)]',
      hoverGlow: 'group-hover:shadow-[0_0_50px_rgba(59,130,246,0.3)]',
      glow: 'rgba(59,130,246,0.28)',
    },
  },
  {
    id: 'rabbit-bear',
    title: '品牌視覺設計｜小兔熊',
    subtitle: '幼兒教育品牌 × Logo × 海報 × 名片 × 落地應用',
    category: 'Brand Identity / Print',
    year: '2025',
    description: '建立親子教育品牌識別，從 Logo 到名片、海報與門市應用完整落地。',
    summary: '重新整理招生資訊與角色語言，讓家長更容易快速理解課程重點。',
    style: '暖色親子調性，圓潤角色語言強化親和感。',
    tools: DESIGN_TOOLS,
    images: [
      { id: 'rb-cover', src: posterMockupMain, coverOnly: true },
      { id: 'rb-strategy', src: posterRabbitBearStrategyCompare, caption: '設計前後對照，定位更清楚。角色語言與資訊層級同步優化。' },
      { id: 'rb-logo-spec', src: posterRabbitBearLogo, caption: '圓潤角色識別，建立親子品牌記憶點。Logo 完稿可穩定延伸各媒材。' },
      { id: 'rb-logo-round', src: posterRabbitBearLogoRound, caption: '圓章版本強化小尺寸辨識。應用於社群頭像與印刷貼標。' },
      { id: 'rb-namecard', src: posterRabbitBearNamecard, caption: '名片版面延續主視覺調性。資訊清楚、品牌感一致。' },
      { id: 'rb-recruitment', src: posterRabbitBearRecruitment, caption: '招生海報聚焦課程與行動資訊。QR 導流縮短家長決策路徑。' },
      { id: 'rb-onsite', src: posterRabbitBearOnsite, caption: '實際張貼驗證遠距辨識效果。門市場景保有清晰品牌印象。' },
    ],
    aspectRatio: '3/4',
    visual: {
      cardBg: 'bg-[rgba(46,36,16,0.50)]',
      hoverGlow: 'group-hover:shadow-[0_0_50px_rgba(255,180,50,0.3)]',
      glow: 'rgba(255,180,50,0.3)',
    },
  },
  {
    id: 'hejia-branding',
    title: '品牌提案｜合家咔脆條',
    subtitle: '在地零食品牌 × Logo × 包裝視覺提案',
    category: 'Brand Proposal / Packaging',
    year: '2018',
    description: '以在地伴手禮為題，練習品牌識別與系列包裝的視覺提案。',
    summary: '透過系列化設計，探索商品陳列與口味辨識的視覺邏輯。',
    style: '暖調手作感，結合禮贈質感與系列一致性。',
    tools: DESIGN_TOOLS,
    images: [
      { id: 'hj-cover', src: hejiaDisplayMockup, coverOnly: true },
      { id: 'hj-logo', src: hejiaLogo, caption: '主標誌建立在地手作記憶點。字徽結合傳統紋樣與品牌名。' },
      { id: 'hj-logo-mockup', src: hejiaLogoMockup, caption: '識別套用招牌與事務物件。確認不同材質下的可讀性。' },
      { id: 'hj-pack-all', src: hejiaMockupAll, caption: '五款口味以色彩系統區分。系列包裝維持一致辨識架構。' },
      { id: 'hj-cap-all', src: hejiaCapMockupAll, caption: '瓶蓋貼標延續口味色碼邏輯。陳列時能快速完成口味辨識。' },
    ],
    aspectRatio: '16/9',
    visual: {
      cardBg: 'bg-[rgba(46,26,16,0.50)]',
      hoverGlow: 'group-hover:shadow-[0_0_50px_rgba(220,120,40,0.3)]',
      glow: 'rgba(220,120,40,0.3)',
    },
  },
  {
    id: 'practice-lab',
    title: 'Visual Exploration｜視覺實驗',
    subtitle: '影像合成 × 字體設計 × UI 介面',
    category: 'Practice / Experiment',
    year: '2017 – 2026',
    description: '收錄自主視覺練習，聚焦畫面控制、材質表現與介面層級。',
    summary: '透過多媒材練習累積視覺轉譯能力，支撐商業案的執行精度。',
    style: '風格實驗導向，強調光影、對比與資訊清晰度。',
    tools: PHOTOSHOP_ONLY,
    tabs: ['影像合成', '字體', 'UI'],
    images: [
      { id: 'pl-comp-01', src: practiceComp01, practiceCategory: '影像合成', caption: '影像合成練習光影氛圍控制。強化材質對比與畫面深度。' },
      { id: 'pl-comp-02', src: practiceComp02, practiceCategory: '影像合成', caption: '多素材合成建立主題敘事。練習色調統一與焦點引導。' },
      { id: 'pl-comp-elephant', src: practiceCompElephant, practiceCategory: '影像合成', caption: '角色合成練習強化視覺戲劇性。以色光與比例維持整體平衡。' },
      { id: 'pl-font-audi', src: practiceFontAudi, practiceCategory: '字體', caption: '字體構形練習品牌識別感。調整筆畫比例提升可讀性。' },
      { id: 'pl-ui-game', src: practiceUiGame, practiceCategory: 'UI', caption: '介面練習聚焦層級與操作路徑。以對比與間距提升閱讀效率。' },
    ],
    aspectRatio: '16/9',
    visual: {
      cardBg: 'bg-[rgba(26,26,36,0.50)]',
      hoverGlow: 'group-hover:shadow-[0_0_50px_rgba(139,92,246,0.3)]',
      glow: 'rgba(139,92,246,0.3)',
    },
  },
  {
    id: 'kikidesign-identity',
    title: '品牌視覺設計｜KikiDesign',
    subtitle: '個人品牌識別 × Logo × 名片 × 物件延伸',
    category: 'Self Branding / Identity',
    year: '2020 – 2025',
    description: '整理個人品牌識別演進，從早期風格到成熟商用語言的版本更新。',
    summary: '建立可長期使用的個人視覺系統，對齊接案定位與輸出品質。',
    style: '由親和走向成熟，保留記憶點並強化專業感。',
    tools: CORE_TOOLS,
    images: [
      { id: 'kk-cover', src: namecardMockupConcrete, coverOnly: true },
      { id: 'kk-logo-2025', src: logoKiki2025Brand, caption: '新版識別轉向成熟商用。深色系強化專業與辨識。' },
      { id: 'kk-logo-2020', src: logoKiki2020, caption: '早期識別主打親和與記憶點。橘色角色語言建立入口印象。' },
      { id: 'kk-namecard-concrete', src: namecardMockupConcrete, caption: '名片套用新版識別語言。驗證深色對比與資訊清晰度。' },
      { id: 'kk-namecard-foam', src: namecardMockupFoam, caption: '不同材質下測試品牌穩定性。維持版面秩序與可讀性。' },
      { id: 'kk-namecard-2020', src: namecardKiki2020, caption: '舊版名片反映早期調性。作為品牌演進對照。' },
      { id: 'kk-coaster', src: logoKikiCoasterMockup, caption: '品牌延伸至日常物件。小尺寸應用仍維持辨識。' },
    ],
    aspectRatio: '3/4',
    visual: {
      cardBg: 'bg-[rgba(36,16,16,0.50)]',
      hoverGlow: 'group-hover:shadow-[0_0_50px_rgba(200,80,60,0.3)]',
      glow: 'rgba(200,80,60,0.3)',
    },
  },
  {
    id: 'ai-lab',
    title: '資訊介面設計｜AI 協作實驗',
    subtitle: '資訊視覺 × 介面編排 × AI 協作',
    category: 'AI Application / UI Design',
    year: '2025 – 2026',
    description: '以 AI 協作輔助視覺發想與版面整理，探索工具介面的設計表達。',
    summary: '重新整理資訊層級，讓操作與閱讀更直覺。',
    style: '資訊導向介面語言，兼顧清晰度與視覺節奏。',
    tools: AI_ONLY,
    images: [
      { id: 'ai-cover', src: aiLabCover, coverOnly: true },
      { id: 'ai-finance', src: aiToolAccounting, caption: '家庭財務介面聚焦資訊分層。收支視覺化提升閱讀效率。' },
      { id: 'ai-fortune', src: aiToolFortune, caption: '數字分析工具介面強化操作清晰度。以模組化區塊整理複雜資訊。' },
    ],
    aspectRatio: '16/9',
    visual: {
      cardBg: 'bg-[rgba(16,26,36,0.50)]',
      hoverGlow: 'group-hover:shadow-[0_0_50px_rgba(0,200,180,0.25)]',
      glow: 'rgba(0,200,180,0.25)',
    },
  },
];

export const projectsRecord: Record<string, ProjectData> = Object.fromEntries(
  projectsList.map((proj) => [proj.id, proj]),
);
