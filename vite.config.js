import { defineConfig } from 'vite'
/** @type {import('vite').UserConfig} */
export default defineConfig({
  // Include assets in the bundle
  // https://vitejs.dev/config/#assetsinclude
  assetsInclude: ['**/*.glb'],
  esbuild: {
    supported: {
      'top-level-await': true
    }
  },
})
