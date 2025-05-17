import type { FC } from 'react';
import { Flex, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import scss from './footer.module.scss';

export const Footer: FC = () => {
    return (
        <Flex justify="center" gap={47} className={scss.footer} align="center">
            <div className={scss.img}></div>

            <Flex gap={67} className={scss.content}>
                <Flex vertical className={scss.contacts}>
                    <Typography.Title level={3}>Контакты</Typography.Title>
                    <Typography.Text className={scss.adreses}>
                        ул. Петербургская, 19, Казань, Россия + 7 (931) 111-22-33 Пн-Вс 9.00 - 18.00 bg@rs.school
                    </Typography.Text>
                </Flex>

                <Flex vertical className={scss.about}>
                    <Typography.Title level={3} className={scss.title}>
                        О нас
                    </Typography.Title>

                    <Flex className={scss.name}>
                        <Typography.Link href="https://github.com/abeilleee" target="_blank">
                            Maya
                        </Typography.Link>
                        <GithubOutlined className={scss.icon} />
                    </Flex>
                    <Flex className={scss.name}>
                        <Typography.Link href="https://github.com/Korneim" target="_blank">
                            Mike
                        </Typography.Link>
                        <GithubOutlined className={scss.icon} />
                    </Flex>
                    <Flex className={scss.name}>
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
