import type { FC } from 'react';
import { Flex, Typography } from 'antd';
import { NewsCard } from '../news-cards-list/NewsCard.tsx';
import css from './news-list.module.scss';
import { data } from './data.ts';

export const NewsList: FC = () => {
    return (
        <Flex vertical className={css.container}>
            <Typography.Title className={css.title} level={2}>
                Новости
            </Typography.Title>
            <Flex className={css.card}>
                {data.map((item) => (
                    <NewsCard key={item.title} dataInfo={item} />
                ))}
            </Flex>
        </Flex>
    );
};
