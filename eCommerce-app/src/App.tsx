import type { FC } from 'react';
import { Footer } from './components/footer/Footer.tsx';
import { ConfigProvider } from 'antd';

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
            <div className={'wrapper'}>
                <Footer />
            </div>
        </ConfigProvider>
    );
};
