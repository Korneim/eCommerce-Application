import { createAdminApiRoot } from '../../services/api/BuildClient.ts';
import { Cart, LineItem } from '@commercetools/platform-sdk';
import { CartBook } from '../../components/book-list/types.ts';

export const createAnonymousCart = async (anonymousId?: string): Promise<Cart> => {
    const apiRoot = createAdminApiRoot();

    const newCart = await apiRoot
        .carts()
        .post({
            body: {
                currency: 'RUB',
                country: 'RU',
                anonymousId: anonymousId || undefined,
            },
        })
        .execute();
    return newCart.body;
};

export const getCart = async (anonymousId?: string) => {
    const apiRoot = createAdminApiRoot();

    const existingCarts = await apiRoot
        .carts()
        .get({
            queryArgs: {
                where: `anonymousId="${anonymousId}"`,
            },
        })
        .execute();
    return existingCarts.body;
};

export const mappedCart = (data: LineItem[]): CartBook[] => {
    console.log(data, 'datacart');

    return data?.map((el) => {
        const { name, price, variant } = el;
        const authorAttr = variant?.attributes?.find((attr) => attr.name === 'author');

        const author = authorAttr
            ? (typeof authorAttr.value === 'string'
                ? authorAttr.value
                : 'Неизвестный автор')
            : 'Неизвестный автор';

        const discountedPrice = price.discounted?.value.centAmount;
        const quantity = el.quantity;
        const id = el.id;

        return {
            title: name.ru,
            price: price.value.centAmount,
            author: author || '',
            imageUrl: variant.images?.[0].url || '',
            discountPrice: discountedPrice || 0,
            quantity: quantity,
            id: id,
        };
    });
};
