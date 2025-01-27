import { createRouter, createWebHistory } from 'vue-router'
import RouteManagement from "../views/RouteManagement.vue";
import AllRouts from "../views/AllRoutes.vue";
import test from "../views/test.vue";


const routes = [{
        path: "/",
        name: "AllRouts",
        component: AllRouts,
    }, {
        path: '/routemanagement',
        name: 'RouteManagement',
        component: RouteManagement,
    },
    {
        path: '/test',
        name: 'test',
        component: test,
    },
    { //will route to AllPosts view if none of the previous routes apply
        path: "/:catchAll(.*)",
        name: "AllRouts",
        component: AllRouts,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router