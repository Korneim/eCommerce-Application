import type { FC } from 'react';
import { Flex, Image, Typography } from 'antd';
import css from './news-card.module.scss';
import type { Data } from '../news-list/types.ts';

type Props = {
    dataInfo: Data;
};

export const NewsCard: FC<Props> = ({ dataInfo }) => {
    const { title, subtitle, imageUrl, imageUrl2, description } = dataInfo;
    return (
        <Flex className={css.card}>
            <Flex vertical className={css.content}>
                <Typography.Title level={4} className={css.title}>
                    {title}
                </Typography.Title>
                <Typography.Text style={{ color: '#ffce1a' }}>_________</Typography.Text>
                <Typography.Title level={5}>{subtitle}</Typography.Title>
                <Typography.Paragraph ellipsis={{ rows: 4 }}>{description}</Typography.Paragraph>
            </Flex>
            <Flex className={css.container}>
                <Image src={imageUrl} width={150} height={200} className={css.book} preview={false}></Image>
                <Image src={imageUrl2} width={150} height={200} className={css.overlay} preview={false}></Image>
            </Flex>
        </Flex>
    );
};
