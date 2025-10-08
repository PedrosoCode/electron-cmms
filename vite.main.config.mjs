import { defineConfig } from 'vite';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  plugins: [
    commonjs({
      dynamicRequireTargets: [
        // Permite o uso de require dinâmico do módulo nativo
        'node_modules/better-sqlite3/**/*'
      ]
    })
  ],
  build: {
    rollupOptions: {
      external: [
        // Faz o Vite não tentar empacotar o módulo nativo
        'better-sqlite3',
      ],
    },
  },
});
