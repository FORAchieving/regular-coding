import { RouteRecordRaw } from "vue-router";

const collapseRoutes:RouteRecordRaw[] = [
    {
        name: "Collapse",
        path: "/mg-collapse",
        component: () => import('@/views/collapse/index.vue'),
        meta: {
            show: true,
        }
    }
];

export default collapseRoutes;