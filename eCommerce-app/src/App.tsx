import type { FC } from 'react';
import { ConfigProvider } from 'antd';
import { Router } from './utils/router/Router.tsx';
import '@ant-design/v5-patch-for-react-19';

export const App: FC = () => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#ffce1a',
                },
                components: {
                    Typography: {
                        fontSize: 18,
                        fontFamily: 'Mulish',
                    },
                    Menu: {
                        horizontalItemSelectedColor: '#ffce1a',
                        horizontalItemHoverColor: '#ffce1a',
                    },
                    Carousel: {
                        arrowSize: 50,
                        arrowOffset: 20,
                    },
                },
            }}
        >
            <Router />
        </ConfigProvider>
    );
};
