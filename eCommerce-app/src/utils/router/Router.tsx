import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '../../components/main-layout/MainLayout.tsx';
import type { FC } from 'react';
import { routes } from './routes.ts';

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
                    element: <div>login</div>,
                },
                {
                    path: '*',
                    element: <div>404 page</div>,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};
