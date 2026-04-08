/**
 * animationPresets.ts — Kiki Design Animation Presets
 * ============================================================
 * GSAP 動畫參數模組化，避免各元件重複定義相同的 duration/ease。
 * ============================================================
 * 規則：
 * 1. 只放跨元件重複出現的動畫參數
 * 2. 不在此處呼叫 gsap，只匯出純參數物件
 * 3. selector（id/class）不在此處定義，由各元件自行傳入
 * ============================================================
 * 分區：
 * A. Scroll 捲動類
 * B. Fade 淡入淡出類
 * C. Stagger 序列類
 * ============================================================
 */

// ── A. Scroll 捲動類 ──────────────────────────────────────

/** 平滑捲動（Nav / MobileMenu / BackToTop 共用） */
export const SCROLL_SMOOTH = {
  duration: 1.5,
  ease: 'power4.inOut',
} as const;

/** 瞬間捲動（換頁後立即定位，不需動畫感） */
export const SCROLL_INSTANT = {
  duration: 0,
} as const;

// ── B. Fade 淡入淡出類 ────────────────────────────────────

/** Loader 淡出（autoAlpha 同時控制 opacity + visibility） */
export const FADE_OUT_LOADER = {
  autoAlpha: 0,
  duration: 0.5,
} as const;

/** 元素淡入上移（Hero / WorkDetail header 共用） */
export const FADE_IN_UP = {
  opacity: 1,
  y: 0,
  ease: 'power3.out',
} as const;

/** 元素初始狀態（配合 FADE_IN_UP 使用的 from 參數） */
export const FADE_IN_UP_FROM = {
  opacity: 0,
  y: 50,
} as const;

// ── C. Stagger 序列類 ─────────────────────────────────────

/** Hero 進場序列（tag → title → line → desc） */
export const STAGGER_HERO = {
  stagger: 0.1,
  duration: 1,
  ease: 'power3.out',
} as const;

/** Waterfall 卡片序列（ScrollTrigger 觸發） */
export const STAGGER_WATERFALL = {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: 'power2.out',
} as const;

/** Tab 切換淡出（waterfall 分頁切換） */
export const TAB_FADE_OUT = {
  opacity: 0,
  y: 10,
  duration: 0.2,
  stagger: 0.03,
} as const;

/** Tab 切換淡入 */
export const TAB_FADE_IN = {
  opacity: 1,
  y: 0,
  duration: 0.4,
  stagger: 0.06,
  ease: 'power2.out',
} as const;
