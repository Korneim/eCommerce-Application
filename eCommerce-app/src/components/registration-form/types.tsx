import { Control, FieldErrors, UseFormClearErrors, UseFormGetValues, UseFormSetValue } from 'react-hook-form';

export interface RegistrationFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    date: string;
    paymentAddress: AddressFormValues;
    shippingAddress: AddressFormValues;
}

export interface AddressFormValues {
    city: string;
    country: string;
    street: string;
    index: string;
    copyAddress?: boolean;
    defaultAddress?: boolean;
}

export interface AddressFormProps {
    control: Control<RegistrationFormValues>;
    errors: FieldErrors<RegistrationFormValues>;
    setValue: UseFormSetValue<RegistrationFormValues>;
    getValues: UseFormGetValues<RegistrationFormValues>;
    clearErrors?: UseFormClearErrors<RegistrationFormValues>;
}
