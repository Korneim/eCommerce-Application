import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { loginCustomer } from '../../services/api/login-api/auth';
import useAuthStore from '../../store/useAuthStore';
import type { Customer } from '../../services/api/login-api/customer';
import { updateCustomerPersonalData } from '../../services/api/login-api/customer';
import { getCurrentCustomer } from '../../services/api/login-api/customer';
import { Spin, Input, Button, DatePicker, Modal, message } from 'antd';
import css from './user-profile.module.scss';
import dayjs, { Dayjs } from 'dayjs';
import { ModalWindow } from '../../components/modal-window/ModalWindow';
import type { ModalType } from '../../components/modal-window/ModalWindow';
import AddressSection from './Adresses';
import GlobalSpinner from '../../components/user-profile/GlobalSpinner';

interface NewCustomer {
    version: number;
    email: string;
}

const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email === email.trim() && emailRegex.test(email);
};

const isValidName = (name: string): boolean => {
    const nameRegex = /^[A-Za-z\u00C0-\u017FЁА-яё]+$/;
    return name === name.trim() && nameRegex.test(name);
};

const isValidPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return password === password.trim() && passwordRegex.test(password);
};

const UserProfilePage: FC = () => {
    const [spinning, setSpinning] = useState<boolean>(false);
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
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
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
            setSpinning(true);
            try {
                if (!accessToken) return;
                await updateCustomerPersonalData(accessToken, formValues);
                messageApi.open({
                    type: 'success',
                    content: 'Данные успешно обновлены',
                })
            } catch (error) {
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
            } finally {
                setSpinning(false);
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
                    {contextHolder}
                    <GlobalSpinner spinning={spinning} />
                    <Modal
                        title="Изменить пароль"
                        open={isPasswordModalOpen}
                        onCancel={() => {
                            setIsPasswordModalOpen(false);
                            setOldPassword('');
                            setNewPassword('');
                            setConfirmPassword('');
                            setPasswordError('');
                        }}
                        onOk={() => {
                            void (async (): Promise<void> => {
                                if (newPassword !== confirmPassword) {
                                    setPasswordError('Пароли не совпадают');
                                    return;
                                }
                                setSpinning(true);
                                try {
                                    if (!accessToken) return;
                                    const projectKey = import.meta.env.VITE_PROJECT_KEY;
                                    const customerRes = await fetch(
                                        `https://api.europe-west1.gcp.commercetools.com/${projectKey}/me`,
                                        {
                                            headers: {
                                                Authorization: `Bearer ${accessToken}`,
                                            },
                                        }
                                    );

                                    async function parseJsonResponse<T>(response: Response): Promise<T> {
                                        const text = await response.text();
                                        const data: T = JSON.parse(text);
                                        return data;
                                    }
                                    const customer = await parseJsonResponse<NewCustomer>(customerRes);

                                    const response = await fetch(
                                        `https://api.europe-west1.gcp.commercetools.com/${projectKey}/me/password`,
                                        {
                                            method: 'POST',
                                            headers: {
                                                Authorization: `Bearer ${accessToken}`,
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({
                                                version: customer.version,
                                                currentPassword: oldPassword,
                                                newPassword: newPassword,
                                            }),
                                        }
                                    );

                                    if (!response.ok) {
                                        setPasswordError('Ошибка: возможно, старый пароль введён неверно');
                                        return;
                                    }

                                    const newTokenData = await loginCustomer(customer.email, newPassword);
                                    const { setAccessToken } = useAuthStore.getState();
                                    setAccessToken(newTokenData.access_token);

                                    messageApi.open({
                                        type: 'success',
                                        content: 'Пароль успешно изменён',
                                    })

                                    setIsPasswordModalOpen(false);
                                    setOldPassword('');
                                    setNewPassword('');
                                    setConfirmPassword('');
                                    setPasswordError('');
                                } catch (error) {
                                    setPasswordError('Не удалось изменить пароль');
                                    if (error instanceof Error) throw new Error(error.message);
                                } finally {
                                    setSpinning(false);
                                }
                            })();
                        }}
                        okText="Сохранить"
                        cancelText="Отмена"
                        okButtonProps={{ disabled: !!passwordError }}
                    >
                        <label>Старый пароль</label>
                        <Input.Password
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            style={{ marginBottom: '1rem' }}
                        />

                        <label>Новый пароль</label>
                        <Input.Password
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                if (isValidPassword(e.target.value)) {
                                    setPasswordError('');
                                } else {
                                    setPasswordError(
                                        'Пароль должен содержать одну строчную букву a-z, одну большую A-Z, и одну цифру, а также не содержать пробелов в начале и конце строки'
                                    );
                                }
                            }}
                            style={{ marginBottom: '1rem' }}
                            status={passwordError ? 'error' : ''}
                        />

                        <label>Подтвердите новый пароль</label>
                        <Input.Password
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{ marginBottom: '1rem' }}
                        />

                        {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
                    </Modal>
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
                                    setFormValues({ ...formValues, firstName: newFirstName });
                                    if (isValidName(newFirstName)) {
                                        setFirstNameError('');
                                    } else {
                                        setFirstNameError('Поле должно содержать только буквы');
                                    }
                                }}
                            ></Input>
                            <div style={{ color: 'red', marginBottom: '1rem' }}>{firstNameError}</div>
                            <label className={css['input-label']}>Фамилия</label>
                            <Input
                                value={formValues.lastName}
                                style={{ marginBottom: '1rem' }}
                                disabled={!isEditMode}
                                status={lastNameError ? 'error' : ''}
                                onChange={(e) => {
                                    const newLastName = e.target.value;
                                    setFormValues({ ...formValues, lastName: newLastName });
                                    if (isValidName(newLastName)) {
                                        setLastNameError('');
                                    } else {
                                        setLastNameError('Поле должно содержать только буквы');
                                    }
                                }}
                            ></Input>
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
                                }}
                            ></Input>
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
                            <Button
                                type="primary"
                                onClick={() => void handleEditToggle()}
                                disabled={!!emailError || !!firstNameError || !!lastNameError}
                            >
                                {isEditMode ? 'Сохранить' : 'Редактировать'}
                            </Button>
                            {isEditMode && (
                                <Button style={{ marginLeft: '1rem' }} onClick={handleCancelEdit}>
                                    Отменить
                                </Button>
                            )}
                            <Button style={{ marginLeft: '1rem' }} onClick={() => setIsPasswordModalOpen(true)}>
                                Изменить пароль
                            </Button>
                        </div>
                        <AddressSection></AddressSection>
                    </div>
                </>
            ) : (
                <Spin />
            )}
        </>
    );
};

export default UserProfilePage;
