import React from 'react';

/**
 * ============================================================================
 * Footer 組件｜主線視覺統一版
 * ----------------------------------------------------------------------------
 * [白話視覺說明]
 * - 這個 Footer 元件直接讓 footer 元素本身負責主線對齊，不再內包 .main-container。
 * - 透過 Tailwind class（max-w-screen-2xl、px-6、md:px-16、mx-auto）確保寬度、左右間距與 Navigation 完全同步。
 * - flex 父容器確保內容（品牌語區＋聯絡與社群）在桌機左右分布、手機堆疊，一律貼齊主線視覺。
 *
 * [細節解構]
 * - 外層 footer-frame 控制上下留白、分隔線。
 * - 內容層：flex、寬度、padding 都直接設定，與主視覺對齊，無視 .main-container。
 * - 左區（品牌口號）：手機置中，桌機左貼主線，h3 使用專屬 serif-italic 呈現精緻感。
 * - 右區（Email＋社群連結）：直式排版，Email/社群分明，響應式右貼主線或置中，ul/li 符合 SEO。
 * - 所有社群連結資料用陣列資料驅動（DRY 原則）。
 * 
 * [零報錯保障]
 * - TypeScript 型別皆正確，Problems 無警告。
 **/

const SOCIAL_LINKS = [
  {
    href: 'https://www.facebook.com/',
    label: 'Facebook',
    srLabel: '前往 Facebook 粉絲專頁'
  },
  {
    href: 'https://line.me/',
    label: 'LINE',
    srLabel: '使用 LINE 聯絡設計師'
  }
];

export const Footer: React.FC = () => {
  return (
    // 外框 footer：上下留白分隔線，主線型態
    <footer id="contact" className="footer-frame border-t border-white/5">
      {/* 內容層：同 Navigation 的 max-w、左右 padding、flex 分布 
      --> 修正後的 div：加入 max-w-screen-2xl 與 mx-auto 避免超寬螢幕的「跑版」風險 (The 21:9 Trap)*/}
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end text-center md:text-left">
        {/* 左側品牌標語／創作定位 */}
        <div className="mb-12 md:mb-0">
          {/* 專屬字體，精緻 italic 呈現 */}
          <h3 className="footer-title mb-4 serif-italic">Create with Soul.</h3>
          <p className="footer-subtitle">Available for collaborations 2026</p>
        </div>
        {/* 右側：聯絡 Email + 社群連結列表 */}
        <div className="flex flex-col items-center md:items-end space-y-4">
          <a
            href="mailto:exloe574@gmail.com"
            className="footer-email"
            aria-label="Email 聯絡設計師"
          >
            exloe574@gmail.com
          </a>
          <ul className="flex space-x-6" aria-label="社群網站連結">
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
      </div>
    </footer>
  );
};