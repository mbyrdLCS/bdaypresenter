import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2015', // Target older browsers like Firestick Chromium
    cssTarget: 'chrome61', // Target older Chrome version
  },
})
