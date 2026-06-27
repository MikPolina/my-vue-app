import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    minify: false, // Отключаем минификацию CSS
  },
  build: {
    cssMinify: false, // Отключаем минификацию CSS при сборке
    minify: false, // Отключаем минификацию JS
    assetsInlineLimit: 0, // Отключаем инлайн для всех файлов (важно для шрифтов!)
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
        manualChunks: undefined,
      }
    }
  },
  base: '/', // Базовый путь для всех ресурсов
  publicDir: 'public', // Папка с публичными файлами
})