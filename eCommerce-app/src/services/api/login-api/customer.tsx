export interface Customer {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
}

export async function getCurrentCustomer(token: string): Promise<Customer> {
    function isCustomer(data: unknown): data is Customer {
        return typeof data === 'object' && data !== null && 'id' in data && 'email' in data;
    }

    const response = await fetch('https://api.europe-west1.gcp.commercetools.com/bookish-bg/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Не удалось получить данные пользователя');
    }

    const raw: unknown = await response.json();

    if (!isCustomer(raw)) {
        throw new Error('Invalid response shape');
    }

    return raw;
}
