import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  root: 'src',
  build: {
    outDir: '../dist',
  },
  server: {
    port: 3002,
    open: true,
    historyApiFallback: true,
  },
})
