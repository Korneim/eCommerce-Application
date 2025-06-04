import { Flex } from 'antd';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { getCart, mappedCart } from './getCart.ts';
import { useCartStore } from '../main/MainPage.tsx';
import { LineItem } from '@commercetools/platform-sdk';

export const CartPage: FC = () => {
    const [products, setProducts] = useState<LineItem[]>([]);

    const { anonymousId, cartId } = useCartStore();

    const loadCartBooks = useCallback(async () => {
        const cart = await getCart(anonymousId);
        const data = cart?.results[0]?.lineItems;
        setProducts(data);
    }, [anonymousId]);

    useEffect(() => {
        loadCartBooks();
    }, [loadCartBooks]);

    const books = useMemo(() => mappedCart(products), [products]);

    useEffect(() => {
        console.log(books);
    }, [books]);

    return <Flex></Flex>;
};
