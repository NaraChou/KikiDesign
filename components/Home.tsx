import React from 'react';
import { Hero } from './Hero';
import { Works } from './Works';
import { Philosophy } from './Philosophy';
import { LAYOUT } from '../styles/layout';

/**
 * [A] 視覺資訊備註
 * 首頁主內容以語義化 main 包住，子區塊垂直排列；寬度與區塊間距由外層容器與 CSS 變數統一，避免各區重複留白。
 */

// [B] 樣式常數（RWD 類別置於字串末端）
const STYLES = {
  container: LAYOUT.homeStack,
} as const;

// [C] 元件主體
export const Home: React.FC = () => (
  <main>
    <div className={STYLES.container}>
      <Hero />
      <Works />
      <Philosophy />
    </div>
  </main>
);
