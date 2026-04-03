import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
// @ts-ignore
import react from '@vitejs/plugin-react';
// @ts-ignore
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  
  return {
    // 💡 既然 GitHub 轉為隱私且主打 Vercel，直接統一用根目錄
    base: '/',
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