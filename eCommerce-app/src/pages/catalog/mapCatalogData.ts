import type { ProductProjection } from '@commercetools/platform-sdk';

import defaultBook from '../../assets/images/defaultBook.png';
import { Book } from '../../components/book-list/types.ts';

const getDefaultBook = (): Book => ({
    title: 'Без названия',
    author: 'Неизвестный автор',
    price: 0,
    discountPrice: 0,
    imageUrl: defaultBook,
    description: 'Нет описания',
    id: '',
    version: 1,
});

interface ProductAttribute {
    name: string;
    value: string;
}

export const mapCatalogData = (data: ProductProjection[] = []): Book[] => {
    return data.map((el) => {
        const currentData = el.masterVariant;
        if (!currentData) return getDefaultBook();

        const authorAttr = currentData?.attributes?.find((attr: ProductAttribute) => attr.name === 'author');

        const author = authorAttr
            ? typeof authorAttr.value === 'string'
                ? authorAttr.value
                : 'Неизвестный автор'
            : 'Неизвестный автор';
        const priceObj = currentData?.prices?.[0];
        const price = priceObj?.value?.centAmount ? Number(priceObj.value.centAmount) / 100 : 0;
        const discount = Number(currentData?.prices?.[0].discounted?.value.centAmount) / 100;
        const id = el.id;
        const version = el.version;

        return {
            title: el.name?.ru || 'Без названия',
            author: author,
            price: price,
            discountPrice: discount || 0,
            imageUrl: currentData?.images?.[0]?.url || defaultBook,
            description: el.description?.ru || 'Нет описания',
            id: id,
            version: version,
        };
    });
};
