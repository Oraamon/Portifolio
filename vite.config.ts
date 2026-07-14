import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages: https://oraamon.github.io/Portifolio/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Portifolio/' : '/',
  plugins: [react(), tailwindcss()],
}))
