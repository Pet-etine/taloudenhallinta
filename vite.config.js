import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa"
import manifest from './manifest.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({ manifest: manifest })
  ],
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
      "Cross-Origin-Resource-Policy": "cross-origin" // ✅ Allows Firebase resources
    },
    cors: true,
    strictPort: true
  },
  build: {
    outDir: 'dist' // ✅ Correct placement
  }, 
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js'
  }
})
