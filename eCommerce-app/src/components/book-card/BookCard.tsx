import type { FC } from 'react';
import { Button, Flex, Image, Typography } from 'antd';
import type { Book } from '../book-list/types.ts';
import css from './book-card.module.scss';
import { ShoppingCartOutlined } from '@ant-design/icons';

type Props = {
    bookInfo: Book;
};

export const BookCard: FC<Props> = ({ bookInfo }) => {
    const { title, imageUrl, price, description } = bookInfo;

    return (
        <Flex vertical gap={10} align="center" justify="space-between" className={css.card}>
            <Flex className={css.container}>
                <Image className={css.image} src={imageUrl} alt={title} height={250} width={180} preview={false} />
            </Flex>

            <Flex vertical>
                <Typography.Text style={{ textAlign: 'start' }} italic>
                    {price} ₽
                </Typography.Text>
                <Typography.Paragraph style={{ maxWidth: 200 }} strong>
                    {title}{' '}
                </Typography.Paragraph>
                <Typography.Paragraph style={{ maxWidth: 200 }} ellipsis={{ rows: 2 }} type="secondary">
                    {description}
                </Typography.Paragraph>
            </Flex>

            <Button size="large" icon={<ShoppingCartOutlined />}>
                Add to basket
            </Button>
        </Flex>
    );
};
