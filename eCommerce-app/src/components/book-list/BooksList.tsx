import { Flex, Typography } from 'antd';
import type { FC } from 'react';
import type { Book } from './types.ts';
import { BookCard } from '../book-card/BookCard.tsx';

type Props = {
    title: string;
    books: Book[];
};

export const BooksList: FC<Props> = ({ title, books }) => {
    return (
        <Flex vertical gap={20}>
            <Flex>
                <Typography.Title level={2}>{title}</Typography.Title>
            </Flex>

            <Flex wrap justify="space-evenly">
                {books.map((book) => (
                    <BookCard key={book.title} bookInfo={book} />
                ))}
            </Flex>
        </Flex>
    );
};
