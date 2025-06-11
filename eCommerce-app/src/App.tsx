import { FC, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { Router } from './utils/router/Router.tsx';
import '@ant-design/v5-patch-for-react-19';
import { getAnonymousId } from './services/api/BuildClient.ts';
import { createAnonymousCart } from './pages/cart/getCart.ts';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartStore = {
    cartId: string | null;
    anonymousId: string | null;
    version: number | null;
    setCartId: (id: string) => void;
    setAnonimusId: (id: string) => void;
    setCartVersion: (id: number) => void;
};
export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            cartId: null,
            anonymousId: null,
            version: null,
            setCartId: (id): void => set({ cartId: id }),
            setAnonimusId: (id): void => set({ anonymousId: id }),
            setCartVersion: (id): void => set({ version: id }),
        }),
        {
            name: 'cart-storage',
        }
    )
);

export const App: FC = () => {
    const { cartId, anonymousId, setCartId, setAnonimusId, setCartVersion } = useCartStore();

    useEffect(() => {
        const fetchCart = async (): Promise<void> => {
            if (!anonymousId) {
                const newAnonimusId = getAnonymousId();
                setAnonimusId(newAnonimusId);
                console.log(newAnonimusId, 'versia newAnonimusId');
            }
            if (anonymousId && !cartId) {
                const newCart = await createAnonymousCart(anonymousId);
                setCartId(newCart.id);
                setCartVersion(newCart.version);
                console.log(newCart.version, 'versia cart');
            }
        };
        fetchCart();
    }, [anonymousId, cartId, setAnonimusId, setCartId, setCartVersion]);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#6941c2',
                    colorPrimaryActive: 'var(--btn-active-bg-color)',
                    colorFillSecondary: 'ffce1a',
                },
                components: {
                    Typography: {
                        fontSize: 18,
                        fontFamily: 'Mulish',
                    },
                    Menu: {
                        horizontalItemSelectedColor: '#6941c2',
                        horizontalItemHoverColor: '#6941c2',
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
