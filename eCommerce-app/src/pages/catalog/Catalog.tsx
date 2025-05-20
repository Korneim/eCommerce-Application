import { FC, useMemo } from 'react';
import { BooksList } from '../../components/book-list/BooksList.tsx';
import { mapCatalogData } from './mapCatalogData.ts';
import { getAllProducts } from './getAllBooks.ts';
import { Flex, Input } from 'antd';
import { MenuFilter } from '../../components/menu/Menu.tsx';

const books = await getAllProducts();

export const CatalogPage: FC = () => {
    const mappedBooks = useMemo(() => {
        return books ? mapCatalogData(books) : [];
    }, []);

    return (
        <Flex vertical align={'end'}>
            <Flex style={{ width: '40%', paddingTop: 20 }}>
                <Input.Search placeholder="Filled" variant="filled" />
            </Flex>
            <Flex>
                <MenuFilter />
                <BooksList title="все книги " books={mappedBooks} />;
            </Flex>
        </Flex>
    );
};
