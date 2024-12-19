import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import {resolve} from "path";

export default defineConfig({
  root: resolve(__dirname, 'src'),
  base: './',
  build: {
    outDir: '../dist',
  },
  plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons/')],
        symbolId: 'icon-[name]',
      }),
  ],
  server: {
    port: 3002,
    open: true,
    historyApiFallback: true,
  },
})
