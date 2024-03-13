import { createApp } from 'vue';
import '@/assets/css/index.css';
import App from './App.vue';
import Router from "./router.ts";
import "./fortawesome.ts";

const app = createApp(App);
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(Router);

app.mount('#app');