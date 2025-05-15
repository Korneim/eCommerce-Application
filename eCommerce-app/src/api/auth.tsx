interface LoginResponse {
    access_token: string;
    expires_in: number;
    refresh_token?: string;
    scope: string;
    token_type: string;
}

export async function loginCustomer(email: string, password: string): Promise<LoginResponse> {
    const projectKey = 'bg-bookish';
    const clientId = '8C2YwOxEtfEZLrWjXmPTl5FH';
    const clientSecret = '5uzr_LzYH3BL2npSO7ujYgWJdp4RAYwy';
    const credentials = btoa(`${clientId}:${clientSecret}`);

    function isLoginResponse(data: unknown): data is LoginResponse {
        return (
            typeof data === 'object' &&
            data !== null &&
            'access_token' in data &&
            'expires_in' in data &&
            'scope' in data &&
            'token_type' in data
        );
    }

    const response = await fetch(
        `https://auth.europe-west1.gcp.commercetools.com/oauth/${projectKey}/customers/token`,
        {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'password',
                username: email,
                password: password,
            }),
        }
    );

    const raw: unknown = await response.json();

    if (!response.ok) {
        const message =
            typeof raw === 'object' && raw !== null && 'message' in raw && typeof raw.message === 'string'
                ? raw.message
                : 'Неверный логин и/или пароль!';
        throw new Error(message);
    }

    if (!isLoginResponse(raw)) {
        throw new Error('Invalid response shape');
    }

    return raw;
}
