import type { RouteRecordRaw } from "vue-router";



const messageRoute:RouteRecordRaw[] = [
    {
        name: "Message",
        path: "/mg-message",
        component: () => import('@/views/message/index.vue'),
        meta: {
            show: true,
        }
    }
];

export default messageRoute;