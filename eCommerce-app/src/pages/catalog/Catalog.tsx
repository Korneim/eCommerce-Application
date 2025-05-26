import { Flex, Input, Pagination } from 'antd';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { getPaginatedProducts } from './getAllBooks.ts';
import { ProductProjection } from '@commercetools/platform-sdk';
import { mapCatalogData } from './mapCatalogData.ts';
import { BooksList } from '../../components/book-list/BooksList.tsx';
import { MenuFilter } from '../../components/menu/Menu.tsx';

export const CatalogPage: FC = () => {
    const [products, setProducts] = useState<ProductProjection[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const loadProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            const { products, total } = await getPaginatedProducts(currentPage, pageSize, selectedIds);
            setProducts(products);
            setTotal(total);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, pageSize, selectedIds]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts, selectedIds]);

    const mappedBooks = useMemo(() => {
        return products ? mapCatalogData(products) : [];
    }, [products]);

    const handlePageChange = (page: number, size: number): void => {
        if (page !== currentPage || size !== pageSize) {
            setCurrentPage(page);
            setPageSize(size);
        }
    };

    return (
        <Flex vertical style={{ width: '100%', minHeight: '100vh', paddingTop: 20 }}>
            <Flex vertical align={'end'}>
                <Flex style={{ width: '40%', paddingTop: 20 }}>
                    <Input.Search placeholder="Поиск" variant="filled" />
                </Flex>
            </Flex>
            <Flex vertical>
                <MenuFilter setSelectedIds={setSelectedIds} />
                <Flex vertical align={'center'}>
                    <BooksList title="Каталог" books={mappedBooks} />;
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={total}
                        onChange={handlePageChange}
                        showSizeChanger
                        pageSizeOptions={['10', '20', '50', '100']}
                        showTotal={(total) => `Всего ${total} товаров`}
                        disabled={isLoading}
                    />
                </Flex>
            </Flex>
        </Flex>
    );
};
