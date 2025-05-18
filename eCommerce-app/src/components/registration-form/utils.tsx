import { ERROR, MIN_AGE, PASSWORD_MIN_LENGTH } from './constants';
import dayjs from 'dayjs';

export const validatePassword = (value: string): boolean | string => {
    const trimmedValue = value.trim();

    if (trimmedValue !== value) {
        return 'Пароль не должен содержать пробелы в начале или в конце';
    }

    if (/[а-яА-Я]/.test(trimmedValue)) {
        return 'Используйте только латинские буквы';
    }

    if (value.length < PASSWORD_MIN_LENGTH) {
        return `Пароль должен содержать минимум ${PASSWORD_MIN_LENGTH} символов`;
    }

    if (!/[a-z]/.test(value)) {
        return 'Пароль должен содержать минимум 1 строчную букву';
    }

    if (!/[A-Z]/.test(value)) {
        return 'Пароль должен содержать минимум 1 заглавную букву';
    }

    if (!/\d/.test(value)) {
        return 'Пароль должен содержать минимум 1 цифру';
    }

    return true;
};

export const validateDate = (value: string): boolean | string => {
    const today = new Date();
    const birthDate = new Date(value);
    const monthDiff = today.getMonth() - birthDate.getMonth();
    let age = today.getFullYear() - birthDate.getFullYear();

    if (birthDate > today) {
        return ERROR.INCORRECT_DATE;
    }

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < MIN_AGE) {
        return `Вам должно быть не менее ${MIN_AGE} лет`;
    }

    return true;
};

export const validateStreet = (value: string): string | boolean => {
    if (!value) {
        return ERROR.REQUIRED_FIELD;
    }

    if (value.trim().length === 0) {
        return ERROR.REQUIRED_FIELD;
    }

    return true;
};

export const formatDate = (date: string): string => {
    return dayjs(date).format('YYYY-MM-DD');
};
