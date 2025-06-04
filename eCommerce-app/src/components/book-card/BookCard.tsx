import type { FC } from 'react';
import { Button, Flex, Image, Typography } from 'antd';
import type { Book } from '../book-list/types.ts';
import css from './book-card.module.scss';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../pages/main/MainPage.tsx';
import { createAdminApiRoot } from '../../services/api/BuildClient.ts';

type Props = {
    bookInfo: Book;
};

export const BookCard: FC<Props> = ({ bookInfo }) => {
    const navigate = useNavigate();
    const { title, imageUrl, price, discountPrice, description, id } = bookInfo;
    const productUrl = `/product/${id}`;
    const { cartId } = useCartStore();

    const handleCartClick = async (): Promise<void> => {
        const apiRoot = createAdminApiRoot();
        if (cartId)
            try {
                await apiRoot
                    .carts()
                    .withId({ ID: cartId })
                    .post({
                        body: {
                            version: 1,
                            actions: [
                                {
                                    action: 'addLineItem',
                                    productId: bookInfo.id,
                                    quantity: 1,
                                },
                            ],
                        },
                    })
                    .execute();

                console.log('Товар добавлен в корзину');
            } catch (error) {
                console.error('Ошибка при добавлении в корзину:', error);
            }
    };

    return (
        <Flex
            vertical
            gap={10}
            align="center"
            justify="space-between"
            className={css.card}
            onClick={() => {
                navigate(productUrl);
            }}
        >
            <Flex className={css.container}>
                <Image className={css.image} src={imageUrl} alt={title} height={250} width={180} preview={false} />
            </Flex>

            <Flex vertical>
                <Flex justify={'space-between'}>
                    <Typography.Text className={discountPrice ? css.old : ''} style={{ textAlign: 'start' }} italic>
                        {price} ₽
                    </Typography.Text>
                    {discountPrice !== 0 && (
                        <>
                            <Typography.Text style={{ color: 'red' }}>→</Typography.Text>
                            <Typography.Text className={css.discount} style={{ textAlign: 'start' }} italic>
                                {discountPrice} ₽
                            </Typography.Text>
                        </>
                    )}
                </Flex>
                <Typography.Paragraph style={{ width: 180, minHeight: 50 }} ellipsis={{ rows: 2 }} strong>
                    {title}
                </Typography.Paragraph>
                <Typography.Paragraph style={{ width: 180 }} ellipsis={{ rows: 2 }} type="secondary">
                    {description}
                </Typography.Paragraph>
            </Flex>

            <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
                onClick={() => {
                    handleCartClick();
                }}
            >
                Add to basket
            </Button>
        </Flex>
    );
};
