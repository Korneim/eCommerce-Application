import type { FC } from 'react';
import { Flex, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import scss from './footer.module.scss';

export const Footer: FC = () => {
    return (
        <Flex justify="center" className={scss.footer} align="center">
            <div className={scss.img}></div>

            <Flex className={scss.content}>
                <Flex vertical className={scss.contacts}>
                    <Typography.Title level={3} className={scss.title}>
                        Контакты
                    </Typography.Title>
                    <Flex className={scss.adreses}>Адрес: Казань, ул. Петербургская, 19</Flex>
                    <Flex className={scss.adreses}>Телефон: + 7(931)111-22-33</Flex>
                    <Flex className={scss.adreses}>Часы работы: 9.00 - 18.00</Flex>
                    <Flex className={scss.adreses}>Email: bg@rs.school</Flex>
                </Flex>

                <Flex vertical className={scss.about}>
                    <Typography.Title level={3} className={scss.title}>
                        Авторы
                    </Typography.Title>

                    <Flex className={scss.name}>
                        <Typography.Link className={scss.link} href="https://github.com/abeilleee" target="_blank">
                            Mayya
                        </Typography.Link>
                        <GithubOutlined className={scss.icon} />
                    </Flex>
                    <Flex className={scss.name}>
                        <Typography.Link className={scss.link} href="https://github.com/Korneim" target="_blank">
                            Mike
                        </Typography.Link>
                        <GithubOutlined className={scss.icon} />
                    </Flex>
                    <Flex className={scss.name}>
                        <Typography.Link className={scss.link} href="https://github.com/redinar" target="_blank">
                            Dinar
                        </Typography.Link>
                        <GithubOutlined className={scss.icon} />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
