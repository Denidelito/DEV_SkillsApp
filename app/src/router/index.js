import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

import Directions from '../views/Directions.vue';
import Login from '../views/auth/Login.vue';
import TaskGroups from "../views/GameGroups.vue";
import Game from "../views/Game.vue";
import GameOver from "../views/GameOver.vue";

const routes = [
    {
        path: '/app',
        name: 'Directions',
        component: Directions,
        meta: { requiresAuth: true },
    },
    {
        path: '/app/directions/:directionId/groups',
        component: TaskGroups,
        meta: { requiresAuth: true },
        props: true,
    },
    {
        path: '/app/directions/:directionId/groups/:taskGroupId',
        name: 'Game',
        component: Game,
        meta: { requiresAuth: true },
        props: true,
    },{
        path: '/app/directions/:directionId/groups/:taskGroupId/game-over/',
        name: 'GameOver',
        component: GameOver,
        meta: { requiresAuth: true },
    },

    {
        path: '/app/auth/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/app',
    },
];

const router = createRouter({
    history: createWebHistory('/app'),
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
