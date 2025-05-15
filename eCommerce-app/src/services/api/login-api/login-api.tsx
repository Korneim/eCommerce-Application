import { apiRootRegister, createApiClientWithPasswordFlow } from '../BuildClient';
import { STATUS_CODE } from '../constants';

export const clientLogin = async (data: { email: string; password: string }): Promise<boolean> => {
    try {
        const response = await apiRootRegister
            .me()
            .login()
            .post({
                body: data,
            })
            .execute();

        if (response.statusCode === +STATUS_CODE.SUCCESS) {
            createApiClientWithPasswordFlow({ username: data.email, password: data.password });
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};
