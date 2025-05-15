import type { FC } from 'react';
import { Button, Flex } from 'antd';
import css from './not-found.module.scss';
import error from '../../assets/images/error.png';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/router/routes.ts';

export const NotFoundPage: FC = () => {
    const navigate = useNavigate();

    function handleReturn(): void {
        navigate(routes.root);
    }

    return (
        <Flex justify="center" align="center" vertical className={css.container}>
            <img src={error} className={css.image} alt="Error 404"></img>
            <Button onClick={handleReturn} size="large">
                Back to main
            </Button>
        </Flex>
    );
};
