import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Login from '../pages/Login.vue'
import Users from '../pages/Users.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/',
        name: 'Users',
        component: Users,
        meta: { requiresAuth: true }
    }
];

let router = new VueRouter({
    mode: 'history',
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isLoggedIn) {
            next('/login')
        }
        next()
    } else {
        next()
    }
})

export default router