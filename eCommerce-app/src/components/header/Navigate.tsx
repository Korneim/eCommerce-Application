import { LogoutOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Flex, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { routes } from '../../utils/router/routes.ts';
import css from './header.module.scss';
import useAuthStore from '../../store/useAuthStore.tsx';
import { revokeAllTokens } from '../../services/api/logout/revokeToken.tsx';

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
        icon: <UserOutlined size={45} className={css.icon} />,
    },
];

const createLoginMenuItems = (
    logout: () => void,
    clearAccessToken: () => void,
    accessToken: string | undefined
): MenuItem[] => [
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
        icon: <ShoppingCartOutlined size={45} className={css.icon} />,
    },
    {
        label: '',
        key: '',
        icon: (
            <Flex
                style={{ width: '35px', height: '35px' }}
                justify={'center'}
                align={'center'}
                onClick={() => {
                    logout();
                    if (accessToken) {
                        revokeAllTokens(accessToken);
                    }
                    clearAccessToken();
                }}
            >
                <LogoutOutlined size={45} className={css.icon} />
            </Flex>
        ),
    },
];

export const NavigateBlock: FC = () => {
    const { isLoggedIn, logout, accessToken, clearAccessToken } = useAuthStore();

    const items = useMemo(() => {
        return isLoggedIn ? createLoginMenuItems(logout, clearAccessToken, accessToken) : commonMenuItems;
    }, [isLoggedIn, logout, clearAccessToken, accessToken]);

    const [current, setCurrent] = useState('/');
    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
        navigate(e.key);
    };

    return <Menu className={css.menu} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
