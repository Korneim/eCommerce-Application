import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';
import { useState } from 'react';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: 'Navigation One',
        key: '/login',
        icon: <MailOutlined />,
    },
    {
        label: 'Navigation Two',
        key: '/',
        icon: <AppstoreOutlined />,
    },
];

export const NavigateBlock: FC = () => {
    const [current, setCurrent] = useState('/');
    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
        navigate(e.key);
    };

    return (
        <Menu
            style={{ width: '90%', height: 50, display: 'flex', justifyContent: 'space-evenly' }}
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    );
};
