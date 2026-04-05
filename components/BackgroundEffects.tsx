import React from 'react';

/**
 * [A] 視覺資訊備註
 * 兩顆固定光暈（圓形、等比例）襯底，不接收點擊；位置與模糊度由 :root 變數控制，避免手繪感被拉扁。
 */

// [B] 樣式與位置資料
const STYLES = {
  layer: 'fixed rounded-full -z-10 pointer-events-none',
} as const;

const GLOW_BLURS = [
  {
    key: 'topLeft',
    style: {
      top: `calc(-1 * var(--blur-bg-offset))`,
      left: `calc(-0.5 * var(--blur-bg-offset))`,
    },
  },
  {
    key: 'bottomRight',
    style: {
      bottom: `calc(-1 * var(--blur-bg-offset))`,
      right: `calc(-0.5 * var(--blur-bg-offset))`,
    },
  },
];

const GLOW_SURFACE: React.CSSProperties = {
  width: 'var(--blur-bg-size)',
  height: 'var(--blur-bg-size)',
  aspectRatio: '1/1',
  background: 'radial-gradient(circle, rgba(230, 57, 70, 0.05) 0%, transparent 70%)',
};

// [C] 元件主體
export const BackgroundEffects: React.FC = () => (
  <>
    {GLOW_BLURS.map(({ key, style }) => (
      <div
        key={key}
        className={STYLES.layer}
        style={{
          ...GLOW_SURFACE,
          filter: `blur(var(--blur-bg-blur))`,
          ...style,
        }}
      />
    ))}
  </>
);
