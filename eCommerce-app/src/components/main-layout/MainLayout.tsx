import { Outlet } from 'react-router-dom';
import type { FC } from 'react';
import { Footer } from '../footer/Footer.tsx';

export const MainLayout: FC = () => {
    return (
        <main>
            <div>header</div>
            <Outlet />
            <Footer />
        </main>
    );
};
