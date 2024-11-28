import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue()
  ],
  root: 'src',
  build: {
    outDir: '../dist',
  },
  server: {
    port: 3001,
    open: true,
    historyApiFallback: true,
  },
})
