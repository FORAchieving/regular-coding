import { RouteRecordRaw } from 'vue-router';

const routes:Array<RouteRecordRaw> = [ {
    "name": "Video",
    "path": "/mg-video",
    component: () =>import("@/views/video/index.vue"),
    meta: {
        show: true,
    }
} ];

export default routes;