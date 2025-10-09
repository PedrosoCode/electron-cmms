import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite'

// exporta config para a build do renderer (Vue)
export default defineConfig({
  plugins: [vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': '/src/renderer/main_window', // ou o caminho da tua pasta vue
    },
  },
});
