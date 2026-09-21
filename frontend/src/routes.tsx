import { useRoutes } from 'react-router';

import HomePage from './pages/HomePage';

export default function Router() {
    return useRoutes([
        {
            path: '/',
            element: <HomePage />,
        },
    ]);
}
