// 1. 先匯入需要的圖片
import work1Hero from '../assets/images/work-01.webp'; // 作品一的圖片命名為：branding-01.jpg, branding-02.jpg...
import work1Detail1 from '../assets/images/work-03.webp';
import behaviorIndex from '../assets/images/behavior-index.webp';

import work2Hero from '../assets/images/work-02.webp'; // 作品二的圖片命名為：logo - 01.jpg, logo - 02.jpg...
import work2Detail1 from '../assets/images/work-03.webp';
// ... 依此類推匯入其他圖片

export const projects = {
  'personal-branding': {
    id: 'personal-branding', // <--- 這是 ID
    title: '個人品牌形象官網',
    subtitle: 'Personal Branding Website',
    category: 'Brand Identity / UI/UX',
    year: '2024',
    description: '以極簡主義為核心，運用 GSAP 動畫打造流暢的視覺體驗。透過深色調與留白，展現設計師獨特的美學視角，讓網站不只是資訊的載體，更是個人特質的數位延伸。',
    images: [
      work1Hero,    // 這裡傳遞的是 Vite 處理後的 URL 變數
      work1Detail1,
      behaviorIndex, // <-- 新增這行變數名（不加引號）
      // ...
    ]
  },
  'logo-design': {
    id: 'logo-design', // <--- 這是另一個 ID
    title: '個人商標與名片',
    subtitle: 'Logo & Business Card',
    category: 'Visual Design / Print',
    year: '2025',
    description: '靈感源自於「棠」字與幾何線條的解構重組。標準字設計融合了傳統書法的氣韻與現代無襯線體的俐落。名片選用進口美術紙，輔以燙金工藝，在觸感與視覺上傳遞職人精神。',
    images: [
      work2Hero,    // 這裡傳遞的是 Vite 處理後的 URL 變數
      work2Detail1,
      // ...
    ]
  }
};
