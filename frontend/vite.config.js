import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,      // 👈 force Vite to poll for changes
      interval: 100,         // optional: check every 100ms
    },
  },
})

