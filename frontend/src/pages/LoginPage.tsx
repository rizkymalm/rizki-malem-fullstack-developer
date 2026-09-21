import { Outlet } from 'react-router';

import Page from '../components/layouts/Page';

const LoginPage = () => {
    return (
        <Page title="Login Page">
            <div className="relative flex h-screen max-h-screen w-full justify-center overflow-hidden">
                <div className="dark:border-accent-dark border-accent-light bg-light-2 dark:bg-dark-2 text-textlight-primary dark:text-textDarkPrimary inset-0 m-auto flex min-h-40 w-md flex-col justify-center rounded-lg border-2 px-8 py-4">
                    <Outlet />
                </div>
            </div>
        </Page>
    );
};

export default LoginPage;
