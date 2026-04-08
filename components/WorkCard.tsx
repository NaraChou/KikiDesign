import React from 'react';
import { Link } from 'react-router-dom';

/**
 * [A] 視覺資訊備註
 * 獨立作品卡片元件，從 Works.tsx 拆出以利複用。
 * 滑鼠光斑座標（--mouse-x / --mouse-y）由此元件自行管理。
 * 卡片光暈顏色（--card-glow-color）由 works.css 以 data-work-id 注入。
 */

// [B] Props 介面（清晰定義，便於任何頁面複用）
export interface WorkCardProps {
  id: string;
  titleZH: string;
  titleEN: string;
  subtitle: string;
  img: string;
  textAlign: 'text-left' | 'text-right';
  extraClass?: string;
}

// [B] 樣式常數
const STYLES = {
  wrapper: 'work-card group relative block',
  overlay: 'absolute inset-0 z-40',
  inner: 'work-card-inner transition-all duration-500 group-hover:translate-y-[-2px]',
  media: 'work-card-image-wrapper relative z-20 w-full h-full flex items-center justify-center',
  image:
    'max-w-full max-h-full object-contain transition-transform duration-1000 group-hover:scale-[1.03]',
  arrow:
    'work-card-arrow-wrapper absolute right-4 top-4 z-30 opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100',
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
}) => {
  // [畫面效果] 只更新滑鼠在卡片上的相對位置，讓 works.css 的 radial-gradient 光斑跟著游標走
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
        <div className={STYLES.media}>
          <img
            src={img}
            alt={titleZH}
            className={STYLES.image}
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
