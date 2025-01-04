import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import {resolve} from "path";

export default defineConfig({
  root: 'src',
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
    port: 3001,
    open: true,
    historyApiFallback: true,
  },
})
