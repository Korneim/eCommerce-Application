import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import { MainLayout } from '../../components/main-layout/MainLayout.tsx';
import type { FC } from 'react';
import { routes } from './routes.ts';
import { NotFoundPage } from '../../pages/not-found/NotFound.tsx';
import LoginPage from '../../pages/login/Login.tsx';
import { MainPage } from '../../pages/main/MainPage.tsx';
import { RegistrationPage } from '../../pages/registration/Registration.tsx';
import useAuthStore from '../../store/useAuthStore';
import { CatalogPage } from '../../pages/catalog/Catalog.tsx';
import UserProfilePage from '../../pages/user-profile/UserProfile.tsx';
import { ProductPage } from '../../pages/product/ProductPage.tsx';

export const Router: FC = () => {
    const { isLoggedIn } = useAuthStore();

    function authLoader(): Response | null {
        if (isLoggedIn) {
            return redirect(routes.root);
        }
        return null;
    }

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
                    element: <RegistrationPage />,
                    loader: authLoader,
                },
                {
                    path: routes.login,
                    element: <LoginPage />,
                    loader: authLoader,
                },
                {
                    path: routes.cart,
                    element: <div>cart</div>,
                },
                {
                    path: routes.catalog,
                    element: <CatalogPage />,
                },
                {
                    path: routes.about,
                    element: <div>about</div>,
                },
                {
                    path: routes.profile,
                    element: <UserProfilePage/>,
                },
                {
                    path: routes.product,
                    element: <ProductPage />,
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
