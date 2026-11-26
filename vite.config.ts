import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  esbuild: {
    legalComments: 'none',
    drop: ['debugger'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          katex: ['katex'],
          icons: ['lucide-react'],
        },
      },
    },
  },
});
