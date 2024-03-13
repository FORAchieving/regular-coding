# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## 安装的插件

1. vite-plugin-eslint: 开机启动时 eslint 检测
2. @vue/eslint-config-typescript：vue 文件中 ts 语法检测
3. eslint-plugin-vue：vue 文件语法检测
4. @types/node: 让 ts 理解 js 的语法，import 等命令

- vscode 安装Volar 和 TypeScript Vue Plugin (Volar)；使用时需要禁用Vue2 安装的Veture

## 保存时自动按照eslint规则格式化代码
```
  "eslint.validate":["javascript", "javascriptreact", "vue","typescript", "typescriptreact" ],
  // 每次保存的时候自动格式化 
  "editor.formatOnSave": true,
  // 每次保存的时候将代码按eslint格式进行修复
  "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
  },
```

## vue-test-utils 测试

1. 组件挂载
  ```
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
  ```
2. 查询
  - find()/get();
  - findAll();
  - findComponent();
  - findAllComponents() 

3. 内容/属性
  - text()/html();
  - classes();
  - attributes();


## addEventListener 
`stopPropagation` 会阻断经过当前元素传递的捕获和冒泡行为
`options` 参数：
  - `signal` 属性可用作移除监听函数
  - `passive` 属性阻止用户调用 event.preventDefault();
  - `once` 属性只调用一次监听函数便销毁
  - `capture` 属性决定监听函数的执行顺序

## web native experimental technology
- [scroll-link animation](https://developer.mozilla.org/en-US/blog/scroll-progress-animations-in-css/)
- [view transition](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
- [navigate](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/navigate_event)



