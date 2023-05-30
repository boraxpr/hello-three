import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
})
