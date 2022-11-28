import Router from 'vue-router';
import CalendarPage from '@/components/pages/CalendarPage';
import LoginPage from '@/components/pages/LoginPage';
import SignupPage from '@/components/pages/SignupPage';
import MeetingsPage from '@/components/pages/MeetingsPage';

const router = new Router({
    mode: 'history',
    routes: [
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
        {
            name: 'calendar',
            path: '/calendar',
            component: CalendarPage
        },{
            name: 'meetings',
            path: '/meetings',
            component: MeetingsPage
        }
    ]
})

export default router;