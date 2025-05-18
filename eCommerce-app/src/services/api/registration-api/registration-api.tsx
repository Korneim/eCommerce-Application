import { BaseAddress, MyCustomerDraft } from '@commercetools/platform-sdk';
import { apiRootRegister, createApiClientWithPasswordFlow } from '../BuildClient';
import { STATUS_CODE } from '../constants';
import { RegistrationFormValues } from '../../../components/registration-form/types';

export const clientSignUp = async (data: RegistrationFormValues): Promise<boolean> => {
    const shippingAddress: BaseAddress = {
        country: data.shippingAddress.country,
        city: data.shippingAddress.city,
        streetName: data.shippingAddress.street,
        postalCode: data.shippingAddress.index,
    };

    const billingAddress: BaseAddress = {
        country: data.paymentAddress.country,
        city: data.paymentAddress.city,
        streetName: data.paymentAddress.street,
        postalCode: data.paymentAddress.index,
    };

    const customerDraft: MyCustomerDraft = {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.date,
        addresses: [shippingAddress, billingAddress],
        defaultShippingAddress: data.shippingAddress.defaultAddress ? 0 : undefined,
        defaultBillingAddress: data.paymentAddress.defaultAddress ? 1 : undefined,
    };

    try {
        const response = await apiRootRegister
            .me()
            .signup()
            .post({
                body: customerDraft,
            })
            .execute();

        if (response.statusCode === +STATUS_CODE.SUCCESS) {
            createApiClientWithPasswordFlow({ username: customerDraft.email, password: customerDraft.password })
                .me()
                .get()
                .execute();
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};
