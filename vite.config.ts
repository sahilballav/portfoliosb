import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // 👇 REQUIRED for GitHub Pages
  base: '/portfoliosb/',

  // 👇 ensures assets (images/videos) are bundled correctly
  build: {
    assetsDir: 'assets',
  }
})
