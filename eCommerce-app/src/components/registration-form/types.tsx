export interface RegistrationFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    date: string;
}

// TODO: переместить в общие типы? (корзина)
export interface AddressFormValues {
    city: string;
    country: string;
    street: string;
    index: string;
}
