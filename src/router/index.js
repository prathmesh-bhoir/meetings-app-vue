import Router from 'vue-router';
import CalendarPage from '@/components/pages/CalendarPage';
import LoginPage from '@/components/pages/LoginPage';
import SignupPage from '@/components/pages/SignupPage';
import MeetingsPage from '@/components/pages/MeetingsPage';
import FilterMeetings from '@/components/FilterMeetings';
import AddMeeting from '@/components/AddMeeting';
import TeamsPage from '@/components/pages/TeamsPage';
import AddTeam from '@/components/AddTeam';

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
            component: MeetingsPage,
            children: [
                {
                    name: 'filter-meetings',
                    path: '',
                    component: FilterMeetings
                },
                {
                    name: 'add-meeting',
                    path: 'add',
                    component: AddMeeting
                }
            ]
        },{
            name: 'teams',
            path: '/teams',
            component: TeamsPage,
            children: [
                {
                    name: 'add-team',
                    path: 'add',
                    component: AddTeam
                }
            ]
        }
    ]
})

export default router;