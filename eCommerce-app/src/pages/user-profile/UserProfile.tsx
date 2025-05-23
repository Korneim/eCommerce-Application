import type { FC } from 'react';
import { useEffect, useState } from 'react';
import useAuthStore from '../../store/useAuthStore';
import type { Customer } from '../../services/api/login-api/customer';
import { getCurrentCustomer } from '../../services/api/login-api/customer';
import { Spin } from 'antd'

const UserProfilePage: FC = () => {
    const accessToken = useAuthStore((state) => state.accessToken);
    const [customer, setCustomer] = useState<Customer | null>(null);
    useEffect(() => {
        const fetchCustomer = async (): Promise<void> => {
        if (!accessToken) return;
        try {
            const customerData = await getCurrentCustomer(accessToken);
            setCustomer(customerData);
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
                    <div>
                        <p>Имя: {customer.firstName}</p>
                        <p>Фамилия: {customer.lastName}</p>
                        <p>Email: {customer.email}</p>
                    </div>
                </>
            ) : (
                <Spin />
            )}
        </>
    )
}

export default UserProfilePage;