import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves the site under /4thepeople/; `npm run deploy` builds with that base.
export default defineConfig({
  base: process.env.SITE_BASE || '/',
  plugins: [react(), tailwindcss()],
})
