import React, { useState } from 'react';

/**
 * ============================================================================
 * Footer 統整說明（資訊右側新版｜2026）
 * ----------------------------------------------------------------------------
 * [視覺體驗]
 * - Email、社群連結、版權組成一個垂直資訊群組，整齊控制間距與 RWD 對齊（皆為 8px 倍數）。
 * - Email 支援複製，成功時顯示 Copied!（品牌紅色、動態顯示於 Email 上方）。
 * - 版權資訊始終顯示於資訊群組最下方，分隔強化階層。
 * - 元件結構全採語義標籤、aria 屬性優化 SEO 與可及性。
 **/

// 1. 所有外部可循環社群連結統一集中於 SOCIAL_LINKS 陣列。
const SOCIAL_LINKS = [
  {
    href: 'https://www.facebook.com/profile.php?id=100066728660644&locale=zh_TW',
    label: 'Facebook',
    srLabel: '前往 Facebook 粉絲專頁'
  },
  {
    href: 'https://line.me/ti/p/0979291388',
    label: 'LINE',
    srLabel: '使用 LINE 聯絡設計師'
  }
];

export const Footer: React.FC = () => {
  // [Email 複製狀態記憶]：「元件的記憶」— 控制 Copied! 提示視覺動態
  const [copied, setCopied] = useState(false);
  const email = "exloe574@gmail.com";

  /**
   * [Email 複製行為─視覺說明]
   * 點擊時複製 Email 至剪貼簿，「已複製」時觸發 Copied! 動畫顯示於 Email 上，維持滑順沒跳動。
   * 結束後自動隱藏，不影響其他結構。
   */
  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    // [Footer 外框]：留白、分隔線結構外層
    <footer id="contact" className="footer-frame border-t border-white/5">
      {/* [主內容]：左右橫向響應式排列，RWD 下自動堆疊 */}
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end text-center md:text-left">
        
        {/* [左：標語群組] */}
        <div className="mb-12 md:mb-0">
          <h3 className="footer-title mb-4 serif-italic">Create with Soul.</h3>
          <p className="footer-subtitle">Available for collaborations 2026</p>
        </div>
        
        {/* [右：資訊－Email + 社群 + 版權]／統一歸類同一水平層級 */}
        <div className="flex flex-col items-center md:items-end space-y-4">
          
          {/* Email 與社群連結群組 — 緊密合併，統一垂直邏輯 */}
          <div className="flex flex-col items-center md:items-end">
            
            {/* [Email區]：複製功能與 Copied! 動態提示合併同一區塊控制 */}
            <div className="relative group">
              <button
                onClick={handleCopyEmail}
                className="footer-email cursor-copy flex items-center group"
                aria-label="點擊複製 Email"
                type="button"
              >
                {/* [Email文字] 複製時淡出，未複製時正常顯示 */}
                <span className={`transition-all duration-300 ${copied ? 'opacity-0' : 'opacity-100'}`}>
                  {email}
                </span>
                {/* [Copied! 提示] 出現時覆蓋，但只顯示一行、品牌紅色 */}
                <span
                  className={`
                    absolute left-0 right-0 text-center md:text-right
                    transition-all duration-300 text-[10px] tracking-widest text-[#E63946] uppercase
                    ${copied ? 'opacity-100' : 'opacity-0'}
                  `}
                >
                  Copied!
                </span>
              </button>
            </div>

            {/* [社群連結列表]：單一容器管理，確保社群連結間距一致，與 Email 緊密包裹 */}
            <ul className="flex space-x-6 mt-1" aria-label="社群連結">
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

          {/* 
            [版權資訊] 列為單獨分組，結構與樣式說明合併統整 
            ↓↓↓ 增加手機版下方間距，避免貼齊邊緣視覺不清晰
            tailwind:
              pb-8 → 下方加大 8*1 = 8px 間距（僅在 mobile，md:pb-0 桌面取消）
          */}
          <div className="border-t border-white/5 w-full md:w-auto text-center md:text-right pb-8 md:pb-0">
            <p className="text-[11px] md:text-[12px] tracking-[0.2em] text-white/30 uppercase font-light">
              &copy;&nbsp;2026&nbsp;
              <span className="text-white/50 font-medium">KIKI DESIGN</span>
              &nbsp;All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};