import React, { useState } from 'react';

/**
 * [A] 視覺資訊備註
 * 頁尾聯絡區 #contact（與 style.css 內錨點樣式對應）；Email 可一鍵複製並短暫顯示 Copied!；社群連結另開分頁。
 */

// [B] 資料與樣式常數
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

const STYLES = {
  wrapper: 'footer-frame border-t border-white/5',
  container:
    'max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end text-center md:text-left',
  columnLead: 'mb-12 md:mb-0',
  title: 'footer-title mb-4 serif-italic',
  description: 'footer-subtitle',
  columnEnd: 'flex flex-col items-center md:items-end space-y-4',
  stack: 'flex flex-col items-center md:items-end',
  email: 'relative group',
  emailButton: 'footer-email cursor-copy flex items-center group',
  emailTextOn: 'transition-all duration-300 opacity-100',
  emailTextOff: 'transition-all duration-300 opacity-0',
  feedback:
    'absolute left-0 right-0 text-center md:text-right transition-all duration-300 text-[10px] tracking-widest text-[var(--brand-accent-hover)] uppercase',
  feedbackOn: 'opacity-100',
  feedbackOff: 'opacity-0',
  socialList: 'flex space-x-6 mt-1',
  copyright: 'border-t border-white/5 w-full md:w-auto text-center md:text-right pb-8 md:pb-0',
  copyrightText:
    'text-[10px] md:text-[12px] tracking-[0.11em] md:tracking-[0.2em] leading-tight text-white/30 uppercase font-light whitespace-nowrap',
  copyrightBrand: 'text-white/50 font-medium',
} as const;

// [C] 元件主體
export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'exloe574@gmail.com';

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
          <h3 className={STYLES.title}>Create with Soul.</h3>
          <p className={STYLES.description}>Available for collaborations 2026</p>
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
                  Copied!
                </span>
              </button>
            </div>

            <ul className={STYLES.socialList} aria-label="社群連結">
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
            </ul>
          </div>

          <div className={STYLES.copyright}>
            <p className={STYLES.copyrightText}>
              &copy;&nbsp;2026&nbsp;
              <span className={STYLES.copyrightBrand}>KIKI DESIGN</span>
              &nbsp;All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
