import { Outlet } from 'react-router-dom';
import type { FC } from 'react';
import { Footer } from '../footer/Footer.tsx';
import { Header } from '../header/Header.tsx';

export const MainLayout: FC = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};
