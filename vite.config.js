import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

import useVitePlugins from './vite-plugins'
// https://vitejs.dev/config/
export default defineConfig({
  // publicDir: false,
  plugins: [
    ...useVitePlugins()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
    }
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx$/,
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@use "@/assets/styles/element/index.scss" as *;`,
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
  // 开发环境代理配置，请更换target为后端服务器地址
  server: {
    hmr:{
      overlay:false,
    },
    host: true,
    proxy: {
      // https://cn.vitejs.dev/config/#server-proxy
      '/dev-api': {
        target: 'http://127.0.0.1:4200',
        changeOrigin: true,
        rewrite: p => p.replace(/^\/dev-api/, '')
      }
    }
  },
  build: {
    // 当生产环境浏览器版本较低时，请改为es2015
    target: 'modules'
  }
})
