import { Button, Carousel, Flex, Image, Typography } from 'antd';
import css from './slider.module.scss';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/router/routes.ts';
import bookIcon from '../../assets/images/bookIcon.png';

export const Slider: FC = () => {
    const navigate = useNavigate();

    return (
        <Carousel arrows className={css.arrow}>
            <Flex className={css.first} align="center" justify="center">
                <Flex className={css.content} gap={40}>
                    <Typography.Text className={css.text}>Вдохновение на каждой странице!</Typography.Text>
                    <Button
                        size="large"
                        className={css.button}
                        onClick={() => {
                            navigate(routes.catalog);
                        }}
                    >
                        Перейти в каталог
                    </Button>
                </Flex>
            </Flex>

            <Flex className={css.second} align="center" justify="center">
                <Flex className={css.content} gap={40}>
                    <Typography.Text className={css.text}>
                        Твоя книжная полка ждет тебя! Регистрация в один клик.
                    </Typography.Text>
                    <Button
                        size="large"
                        className={css.button}
                        onClick={() => {
                            navigate(routes.register);
                        }}
                    >
                        Регистрация
                    </Button>
                </Flex>
            </Flex>

            <Flex className={css.third} align="center" justify="center">
                <Flex className={css.content} gap={40}>
                    <Typography.Text className={css.text}>Мир книг у вас под рукой. Войдите!</Typography.Text>
                    <Button
                        size="large"
                        className={css.button}
                        onClick={() => {
                            navigate(routes.login);
                        }}
                    >
                        Войти
                    </Button>
                </Flex>
            </Flex>
            <Flex className={css.four} align="center" justify="center">
                <Flex gap={40}>
                    <Flex>
                        <Typography.Title className={css.sale} style={{ color: '#fff' }} level={1}>
                            -10%
                        </Typography.Title>
                    </Flex>
                    <Flex vertical align="center" justify="center">
                        <Flex>
                            <Typography.Title className={css.title} style={{ color: '#fff' }}>
                                На все товары по промокоду:
                            </Typography.Title>
                        </Flex>
                        <Flex>
                            <Typography.Title className={css.promo} style={{ color: '#fff' }}>
                                BOOKISH10
                            </Typography.Title>
                        </Flex>
                        <Flex>
                            <Image className={css.image} preview={false} src={bookIcon}></Image>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Carousel>
    );
};
