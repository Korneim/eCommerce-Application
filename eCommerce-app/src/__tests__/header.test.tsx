import { render, screen, waitFor } from '@testing-library/react';
import { Router } from '../utils/router/Router.tsx';
import { MemoryRouter } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { act } from 'react';
import { BooksList } from '../components/book-list/BooksList.tsx';

jest.mock('./footer.module.scss', () => ({}));

jest.mock('../store/useAuthStore', () => ({
    useAuthStore: jest.fn(),
}));
jest.mock('../services/api/logout/revokeToken.tsx', () => ({
    revokeAllTokens: jest.fn(),
}));
jest.mock('../store/useAuthStore.tsx', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('../pages/main/MainPage.tsx', () => () => <div data-testid="main-page">Главная</div>);
jest.mock('../pages/login/Login.tsx', () => () => <div data-testid="login-page">Вход</div>);
jest.mock('../pages/registration/Registration.tsx', () => () => <div data-testid="registration-page">Регистрация</div>);
jest.mock('../pages/catalog/Catalog.tsx', () => () => <div data-testid="catalog-page">Каталог</div>);
jest.mock('../pages/user-profile/UserProfile.tsx', () => () => <div data-testid="profile-page">Профиль</div>);
jest.mock('../pages/product/ProductPage.tsx', () => () => <div data-testid="product-page">Товар</div>);
jest.mock('../pages/not-found/NotFound.tsx', () => () => <div data-testid="not-found-page">404</div>);

describe('Header', () => {
    const mockUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>;

    beforeEach(() => {
        mockUseAuthStore.mockReturnValue({
            isLoggedIn: false,
            login: jest.fn(),
            logout: jest.fn(),
        });
    });

    const renderRouter = async (route = '/') => {
        await act(async () => {
            render(
                <MemoryRouter initialEntries={[route]}>
                    <Router />
                </MemoryRouter>
            );
        });
    };

    it('должен отображать заголовок', () => {
        render(<BooksList title="Хиты продаж" books={[]} />);
        const titleElement = screen.getByText('Хиты продаж');
        expect(titleElement).toBeInTheDocument();
    });

    it('корректно рендерит заголовки header', async () => {
        await renderRouter('/');
        await waitFor(() => {
            expect(screen.getByText('Регистрация')).toBeInTheDocument();
        });
    });

    it('корректно рендерит заголовки header', async () => {
        await renderRouter('/');
        await waitFor(() => {
            expect(screen.getByText('Каталог')).toBeInTheDocument();
        });
    });

    it('корректно рендерит заголовки header', async () => {
        await renderRouter('/');
        await waitFor(() => {
            expect(screen.getByText('Главная')).toBeInTheDocument();
        });
    });
});
