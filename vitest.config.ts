/// <reference types="vitest" />
import { defineConfig } from 'vite';

// 解析vue文件
import vue from '@vitejs/plugin-vue';
// 解析tsx/jsx文件
import vueJsx from '@vitejs/plugin-vue-jsx';



// https://vitejs.dev/config/
export default defineConfig({
    plugins: [ vue(),vueJsx() ],
    test: {
        environment: 'jsdom',
        globals: true
    }
});
