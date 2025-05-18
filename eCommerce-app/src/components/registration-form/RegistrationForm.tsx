import { FC, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Col, DatePicker, Flex, Form, Input, Row, Spin, Typography } from 'antd';
import { ERROR, LABEL, MODAL_CONTENT, MODAL_TITLE, PLACEHOLDER } from './constants';
import { RegistrationFormValues } from './types';
import { PaymentAddressForm } from './PaymentAddressForm';
import styles from './registration-form.module.scss';
import { ShippingAddressForm } from './ShippingAddressForm';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate, validateDate, validatePassword } from './utils';
import { clientSignUp } from '../../services/api/registration-api/registration-api';
import { routes } from '../../utils/router/routes';
import { ModalType, ModalWindow } from '../modal-window/ModalWindow';
import useAuthStore from '../../store/useAuthStore';

export const RegistrationForm: FC = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalType, setModalType] = useState<ModalType>('success');
    const [showButton, setButton] = useState(true);

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
    } = useForm<RegistrationFormValues>({
        mode: 'onChange',
    });

    const onSubmit = async (data: RegistrationFormValues) => {
        const formattedDate = formatDate(data.date);
        setLoading(true);

        const customerData: RegistrationFormValues = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            date: formattedDate,
            paymentAddress: data.paymentAddress,
            shippingAddress: data.shippingAddress,
        };

        try {
            const result = await clientSignUp(customerData);

            if (result) {
                setModalTitle(MODAL_TITLE.SUCCESS);
                setModalContent(MODAL_CONTENT.SUCCESS);
                setIsModalOpen(true);
                setModalType('success');
                setButton(false);
                login();
                setTimeout(() => {
                    handleCancel();
                    navigate(routes.root);
                }, 1000);
            } else {
                setModalTitle(MODAL_TITLE.ERROR);
                setModalContent(MODAL_CONTENT.ERROR);
                setIsModalOpen(true);
                setModalType('error');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            layout="vertical"
            name="RegistrationForm"
            className={styles.form}
            onFinish={handleSubmit(onSubmit)}
            autoComplete="on"
        >
            <Row gutter={[24, 24]}>
                <Col xs={24} md={24} lg={12} className={styles.row}>
                    <Typography.Title level={4}>Создать учетную запись</Typography.Title>
                    <Form.Item layout="vertical" label={LABEL.NAME} validateStatus={errors.firstName ? 'error' : ''}>
                        <Controller
                            name="firstName"
                            control={control}
                            rules={{
                                required: ERROR.NAME,
                                pattern: {
                                    value: /^[a-zA-Zа-яА-Я\u00C0-\u017FёЁ]+$/, //только буквы
                                    message: ERROR.INCORRECT_SYMBOLS,
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder={PLACEHOLDER.NAME}
                                    variant="filled"
                                    autoComplete="given-name"
                                />
                            )}
                        />
                        {errors.firstName && (
                            <div style={{ color: 'var(--error-font-color)' }}>{errors.firstName?.message}</div>
                        )}
                    </Form.Item>
                    <Form.Item layout="vertical" label={LABEL.SURNAME} validateStatus={errors.lastName ? 'error' : ''}>
                        <Controller
                            name="lastName"
                            control={control}
                            rules={{
                                required: ERROR.LASTNAME,
                                pattern: {
                                    value: /^[a-zA-Zа-яА-Я\u00C0-\u017FёЁ]+$/,
                                    message: ERROR.INCORRECT_SYMBOLS,
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder={PLACEHOLDER.SURNAME}
                                    variant="filled"
                                    autoComplete="family-name"
                                />
                            )}
                        />
                        {errors.lastName && (
                            <div style={{ color: 'var(--error-font-color)' }}>{errors.lastName?.message}</div>
                        )}
                    </Form.Item>
                    <Form.Item layout="vertical" label={LABEL.EMAIL} validateStatus={errors.email ? 'error' : ''}>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: ERROR.REQUIRED_FIELD,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: `${ERROR.INCORRECT_FORMAT} ${LABEL.EMAIL}`,
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder={PLACEHOLDER.EMAIL}
                                    variant="filled"
                                    autoComplete="email"
                                />
                            )}
                        />
                        {errors.email && (
                            <div style={{ color: 'var(--error-font-color)' }}>{errors.email?.message}</div>
                        )}
                    </Form.Item>
                    <Form.Item layout="vertical" label={LABEL.PASSWORD} validateStatus={errors.password ? 'error' : ''}>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: ERROR.REQUIRED_FIELD,
                                validate: validatePassword,
                            }}
                            render={({ field }) => (
                                <Input.Password
                                    {...field}
                                    placeholder={PLACEHOLDER.PASSWORD}
                                    variant="filled"
                                    autoComplete="current-password"
                                />
                            )}
                        />
                        {errors.password && (
                            <div style={{ color: 'var(--error-font-color)' }}>{errors.password?.message}</div>
                        )}
                    </Form.Item>
                    <Form.Item
                        layout="vertical"
                        label={LABEL.DATE_OF_BIRTH}
                        validateStatus={errors.date ? 'error' : ''}
                    >
                        <Controller
                            name="date"
                            control={control}
                            rules={{
                                required: ERROR.REQUIRED_FIELD,
                                validate: validateDate,
                            }}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    format="DD.MM.YYYY"
                                    placeholder={PLACEHOLDER.DATE_FORMAT}
                                    variant="filled"
                                />
                            )}
                        />
                        {errors.date && <div style={{ color: 'var(--error-font-color)' }}>{errors.date?.message}</div>}
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={12}>
                    <ShippingAddressForm control={control} errors={errors} setValue={setValue} getValues={getValues} />
                    <PaymentAddressForm control={control} errors={errors} setValue={setValue} getValues={getValues} />
                </Col>
            </Row>
            <Flex justify="center" vertical align="center" gap={'10px'}>
                <Button type="primary" htmlType="submit">
                    Регистрация
                </Button>

                <div>
                    Уже есть учетная запись? Тогда просто нажмите <Link to={'/login'}>Вход</Link>
                </div>
            </Flex>
            <Spin spinning={loading} tip="Loading" size="large" fullscreen />
            <ModalWindow
                type={modalType}
                title={modalTitle}
                content={modalContent}
                isOpen={isModalOpen}
                onClose={handleCancel}
                showButton={showButton}
            />
        </Form>
    );
};
