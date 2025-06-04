import { createAdminApiRoot } from '../../services/api/BuildClient.ts';
import { Cart, LineItem } from '@commercetools/platform-sdk';
import { CartBook } from '../../components/book-list/types.ts';

export const createAnonymousCart = async (anonymousId?: string): Promise<Cart> => {
    const apiRoot = createAdminApiRoot(); // ← обычный SDK клиент

    const newCart = await apiRoot
        .carts()
        .post({
            body: {
                currency: 'RUB',
                country: 'RU',
                anonymousId: anonymousId || undefined, // 👈 передаём прямо в тело запроса
            },
        })
        .execute();
    return newCart.body;
};

export const getCart = async (anonymousId?: string) => {
    const apiRoot = createAdminApiRoot(); // ← обычный SDK клиент

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

// export const mappedCart = async (cartId: string, anonymousId?: string): Promise<CartBook[]> => {
//     console.log(cartId, 'cartID from Mapperd');
//
//     const cart = await getCart(anonymousId);
//     const data = cart?.results[0]?.lineItems;
//     console.log(data, 'data');
//
//     return data.map((el) => {
//         const { name, price, variant } = el;
//         const authorAttr = variant?.attributes?.find((attr) => attr.name === 'author');
//
//         const author = authorAttr
//             ? (typeof authorAttr.value === 'string'
//                 ? authorAttr.value
//                 : 'Неизвестный автор')
//             : 'Неизвестный автор';
//
//         return {
//             title: name.ru,
//             price: price.value.centAmount,
//             author: author || '',
//             imageUrl: variant.images?.[0].url || '',
//         };
//     });
// };

export const mappedCart = (data: LineItem[]): CartBook[] => {
    console.log(data, 'data');

    return data?.map((el) => {
        const { name, price, variant } = el;
        const authorAttr = variant?.attributes?.find((attr) => attr.name === 'author');

        const author = authorAttr
            ? (typeof authorAttr.value === 'string'
                ? authorAttr.value
                : 'Неизвестный автор')
            : 'Неизвестный автор';

        return {
            title: name.ru,
            price: price.value.centAmount,
            author: author || '',
            imageUrl: variant.images?.[0].url || '',
        };
    });
};
