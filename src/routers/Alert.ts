import { RouteRecordRaw } from 'vue-router';

const routes:Array<RouteRecordRaw> = [ {
    "name": "Alert",
    "path": "/mg-alert",
    component: () =>import("@/views/alert/index.vue"),
    meta: {
        show: true,
    }
} ];

export default routes;