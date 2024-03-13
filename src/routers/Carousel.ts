import { RouteRecordRaw } from 'vue-router';

const routes:Array<RouteRecordRaw> = [ {
    "name": "Carousel",
    "path": "/mg-carousel",
    component: () =>import("@/views/carousel/index.vue"),
    meta: {
        show: true,
    }
} ];

export default routes;