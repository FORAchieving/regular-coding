import { RouteRecordRaw } from 'vue-router';

const routes:Array<RouteRecordRaw> = [ {
    "name": "Button",
    "path": "/mg-button",
    component: () =>import("@/views/button/index.vue"),
    meta: {
        show: true,
    }
} ];

export default routes;