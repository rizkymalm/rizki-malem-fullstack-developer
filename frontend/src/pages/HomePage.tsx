import '../App.css';

import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

import DigimalLogo from '../assets/digimal.png';
import ReactLogo from '../assets/react.svg';
import ViteLogo from '../assets/vitejs-logo.svg';
import { ButtonThemeSwitch } from '../components/common/buttons';
import Page from '../components/layouts/Page';
import { useTheme } from '../contexts/themeContext';
import { useAppDispatch } from '../redux/hooks';
import { getUserList } from '../redux/user/user.thunks';

const getStarted = [
    {
        title: 'Clone Repository',
        text: 'git clone https://github.com/rizkymalm/reactjs-vite-boilerplate.git',
    },
    {
        title: 'Install Dependencies',
        text: 'npm install',
    },
    {
        title: 'Start Development Server',
        text: 'npm run dev',
    },
    {
        title: 'Application will be available at:',
        text: 'http://localhost:5173',
    },
];

const HomePage = () => {
    const dispatch = useAppDispatch();
    const [isCopied, setIsCopied] = useState(-1);
    const { theme, toggleTheme } = useTheme();
    const handleCopy = async (index: number) => {
        const textCopied = getStarted[index].text;
        await navigator.clipboard.writeText(textCopied);
        setIsCopied(index);

        setTimeout(() => {
            setIsCopied(-1);
        }, 2000);
    };
    useEffect(() => {
        const getUser = async () => {
            await dispatch(
                getUserList({
                    queries: {
                        page: 1,
                        limit: 5,
                    },
                })
            );
        };
        void getUser();
    }, [dispatch]);

    return (
        <Page title="Home Page">
            <div className="fixed top-5 right-0 z-99 my-auto h-12.5 w-22.5">
                <ButtonThemeSwitch theme={theme} onClick={toggleTheme} />
            </div>
            <div className="bg-light-2 dark:bg-dark-2 relative flex min-h-screen max-w-full overflow-hidden transition-colors duration-300">
                <div className="bg-light-1 dark:bg-dark-1 dark:border-bg-dark-3 border-bg-light-3 dark:text-text-dark-primary text-text-light-primary container m-auto min-h-screen max-w-3xl flex-col items-center border px-5 py-10">
                    <img
                        src={DigimalLogo}
                        alt="ReactJS Logo"
                        className="m-auto w-32"
                    />
                    <h1 className="text-title-xl m-auto text-center font-medium">
                        React Boilerplate
                    </h1>
                    <div className="w-full flex-col py-10">
                        <div className="flex items-center justify-center gap-5">
                            <img
                                src={ReactLogo}
                                alt="ReactJS Logo"
                                className="w-16"
                            />
                            <img
                                src={ViteLogo}
                                alt="ReactJS Logo"
                                className="w-16"
                            />
                        </div>
                        <p className="text-text-lg p-10 text-center lg:px-20">
                            A production-ready React foundation with modern
                            tooling, scalable architecture, and developer-first
                            DX.
                        </p>
                    </div>
                    <div className="dark:text-text-dark-secondary text-textlight-secondary grid w-full grid-cols-2">
                        <div className="border-light-3 dark:border-dark-3 col-span-2 w-full border-r lg:col-span-1">
                            <h1 className="text-text-xl m-auto text-center font-medium">
                                Get Started
                            </h1>
                            <div className="flex w-full flex-col gap-4 p-4">
                                {getStarted.map((item, index: number) => (
                                    <div
                                        className="flex w-full flex-col gap-2"
                                        key={item.title}
                                    >
                                        <p className="text-text-md">
                                            {item.title}
                                        </p>
                                        <div
                                            className="bg-light-3 dark:bg-dark-3 relative rounded-xl px-4 py-2"
                                            id="editor"
                                        >
                                            <button
                                                className="absolute top-0 right-0 m-auto size-8"
                                                type="button"
                                                onClick={() =>
                                                    void handleCopy(index)
                                                }
                                            >
                                                <Icon
                                                    icon={
                                                        index === isCopied
                                                            ? 'material-symbols:check-rounded'
                                                            : 'solar:copy-outline'
                                                    }
                                                    width={18}
                                                    height={18}
                                                />
                                            </button>
                                            {item.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-2 w-full lg:col-span-1">
                            <h1 className="text-text-xl m-auto text-center font-medium">
                                Architecture
                            </h1>
                            <div className="flex w-full flex-col gap-4 p-4">
                                <div className="flex w-full flex-col gap-2">
                                    <div
                                        className="bg-light-3 dark:bg-dark-3 relative rounded-xl px-4 py-2"
                                        id="editor"
                                    >
                                        src
                                        <br />
                                        │<br />
                                        ├── assets/ # Images, fonts, icons{' '}
                                        <br />
                                        ├── components/
                                        <br />
                                        │ ├── common/
                                        <br />
                                        │ ├── layouts/
                                        <br />
                                        │ └── ui/
                                        <br />
                                        │<br />
                                        ├── hooks/ # Custom hooks
                                        <br />
                                        ├── pages/ # Application pages
                                        <br />
                                        ├── services/ # API & external services
                                        <br />
                                        ├── redux/ # Redux Toolkit
                                        <br />
                                        │ ├── reducers/
                                        <br />
                                        │ └── store.ts
                                        <br />
                                        │<br />
                                        ├── styles/ # Global styles
                                        <br />
                                        ├── types/ # TypeScript types
                                        <br />
                                        ├── utils/ # Helper functions
                                        <br />
                                        ├── App.tsx
                                        <br />
                                        └── main.tsx
                                        <br />
                                        └── routes.tsx
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-text-xs">
                            &copy; 2026 Digimal. All rights reserved.
                        </p>
                        <div className="flex gap-2">
                            <a
                                href="https://github.com/rizkymalm/reactjs-vite-boilerplate/blob/main/README.md"
                                target="_blank"
                                rel="noreferrer"
                                title="Documentation"
                            >
                                <Icon icon={'akar-icons:book'} width={18} />
                            </a>
                            <a
                                href="https://github.com/rizkymalm"
                                target="_blank"
                                rel="noreferrer"
                                title="Github"
                            >
                                <Icon icon={'mdi:github'} width={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default HomePage;
