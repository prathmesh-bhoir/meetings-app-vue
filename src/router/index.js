import Router from 'vue-router';
import CalendarPage from '@/components/pages/CalendarPage';
import LoginPage from '@/components/pages/LoginPage';
import SignupPage from '@/components/pages/SignupPage';

const router = new Router({
    mode: 'history',
    routes: [
        {
            name: 'calendar',
            path: '/calendar',
            component: CalendarPage
        },
        {
            name: 'login',
            path: '/login',
            component: LoginPage,
        },
        {
            name: 'signup',
            path: '/',
            component: SignupPage,
        },
    ]
})

export default router;