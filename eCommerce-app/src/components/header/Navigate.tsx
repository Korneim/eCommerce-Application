import { LogoutOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { routes } from '../../utils/router/routes.ts';
import css from './header.module.scss';
import useAuthStore from '../../store/useAuthStore.tsx';

type MenuItem = Required<MenuProps>['items'][number];

const commonMenuItems: MenuItem[] = [
    {
        label: 'Каталог',
        key: routes.catalog,
    },
    {
        label: 'Главная',
        key: routes.root,
    },
    {
        label: 'О нас',
        key: routes.about,
    },
    {
        label: 'Регистрация',
        key: routes.register,
    },
    {
        label: '',
        key: routes.cart,
        icon: <ShoppingCartOutlined className={css.icon} />,
    },
    {
        label: '',
        key: routes.login,
        icon: <UserOutlined className={css.icon} />,
    },
];

const loginMenuItems: MenuItem[] = [
    {
        label: 'Каталог',
        key: routes.catalog,
    },
    {
        label: 'Главная',
        key: routes.root,
    },
    {
        label: 'О нас',
        key: routes.about,
    },
    {
        label: 'Профиль',
        key: routes.profile,
    },
    {
        label: '',
        key: routes.cart,
        icon: <ShoppingCartOutlined className={css.icon} />,
    },
    {
        label: '',
        key: routes.root,
        icon: <LogoutOutlined className={css.icon} onClick={() => {}} />,
    },
];

export const NavigateBlock: FC = () => {
    const { isLoggedIn } = useAuthStore();

    console.log(isLoggedIn);

    const items = useMemo(() => {
        return isLoggedIn ? [...loginMenuItems] : [...commonMenuItems];
    }, [isLoggedIn]);

    const [current, setCurrent] = useState('/');
    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
        navigate(e.key);
    };

    return <Menu className={css.menu} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
