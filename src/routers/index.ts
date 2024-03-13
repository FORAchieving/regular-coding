import { RouteRecordRaw } from 'vue-router';
import ButtonRoutes from "./Button.ts";
import CollapseRoutes from "./Collapse.ts";
import AlertRoutes from "./Alert.ts";
import MessageRoute from './Message.ts';
import DialogRoute from "./Dialog.ts";
import CarouselRoute from "./Carousel.ts";
import VideoRoute from "./Video.ts";



const routes:RouteRecordRaw[] = [
    {
        name: "home",
        path: "/home",
        component: () => import("@/views/home.vue"),
        meta: {
            show: true,
        }
    }, {
        "path": "",
        redirect: "/home",

    },
    {
        "path": "/",
        redirect: "/home",
    },
    ...ButtonRoutes,
    ...CollapseRoutes,
    ...AlertRoutes,
    ...MessageRoute,
    ...DialogRoute,
    ...CarouselRoute,
    ...VideoRoute
];

export default routes;