import { Flex, Typography } from 'antd';
import type { FC } from 'react';
import type { Book } from './types.ts';
import { BookCard } from '../book-card/BookCard.tsx';

type Props = {
    title: string;
    books: Book[];
};

export const BooksList: FC<Props> = ({ title, books }) => {
    console.log(books);

    return (
        <Flex vertical gap={20}>
            <Flex style={{ marginLeft: 70 }}>
                <Typography.Title level={3}>{title}</Typography.Title>
            </Flex>

            <Flex wrap justify="space-evenly" gap={10}>
                {books.map((book) => (
                    <BookCard bookInfo={book} />
                ))}
            </Flex>
        </Flex>
    );
};
