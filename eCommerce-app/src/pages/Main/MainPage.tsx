import { Flex } from 'antd';
import type { FC } from 'react';
import { Slider } from '../../components/slider/Slider.tsx';

export const MainPage: FC = () => {
    return (
        <Flex vertical={true}>
            <Slider />
        </Flex>
    );
};
