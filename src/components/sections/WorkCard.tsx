import React from 'react';
import { Link } from 'react-router-dom';

/**
 * [A] 視覺資訊備註
 * 獨立作品卡片元件。
 * 核心修正：加入 aspectRatio 鎖定高度，解決圖片載入後的 CLS 跳動問題。
 */

// [B] Props 介面（清晰定義，便於任何頁面複用，支援可選 aspectRatio）
export interface WorkCardProps {
  id: string;
  titleZH: string;
  titleEN: string;
  subtitle: string;
  img: string;
  textAlign: 'text-left' | 'text-right';
  extraClass?: string;
  aspectRatio?: string; // 💡 新增可選參數：外部可自定義寬高比
}

// [B] 樣式常數 — 回歸語意化命名、優化 media 值移除 h-full 便於 aspect-ratio 運作
const STYLES = {
  wrapper: 'work-card group relative block',
  overlay: 'absolute inset-0 z-40',
  inner: 'work-card-inner transition-all duration-500 group-hover:translate-y-[-2px]',
  // 💡 調整：移除 h-full，確保 aspect-ratio 能由內而外撐開
  media: 'work-card-image-wrapper relative z-20 w-full flex items-center justify-center bg-neutral-900/10',
  image: 'max-w-full max-h-full object-contain transition-transform duration-1000 group-hover:scale-[1.03]',
  arrow: 'work-card-arrow-wrapper absolute right-4 top-4 z-30 opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100',
  meta: 'work-card-info',
  heading: 'title-group',
  title: 'title-zh',
  titleDivider: 'title-divider',
  titleSecondary: 'title-en',
  description: 'work-card-subtitle',
} as const;

// [C] 元件主體
export const WorkCard: React.FC<WorkCardProps> = ({
  id,
  titleZH,
  titleEN,
  subtitle,
  img,
  textAlign,
  extraClass = '',
  aspectRatio = '16/9', // 💡 預設比例，外部沒給預設 16:9，防 CLS
}) => {
  // [畫面互動邏輯] 滑鼠位置即時更新，讓 works.css 的 radial-gradient 光斑動態跟隨
  const setPointerPosition = (target: HTMLDivElement, x: number, y: number) => {
    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPointerPosition(e.currentTarget, e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPointerPosition(e.currentTarget, rect.width / 2, rect.height / 2);
  };

  const cardClass = `${STYLES.wrapper} ${extraClass}`.trim();

  return (
    <div
      className={cardClass}
      data-work-id={id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--mouse-x': '50%', '--mouse-y': '50%' } as React.CSSProperties}
    >
      <Link
        to={`/work/${id}`}
        className={STYLES.overlay}
        aria-label={`查看 ${titleZH} 作品詳情`}
      />

      <div className={STYLES.inner}>
        {/* 💡 CLS 防禦：外層 div 直接用 style 控制寬高比 */}
        <div
          className={STYLES.media}
          style={{ aspectRatio: aspectRatio }}
        >
          <img
            src={img}
            alt={titleZH}
            className={STYLES.image}
            width={800}  // 瀏覽器參考主流卡片寬度，防止預排空間失誤
            height={450} // 按 16:9 比例給個經典例（可根據 props 調整）
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className={STYLES.arrow}>
          <span className="arrow-circle">↗</span>
        </div>
      </div>

      <div className={`${STYLES.meta} ${textAlign}`}>
        <h3>
          <div className={STYLES.heading}>
            <span className={STYLES.title}>{titleZH}</span>
            <span className={STYLES.titleDivider}>/</span>
            <span className={STYLES.titleSecondary}>{titleEN}</span>
          </div>
        </h3>
        <p className={STYLES.description}>{subtitle}</p>
      </div>
    </div>
  );
};
