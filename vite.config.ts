import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
// @ts-ignore
import react from '@vitejs/plugin-react';
// @ts-ignore - 確保這一行在 import react 附近，並且已經執行過 npm install @tailwindcss/vite
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    // 確保這裡的 Repo 名稱大小寫與 GitHub 一致
    base: '/KikiDesign/',

    plugins: [
      // 1. Tailwind v4 插件必須放在最前面
      tailwindcss(),
      react(),
    ],

    resolve: {
      alias: {
        // 確保路徑解析正確
        '@': path.resolve(__dirname, './src'),
      }
    },

    // 建議加上這個，確保打包時能正確處理
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    }
  };
});