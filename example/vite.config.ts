import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'yggjs_rtoast': path.resolve(__dirname, '../src'),
      'yggjs_rtoast/tech': path.resolve(__dirname, '../src/tech'),
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
