import { Button, Flex, Typography } from 'antd';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { getCart, mappedCart } from './getCart.ts';
import { LineItem } from '@commercetools/platform-sdk';
import { useCartStore } from '../../App.tsx';
import { CartItem } from '../../components/cart-item/CartItem.tsx';
import { routes } from '../../utils/router/routes.ts';
import { useNavigate } from 'react-router-dom';

export const CartPage: FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<LineItem[]>([]);
    const [totalPrice, settTotalPrice] = useState(0);

    const { anonymousId, setCartVersion } = useCartStore();

    const loadCartBooks = useCallback(async () => {
        if (anonymousId) {
            const cart = await getCart(anonymousId);
            setCartVersion(cart?.results[0]?.version);

            const data = cart?.results[0]?.lineItems;
            settTotalPrice(cart.results[0].totalPrice.centAmount);

            setProducts(data);
        }
    }, [anonymousId, setCartVersion]);

    const handleItemRemoved = useCallback(() => {
        loadCartBooks();
    }, [loadCartBooks]);

    useEffect(() => {
        loadCartBooks();
    }, [loadCartBooks]);

    const books = useMemo(() => mappedCart(products), [products]);

    return (
        <Flex vertical gap={20}>
            {books?.length ? (
                books.map((book) => <CartItem key={book.title} onItemRemoved={handleItemRemoved} books={book} />)
            ) : (
                <Flex vertical gap={20}>
                    <Typography>Ваша корзина пуста.</Typography>
                    <Button
                        onClick={() => {
                            navigate(routes.catalog);
                        }}
                    >
                        Вернунуться в каталог
                    </Button>
                </Flex>
            )}
            <Typography.Text>{`Итого : ${(totalPrice / 100).toString()} ₽`}</Typography.Text>
        </Flex>
    );
};
