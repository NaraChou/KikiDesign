// src/data/projectData.ts

// 1. 按照新檔名進行匯入
import brandingAICover from '../assets/images/branding-ai-portfolio-cover.webp'; // 作品一的圖片
import brandingDarkUI from '../assets/images/branding-dark-ui-landing.webp';
import brandingMockupMain from '../assets/images/branding-mockup-main.webp';
import brandingResponsive from '../assets/images/branding-responsive-showcase.webp';
import brandingUIEducation from '../assets/images/branding-ui-education-app.webp';

import logoStationery from '../assets/images/logo-branding-stationery.webp';// 作品二的圖片
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
      brandingMockupMain,      // 作為首圖展示
      brandingAICover,         // 展示封面
      brandingResponsive,      // 展示響應式成果
      brandingUIEducation,     // 展示 UI 設計
      brandingDarkUI           // 展示 Landing Page
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
      logoStationery           // 放置 Logo 與文具設計圖
      // ...
    ]
  }
};
