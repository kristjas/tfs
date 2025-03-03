import { createRouter, createWebHistory } from 'vue-router'
import RouteManagement from "../views/RouteManagement.vue";
import AllRouts from "../views/AllRoutes.vue";
import Homepage from "../views/Homepage.vue";
import test from "../views/test.vue";
import AddTimeSlot from "@/views/AddTimeSlot.vue";


const routes = [{
        path: "/",
        name: "Homepage",
        component: Homepage,
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
        name: "Homepage",
        component: Homepage,
    },
    {
        path: "/add-slot",
        name: "AddTimeSlot",
        component: AddTimeSlot,
      },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router