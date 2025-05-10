import { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Col, DatePicker, Flex, Form, Input, Row, Typography } from 'antd';
import { ERROR, LABEL, MIN_AGE, PASSWORD_MIN_LENGTH, PLACEHOLDER } from './constants';
import { RegistrationFormValues } from './types';
import { PaymentAddressForm } from './PaymentAddressForm';
import styles from './registration-form.module.scss';
import { ShippingAddressForm } from './ShippingAddressForm';

export const RegistrationForm: FC = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<RegistrationFormValues>({
        mode: 'onChange',
    });

    const onSubmit = (data: RegistrationFormValues) => {
        console.log(data);
    };

    const validatePassword = (value: string) => {
        const trimmedValue = value.trim();

        if (trimmedValue !== value) {
            return 'Пароль не должен содержать пробелы в начале или в конце';
        }

        if (/[а-яА-Я]/.test(trimmedValue)) {
            return 'Используйте только латинские буквы';
        }

        if (value.length < PASSWORD_MIN_LENGTH) {
            return `Пароль должен содержать минимум ${PASSWORD_MIN_LENGTH} символов`;
        }

        if (!/[a-z]/.test(value)) {
            return 'Пароль должен содержать минимум 1 строчную букву';
        }

        if (!/[A-Z]/.test(value)) {
            return 'Пароль должен содержать минимум 1 заглавную букву';
        }

        if (!/\d/.test(value)) {
            return 'Пароль должен содержать минимум 1 цифру';
        }

        return true;
    };

    const validateDate = (value: string): boolean | string => {
        const today = new Date();
        const birthDate = new Date(value);

        if (birthDate > today) {
            return ERROR.INCORRECT_DATE;
        }

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < MIN_AGE) {
            return `Вам должно быть не менее ${MIN_AGE} лет`;
        }

        return true;
    };

    return (
        <Form
            layout="vertical"
            name="RegistrationForm"
            className={styles.form}
            initialValues={{ remember: true }}
            onFinish={handleSubmit(onSubmit)}
            autoComplete="off"
        >
            <Row gutter={[24, 24]}>
                <Col xs={24} md={24} lg={12}>
                    <Typography.Title level={3}>Создать учетную запись</Typography.Title>
                    <Form.Item layout="vertical" label={LABEL.NAME}>
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
                            render={({ field }) => <Input {...field} placeholder={PLACEHOLDER.NAME} variant="filled" />}
                        />
                        {errors.firstName && (
                            <div style={{ color: 'var(--error-font-color)' }}>{errors.firstName?.message}</div>
                        )}
                    </Form.Item>
                    <Form.Item layout="vertical" label={LABEL.SURNAME}>
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
                                <Input {...field} placeholder={PLACEHOLDER.SURNAME} variant="filled" />
                            )}
                        />
                        {errors.lastName && (
                            <div style={{ color: 'var(--error-font-color)' }}>{errors.lastName?.message}</div>
                        )}
                    </Form.Item>
                    <Form.Item layout="vertical" label={LABEL.EMAIL}>
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
                                <Input {...field} placeholder={PLACEHOLDER.EMAIL} variant="filled" />
                            )}
                        />
                        {errors.email && (
                            <div style={{ color: 'var(--error-font-color)' }}>{errors.email?.message}</div>
                        )}
                    </Form.Item>
                    <Form.Item layout="vertical" label={LABEL.PASSWORD}>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: ERROR.REQUIRED_FIELD,
                                validate: validatePassword,
                            }}
                            render={({ field }) => (
                                <Input {...field} placeholder={PLACEHOLDER.PASSWORD} variant="filled" />
                            )}
                        />
                        {errors.password && (
                            <div style={{ color: 'var(--error-font-color)' }}>{errors.password?.message}</div>
                        )}
                    </Form.Item>
                    <Form.Item layout="vertical" label={LABEL.DATE_OF_BIRTH}>
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
                    <ShippingAddressForm control={control} errors={errors} />
                    <PaymentAddressForm control={control} errors={errors} />
                </Col>
            </Row>
            <Flex justify="center">
                <Button
                    type="primary"
                    style={{
                        backgroundColor: 'var(--primary-color)',
                        borderColor: 'none',
                    }}
                    htmlType="submit"
                >
                    Регистрация
                </Button>
            </Flex>
        </Form>
    );
};
