import { FC } from 'react';
import { RegistrationForm } from '../../components/registration-form/RegistrationForm';
import { Flex } from 'antd';
import styles from './registration.module.scss';

export const RegistrationPage: FC = () => {
    return (
        <Flex className={styles.container}>
            <RegistrationForm></RegistrationForm>
        </Flex>
    );
};
