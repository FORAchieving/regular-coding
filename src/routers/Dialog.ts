import { RouteRecordRaw } from "vue-router";

const collapseRoutes:RouteRecordRaw[] = [
    {
        name: "Dialog",
        path: "/mg-dialog",
        component: () => import('@/views/dialog/index.vue'),
        meta: {
            show: true,
        }
    }
];

export default collapseRoutes;