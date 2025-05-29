import { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getBook from './getBook';
import { Product } from '@commercetools/platform-sdk';
import { ProductImageSlider } from './ImagesSlider';

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
    console.log(book?.masterData.current.masterVariant.images?.map(img => img.url) ?? []);
    return (
        <>
            {<ProductImageSlider images={book?.masterData.current.masterVariant.images?.map(img => img.url) ?? []} />}
        </>
    )
};
