import type { FC } from 'react';
import footerImg from '../../assets/images/footerImg.png';
import { Flex, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import scss from './footer.module.scss';

export const Footer: FC = () => {
    return (
        <Flex justify="space-around" className={scss.footer}>
            <img src={footerImg} alt="Books" className={scss.img} />
            <Flex vertical>
                <Typography.Title level={3}>Контакты</Typography.Title>
                <Typography.Text>ул. Петербургская, 19, Казань, Россия</Typography.Text>
                <Typography.Text>+ 7 (931) 111-22-33</Typography.Text>
                <Typography.Text>Пн-Вс 9.00 - 18.00</Typography.Text>
                <Typography.Text>bg@rs.school</Typography.Text>
            </Flex>
            <Flex vertical className={scss.about}>
                <Typography.Title level={3}>О нас</Typography.Title>

                <Flex justify="space-between">
                    <Typography.Link href="https://github.com/abeilleee">Mayya</Typography.Link>
                    <GithubOutlined className={scss.icon} />
                </Flex>
                <Flex justify="space-between">
                    <Typography.Link href="https://github.com/Korneim">Mike</Typography.Link>
                    <GithubOutlined className={scss.icon} />
                </Flex>
                <Flex justify="space-between">
                    <Typography.Link href="https://github.com/redinar">Dinar</Typography.Link>
                    <GithubOutlined className={scss.icon} />
                </Flex>
            </Flex>
        </Flex>
    );
};
