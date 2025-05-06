import type { FC } from 'react';
import { ConfigProvider } from 'antd';
import { Router } from './utils/router/Router.tsx';

export const App: FC = () => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Typography: {
                        fontSize: 18,
                        fontFamily: 'Mulish',
                    },
                },
            }}
        >
            <Router />
        </ConfigProvider>
    );
};
