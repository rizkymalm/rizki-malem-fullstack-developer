import { useRoutes } from 'react-router';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LoginCompany from './sections/login/LoginCompany';
import LoginEmployee from './sections/login/LoginEmployee';

export default function Router() {
    return useRoutes([
        {
            path: '/',
            element: <HomePage />,
        },
        {
            path: 'login',
            element: <LoginPage />,
            children: [
                {
                    path: '',
                    element: 'select type',
                },
                {
                    path: 'employee',
                    element: <LoginEmployee />,
                },
                {
                    path: 'company',
                    element: <LoginCompany />,
                },
            ],
        },
        {
            path: '/company',
            children: [
                {
                    path: '',
                    element: 'Company dashboard',
                },
            ],
        },
        {
            path: '/employee',
            children: [
                {
                    path: '',
                    element: 'Employee dashboard',
                },
            ],
        },
    ]);
}
