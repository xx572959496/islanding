import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import { VarletImportResolver } from '@varlet/import-resolver'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
      vue(),
      components({
        resolvers: [VarletImportResolver()]
      }),
      autoImport({
        resolvers: [VarletImportResolver({ autoImport: true })]
      })
    ],
    server: {
        proxy: {
            '/api': {
                target: 'https://api.islanding.club/v1',
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        }
    }
})
