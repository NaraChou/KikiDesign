import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
// @ts-ignore
import react from '@vitejs/plugin-react';
// @ts-ignore
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    base: '/KikiDesign/',
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