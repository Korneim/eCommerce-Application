import {
    ClientBuilder,
    PasswordAuthMiddlewareOptions,
    type AuthMiddlewareOptions,
    type HttpMiddlewareOptions,
} from '@commercetools/ts-client';
import { createApiBuilderFromCtpClient, ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

const projectKey = import.meta.env.VITE_PROJECT_KEY;
const registerClientId = import.meta.env.VITE_CLIENT_REGISTER_ID;
const registerSecret = import.meta.env.VITE_CLIENT_REGISTER_SECRET;
const registerScopes = [`${import.meta.env.VITE_CLIENT_REGISTER_SCOPES}`];

const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: import.meta.env.VITE_API_URL,
    httpClient: fetch,
};

export const createApiClient = () => {
    const authMiddlewareOptions: AuthMiddlewareOptions = {
        host: import.meta.env.VITE_AUTH_URL,
        projectKey: projectKey,
        credentials: {
            clientId: registerClientId,
            clientSecret: registerSecret,
        },
        scopes: registerScopes,
        httpClient: fetch,
    };

    return new ClientBuilder()
        .withAnonymousSessionFlow(authMiddlewareOptions)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build();
};

export const createApiClientWithPasswordFlow = (user: {
    username: string;
    password: string;
}): ByProjectKeyRequestBuilder => {
    const authMiddlewareOptions: PasswordAuthMiddlewareOptions = {
        host: import.meta.env.VITE_AUTH_URL,
        projectKey: projectKey,
        credentials: {
            clientId: registerClientId,
            clientSecret: registerSecret,
            user: user,
        },
        scopes: registerScopes,
        httpClient: fetch,
    };

    const client = new ClientBuilder()
        .withPasswordFlow(authMiddlewareOptions)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build();

    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
        projectKey: projectKey,
    });

    return apiRoot;
};

export const createApiRoot = (): ByProjectKeyRequestBuilder => {
    const client = createApiClient();
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
        projectKey: projectKey,
    });
    return apiRoot;
};

export const apiRootRegister = createApiRoot();
