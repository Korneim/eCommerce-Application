import { FC } from 'react';
import { AddressFormProps } from './types';
import { Controller } from 'react-hook-form';
import { Checkbox, Form, Input, Typography } from 'antd';
import { ERROR, LABEL, PLACEHOLDER } from './constants';
import { validate } from './utils';

export const PaymentAddressForm: FC<AddressFormProps> = ({ control, errors }) => {
    return (
        <Form
            style={{ marginBottom: '72px' }}
            layout="horizontal"
            name="paymentAddressForm"
            labelCol={{ style: { width: '60px', marginRight: '3px', textAlign: 'left' } }}
            autoComplete="off"
        >
            <Typography.Title level={3}>Адрес оплаты</Typography.Title>
            <Form.Item name="remember" valuePropName="checked" style={{ marginBottom: '48px' }}>
                <Controller
                    name="paymentAddress.copyAddress"
                    control={control}
                    render={({ field }) => (
                        <Checkbox checked={field.value} onChange={field.onChange}>
                            Скопировать данные из адреса доставки
                        </Checkbox>
                    )}
                />
            </Form.Item>

            <Form.Item layout="horizontal" label={LABEL.CITY}>
                <Controller
                    name="paymentAddress.city"
                    control={control}
                    rules={{
                        required: ERROR.REQUIRED_FIELD,
                        pattern: {
                            value: /^[a-zA-Zа-яА-Я\u00C0-\u017FёЁ]+(?:[ ]?[a-zA-Zа-яА-Я\u00C0-\u017FёЁ]+)*$/, //буквы и пробел
                            message: ERROR.CITY_FORMAT,
                        },
                    }}
                    render={({ field }) => <Input {...field} placeholder={PLACEHOLDER.CITY} variant="filled" />}
                />
                {errors.paymentAddress?.city && (
                    <div style={{ color: 'var(--error-font-color)' }}>{errors.paymentAddress.city.message}</div>
                )}
            </Form.Item>

            <Form.Item layout="horizontal" label={LABEL.COUNTRY}>
                <Controller
                    name="paymentAddress.country"
                    control={control}
                    rules={{
                        required: ERROR.REQUIRED_FIELD,
                    }}
                    render={({ field }) => <Input {...field} placeholder={PLACEHOLDER.COUNTRY} variant="filled" />}
                />
                {errors.paymentAddress?.country && (
                    <div style={{ color: 'var(--error-font-color)' }}>{errors.paymentAddress.country.message}</div>
                )}
            </Form.Item>

            <Form.Item layout="horizontal" label={LABEL.STREET}>
                <Controller
                    name="paymentAddress.street"
                    control={control}
                    rules={{
                        required: ERROR.REQUIRED_FIELD,
                        validate: validate,
                    }}
                    render={({ field }) => <Input {...field} placeholder={PLACEHOLDER.STREET} variant="filled" />}
                />
                {errors.paymentAddress?.street && (
                    <div style={{ color: 'var(--error-font-color)' }}>{errors.paymentAddress.street.message}</div>
                )}
            </Form.Item>

            <Form.Item layout="horizontal" label={LABEL.INDEX}>
                <Controller
                    name="paymentAddress.index"
                    control={control}
                    rules={{
                        required: ERROR.REQUIRED_FIELD,
                        pattern: {
                            value: /^\d{6}$/,
                            message: ERROR.INCORRECT_FORMAT,
                        },
                    }}
                    render={({ field }) => <Input {...field} placeholder={PLACEHOLDER.INDEX} variant="filled" />}
                />
                {errors.paymentAddress?.index && (
                    <div style={{ color: 'var(--error-font-color)' }}>{errors.paymentAddress.index.message}</div>
                )}
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
                <Controller
                    name="paymentAddress.defaultAddress"
                    control={control}
                    render={({ field }) => (
                        <Checkbox checked={field.value} onChange={field.onChange}>
                            Сделать адресом оплаты по умолчания
                        </Checkbox>
                    )}
                ></Controller>
            </Form.Item>
        </Form>
    );
};
