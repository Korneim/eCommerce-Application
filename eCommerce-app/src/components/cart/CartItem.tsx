import { Button, Flex, Image, InputNumber, Typography } from 'antd';
import { FC, useCallback, useState } from 'react';
import { CartBook } from '../book-list/types.ts';
import { DeleteOutlined } from '@ant-design/icons';
import { createAdminApiRoot } from '../../services/api/BuildClient.ts';
import { useCartStore } from '../../App.tsx';

type Props = {
    books: CartBook;
};

export const CartItem: FC<Props> = ({ books }) => {
    const { title, price, imageUrl, author, discountPrice, quantity, id } = books;
    const [localQuantity, setLocalQuantity] = useState(quantity);
    const [isUpdating, setIsUpdating] = useState(false);

    const { version, cartId, setCartVersion } = useCartStore();

    const handleQuantityChange = useCallback(
        async (newQuantity: number) => {
            if (newQuantity === null || newQuantity < 1) return;

            setIsUpdating(true);
            const apiRoot = createAdminApiRoot();

            if (cartId && version) {
                try {
                    const response = await apiRoot
                        .carts()
                        .withId({ ID: cartId })
                        .post({
                            body: {
                                version: version,
                                actions: [
                                    {
                                        action: 'changeLineItemQuantity',
                                        lineItemId: id,
                                        quantity: newQuantity,
                                    },
                                ],
                            },
                        })
                        .execute();

                    setCartVersion(response.body.version);
                    console.log('Количество товара обновлено');
                } catch (error) {
                    setLocalQuantity(quantity);
                    console.error('Ошибка при обновлении количества:', error);
                } finally {
                    setIsUpdating(false);
                }
            }
        },
        [cartId, id, quantity, setCartVersion, version]
    );

    const onChange = useCallback(
        (value: number | null) => {
            if (value === null || value < 1) return;
            setLocalQuantity(value);
            setIsUpdating(true);
            const timer = setTimeout(() => {
                handleQuantityChange(value);
            }, 500);

            return (): void => clearTimeout(timer);
        },
        [handleQuantityChange]
    );

    return (
        <Flex
            justify="space-between"
            gap={30}
            style={{ border: '1px solid #c1c1c1', borderRadius: '10px', padding: '10px' }}
        >
            <Flex>
                <Image src={imageUrl} height={180} width={140} preview={false} />
            </Flex>
            <Flex gap={20} vertical>
                <Flex style={{ width: 200 }}>
                    <Typography.Text>{title}</Typography.Text>
                </Flex>
                <Flex style={{ width: 200, textAlign: 'start' }}>
                    <Typography.Text>{author}</Typography.Text>
                </Flex>

                <Typography.Text strong style={{ textAlign: 'start' }} italic>
                    {discountPrice ? discountPrice / 100 : price / 100} ₽
                </Typography.Text>
            </Flex>
            <Flex vertical>
                <InputNumber min={1} value={localQuantity} onChange={onChange} disabled={isUpdating} />
            </Flex>
            <Button icon={<DeleteOutlined />}>Удалить товар</Button>
        </Flex>
    );
};
