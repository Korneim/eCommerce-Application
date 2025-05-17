import { Button, Carousel, Flex, Typography } from 'antd';
import css from './slider.module.scss';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/router/routes.ts';

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
        </Carousel>
    );
};
