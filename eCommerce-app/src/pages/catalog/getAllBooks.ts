import { Category, createApiBuilderFromCtpClient, ProductProjection } from '@commercetools/platform-sdk';
import { createAnonymousApiClient } from '../../services/api/BuildClient.ts';

export async function getPaginatedProducts(
    page: number,
    pageSize: number,
    selectedIds: string[],
    selectedSort: string,
    searchText: string
): Promise<{ products: ProductProjection[]; total: number }> {
    try {
        const anonimus = createAnonymousApiClient();
        const apiRoot = createApiBuilderFromCtpClient(anonimus).withProjectKey({
            projectKey: import.meta.env.VITE_PROJECT_KEY,
        });

        const offset = (page - 1) * pageSize;
        const filter =
            selectedIds.length > 0 ? [`categories.id: ${selectedIds.map((id) => `"${id}"`).join(', ')}`] : undefined;

        const response = await apiRoot
            .productProjections()
            .search()
            .get({
                queryArgs: {
                    filter,
                    limit: pageSize,
                    offset: offset,
                    priceCurrency: 'RUB',
                    sort: selectedSort && selectedSort.length > 0 ? selectedSort : undefined,
                    [`text.ru`]: searchText || undefined,
                },
            })
            .execute();
        return {
            products: response.body.results,
            total: response.body.total || 0,
        };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
        console.error('Ошибка при получении продуктов:', errorMessage);
        throw new Error(errorMessage);
    }
}

export async function getAllCategories(): Promise<Category[]> {
    try {
        const anonimus = createAnonymousApiClient();
        const apiRoot = createApiBuilderFromCtpClient(anonimus).withProjectKey({
            projectKey: import.meta.env.VITE_PROJECT_KEY,
        });

        const response = await apiRoot.categories().get().execute();

        return response.body.results;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}
