import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Flex, Spin } from 'antd';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { loginCustomer } from '../../api/auth';
import { getCurrentCustomer } from '../../api/customer';
import '@ant-design/v5-patch-for-react-19';
import showModal from '../../components/modal/Modal';
import useAuthStore from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/router/routes';

type LoginFormInputs = {
    email: string;
    password: string;
};

const LoginPage: FC = () => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn) {
            navigate(routes.root);
        }
    }, [isLoggedIn, navigate]);
    const login = useAuthStore((state) => state.login);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({ mode: 'onChange' });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [spinning, setSpinning] = useState<boolean>(false);

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        setSpinning(true);
        try {
            const arrivedData = await loginCustomer(data.email, data.password);
            await getCurrentCustomer(arrivedData.access_token);
            login();
            navigate(routes.root);
        } catch (error) {
            if (error instanceof Error && error.message === 'Customer account with the given credentials not found.') {
                showModal('error', 'Ошибка аутентификации', 'Введенные логин/пароль не найдены');
            } else {
                showModal('error', 'Ошибка аутентификации', 'Непредвиденная ошибка');
            }
            throw new Error(error instanceof Error ? error.message : 'Неизвестная ошибка');
        } finally {
            setSpinning(false);
        }
    };

    return (
        <>
            <Spin spinning={spinning} tip="Loading" size="large" fullscreen />
            <section className="login-section">
                <span className="link-section">
                    <a href="./" className="page-link">
                        Главная
                    </a>{' '}
                    &gt;{' '}
                    <a href="./login" className="page-link">
                        Вход
                    </a>
                </span>
                <Flex vertical align="center" className="login-container">
                    <h1 className="enter-message">Войти</h1>
                    <span className="welcome-message">Добро пожаловать! Пожалуйста авторизуйтесь:</span>
                    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className="inputs-form">
                        <input
                            type="text"
                            placeholder="Введите e-mail"
                            className={`login-input ${errors.email ? 'error-input' : ''}`}
                            {...register('email', {
                                required: 'Это поле должно быть заполнено',
                                validate: {
                                    noLeadingTrailingWhitespace: (value) =>
                                        value.trim() === value ||
                                        'Email не должен начинаться или заканчиваться пробелами',

                                    hasAtSymbol: (value) =>
                                        value.includes('@') || 'Адрес электронной почты должен содержать символ "@"',

                                    hasDotSymbol: (value) => {
                                        const atIndex = value.indexOf('@');
                                        const dotIndex = value.lastIndexOf('.');
                                        return (
                                            (atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < value.length - 1) ||
                                            'Адрес электронной почты должен содержать доменное имя после @'
                                        );
                                    },
                                },
                            })}
                        />
                        {errors.email && <span className="error-text">{errors.email.message}</span>}

                        <div className="password-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Введите пароль"
                                autoComplete="current-password"
                                className={`password-input ${errors.password ? 'error-input' : ''}`}
                                {...register('password', {
                                    required: 'Пароль обязателен',
                                    validate: {
                                        hasCorrectLength: (value) =>
                                            value.length >= 8 || 'Это поле должно содержать минимум 8 символов',

                                        hasUpperCase: (value) =>
                                            /[A-Z]/.test(value) ||
                                            'Это поле должно содержать хотя бы одну заглавную букву (A-Z)',

                                        hasLowerCase: (value) =>
                                            /[a-z]/.test(value) ||
                                            'Это поле должно содержать хотя бы одну строчную букву (a-z)',

                                        hasDigits: (value) =>
                                            /\d/.test(value) || 'Это поле должно содержать хотя бы одну цифру (0-9)',

                                        noLeadingTrailingWhitespace: (value) =>
                                            value.trim() === value ||
                                            'Пароль не должен начинаться или заканчиваться пробелами',

                                        hasSpecialCharacters: (value) =>
                                            /[!"#$%&()*,.:<>?@^{|}]/.test(value) ||
                                            'Пароль должен содержать хотя бы один спецсимвол (!@#$%^&*)',
                                    },
                                })}
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>

                        {errors.password && <span className="error-text">{errors.password.message}</span>}

                        <Flex justify="space-around" className="buttons-container">
                            <button type="submit" className="login-button">
                                Войти
                            </button>
                            <button
                                type="button"
                                className="register-button"
                                onClick={() => {
                                    navigate(routes.register);
                                }}
                            >
                                Регистрация
                            </button>
                        </Flex>
                    </form>
                </Flex>
            </section>
        </>
    );
};

export default LoginPage;
