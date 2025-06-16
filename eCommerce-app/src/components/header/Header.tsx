import { Flex, Image } from 'antd';
import type { FC } from 'react';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/router/routes.ts';
import { NavigateBlock } from './Navigate.tsx';
import css from './header.module.scss';

export const Header: FC = () => {
    const navigate = useNavigate();

    return (
        <Flex className={css.container}>
            <Flex
                onClick={() => {
                    navigate(routes.root);
                }}
            >
                <Image width={100} height={100} src={logo} preview={false} />
            </Flex>
            <NavigateBlock />
        </Flex>
    );
};
