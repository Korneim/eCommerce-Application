import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Slider } from '../../components/slider/Slider.tsx';
import { BooksList } from '../../components/book-list/BooksList.tsx';
import { NewsList } from '../../components/news-list/NewsList.tsx';
import { Flex } from 'antd';
import css from './main-page.module.scss';
import { getPaginatedProducts } from '../catalog/getAllBooks.ts';
import { mapCatalogData } from '../catalog/mapCatalogData.ts';
import { ProductProjection } from '@commercetools/platform-sdk';
import { createAnonymousCart } from '../cart/getCart.ts';
import { create } from 'zustand';
import { getAnonymousId } from '../../services/api/BuildClient.ts';

const selectedIds = ['3659ba76-2698-4c1a-8a2f-dfcdff9fb07a'];
const recommendedSelectedIds = ['2cb390e9-14bb-49da-bd43-eb9943b7a103'];

type CartStore = {
    cartId: string | null;
    anonymousId: string | null;
    setCartId: (id: string) => void;
    setAnonimusId: (id: string) => void;
};
export const useCartStore = create<CartStore>((set) => ({
    cartId: null,
    anonymousId: null,
    setCartId: (id): void => set({ cartId: id }),
    setAnonimusId: (id): void => set({ anonymousId: id }),
}));

export const MainPage: FC = () => {
    const [recommendedProducts, setrecommendedProducts] = useState<ProductProjection[]>([]);

    const [products, setProducts] = useState<ProductProjection[]>([]);
    const currentPage = 1;
    const pageSize = 4;
    const selectedSort = '';
    const searchText = '';

    const { cartId, anonymousId, setCartId, setAnonimusId } = useCartStore();

    useEffect(() => {
        const fetchCart = async (): Promise<void> => {
            if (!anonymousId) {
                const newAnonimusId = getAnonymousId();
                setAnonimusId(newAnonimusId);
            }
            if (anonymousId && !cartId) {
                const newCart = await createAnonymousCart(anonymousId);
                setCartId(newCart.id);
            }
        };
        fetchCart();
    }, [anonymousId, cartId, setAnonimusId, setCartId]);

    const loadBest = useCallback(async () => {
        try {
            const { products } = await getPaginatedProducts(
                currentPage,
                pageSize,
                selectedIds,
                selectedSort,
                searchText
            );
            setProducts(products);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
        }
    }, []);

    useEffect(() => {
        loadBest();
    }, [loadBest]);

    const mappedBooks = useMemo(() => {
        return products ? mapCatalogData(products) : [];
    }, [products]);

    const loadRecommended = useCallback(async () => {
        try {
            const { products } = await getPaginatedProducts(
                currentPage,
                pageSize,
                recommendedSelectedIds,
                selectedSort,
                searchText
            );
            setrecommendedProducts(products);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
        }
    }, []);

    useEffect(() => {
        loadRecommended();
    }, [loadRecommended]);

    const recommendMappedBook = useMemo(() => {
        return products ? mapCatalogData(recommendedProducts) : [];
    }, [products, recommendedProducts]);

    return (
        <Flex vertical={true} gap={15} className={css.wrapper}>
            <Slider />
            <BooksList title="Хиты продаж" books={mappedBooks} />
            <BooksList title="Рекомендации" books={recommendMappedBook} />
            <NewsList />
        </Flex>
    );
};
