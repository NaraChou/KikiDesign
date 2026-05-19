import React from 'react';
import { LAYOUT } from '../../styles/layout';
import { CAPABILITIES_SECTION, CAPABILITY_GROUPS } from '../../data/capabilitiesData';

/**
 * [A] 能力區 #capabilities：面試用總覽，由資料驅動；手機單欄、平板兩欄、大螢幕三欄。
 */

const STYLES = {
  section: 'flex flex-col items-center py-16 md:py-24',
  container: LAYOUT.colCenter,
  header: 'mb-10 text-center md:mb-14',
  title: 'text-2xl font-light tracking-[0.2em] md:text-4xl',
  label: 'mt-2 text-[10px] uppercase tracking-[0.35em] opacity-50 md:text-xs',
  grid:
    'grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-7 lg:grid-cols-3 lg:gap-6',
  card:
    'flex min-w-0 flex-col rounded-sm border border-white/10 bg-white/[0.02] p-6 md:p-7',
  /** 平板第三張獨占一行並置中，大螢幕回到一般欄寬 */
  cardLastRow:
    'md:col-span-2 md:mx-auto md:max-w-xl lg:col-span-1 lg:max-w-none lg:mx-0',
  cardTitle: 'mb-1 text-sm tracking-[0.18em]',
  cardTitleEn: 'mb-5 text-[10px] tracking-[0.12em] opacity-45 md:text-xs',
  list: 'flex flex-col gap-3',
  item:
    'border-l border-white/15 pl-3 text-[13px] leading-6 tracking-[0.06em] text-white/75',
} as const;

const SECTION_SURFACE: React.CSSProperties = {
  background: 'var(--section-bg-capabilities, #0a0908)',
};

export const Capabilities: React.FC = () => (
  <section
    id="capabilities"
    className={STYLES.section}
    style={SECTION_SURFACE}
    aria-labelledby="capabilities-heading"
  >
    <div className={STYLES.container}>
      <header className={STYLES.header}>
        <h2 id="capabilities-heading" className={STYLES.title}>
          {CAPABILITIES_SECTION.title}
        </h2>
        <p className={STYLES.label}>{CAPABILITIES_SECTION.subtitle}</p>
      </header>

      <div className={STYLES.grid}>
        {CAPABILITY_GROUPS.map((group, index) => (
          <article
            key={group.id}
            className={`${STYLES.card}${
              index === CAPABILITY_GROUPS.length - 1 ? ` ${STYLES.cardLastRow}` : ''
            }`}
            aria-labelledby={`cap-${group.id}`}
          >
            <h3 id={`cap-${group.id}`} className={STYLES.cardTitle}>
              {group.title}
            </h3>
            <p className={STYLES.cardTitleEn}>{group.titleEn}</p>
            <ul className={STYLES.list}>
              {group.items.map((item) => (
                <li key={item.id} className={STYLES.item}>
                  {item.label}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);
