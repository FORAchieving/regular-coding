// 只能分开引用
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routers/index.ts';


export default createRouter({
    history: createWebHistory(),
    routes
});