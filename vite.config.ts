import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { sites } from '@openai/sites-vite-plugin'

export default defineConfig({
  base: '/',
  plugins: [react(), sites()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    open: '/match/styles',
  },
})
