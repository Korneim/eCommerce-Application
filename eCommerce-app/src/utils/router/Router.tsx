import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '../../components/main-layout/MainLayout.tsx';
import type { FC } from 'react';
import { routes } from './routes.ts';
import { NotFoundPage } from '../../pages/not-found/NotFound.tsx';
import LoginPage from '../../pages/login/Login.tsx';
import { MainPage } from '../../pages/main/MainPage.tsx';

export const Router: FC = () => {
    const router = createBrowserRouter([
        {
            element: <MainLayout />,
            children: [
                {
                    path: routes.root,
                    element: <MainPage />,
                },
                {
                    path: routes.register,
                    element: <div>registration</div>,
                },
                {
                    path: routes.login,
                    element: <LoginPage />,
                },
                {
                    path: routes.cart,
                    element: <div>cart</div>,
                },
                {
                    path: routes.catalog,
                    element: <div>catalog</div>,
                },
                {
                    path: routes.about,
                    element: <div>about</div>,
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
