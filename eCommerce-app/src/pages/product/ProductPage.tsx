import { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getBook from './getBook';
import { Product } from '@commercetools/platform-sdk';
import { ProductImageSlider } from './ImagesSlider';
import { Flex, Card, Button } from 'antd';
import css from './productPage.module.scss';

interface ProductAttribute {
    name: string;
    value: string | object | number;
}

interface ObjectAttribute {
    key: string;
    label: string;
}

const isObjectAttrValue = (value: unknown): value is ObjectAttribute => {
    return typeof value === 'object' && value !== null && 'key' in value && 'label' in value;
};

const getAttributeValue = (
    attributes: ProductAttribute[] | undefined,
    attributeName: string,
    options?: {
        type?: 'string' | 'number' | 'object';
        fallback?: string;
    }
): string => {
    const attr = attributes?.find((attr) => attr.name === attributeName);
    const fallback = options?.fallback ?? '-';

    if (!attr) return fallback;

    if (options?.type === 'object' && isObjectAttrValue(attr.value)) {
        return attr.value.label;
    }

    if (options?.type === 'number' && typeof attr.value === 'number') {
        return attr.value.toString();
    }

    return typeof attr.value === 'string' ? attr.value : fallback;
};

export const ProductPage: FC = () => {
    const { productId } = useParams();
    const [book, setBook] = useState<Product | null>(null);
    const loadProduct = useCallback(async () => {
        try {
            if (typeof productId === 'string') {
                const { product } = await getBook(productId);
                return product;
            }
        } catch (error) {
            console.error('Ошибка загрузки:', error);
        }
    }, [productId]);
    useEffect(() => {
        (async (): Promise<void> => {
            const product = await loadProduct();
            if (product) setBook(product);
        })();
    }, [loadProduct]);
    const imagesArray = book?.masterData.current.masterVariant.images?.map((img) => img.url);
    const bookDescription =
        typeof book?.masterData?.current?.description?.['ru'] === 'string'
            ? book.masterData.current.description['ru']
            : '-';
    const bookMaster = book?.masterData.current.masterVariant;
    const bookAuthor = getAttributeValue(bookMaster?.attributes, 'author', { type: 'string' });
    const bookPublishing = getAttributeValue(bookMaster?.attributes, 'publishing', { type: 'string' });
    const bookSeries = getAttributeValue(bookMaster?.attributes, 'series', { type: 'string' });
    const bookYear = getAttributeValue(bookMaster?.attributes, 'year', { type: 'number' });
    const bookCover = getAttributeValue(bookMaster?.attributes, 'cover-type', { type: 'object' });
    const bookArticul = getAttributeValue(bookMaster?.attributes, 'articul', { type: 'number' });
    const bookLang = getAttributeValue(bookMaster?.attributes, 'language', { type: 'object' });
    const bookPages = getAttributeValue(bookMaster?.attributes, 'pages', { type: 'number' });
    const bookGenre = getAttributeValue(bookMaster?.attributes, 'genre', { type: 'string' });
    const bookPrice = book?.masterData.current.masterVariant.prices;
    console.log(bookPrice);
    const [hasDiscount, setHasDiscount] = useState(false);
    const [price, setPrice] = useState<number>(0);
    const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);
    const firstPrice = bookPrice?.[0];
    useEffect(() => {
        if (!firstPrice) return;
        if (firstPrice.discounted?.value?.centAmount) {
            setHasDiscount(true);
            setDiscountedPrice(firstPrice.discounted.value.centAmount / 100);
        } else {
            setHasDiscount(false);
            setDiscountedPrice(null);
        }
        setPrice(firstPrice.value.centAmount / 100);
    }, [firstPrice]);
    console.log(book);
    return (
        <>
            <Flex justify="center" className={`${css['product-container']}`}>
                {<ProductImageSlider images={imagesArray ?? []} />}
                <Flex className={`${css['description-container']}`}>
                    <h1>{book?.masterData.current.name['ru']}</h1>
                    <Flex className={`${css['characteristics-container']}`}>
                        <h2>О товаре:</h2>
                        <Flex className={`${css['characteristics-wrapper']}`}>
                            <Flex className={`${css['characteristics']}`}>
                                <Flex className={`${css['characteristics-name']}`}>
                                    <span>Автор:</span>
                                    <span>Издательство:</span>
                                    <span>Серия:</span>
                                    <span>Год выпуска:</span>
                                    <span>Тип обложки:</span>
                                </Flex>
                                <Flex className={`${css['characteristics-values']}`}>
                                    <span>{bookAuthor}</span>
                                    <span>{bookPublishing}</span>
                                    <span>{bookSeries}</span>
                                    <span>{bookYear}</span>
                                    <span>{bookCover}</span>
                                </Flex>
                            </Flex>
                            <Card title="Цена" size="small" className={`${css['price-card']}`}>
                                <Flex className={`${css['price-wrapper']}`}>
                                    <span
                                        style={{
                                            textDecoration: hasDiscount ? 'line-through' : 'none',
                                            color: hasDiscount ? '#888' : 'black',
                                            fontSize: '1.6rem',
                                        }}
                                    >
                                        {price} ₽
                                    </span>

                                    {hasDiscount && (
                                        <span style={{ color: '#cf1322', fontWeight: 'bold', fontSize: '1.8rem' }}>
                                            {discountedPrice} ₽
                                        </span>
                                    )}
                                    <Button type="primary">Купить</Button>
                                </Flex>
                            </Card>
                        </Flex>
                    </Flex>
                    <Flex className={`${css['description-container']}`}>
                        <h2>Описание:</h2>
                        <div className={`${css['description']}`}>{bookDescription}</div>
                    </Flex>
                </Flex>
            </Flex>
            <Flex className={`${css['additional-chars-container']}`}>
                <h2>Характеристики</h2>
                <Flex className={`${css['additional-chars-wrapper']}`}>
                    <Flex className={`${css['additional-chars']}`}>
                        <Flex className={`${css['additional-chars-name']}`}>
                            <span>Артикул:</span>
                            <span>Автор:</span>
                            <span>Издательство:</span>
                            <span>Серия:</span>
                        </Flex>
                        <Flex className={`${css['additional-chars-values']}`}>
                            <span>{bookArticul}</span>
                            <span>{bookAuthor}</span>
                            <span>{bookPublishing}</span>
                            <span>{bookSeries}</span>
                        </Flex>
                    </Flex>
                    <Flex className={`${css['additional-chars']}`}>
                        <Flex className={`${css['additional-chars-name']}`}>
                            <span>Год выпуска:</span>
                            <span>Язык издания:</span>
                            <span>Количество страниц:</span>
                            <span>Жанр книги:</span>
                        </Flex>
                        <Flex className={`${css['additional-chars-values']}`}>
                            <span>{bookYear}</span>
                            <span>{bookLang}</span>
                            <span>{bookPages}</span>
                            <span>{bookGenre}</span>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
};
