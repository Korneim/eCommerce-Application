import { createApiBuilderFromCtpClient, Product } from '@commercetools/platform-sdk';
import { createAnonymousApiClient } from '../../services/api/BuildClient.ts';

export async function getAllProducts(): Promise<Product[]> {
    try {
        const anonimus = createAnonymousApiClient();
        const apiRoot = createApiBuilderFromCtpClient(anonimus).withProjectKey({
            projectKey: import.meta.env.VITE_PROJECT_KEY,
        });

        const response = await apiRoot
            .products()
            .get({
                queryArgs: {
                    limit: 500,
                    sort: 'id asc',
                },
            })
            .execute();

        console.log(response.body.results);
        return response.body.results;
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : typeof error === 'string' ? error : 'Неизвестная ошибка';

        console.error('Ошибка при получении продуктов:', errorMessage);
        throw new Error(errorMessage);
    }
}
