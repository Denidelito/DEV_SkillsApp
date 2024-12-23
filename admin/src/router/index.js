import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Users from "../views/Users.vue";
import Directions from "../views/Directions.vue";
import TaskGroups from "../views/TaskGroups.vue";
import TaskGroup from "../views/Tasks.vue";
import UserResults from "../views/UserResults.vue";


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
            {
                path: 'directions',
                component: Directions,
            },
            {
                path: 'directions/:directionId/groups',
                component: TaskGroups,
                beforeEnter: requireAuth,
                props: true,
            },
            {
                path: 'directions/:directionId/groups/:taskGroupId',
                component: TaskGroup,
                beforeEnter: requireAuth,
                props: true,
            },
            {
                path: 'users/:userId/results',
                component: UserResults,
                beforeEnter: requireAuth,
                props: true,
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
