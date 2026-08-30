import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' faz os assets funcionarem em qualquer caminho do GitHub Pages
// (tanto em usuario.github.io/ quanto em usuario.github.io/link-bio/)
export default defineConfig({
  plugins: [react()],
  base: './',
})
