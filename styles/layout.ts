/**
 * layout.ts — Kiki Design Layout Tokens
 * ============================================================
 * 全站共用佈局 token，依照 DEVELOPER_GUIDE 第 8 點提取。
 * 所有元件的容器類別請優先引用此處，避免重複字串。
 * ============================================================
 * 使用方式：
 *   import { LAYOUT } from '../styles/layout';
 *   <div className={LAYOUT.container} />
 *   <div className={`${LAYOUT.colCenter} justify-center`} />
 * ============================================================
 */

export const LAYOUT = {
  // 全站標準內容寬度容器（左右 padding 由 CSS 變數管理）
  container: 'content-width-container mx-auto w-full',

  // 垂直置中欄（Hero、Loader 專用）
  colCenter: 'content-width-container flex flex-col items-center w-full',

  // 文字置中欄（Philosophy 專用）
  colCenterText: 'content-width-container w-full text-center',

  // 垂直間距主幹（Home 頁面用）
  homeStack: 'content-width-container flex flex-col md:gap-48',
} as const;
