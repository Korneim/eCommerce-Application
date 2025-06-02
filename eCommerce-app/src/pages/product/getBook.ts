import { createApiBuilderFromCtpClient, Product } from '@commercetools/platform-sdk';
import { createAnonymousApiClient } from '../../services/api/BuildClient.ts';

export default async function getBook(productId: string): Promise<{ product: Product }> {
    try {
        const anonimus = createAnonymousApiClient();
        const apiRoot = createApiBuilderFromCtpClient(anonimus).withProjectKey({
            projectKey: import.meta.env.VITE_PROJECT_KEY,
        });

        const response = await apiRoot.products().withId({ ID: productId }).get().execute();
        return {
            product: response.body,
        };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
        console.error('Ошибка при получении продукта:', errorMessage);
        throw new Error(errorMessage);
    }
}
