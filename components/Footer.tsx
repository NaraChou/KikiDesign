import React, { useState } from 'react';

/**
 * ============================================================================
 * Footer 組件｜主線視覺統一版（2026重構版＋Email複製動態版）
 * ----------------------------------------------------------------------------
 * [白話視覺說明]
 * - 這個 Footer 將「Email 聯絡」進化成了可複製，提升手機與桌面場景的流暢體驗，視覺交互自然切換「複製成功提示」。
 * - 依然維持左右分布（RWD 堆疊），符合品牌 2xl 主線視覺一致性。
 *
 * [細節註解]
 * - footer-frame 管理上下留白、分隔線。
 * - max-w-screen-2xl mx-auto 控制最大寬跟左右貼齊，防止超寬螢幕跑版。
 * - 權利宣告區獨立出來後，所有主內容底下「再顯示一行」柔和底色的小字／視覺權威區，提升信任感。
 **/

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
  // --- 視覺化邏輯：「元件的記憶」處理 Email 複製狀態，用於切換提示動畫 ---
  const [copied, setCopied] = useState(false);
  const email = "exloe574@gmail.com";

  /**
   * [Email 複製行為邏輯]
   * - 點擊 EMAIL：攔截預設 mailto 跳轉，執行複製到剪貼簿
   * - 設定「已複製」記憶，使動畫顯示 Copied to clipboard!
   * - 2 秒後自動還原原本 Email 顯示
   * [視覺效應] 使用 transition-all 讓文字進出淡出滑動，提示不硬切
   */
  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault(); // 防止直接跳轉 mailto
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    // 外框 footer：上下留白分隔線，主線型態
    <footer id="contact" className="footer-frame border-t border-white/5">
      {/* 
        [主內容結構]
        - 視覺記憶：此區主責品牌標語＋聯絡區塊，與導覽列齊頭，保持 2xl 寬度及左右間距 
        - 對畫面影響：這裡不含版權行，避免版權行過度壓縮主區內容排列
      */}
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end text-center md:text-left">
        {/* 左側品牌標語／創作定位 */}
        <div className="mb-12 md:mb-0">
          {/* 精緻 italic 呈現品牌屬性，創造視覺連結 */}
          <h3 className="footer-title mb-4 serif-italic">Create with Soul.</h3>
          <p className="footer-subtitle">Available for collaborations 2026</p>
        </div>
        {/* 右側：Email 複製功能＋社群動態列 */}
        <div className="flex flex-col items-center md:items-end space-y-4">
          {/* 
            [Email 複製按鈕]
            - 與視覺協作：「元件的記憶」判斷當前是否處於已複製狀態，做動態動畫切換。
            - 對畫面影響：按下後顯示複製提示，避免打開郵件軟體造成中斷。
            - [修正] 游標改為 copy，滑鼠移上 email 有複製的直覺提示
          */}
          <div className="relative group">
            <button
              onClick={handleCopyEmail}
              className="footer-email cursor-copy flex items-center gap-2 group"
              aria-label="點擊複製 Email 聯絡設計師"
              type="button"
            >
              {/* 
                [視覺連結] 默认顯示 Email，複製後滑動淡出 
                [細節] transition-all 保證滑順；copied 狀態時 opacity-0，被提示覆蓋
              */}
              <span className={`transition-all duration-300 ${copied ? 'opacity-0' : 'opacity-100'}`}>
                {email}
              </span>
              {/* 
                [複製成功提示]
                - 位置絕對置於 Email 按鈕上方，滑進淡入顯示
                - PC靠右，手機居中，維持比例與 KIKI Design Style
                - 中文與英文各一行，視覺更分明
                - Copied 表示交互結束，2 秒後自動結束
              */}
              <span
                className={`
                  absolute left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 
                  transition-all duration-300 text-[10px] tracking-widest text-white/40 uppercase
                  ${copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
                `}
              >
                {/* [視覺行為] 中文提示一行、英文一行，讓使用者一目了然 */}
                {/* 
                  [互動提示：右對齊]
                  - 結構說明：這裡用 items-end 讓動畫提示區塊靠右，符合設計感受
                  - 對畫面影響：即使視窗寬度縮小，提示兩行仍會緊貼 email 區右側，不影響閱讀性
                */}
                <span className="block text-right">已複製到剪貼簿！</span>
                <span className="block text-right">Copied to clipboard!</span>
              </span>
            </button>
          </div>
          {/* 
            [社群動態陣列]
            - 用 map() 動態生成，未來擴充僅更動 SOCIAL_LINKS 陣列。
            - 每個連結皆符合 SEO（獨立 label＋aria）且無重複 HTML。
          */}
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
      {/* 
        [獨立版權聲明行]
        - 對畫面的意義：不隸屬於 flex 主內容，置於底部最外層，令版權宣告在所有裝置都「純置中」。
        - 採用 w-full 及 flex justify-center，text-[9px] 與 tracking 處理為官方專屬信任標章。
      */}
      <div className="w-full flex justify-center mt-12 pt-8 border-t border-white/5">
        <p className="text-[9px] tracking-[0.3em] text-white/20 uppercase text-center">
          © 2026 KIKI DESIGN. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};