import type { FC } from 'react';
import { Slider } from '../../components/slider/Slider.tsx';
import { BooksList } from '../../components/book-list/BooksList.tsx';
import { mockData } from './mockData.ts';
import { NewsList } from '../../components/news-list/NewsList.tsx';
import { Flex } from 'antd';
import css from './main-page.module.scss';

export const MainPage: FC = () => {
    return (
        <Flex vertical={true} gap={15} className={css.wrapper}>
            <Slider />
            <BooksList title="Хиты продаж" books={mockData} />
            <BooksList title="Рекомендации" books={mockData} />
            <NewsList />
        </Flex>
    );
};
