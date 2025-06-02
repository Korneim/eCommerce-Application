import type { FC } from 'react';
import { useEffect, useState } from 'react';
import useAuthStore from '../../store/useAuthStore';
import type { Customer, Address } from '../../services/api/login-api/customer';
import { updateCustomerAddress } from '../../services/api/login-api/customer';
import { getCurrentCustomer } from '../../services/api/login-api/customer';
import { Spin, Input, Card, Button, message } from 'antd';
import css from './user-profile.module.scss';
import { ModalWindow } from '../../components/modal-window/ModalWindow';
import type { ModalType } from '../../components/modal-window/ModalWindow';
import GlobalSpinner from '../../components/user-profile/GlobalSpinner';

const isValidCity = (city: string): boolean => {
    const cityRegex = /^[A-Za-zА-Яа-яЁё]+(?: [A-Za-zА-Яа-яЁё]+)*$/;
    return city === city.trim() && cityRegex.test(city);
};

const isValidPostalCode = (postalCode: string): boolean => {
    const postalCodeRegex = /^\d{6}$/;
    return postalCodeRegex.test(postalCode);
};

const AddressSection: FC = () => {
    const [spinning, setSpinning] = useState<boolean>(false);
    const [cityError, setCityError] = useState('');
    const [postalCodeError, setPostalCodeError] = useState('');
    const accessToken = useAuthStore((state) => state.accessToken);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [editableAddressIndex, setEditableAddressIndex] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalType, setModalType] = useState<ModalType>('success');
    const [messageApi, contextHolder] = message.useMessage();

    const [addressFormValues, setAddressFormValues] = useState({
        city: '',
        streetName: '',
        postalCode: '',
        country: 'RU',
    });
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

    const handleCancel = (): void => {
        setIsModalOpen(false);
    };

    const handleEditAdress = async (index: number, address: Address): Promise<void> => {
        if (editableAddressIndex !== index) {
            setAddressFormValues({
                city: address.city,
                streetName: address.streetName,
                postalCode: address.postalCode,
                country: 'RU',
            });
            setEditableAddressIndex(index);
            return;
        }
        setSpinning(true);
        try {
            if (!accessToken) return;
            await updateCustomerAddress(accessToken, address.id, addressFormValues);
            const updatedCustomer = await getCurrentCustomer(accessToken);
            setCustomer(updatedCustomer);
            messageApi.open({
                type: 'success',
                content: 'Данные адреса успешно обновлены',
            });
        } catch (error) {
            if (error instanceof Error) {
                setIsModalOpen(true);
                setModalType('error');
                setModalTitle('Ошибка обновления адреса');
                setModalContent('Непредвиденная ошибка');
                setEditableAddressIndex(null);
            }
        } finally {
            setSpinning(false);
        }
        setCityError('');
        setPostalCodeError('');
        setEditableAddressIndex(index);
        console.log(address.id);
    };

    return (
        <>
            {customer ? (
                <>
                    <GlobalSpinner spinning={spinning} />
                    {contextHolder}
                    <ModalWindow
                        type={modalType}
                        title={modalTitle}
                        content={modalContent}
                        isOpen={isModalOpen}
                        onClose={handleCancel}
                    />
                    <div className={`${css['addresses-section']}`}>
                        <h2>Адреса</h2>
                        {customer.addresses?.length ? (
                            customer.addresses.map((address, index) => (
                                <Card key={address.id} title={`Адрес ${index + 1}`} style={{ marginBottom: '1rem' }}>
                                    <p>
                                        <strong>Город: </strong>
                                        {editableAddressIndex === index ? (
                                            <Input
                                                value={addressFormValues.city}
                                                style={{ width: '200px' }}
                                                status={cityError ? 'error' : ''}
                                                onChange={(e) => {
                                                    console.log(customer.addresses);
                                                    setAddressFormValues({
                                                        ...addressFormValues,
                                                        city: e.target.value,
                                                    });
                                                    if (isValidCity(e.target.value)) {
                                                        setCityError('');
                                                    } else {
                                                        setCityError(
                                                            'Допускаются только буквы. Если название города состоит из нескольких слов используйте пробел'
                                                        );
                                                    }
                                                }}
                                            />
                                        ) : (
                                            address.city
                                        )}
                                        {editableAddressIndex === index ? (
                                            <span
                                                style={{
                                                    color: 'red',
                                                    marginBottom: '1rem',
                                                    maxWidth: '50rem',
                                                    display: 'block',
                                                }}
                                            >
                                                {cityError}
                                            </span>
                                        ) : (
                                            <span style={{ color: 'red', marginBottom: '1rem' }}></span>
                                        )}
                                    </p>
                                    <p>
                                        <strong>Улица: </strong>
                                        {editableAddressIndex === index ? (
                                            <Input
                                                value={addressFormValues.streetName}
                                                style={{ width: '200px' }}
                                                onChange={(e) => {
                                                    setAddressFormValues({
                                                        ...addressFormValues,
                                                        streetName: e.target.value,
                                                    });
                                                }}
                                            />
                                        ) : (
                                            address.streetName
                                        )}
                                    </p>
                                    <p>
                                        <strong>Индекс: </strong>
                                        {editableAddressIndex === index ? (
                                            <Input
                                                value={addressFormValues.postalCode}
                                                style={{ width: '200px' }}
                                                status={postalCodeError ? 'error' : ''}
                                                onChange={(e) => {
                                                    setAddressFormValues({
                                                        ...addressFormValues,
                                                        postalCode: e.target.value,
                                                    });
                                                    if (isValidPostalCode(e.target.value)) {
                                                        setPostalCodeError('');
                                                    } else {
                                                        setPostalCodeError('Неверный формат индекса');
                                                    }
                                                }}
                                            />
                                        ) : (
                                            address.postalCode
                                        )}
                                        {editableAddressIndex === index ? (
                                            <span style={{ color: 'red', marginBottom: '1rem', display: 'block' }}>
                                                {postalCodeError}
                                            </span>
                                        ) : (
                                            <span style={{ color: 'red', marginBottom: '1rem' }}></span>
                                        )}
                                    </p>
                                    <p>
                                        <strong>Страна: </strong>
                                        {editableAddressIndex === index ? (
                                            <Input value={'Россия'} style={{ width: '200px' }} disabled />
                                        ) : (
                                            'Россия'
                                        )}
                                    </p>

                                    {customer.defaultShippingAddressId === address.id && (
                                        <p style={{ color: 'green' }}>🚚 Адрес доставки (по умолчанию)</p>
                                    )}

                                    {customer.defaultBillingAddressId === address.id && (
                                        <p style={{ color: 'blue' }}>💳 Адрес для оплаты (по умолчанию)</p>
                                    )}

                                    <Button
                                        onClick={() => void handleEditAdress(index, address)}
                                        disabled={!!cityError || !!postalCodeError}
                                    >
                                        {editableAddressIndex === index ? 'Сохранить' : 'Изменить'}
                                    </Button>

                                    <Button
                                        onClick={() => {
                                            setEditableAddressIndex(null);
                                            setCityError('');
                                            setPostalCodeError('');
                                        }}
                                        style={{ marginLeft: '1rem' }}
                                        disabled={!(editableAddressIndex === index)}
                                    >
                                        Отменить
                                    </Button>
                                </Card>
                            ))
                        ) : (
                            <p>Адреса не найдены.</p>
                        )}
                    </div>
                </>
            ) : (
                <Spin />
            )}
        </>
    );
};

export default AddressSection;
