import { Checkbox, Form, Input, Tooltip, Typography } from 'antd';
import { AddressFormProps } from './types';
import { FC, useEffect } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { COUNTRY_TOOLTIP, DEFAULT_COUNTRY, ERROR, LABEL, PLACEHOLDER } from './constants';
import { validateStreet } from './utils';

export const ShippingAddressForm: FC<AddressFormProps> = ({ control, errors, setValue }) => {
    //проверка чекбокса для установки дефолтного адреса
    const setDefaultAddress = useWatch({
        control,
        name: 'shippingAddress.defaultAddress',
    });

    useEffect(() => {
        if (setDefaultAddress) {
            setValue('shippingAddress.defaultAddress', true);
        }
    }, [setDefaultAddress, setValue]);

    return (
        <div style={{ marginBottom: '72px' }}>
            <Typography.Title level={4} style={{ marginBottom: '24px' }}>
                Адрес доставки
            </Typography.Title>

            <Form.Item
                layout="horizontal"
                label={LABEL.CITY}
                labelCol={{ style: { width: '60px', marginRight: '3px', textAlign: 'left' } }}
                validateStatus={errors.shippingAddress?.city ? 'error' : ''}
            >
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

            <Form.Item
                layout="horizontal"
                label={LABEL.COUNTRY}
                labelCol={{ style: { width: '60px', marginRight: '3px', textAlign: 'left' } }}
                validateStatus={errors.shippingAddress?.country ? 'error' : ''}
            >
                <Controller
                    name="shippingAddress.country"
                    control={control}
                    defaultValue={DEFAULT_COUNTRY}
                    render={({ field }) => (
                        <Tooltip title={COUNTRY_TOOLTIP}>
                            <Input
                                {...field}
                                placeholder={PLACEHOLDER.COUNTRY}
                                variant="filled"
                                value="Россия"
                                disabled
                            />
                        </Tooltip>
                    )}
                />
                {errors.shippingAddress?.country && (
                    <div style={{ color: 'var(--error-font-color)' }}>{errors.shippingAddress.country.message}</div>
                )}
            </Form.Item>

            <Form.Item
                layout="horizontal"
                label={LABEL.STREET}
                labelCol={{ style: { width: '60px', marginRight: '3px', textAlign: 'left' } }}
                validateStatus={errors.shippingAddress?.street ? 'error' : ''}
            >
                <Controller
                    name="shippingAddress.street"
                    control={control}
                    rules={{
                        required: ERROR.REQUIRED_FIELD,
                        validate: validateStreet,
                    }}
                    render={({ field }) => <Input {...field} placeholder={PLACEHOLDER.STREET} variant="filled" />}
                />
                {errors.shippingAddress?.street && (
                    <div style={{ color: 'var(--error-font-color)' }}>{errors.shippingAddress.street.message}</div>
                )}
            </Form.Item>

            <Form.Item
                layout="horizontal"
                label={LABEL.INDEX}
                labelCol={{ style: { width: '60px', marginRight: '3px', textAlign: 'left' } }}
                validateStatus={errors.shippingAddress?.index ? 'error' : ''}
            >
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
                            Сделать адресом доставки по умолчанию
                        </Checkbox>
                    )}
                ></Controller>
            </Form.Item>
        </div>
    );
};
