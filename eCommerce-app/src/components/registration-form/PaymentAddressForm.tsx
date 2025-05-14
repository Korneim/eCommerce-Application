import { FC, useEffect } from 'react';
import { AddressFormProps } from './types';
import { Controller, useWatch } from 'react-hook-form';
import { Checkbox, CheckboxChangeEvent, Form, Input, Tooltip, Typography } from 'antd';
import { COUNTRY_TOOLTIP, DEFAULT_COUNTRY, ERROR, LABEL, PLACEHOLDER } from './constants';
import { validateStreet } from './utils';

export const PaymentAddressForm: FC<AddressFormProps> = ({ control, errors, setValue, getValues }) => {
    const shippingAddressValues = useWatch({
        control,
        name: 'shippingAddress',
    });

    // проверка отмечен чекбокс или нет
    const copyAddress = useWatch({
        control,
        name: 'paymentAddress.copyAddress',
    });
    //проверка чекбокса для установки дефолтного адреса
    const setDefaultAddress = useWatch({
        control,
        name: 'paymentAddress.defaultAddress',
    });

    useEffect(() => {
        if (copyAddress && shippingAddressValues) {
            setValue('paymentAddress.city', shippingAddressValues.city);
            setValue('paymentAddress.street', shippingAddressValues.street);
            setValue('paymentAddress.index', shippingAddressValues.index);
        }
    }, [shippingAddressValues, copyAddress, setValue]); // если меняются эти значения, то данные копируются

    const handleCopyAddress = (checked: boolean) => {
        if (checked) {
            const shippingAddress = getValues('shippingAddress');

            if (shippingAddress) {
                setValue('paymentAddress.city', shippingAddress.city);
                setValue('paymentAddress.street', shippingAddress.street);
                setValue('paymentAddress.index', shippingAddress.index);
            }
        } else {
            setValue('paymentAddress.city', '');
            setValue('paymentAddress.street', '');
            setValue('paymentAddress.index', '');
        }
    };

    useEffect(() => {
        if (setDefaultAddress) {
            setValue('paymentAddress.defaultAddress', true);
        }
    }, [setDefaultAddress, setValue]);

    return (
        <div style={{ marginBottom: '72px' }}>
            <Typography.Title level={3}>Адрес оплаты</Typography.Title>
            <Form.Item name="remember" valuePropName="checked">
                <Controller
                    name="paymentAddress.copyAddress"
                    control={control}
                    render={({ field }) => (
                        <Checkbox
                            checked={field.value}
                            onChange={(e: CheckboxChangeEvent) => {
                                field.onChange(e);
                                handleCopyAddress(e.target.checked);
                            }}
                        >
                            Скопировать данные из адреса доставки
                        </Checkbox>
                    )}
                />
            </Form.Item>

            <Form.Item
                layout="horizontal"
                label={LABEL.CITY}
                labelCol={{ style: { width: '60px', marginRight: '3px', textAlign: 'left' } }}
                validateStatus={errors.paymentAddress?.city ? 'error' : ''}
            >
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
                    render={({ field }) => (
                        <Input {...field} placeholder={PLACEHOLDER.CITY} variant="filled" disabled={copyAddress} /> //если чекбокс(copyAddress) установлен то инпуты блокируются
                    )}
                />
                {errors.paymentAddress?.city && (
                    <div style={{ color: 'var(--error-font-color)' }}>{errors.paymentAddress.city.message}</div>
                )}
            </Form.Item>

            <Form.Item
                layout="horizontal"
                label={LABEL.COUNTRY}
                labelCol={{ style: { width: '60px', marginRight: '3px', textAlign: 'left' } }}
                validateStatus={errors.paymentAddress?.country ? 'error' : ''}
            >
                <Controller
                    name="paymentAddress.country"
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
                {errors.paymentAddress?.country && (
                    <div style={{ color: 'var(--error-font-color)' }}>{errors.paymentAddress.country.message}</div>
                )}
            </Form.Item>

            <Form.Item
                layout="horizontal"
                label={LABEL.STREET}
                labelCol={{ style: { width: '60px', marginRight: '3px', textAlign: 'left' } }}
                validateStatus={errors.paymentAddress?.street ? 'error' : ''}
            >
                <Controller
                    name="paymentAddress.street"
                    control={control}
                    rules={{
                        required: ERROR.REQUIRED_FIELD,
                        validate: validateStreet,
                    }}
                    render={({ field }) => (
                        <Input {...field} placeholder={PLACEHOLDER.STREET} variant="filled" disabled={copyAddress} />
                    )}
                />
                {errors.paymentAddress?.street && (
                    <div style={{ color: 'var(--error-font-color)' }}>{errors.paymentAddress.street.message}</div>
                )}
            </Form.Item>

            <Form.Item
                layout="horizontal"
                label={LABEL.INDEX}
                labelCol={{ style: { width: '60px', marginRight: '3px', textAlign: 'left' } }}
                validateStatus={errors.paymentAddress?.index ? 'error' : ''}
            >
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
                    render={({ field }) => (
                        <Input {...field} placeholder={PLACEHOLDER.INDEX} variant="filled" disabled={copyAddress} />
                    )}
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
                        <Checkbox
                            checked={field.value}
                            onChange={(e: CheckboxChangeEvent) => {
                                field.onChange(e);
                            }}
                        >
                            Сделать адресом оплаты по умолчания
                        </Checkbox>
                    )}
                ></Controller>
            </Form.Item>
        </div>
    );
};
