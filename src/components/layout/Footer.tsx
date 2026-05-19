import React, { useState } from 'react';

/**
 * [A] 頁尾 #contact：左側為自我介紹標語，右側為聯絡方式；Email 點擊後複製到剪貼簿並短暫顯示已複製提示。
 */

// [B] 連結資料：另開分頁、附無障礙標籤
const SOCIAL_LINKS = [
  {
    href: 'https://www.facebook.com/profile.php?id=100066728660644&locale=zh_TW',
    label: 'Facebook',
    srLabel: '前往 Facebook 粉絲專頁',
  },
  {
    href: 'https://line.me/ti/p/0979291388',
    label: 'LINE',
    srLabel: '使用 LINE 聯絡設計師',
  },
];

const HIDDEN_WORKS = [
  {
    href: '/#/work/kikidesign-identity',
    label: 'Kiki Identity',
    srLabel: '查看 KikiDesign 品牌識別作品',
  },
  {
    href: '/#/work/ai-lab',
    label: 'AI Lab',
    srLabel: '查看 AI 數位效率實驗室作品',
  },
];

const STYLES = {
  wrapper: 'footer-frame border-t border-white/5',
  container:
    'mx-auto flex max-w-screen-2xl flex-col items-center justify-between text-center md:flex-row md:items-end md:text-left',
  columnLead: 'mb-12 md:mb-0',
  title: 'footer-title serif-italic mb-4',
  description: 'footer-subtitle',
  columnEnd: 'flex flex-col items-center space-y-4 md:items-end',
  stack: 'flex flex-col items-center md:items-end',
  email: 'relative group',
  emailButton: 'footer-email group flex cursor-copy items-center',
  emailTextOn: 'opacity-100 transition-all duration-300',
  emailTextOff: 'opacity-0 transition-all duration-300',
  feedback:
    'absolute left-0 right-0 text-center text-[10px] uppercase tracking-widest text-[var(--brand-accent-hover)] transition-all duration-300 md:text-right',
  feedbackOn: 'opacity-100',
  feedbackOff: 'opacity-0',
  socialList: 'mt-1 flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-end',
  bottomBar: 'mx-auto mt-8 flex max-w-screen-2xl justify-center border-t border-white/5 pt-6',
  copyrightText:
    'text-[10px] font-light uppercase leading-tight tracking-[0.11em] text-white/30 whitespace-nowrap md:text-[12px] md:tracking-[0.2em]',
  copyrightBrand: 'font-medium text-white/50',
} as const;

// [C] 元件主體
export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'exloe574@gmail.com';

  // 點擊後把信箱寫入剪貼簿，畫面上短暫顯示「已複製」回饋
  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className={STYLES.wrapper}>
      <div className={STYLES.container}>
        <div className={STYLES.columnLead}>
          <h3 className={STYLES.title}>品牌視覺與印刷應用</h3>
          <p className={STYLES.description}>面試作品集 · 僅作品展示用途</p>
        </div>

        <div className={STYLES.columnEnd}>
          <div className={STYLES.stack}>
            <div className={STYLES.email}>
              <button
                onClick={handleCopyEmail}
                className={STYLES.emailButton}
                aria-label="點擊複製 Email"
                type="button"
              >
                <span className={copied ? STYLES.emailTextOff : STYLES.emailTextOn}>
                  {email}
                </span>
                <span
                  className={`${STYLES.feedback} ${copied ? STYLES.feedbackOn : STYLES.feedbackOff}`}
                >
                  已複製
                </span>
              </button>
            </div>

            <ul className={STYLES.socialList} aria-label="連結">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.srLabel}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {HIDDEN_WORKS.map((work) => (
                <li key={work.label}>
                  <a
                    href={work.href}
                    className="footer-social-link opacity-40 hover:opacity-70"
                    aria-label={work.srLabel}
                  >
                    {work.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={STYLES.bottomBar}>
        <p className={STYLES.copyrightText}>
          &copy;&nbsp;2026&nbsp;
          <span className={STYLES.copyrightBrand}>KIKI DESIGN</span>
          &nbsp;All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
