import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Users from "../views/Users.vue";

const requireAuth = (to, from, next) => {
    const authStore = useAuthStore();

    if (!authStore.isAuthenticated()) {
        next('/admin/login');
    } else {
        next();
    }
};

const routes = [
    {
        path: '/admin/login',
        component: Login,
    },
    {
        path: '/admin/',
        component: Dashboard,
        beforeEnter: requireAuth,
        children: [
            {
                path: 'users',
                component: Users,
            },
        ],
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/admin',
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
