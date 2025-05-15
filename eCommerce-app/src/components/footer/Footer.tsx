import type { FC } from 'react';
import { Flex, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import scss from './footer.module.scss';

export const Footer: FC = () => {
    return (
        <Flex justify="center" gap={47} className={scss.footer} align="center">
            <div className={scss.img}></div>

            <Flex gap={47}>
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
                        <Typography.Link href="https://github.com/abeilleee" target="_blank">
                            Mayya
                        </Typography.Link>
                        <GithubOutlined className={scss.icon} />
                    </Flex>
                    <Flex justify="space-between">
                        <Typography.Link href="https://github.com/Korneim" target="_blank">
                            Mike
                        </Typography.Link>
                        <GithubOutlined className={scss.icon} />
                    </Flex>
                    <Flex justify="space-between">
                        <Typography.Link href="https://github.com/redinar" target="_blank">
                            Dinar
                        </Typography.Link>
                        <GithubOutlined className={scss.icon} />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
