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
                    colorPrimaryActive: 'var(--btn-active-bg-color)',
                    colorFillSecondary: 'ffce1a',
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
                    Button: {
                        solidTextColor: 'var(--btn-font-color)',
                        defaultBorderColor: 'var(--primary-color)',
                    },
                },
            }}
        >
            <Router />
        </ConfigProvider>
    );
};
