import { defineConfig } from 'vite';
import path from 'path';
import { createVuePlugin as vue2 } from '@lcap/vite-plugin-vue2';
import { createGenScopedName, lcapPlugin } from '@lcap/builder';

// 设置测试运行的时区
process.env.TZ = 'Asia/Shanghai';
const kb2Camcel = (name) => name.replace(/(?:^|-)([a-zA-Z0-9])/g, (m, $1) => $1.toUpperCase());

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const pkgInfo = require(`${process.cwd()}/package.json`);
  return {
    plugins: [
      vue2({
        jsx: true,
        jsxInclude: [
          /.(jsx|tsx)$/,
          /\.lcap\/.*(js|ts)$/,
        ],
        jsxOptions: {
          vModel: true,
          functional: false,
          injectH: true,
          vOn: true,
          compositionAPI: false,
        },
      }),
      lcapPlugin({
        type: 'extension',
        framework: 'vue2',
      }),
    ],
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.jsx', '.vue', '.mjs', '.cjs', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@lcap-ui': path.resolve(__dirname, './.lcap/lcap-ui/package'),
        'cloud-ui.vusion/src': path.resolve(__dirname, './.lcap/lcap-ui/package/cloudui'),
        'swiper/swiper-bundle.esm.js': path.resolve(__dirname, './node_modules/swiper/swiper-bundle.esm.js'),
        '@joskii/jflow-core': path.resolve(__dirname, './node_modules/@joskii/jflow-core/dist/jflow.es.min.js'),
        '@joskii/jflow-vue2-plugin': path.resolve(__dirname, './node_modules/@joskii/jflow-vue2-plugin/dist/jflow-vue2-plugin.es.min.js'),
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
      },
      sourcemap: true,
    },
    test: {
      environment: 'jsdom',
    },
  };
});
