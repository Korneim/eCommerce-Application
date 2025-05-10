import { Checkbox, Form, Input, Typography } from 'antd';
import { AddressFormProps } from './types';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { ERROR, LABEL, PLACEHOLDER } from './constants';
import { validate } from './utils';

export const ShippingAddressForm: FC<AddressFormProps> = ({ control, errors }) => {
    return (
        <Form
            style={{ marginBottom: '72px' }}
            layout="horizontal"
            name="shippingAddressForm"
            labelCol={{ style: { width: '60px', marginRight: '3px', textAlign: 'left' } }}
            autoComplete="off"
        >
            <Typography.Title level={3} style={{ marginBottom: '24px' }}>
                Адрес доставки
            </Typography.Title>

            <Form.Item layout="horizontal" label={LABEL.CITY}>
                <Controller
                    name="shippingAddress.city"
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
                {errors.shippingAddress?.city && (
                    <div style={{ color: 'var(--error-font-color)' }}>{errors.shippingAddress.city.message}</div>
                )}
            </Form.Item>

            <Form.Item layout="horizontal" label={LABEL.COUNTRY}>
                <Controller
                    name="shippingAddress.country"
                    control={control}
                    rules={{
                        required: ERROR.REQUIRED_FIELD,
                    }}
                    render={({ field }) => <Input {...field} placeholder={PLACEHOLDER.COUNTRY} variant="filled" />}
                />
                {errors.shippingAddress?.country && (
                    <div style={{ color: 'var(--error-font-color)' }}>{errors.shippingAddress.country.message}</div>
                )}
            </Form.Item>

            <Form.Item layout="horizontal" label={LABEL.STREET}>
                <Controller
                    name="shippingAddress.street"
                    control={control}
                    rules={{
                        required: ERROR.REQUIRED_FIELD,
                        validate: validate,
                    }}
                    render={({ field }) => <Input {...field} placeholder={PLACEHOLDER.STREET} variant="filled" />}
                />
                {errors.shippingAddress?.street && (
                    <div style={{ color: 'var(--error-font-color)' }}>{errors.shippingAddress.street.message}</div>
                )}
            </Form.Item>

            <Form.Item layout="horizontal" label={LABEL.INDEX}>
                <Controller
                    name="shippingAddress.index"
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
                {errors.shippingAddress?.index && (
                    <div style={{ color: 'var(--error-font-color)' }}>{errors.shippingAddress.index.message}</div>
                )}
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
                <Controller
                    name="shippingAddress.defaultAddress"
                    control={control}
                    render={({ field }) => (
                        <Checkbox checked={field.value} onChange={field.onChange}>
                            Сделать адресом доставки по умолчания
                        </Checkbox>
                    )}
                ></Controller>
            </Form.Item>
        </Form>
    );
};
