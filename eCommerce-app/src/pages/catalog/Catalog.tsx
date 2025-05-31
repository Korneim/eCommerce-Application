import { Flex, Input, Pagination } from 'antd';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { getPaginatedProducts } from './getAllBooks.ts';
import { ProductProjection } from '@commercetools/platform-sdk';
import { mapCatalogData } from './mapCatalogData.ts';
import { BooksList } from '../../components/book-list/BooksList.tsx';
import { MenuFilter } from '../../components/menu/Menu.tsx';
import { SelectMenu } from '../../components/select/SelectMenu.tsx';
import css from './catalog.module.scss';

export const CatalogPage: FC = () => {
    const [products, setProducts] = useState<ProductProjection[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [selectedSort, setSelectedSort] = useState<string>('');
    const [searchText, setSearchText] = useState<string>('');

    const loadProducts = useCallback(async () => {
        console.log(selectedIds);
        setIsLoading(true);
        try {
            const { products, total } = await getPaginatedProducts(
                currentPage,
                pageSize,
                selectedIds,
                selectedSort,
                searchText
            );
            setProducts(products);
            setTotal(total);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, pageSize, selectedIds, selectedSort, searchText]);
    console.log(products);
    useEffect(() => {
        loadProducts();
    }, [loadProducts, selectedIds, selectedSort, searchText]);

    const mappedBooks = useMemo(() => {
        return products ? mapCatalogData(products) : [];
    }, [products]);

    const handlePageChange = (page: number, size: number): void => {
        if (page !== currentPage || size !== pageSize) {
            setCurrentPage(page);
            setPageSize(size);
        }
    };
    console.log(selectedIds);
    return (
        <Flex vertical className={css.block}>
            <Flex vertical gap={10}>
                <Flex align={'end'} justify={'space-between'} className={css.filters} gap={10}>
                    <SelectMenu setSelectedSort={setSelectedSort} />
                    <MenuFilter setSelectedIds={setSelectedIds} />
                    <Input.Search
                        style={{ width: '30%' }}
                        className={css.search}
                        placeholder="Поиск"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onSearch={() => {
                            setCurrentPage(1);
                            loadProducts();
                        }}
                    />
                </Flex>

                <Flex vertical align={'center'}>
                    <BooksList title="Каталог" books={mappedBooks} />
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
