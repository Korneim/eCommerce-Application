import {
    ClientBuilder,
    type AuthMiddlewareOptions, // Required for auth
    type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/ts-client';
import { createApiBuilderFromCtpClient, ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { ClientType } from './types';

const projectKey = import.meta.env.VITE_PROJECT_KEY;
const authClientId = import.meta.env.VITE_CLIENT_AUTH_ID;
const authSecret = import.meta.env.VITE_CLIENT_AUTH_SECRET;
const authScopes = [`${import.meta.env.VITE_CLIENT_AUTH_SCOPES}`];
const registerClientId = import.meta.env.VITE_CLIENT_REGISTER_ID;
const registerSecret = import.meta.env.VITE_CLIENT_REGISTER_SECRET;
const registerScopes = [`${import.meta.env.VITE_CLIENT_REGISTER_SCOPES}`];

export const createApiClient = (type: ClientType) => {
    let currentClientId: string = '';
    let currentClientSecret: string = '';
    let currentScopes: string[] = [];

    switch (type) {
        case 'auth':
            currentClientId = authClientId;
            currentClientSecret = authSecret;
            currentScopes = authScopes;
            break;

        case 'register':
            currentClientId = registerClientId;
            currentClientSecret = registerSecret;
            currentScopes = registerScopes;
            break;
    }

    // Configure authMiddlewareOptions
    const authMiddlewareOptions: AuthMiddlewareOptions = {
        host: import.meta.env.VITE_AUTH_URL,
        projectKey: projectKey,
        credentials: {
            clientId: currentClientId,
            clientSecret: currentClientSecret,
        },
        scopes: currentScopes,
        httpClient: fetch,
    };

    // Configure httpMiddlewareOptions
    const httpMiddlewareOptions: HttpMiddlewareOptions = {
        host: import.meta.env.VITE_API_URL,
        httpClient: fetch,
    };

    return (
        new ClientBuilder()
            // .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
            .withAnonymousSessionFlow(authMiddlewareOptions) //вместо withClientCredentialsFlow
            .withHttpMiddleware(httpMiddlewareOptions)
            .build()
    );
};

export const createApiRoot = (type: ClientType): ByProjectKeyRequestBuilder => {
    const client = createApiClient(type);
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
        projectKey: projectKey,
    });
    return apiRoot;
};

export const apiRootAuth = createApiRoot('auth');
export const apiRootRegister = createApiRoot('register');

//test
// export const getProject = async (type: ClientType) => {
//     const apiRoot = createApiRoot(type);
//     return apiRoot.get().execute();
// };
