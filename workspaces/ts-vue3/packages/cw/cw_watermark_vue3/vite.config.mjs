import { defineConfig } from 'vite';
import path from 'node:path';
import fs from 'fs-extra';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createGenScopedName, lcapPlugin } from '@lcap/builder';

// 设置测试运行的时区
process.env.TZ = 'Asia/Shanghai';
const kb2Camcel = (name) => name.replace(/(?:^|-)([a-zA-Z0-9])/g, (m, $1) => $1.toUpperCase());
const rootPath = process.cwd();
// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const pkgInfo = fs.readJSONSync(path.resolve(rootPath, 'package.json'), {});

  return {
    plugins: [
      vue(),
      vueJsx(),
      lcapPlugin({
        type: 'extension',
        framework: 'vue3',
      }),
    ],
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.jsx', '.vue', '.mjs', '.cjs', '.json'],
      alias: {
        '@': path.resolve(rootPath, './src'),
        '@lcap-ui': path.resolve(rootPath, './.lcap/lcap-ui/package'),
      },
    },
    define: {
      'process.env': {
        VUE_APP_DESIGNER: false,
        NODE_ENV: command === 'build' ? 'production' : 'development',
      },
    },
    css: {
      modules: {
        generateScopedName: createGenScopedName(pkgInfo.name, './src'),
      },
    },
    build: {
      cssCodeSplit: false,
      target: ['es2020', 'edge88', 'firefox78', 'chrome56', 'safari14'],
      lib: {
        entry: 'src/index',
        name: kb2Camcel(pkgInfo.name),
        cssFileName: 'index',
      },
      rollupOptions: {
        external: ['vue', 'vue-i18n', 'vuex', 'pinia', 'vue-router'],
        output: {
          globals: {
            vue: 'Vue',
            'vue-router': 'VueRouter',
            'vue-i18n': 'VueI18n',
            vuex: 'Vuex',
            pinia: 'Pinia',
          },
        },
      },
      sourcemap: false,
    },
    test: {
      environment: 'jsdom',
    },
  };
});
