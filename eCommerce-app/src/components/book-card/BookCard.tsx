import type { FC } from 'react';
import { Button, Flex, Image, Typography } from 'antd';
import type { Book } from '../book-list/types.ts';
import css from './book-card.module.scss';
import { ShoppingCartOutlined } from '@ant-design/icons';

type Props = {
    bookInfo: Book;
};

export const BookCard: FC<Props> = ({ bookInfo }) => {
    const { title, imageUrl, price, discountPrice, description } = bookInfo;

    return (
        <Flex vertical gap={10} align="center" justify="space-between" className={css.card}>
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

            <Button type="primary" size="large" icon={<ShoppingCartOutlined />}>
                Add to basket
            </Button>
        </Flex>
    );
};
