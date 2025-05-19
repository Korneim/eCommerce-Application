import { ERROR, MIN_AGE, PASSWORD_MIN_LENGTH } from '../components/registration-form/constants';
import { validateDate, validatePassword, validateStreet } from '../components/registration-form/utils';

describe('password validation', () => {
    it('should return true for a valid password', () => {
        expect(validatePassword('Password123')).toBe(true);
        expect(validatePassword('Password1')).toBe(true);
    });

    it('should return an error if password contains spaces', () => {
        expect(validatePassword(' passwordD123')).toBe('Пароль не должен содержать пробелы в начале или в конце');
        expect(validatePassword('password123 ')).toBe('Пароль не должен содержать пробелы в начале или в конце');
    });

    it('should return an error if password contains not latin letters', () => {
        expect(validatePassword('Password123Б')).toBe('Используйте только латинские буквы');
    });

    it('should return an error if password consists of less than 8 characters', () => {
        expect(validatePassword('pass')).toBe(`Пароль должен содержать минимум ${PASSWORD_MIN_LENGTH} символов`);
    });

    it('should return an error if password does not consist 1 uppercase letter', () => {
        expect(validatePassword('password123')).toBe('Пароль должен содержать минимум 1 заглавную букву');
    });

    it('should return an error if password does not consist 1 lowercase letter', () => {
        expect(validatePassword('PASSWORD123')).toBe('Пароль должен содержать минимум 1 строчную букву');
    });

    it('should return an error if password does not consist 1 number', () => {
        expect(validatePassword('passworD')).toBe('Пароль должен содержать минимум 1 цифру');
    });
});

describe('date of birth validation', () => {
    it('should return true if the date is valid', () => {
        expect(validateDate('1995-06-30')).toBe(true);
        expect(validateDate('2000-09-10')).toBe(true);
    });

    it(`should return an error if age is less than 13 ${MIN_AGE}`, () => {
        expect(validateDate('2024-02-01')).toBe(`Вам должно быть не менее ${MIN_AGE} лет`);
        expect(validateDate('2020-12-11')).toBe(`Вам должно быть не менее ${MIN_AGE} лет`);
    });

    it(`should return an error if the date is in the future`, () => {
        expect(validateDate('2035-12-01')).toBe(`${ERROR.INCORRECT_DATE}`);
    });
});

describe('street validation', () => {
    it('should return true if the street is valid', () => {
        expect(validateStreet('Tverskaya')).toBe(true);
        expect(validateStreet('tverskaya')).toBe(true);
    });

    it('should return an error if the street is invalid', () => {
        expect(validateStreet('   ')).toBe(`${ERROR.REQUIRED_FIELD}`);
        expect(validateStreet('')).toBe(`${ERROR.REQUIRED_FIELD}`);
    });
});
