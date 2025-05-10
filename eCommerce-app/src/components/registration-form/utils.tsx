import { ERROR } from './constants';

export const validate = (value: string): string | boolean => {
    if (!value) {
        return ERROR.REQUIRED_FIELD;
    }
    if (value.trim().length === 0) {
        return ERROR.REQUIRED_FIELD;
    }

    // if (!/[a-zA-Z0-9а-яА-ЯёЁ]/.test(value)) {
    //     return ERROR.INCORRECT_FORMAT;
    // }

    return true;
};
