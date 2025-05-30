import { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getBook from './getBook';
import { Product } from '@commercetools/platform-sdk';
import { ProductImageSlider } from './ImagesSlider';
import { Flex } from 'antd';
import css from './productPage.module.scss'

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
}

export const ProductPage: FC = () => {
    const { productId } = useParams();
    const [book, setBook] = useState<Product | null>(null);
    const loadProduct = useCallback(async () => {
        try {
            if (typeof productId === 'string') {
                const {product} = await getBook(productId);
                return product;
            }
        } catch (error) {
            console.error('Ошибка загрузки:', error);
        }
    }, [productId])
    useEffect(() => {
    (async (): Promise<void> => {
        const product = await loadProduct();
        if (product) setBook(product);
    })();
    }, [loadProduct])
    const imagesArray = book?.masterData.current.masterVariant.images?.map(img => img.url);
    const bookMaster = book?.masterData.current.masterVariant;
    const bookAuthorAttr = bookMaster?.attributes?.find((attr: ProductAttribute) => attr.name === 'author');
    const bookAuthor = bookAuthorAttr
        ? (typeof bookAuthorAttr.value === 'string'
            ? bookAuthorAttr.value
            : '-')
        : '-';

    const bookPublishingAttr = bookMaster?.attributes?.find((attr: ProductAttribute) => attr.name === 'publishing');
    const bookPublishing = bookPublishingAttr
        ? (typeof bookPublishingAttr.value === 'string'
            ? bookPublishingAttr.value
            : '-')
        : '-';

    const bookSeriesAttr = bookMaster?.attributes?.find((attr: ProductAttribute) => attr.name === 'series');
    const bookSeries = bookSeriesAttr
        ? (typeof bookSeriesAttr.value === 'string'
            ? bookSeriesAttr.value
            : '-')
        : '-';

    const bookYearAttr = bookMaster?.attributes?.find((attr: ProductAttribute) => attr.name === 'year');
    const bookYear = bookYearAttr
        ? (typeof bookYearAttr.value === 'number'
            ? bookYearAttr.value
            : '-')
        : '-';

    let bookCover = ''
    const bookCoverAttr = bookMaster?.attributes?.find((attr: ProductAttribute) => attr.name === 'cover-type');
    if (bookCoverAttr?.value && isObjectAttrValue(bookCoverAttr.value)) {
        const bookCoverValue = bookCoverAttr?.value;
        bookCover = bookCoverValue.label;
    }

    const bookArticulAttr = bookMaster?.attributes?.find((attr: ProductAttribute) => attr.name === 'articul');
    const bookArticul = bookArticulAttr
        ? (typeof bookArticulAttr.value === 'string'
            ? bookArticulAttr.value
            : '-')
        : '-';

    let bookLang = ''
    const bookLangAttr = bookMaster?.attributes?.find((attr: ProductAttribute) => attr.name === 'language');
    if (bookLangAttr?.value && isObjectAttrValue(bookLangAttr.value)) {
        const bookLangValue = bookLangAttr?.value;
        bookLang = bookLangValue.label
    }

    const bookPagesAttr = bookMaster?.attributes?.find((attr: ProductAttribute) => attr.name === 'pages');
    const bookPages = bookArticulAttr
        ? (typeof bookArticulAttr.value === 'number'
            ? bookArticulAttr.value
            : '-')
        : '-';

    const bookGenresAttr = bookMaster?.attributes?.find((attr: ProductAttribute) => attr.name === 'genre');
    const bookGenre = bookGenresAttr
        ? (typeof bookGenresAttr.value === 'string'
            ? bookGenresAttr.value
            : '-')
        : '-';
    console.log(book);
    return (
        <>
            <Flex justify='center' className={`${css['product-conatiner']}`}>
                {<ProductImageSlider images={imagesArray ?? []} />}
                <Flex className={`${css['description-container']}`}>
                    <h1>{book?.masterData.current.name['ru']}</h1>
                    <Flex className={`${css['characteristics-container']}`}>
                        <h2>О товаре:</h2>
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
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
};
