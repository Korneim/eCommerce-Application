import { Flex } from 'antd';
import type { FC } from 'react';
import { Slider } from '../../components/slider/Slider.tsx';
import { BooksList } from '../../components/book-list/BooksList.tsx';
import { mockData } from './mockData.ts';
import { NewsList } from '../../components/news-list/NewsList.tsx';
import css from './main-page.module.scss';

export const MainPage: FC = () => {
    return (
        <>
            <Slider />
            <Flex vertical={true} gap={15} className={css.wrapper}>
                <BooksList title="Хиты продаж" books={mockData} />
                <BooksList title="Рекомендации" books={mockData} />
                <NewsList />
            </Flex>
        </>
    );
};
