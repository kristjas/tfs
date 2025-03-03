import { createRouter, createWebHistory } from 'vue-router'
import RouteManagement from "../views/PickTime.vue";
import Homepage from "../views/Homepage.vue";
import AddTimeSlot from "@/views/AddTimeSlot.vue";


const routes = [{
        path: "/",
        name: "Homepage",
        component: Homepage,
    }, {
        path: '/PickTime',
        name: 'PickTime',
        component: RouteManagement,
    },
   
    { 
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