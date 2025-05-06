import type { FC } from 'react';
import { ConfigProvider } from 'antd';
import { MainPage } from './pages/Main/MainPage.tsx';

export const App: FC = () => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorBgContainer: '#ffce1a',
                    colorPrimary: '#ffce1a',
                },
                components: {
                    Typography: {
                        fontSize: 18,
                        fontFamily: 'Mulish',
                    },
                    Carousel: {
                        arrowSize: 50,
                        arrowOffset: 20,
                    },
                },
            }}
        >
            <MainPage />
        </ConfigProvider>
    );
};
