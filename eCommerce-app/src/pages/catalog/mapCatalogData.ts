import type { Product } from '@commercetools/platform-sdk';

import defaultBook from '../../assets/images/defaultBook.png';
import { Book } from '../../components/book-list/types.ts';

const getDefaultBook = (): Book => ({
    title: 'Без названия',
    author: 'Неизвестный автор',
    price: 0,
    imageUrl: defaultBook,
    description: 'Нет описания',
});

interface ProductAttribute {
    name: string;
    value: string;
}

export const mapCatalogData = (data: Product[] = []): Book[] => {
    return data.map((el) => {
        const currentData = el.masterData?.current;
        console.log(currentData);
        if (!currentData) return getDefaultBook();

        const { name, description, masterVariant } = currentData;
        console.log(name.ru);

        const authorAttr = masterVariant?.attributes?.find((attr: ProductAttribute) => attr.name === 'author');

        const author = authorAttr
            ? typeof authorAttr.value === 'string'
                ? authorAttr.value
                : 'Неизвестный автор'
            : 'Неизвестный автор';

        const priceObj = masterVariant?.prices?.[0];
        const price = priceObj?.value?.centAmount ? Number(priceObj.value.centAmount) / 100 : 0;

        return {
            title: name?.ru || 'Без названия',
            author: author,
            price: price,
            imageUrl: masterVariant?.images?.[0]?.url || defaultBook,
            description: description?.ru || 'Нет описания',
        };
    });
};
