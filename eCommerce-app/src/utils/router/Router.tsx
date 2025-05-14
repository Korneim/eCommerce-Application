import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '../../components/main-layout/MainLayout.tsx';
import type { FC } from 'react';
import { routes } from './routes.ts';
import { NotFoundPage } from '../../pages/not-found/NotFound.tsx';
import LoginPage from '../../pages/login/Login.tsx';

export const Router: FC = () => {
    const router = createBrowserRouter([
        {
            element: <MainLayout />,
            children: [
                {
                    path: routes.root,
                    element: <div>main</div>,
                },
                {
                    path: routes.register,
                    element: <div>registration</div>,
                },
                {
                    path: routes.login,
                    element: <LoginPage />,
                },
            ],
        },
        {
            path: '*',
            element: <NotFoundPage />,
        },
    ]);

    return <RouterProvider router={router} />;
};
