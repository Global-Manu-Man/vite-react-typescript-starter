import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['lucide-react'],
      output: {
        globals: {
          'lucide-react': 'lucide'
        }
      }
    }
  },
  optimizeDeps: {
    include: ['lucide-react']
  }
});