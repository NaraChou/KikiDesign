import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
// @ts-ignore
import react from '@vitejs/plugin-react';
// @ts-ignore
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  /// 💡 改用這個判斷：只有當環境變數中有 GITHUB_ACTIONS 時才使用子路徑
  // Vercel 佈署時不會有這個變數，所以會自動切換到 '/'
  const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

  return {
   // 如果是 GitHub Actions 打包就用 '/KikiDesign/'，其他（Vercel/本地）一律用 '/'
   base: isGitHubPages ? '/KikiDesign/' : '/',
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