import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// exporta config para a build do renderer (Vue)
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src/renderer/main_window', // ou o caminho da tua pasta vue
    },
  },
});
