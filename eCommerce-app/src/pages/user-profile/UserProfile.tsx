import type { FC } from 'react';
import { useEffect, useState } from 'react';
import useAuthStore from '../../store/useAuthStore';
import type { Customer } from '../../services/api/login-api/customer';
import { updateCustomerPersonalData } from '../../services/api/login-api/customer';
import { getCurrentCustomer } from '../../services/api/login-api/customer';
import { Spin, Input, Card, Button, DatePicker } from 'antd';
import css from './user-profile.module.scss';
import dayjs, { Dayjs } from 'dayjs';
import { ModalWindow } from '../../components/modal-window/ModalWindow';
import type { ModalType } from '../../components/modal-window/ModalWindow';

const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email === email.trim() && emailRegex.test(email);
};

const isValidName = (name: string): boolean => {
    const nameRegex = /^[A-Za-z\u00C0-\u017FЁА-яё]+$/;
    return name === name.trim() && nameRegex.test(name);
}

const UserProfilePage: FC = () => {
    const minAge = 13;
    const [emailError, setEmailError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const accessToken = useAuthStore((state) => state.accessToken);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalType, setModalType] = useState<ModalType>('success');
    const [initialValues, setInitialValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
    });
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
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

    useEffect(() => {
        if (customer) {
              const values = {
                firstName: customer.firstName || '',
                lastName: customer.lastName || '',
                email: customer.email || '',
                dateOfBirth: customer.dateOfBirth || '',
            };
            setFormValues(values);
            setInitialValues(values);
        }
    }, [customer]);

    const handleEditToggle = async (): Promise<void> => {
        if (isEditMode) {
            try {
                if (!accessToken) return;
                await updateCustomerPersonalData(accessToken, formValues);
            }
            catch (error) {
                if (error instanceof Error && error.message === 'duplicate_email') {
                    setIsModalOpen(true);
                    setModalType('error');
                    setModalTitle('Ошибка обновления пользователя');
                    setModalContent('Введенный email уже зарегистрирован');
                    setFormValues(initialValues);
                    setFirstNameError('');
                    setLastNameError('');
                    setEmailError('');
                    setIsEditMode(false);
                } else {
                    setIsModalOpen(true);
                    setModalType('error');
                    setModalTitle('Ошибка обновления пользователя');
                    setModalContent('Непредвиденная ошибка');
                    setFormValues(initialValues);
                    setFirstNameError('');
                    setLastNameError('');
                    setEmailError('');
                    setIsEditMode(false);
                }
            }
        }
        setIsEditMode(!isEditMode);
    };

    const handleCancelEdit = (): void => {
        setFormValues(initialValues);
        setFirstNameError('');
        setLastNameError('');
        setEmailError('');
        setIsEditMode(false);
    };

    const handleCancel = (): void => {
        setIsModalOpen(false);
    };
    return (
        <>
            {customer ? (
                <>
<<<<<<< HEAD
                    <ModalWindow
                        type={modalType}
                        title={modalTitle}
                        content={modalContent}
                        isOpen={isModalOpen}
                        onClose={handleCancel}
                    />
                    <h1>Добро пожаловать, {customer.firstName}!</h1>
                    <div className={`${css['page-wrapper']}`}>
                        <div className={`${css['personal-info-section']}`}>
                            <h2>Личная информация</h2>
                            <label className={css['input-label']}>Имя</label>
                            <Input
                                value={formValues.firstName}
                                style={{ marginBottom: '1rem' }}
                                disabled={!isEditMode}
                                status={firstNameError ? 'error' : ''}
                                onChange={(e) => {
                                    const newFirstName = e.target.value;
                                    setFormValues({ ...formValues, firstName: newFirstName })
                                    if (isValidName(newFirstName)) {
                                        setFirstNameError('');
                                    } else {
                                        setFirstNameError('Поле должно содержать только буквы');
                                    }
                                }
                            }
                            >
                            </Input>
                            <div style={{ color: 'red', marginBottom: '1rem' }}>{firstNameError}</div>
                            <label className={css['input-label']}>Фамилия</label>
                            <Input
                                value={formValues.lastName}
                                style={{ marginBottom: '1rem' }}
                                disabled={!isEditMode}
                                status={lastNameError ? 'error' : ''}
                                onChange={(e) => {
                                    const newLastName = e.target.value;
                                    setFormValues({ ...formValues, lastName: newLastName })
                                    if (isValidName(newLastName)) {
                                        setLastNameError('');
                                    } else {
                                        setLastNameError('Поле должно содержать только буквы');
                                    }
                                }
                            }
                            >
                            </Input>
                            <div style={{ color: 'red', marginBottom: '1rem' }}>{lastNameError}</div>
                            <label className={css['input-label']}>Email</label>
                            <Input
                                value={formValues.email}
                                style={{ marginBottom: '1rem' }}
                                status={emailError ? 'error' : ''}
                                disabled={!isEditMode}
                                onChange={(e) => {
                                    const newEmail = e.target.value;
                                    setFormValues({ ...formValues, email: newEmail });
                                    if (isValidEmail(newEmail)) {
                                        setEmailError('');
                                    } else {
                                        setEmailError('Введите корректный email');
                                    }
                                }
                            }
                            >
                            </Input>
                            <div style={{ color: 'red', marginBottom: '1rem' }}>{emailError}</div>
                            <label className={css['input-label']}>Дата рождения</label>
                            <DatePicker
                            value={formValues.dateOfBirth ? dayjs(formValues.dateOfBirth) : null}
                            disabled={!isEditMode}
                            onChange={(date) => {
                                setFormValues({
                                ...formValues,
                                dateOfBirth: date ? date.format('YYYY-MM-DD') : '',
                                });
                            }}
                            disabledDate={(current: Dayjs) =>
                                current && current.isAfter(dayjs().subtract(minAge, 'year'), 'day')
                            }
                            style={{ marginBottom: '1rem', width: '100%' }}
                            />
                            <Button type="primary" onClick={() => void handleEditToggle()} disabled={!!emailError || !!firstNameError || !!lastNameError}>
                                {isEditMode ? 'Сохранить' : 'Редактировать'}
                            </Button>
                            {isEditMode && (
                                <Button style={{ marginLeft: '1rem' }} onClick={handleCancelEdit}>
                                    Отменить
                                </Button>
                            )}
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
=======
                    <h1>Добро пожаловать, {customer.firstName}!</h1>
                    <div>
                        <p>Имя: {customer.firstName}</p>
                        <p>Фамилия: {customer.lastName}</p>
                        <p>Email: {customer.email}</p>
>>>>>>> 12e4174 (feat: retrieving customer data from api)
                    </div>
                </>
            ) : (
                <Spin />
            )}
        </>
<<<<<<< HEAD
    );
};

export default UserProfilePage;
=======
    )
}

export default UserProfilePage;
>>>>>>> 12e4174 (feat: retrieving customer data from api)
