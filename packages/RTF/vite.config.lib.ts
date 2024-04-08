import { defineConfig } from 'vite';
import wasm from 'vite-plugin-wasm';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [wasm()],
  build: {
    target: 'ES2022',
    lib: {
      entry: 'index.ts', // 设置入口文件
      name: 'vite-lib',
    },
    sourcemap: true,
  },
});
