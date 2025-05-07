import { Outlet } from 'react-router-dom';
import type { FC } from 'react';
import { Footer } from '../footer/Footer.tsx';
import css from './main-layout.module.scss';

export const MainLayout: FC = () => {
    return (
        <main className={css.wrapper}>
            <div>header</div>
            <Outlet />
            <Footer />
        </main>
    );
};
