import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base URL, set to empty string to make it work with relative paths
  base: '/',
  // Ensure build generates correct output for Vercel
  build: {
    // Output directory for production build
    outDir: 'dist',
    // Clean the output directory before build
    emptyOutDir: true,
    // Ensure chunks and assets use relative paths
    assetsInlineLimit: 4096,
    // Emit proper sourcemaps
    sourcemap: true
  }
})
