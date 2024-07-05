import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5001,
    proxy: {
      '/socket.io': {
        target: 'ws://0.0.0.0:3000',
        ws: true,
        changeOrigin: true
      }
    }
  },
})