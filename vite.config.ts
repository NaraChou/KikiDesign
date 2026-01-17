import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
// 如果這行還是紅字，請確保你已經跑過上面的 npm install 指令
// @ts-ignore
import react from '@vitejs/plugin-react';
// @ts-ignore
import tailwindcss from '@tailwindcss/vite' // 新增這行

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/KikiDesign/', // GitHub 佈署關鍵
    plugins: [
      react(),
      tailwindcss(), // 新增這行
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    }
    // ... 其他 define 與 server 設定保持不變
  };
});