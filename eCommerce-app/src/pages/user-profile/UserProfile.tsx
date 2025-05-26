import type { FC } from 'react';
import { useEffect, useState } from 'react';
import useAuthStore from '../../store/useAuthStore';
import type { Customer } from '../../services/api/login-api/customer';
import { getCurrentCustomer } from '../../services/api/login-api/customer';
import { Spin, Input, Card } from 'antd';
import css from './user-profile.module.scss';

const UserProfilePage: FC = () => {
    const accessToken = useAuthStore((state) => state.accessToken);
    const [customer, setCustomer] = useState<Customer | null>(null);
    useEffect(() => {
        const fetchCustomer = async (): Promise<void> => {
            if (!accessToken) return;
            try {
                const customerData = await getCurrentCustomer(accessToken);
                setCustomer(customerData);
                console.log(customerData);
            } catch (error) {
                console.error('Ошибка при загрузке профиля', error);
            }
        };

        fetchCustomer();
    }, [accessToken]);
    return (
        <>
            {customer ? (
                <>
                    <h1>Добро пожаловать, {customer.firstName}!</h1>
                    <div className={`${css['page-wrapper']}`}>
                        <div className={`${css['personal-info-section']}`}>
                            <h2>Личная информация</h2>
                            <label className={css['input-label']}>Имя</label>
                            <Input value={customer.firstName} style={{ marginBottom: '1rem' }} disabled></Input>
                            <label className={css['input-label']}>Фамилия</label>
                            <Input value={customer.lastName} style={{ marginBottom: '1rem' }} disabled></Input>
                            <label className={css['input-label']}>Email</label>
                            <Input value={customer.email} style={{ marginBottom: '1rem' }} disabled></Input>
                            <label className={css['input-label']}>Дата рождения</label>
                            <Input value={customer.dateOfBirth} style={{ marginBottom: '1rem' }} disabled></Input>
                        </div>
                        <div className={`${css['addresses-section']}`}>
                            <h2>Адреса</h2>
                            {customer.addresses?.length ? (
                                customer.addresses.map((address, index) => (
                                    <Card
                                        key={address.id}
                                        title={`Адрес ${index + 1}`}
                                        style={{ marginBottom: '1rem' }}
                                    >
                                        <p>
                                            <strong>Город:</strong> {address.city}
                                        </p>
                                        <p>
                                            <strong>Улица:</strong> {address.streetName}
                                        </p>
                                        <p>
                                            <strong>Индекс:</strong> {address.postalCode}
                                        </p>
                                        <p>
                                            <strong>Страна:</strong> {address.country}
                                        </p>

                                        {customer.defaultShippingAddressId === address.id && (
                                            <p style={{ color: 'green' }}>🚚 Адрес доставки (по умолчанию)</p>
                                        )}

                                        {customer.defaultBillingAddressId === address.id && (
                                            <p style={{ color: 'blue' }}>💳 Адрес для оплаты (по умолчанию)</p>
                                        )}
                                    </Card>
                                ))
                            ) : (
                                <p>Адреса не найдены.</p>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <Spin />
            )}
        </>
    );
};

export default UserProfilePage;
