import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

import Directions from '../views/Directions.vue';
import Login from '../views/auth/Login.vue';
import TaskGroups from "../views/GameGroups.vue";
import Game from "../views/Game.vue";

const routes = [
    {
        path: '/',
        name: 'Directions',
        component: Directions,
        meta: { requiresAuth: true },
    },
    {
        path: '/directions/:directionId/groups',
        component: TaskGroups,
        meta: { requiresAuth: true },
        props: true,
    },
    {
        path: '/directions/:directionId/groups/:taskGroupId',
        component: Game,
        meta: { requiresAuth: true },
        props: true,
    },
    {
        path: '/auth/login',
        name: 'Login',
        component: Login,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next({ name: 'Login' });
    } else {
        next();
    }
});

export default router;
