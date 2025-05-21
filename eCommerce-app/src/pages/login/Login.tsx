import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Flex, Spin, Button } from 'antd';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { loginCustomer } from '../../services/api/login-api/auth';
import { getCurrentCustomer } from '../../services/api/login-api/customer';
import useAuthStore from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/router/routes';
import type { ModalType } from '../../components/modal-window/ModalWindow';
import { ModalWindow } from '../../components/modal-window/ModalWindow';
import css from './login.module.scss'

type LoginFormInputs = {
    email: string;
    password: string;
};

const LoginPage: FC = () => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const setAccessToken = useAuthStore((state) => state.setAccessToken);
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalType, setModalType] = useState<ModalType>('success');

    const handleCancel = (): void => {
        setIsModalOpen(false);
    };

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        setSpinning(true);
        try {
            const arrivedData = await loginCustomer(data.email, data.password);
            await getCurrentCustomer(arrivedData.access_token);
            setAccessToken(arrivedData.access_token);
            login();
            navigate(routes.root);
        } catch (error) {
            if (error instanceof Error && error.message === 'Customer account with the given credentials not found.') {
                setIsModalOpen(true);
                setModalTitle('Ошибка аутентификации');
                setModalType('error');
                setModalContent('Введенные логин/пароль не найдены');
            } else {
                setIsModalOpen(true);
                setModalTitle('Ошибка аутентификации');
                setModalType('error');
                setModalContent('Непредвиденная ошибка');
            }
        } finally {
            setSpinning(false);
        }
    };

    return (
        <>
            <Spin spinning={spinning} tip="Loading" size="large" fullscreen />
            <section className={`${css["login-section"]}`}>
                <Flex vertical align="center" className={`${css["login-container"]}`}>
                    <h1 className={`${css["enter-message"]}`}>Войти</h1>
                    <span className={`${css["welcome-message"]}`}>Добро пожаловать! Пожалуйста авторизуйтесь:</span>
                    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className={`${css["inputs-form"]}`}>
                        <input
                            type="text"
                            placeholder="Введите e-mail"
                            autoComplete="current-login"
                            className={`${css["login-input"]} ${errors.email ? css["error-input"] : ""}`}
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
                        {errors.email && <span className={css["error-text"]}>{errors.email.message}</span>}

                        <div className={`${css["password-wrapper"]}`}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Введите пароль"
                                autoComplete="current-password"
                                className={`${css["password-input"]} ${errors.password ? css["error-input"] : ""}`}
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
                                    },
                                })}
                            />
                            <button
                                type="button"
                                className={`${css["toggle-password"]}`}
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>

                        {errors.password && <span className={`${css["error-text"]}`}>{errors.password.message}</span>}

                        <Flex justify="space-around" className={`${css["buttons-container"]}`}>
                            <Button
                                type='primary'
                                htmlType="submit"
                                className={`${css["login-button"]}`}
                            >
                                Войти
                            </Button>
                            <Button
                                htmlType="button"
                                className={`${css["register-button"]}`}
                                onClick={() => {
                                    navigate(routes.register);
                                }}
                            >
                                Регистрация
                            </Button>
                        </Flex>
                    </form>
                </Flex>
            </section>
            <ModalWindow
                type={modalType}
                title={modalTitle}
                content={modalContent}
                isOpen={isModalOpen}
                onClose={handleCancel}
            />
        </>
    );
};

export default LoginPage;
