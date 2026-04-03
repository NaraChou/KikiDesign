import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
// @ts-ignore
import react from '@vitejs/plugin-react';
// @ts-ignore
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // 檢查是否正在 Vercel 環境中佈署
  const isVercel = process.env.VERCEL === 'true';

  return {
    // 💡 自動判斷：如果是 Vercel 就用根目錄 '/'，否則用 GitHub 的 '/KikiDesign/'
    base: isVercel ? '/' : '/KikiDesign/',
    plugins: [
      tailwindcss(), // 確保在 react 之前
      react(),
    ],
    resolve: {
      alias: {
        // 修正別名路徑
        '@': path.resolve(__dirname, './src'),
      }
    },
    build: {
      outDir: 'dist',
    }
  };
});