import { Control, FieldErrors } from 'react-hook-form';

export interface RegistrationFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    date: string;
    paymentAddress: AddressFormValues;
    shippingAddress: AddressFormValues;
}

// TODO: переместить в общие типы ? (корзина)
export interface AddressFormValues {
    city: string;
    country: string;
    street: string;
    index: string;
    copyAddress?: boolean; //TODO: change ?
    defaultAddress?: boolean; //TODO: change ?
}

export interface PaymentAddressFormProps {
    control: Control<RegistrationFormValues>;
    errors: FieldErrors<RegistrationFormValues>;
}
