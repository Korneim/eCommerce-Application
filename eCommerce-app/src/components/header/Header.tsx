import { Flex, Image } from 'antd';
import type { FC } from 'react';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/router/routes.ts';
import { NavigateBlock } from './Navigate.tsx';

export const Header: FC = () => {
    const navigate = useNavigate();

    return (
        <Flex gap={40}>
            <Flex
                onClick={() => {
                    navigate(routes.root);
                }}
            >
                <Image width={60} height={60} src={logo} preview={false} />
            </Flex>
            <NavigateBlock />
        </Flex>
    );
};
