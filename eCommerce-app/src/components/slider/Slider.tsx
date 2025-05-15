import { Button, Carousel, Flex, Typography } from 'antd';
import css from './slider.module.scss';
import type { FC } from 'react';

export const Slider: FC = () => {
    return (
        <Carousel arrows className={css.arrow}>
            <Flex className={css.first} align="center" justify="center">
                <Flex className={css.content} gap={40}>
                    <Typography.Text className={css.text}>Вдохновение на каждой странице!</Typography.Text>
                    <Button disabled size="large" className={css.button} onClick={() => {}}>
                        Перейти в каталог
                    </Button>
                </Flex>
            </Flex>

            <Flex className={css.second} align="center" justify="center">
                <Flex className={css.content} gap={40}>
                    <Typography.Text className={css.text}>
                        Твоя книжная полка ждет тебя! Регистрация в один клик.
                    </Typography.Text>
                    <Button disabled size="large" className={css.button} onClick={() => {}}>
                        Регистрация
                    </Button>
                </Flex>
            </Flex>

            <Flex className={css.third} align="center" justify="center">
                <Flex className={css.content} gap={40}>
                    <Typography.Text className={css.text}>Мир книг у вас под рукой. Войдите!</Typography.Text>
                    <Button disabled size="large" className={css.button} onClick={() => {}}>
                        Войти
                    </Button>
                </Flex>
            </Flex>
        </Carousel>
    );
};
