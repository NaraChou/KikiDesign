import React from 'react';

/**
 * [視覺化邏輯總註解]
 * 背景特效元件－依設計規範，以【資料驅動】產生兩個固定光暈特效。
 * - 每個手繪光暈皆為圓形且無變形（嚴守 Kiki Design Style，不允許拉伸），
 * - 共同：fixed、pointer-events-none、rounded-full、-z-10 以確保全部主內容位於上層、與互動不衝突。
 * - 色彩、大小、模糊度、位置皆由 :root 定義變數統一管理（可維運、跨元件一致性）
 * - 光暈區塊資料統一於陣列，統一循環渲染，維持 DRY、易維護。
 * - 特效排列組合能快速擴展（如要新增第三個光暈區，也只需擴陣列）
 *
 * [對畫面影響]：本效果只負責襯托頁面氛圍，不影響內容可及性或畫面主體排版。
 */

// [光暈資料：位置鍵名與屬性歸一，便於閱讀、擴充]
// 注意：資料中位置屬性（top/left/bottom/right）在循環時判斷注入
const GLOW_BLURS = [
  {
    key: 'topLeft',
    style: {
      top: `calc(-1 * var(--blur-bg-offset))`,
      left: `calc(-0.5 * var(--blur-bg-offset))`
    }
  },
  {
    key: 'bottomRight',
    style: {
      bottom: `calc(-1 * var(--blur-bg-offset))`,
      right: `calc(-0.5 * var(--blur-bg-offset))`
    }
  }
];

export const BackgroundEffects: React.FC = () => {
  return (
    <>
      {/* [視覺化註解] 用資料統一渲染所有光暈特效，確保邏輯可維護與一致 */}
      {GLOW_BLURS.map(({ key, style }) => (
        <div
          key={key}
          className="fixed rounded-full -z-10 pointer-events-none"
          // [動態 style] 只輸出變動屬性，其餘保持共用
          style={{
            width: 'var(--blur-bg-size)',
            height: 'var(--blur-bg-size)',
            filter: `blur(var(--blur-bg-blur))`,
            background: 'radial-gradient(circle, var(--tang-pink) 0%, transparent 70%)',
            aspectRatio: '1/1', // [視覺註解] 圓形不能變形
            ...style // 輸出對應的位置屬性（top/left/bottom/right）
          }}
        />
      ))}
    </>
  );
};