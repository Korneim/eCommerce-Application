import { Flex, Select, SelectProps } from 'antd';
import { Dispatch, FC, SetStateAction } from 'react';
import css from './select.module.scss';

type Props = { setSelectedSort: Dispatch<SetStateAction<string>> };

export const SelectMenu: FC<Props> = ({ setSelectedSort }) => {
    const options: SelectProps['options'] = [
        {
            value: 'price desc',
            label: 'Дороже',
        },
        {
            value: 'price asc',
            label: 'Дешевле',
        },
        {
            value: 'name.ru asc',
            label: 'A-Z',
        },
        {
            value: 'name.ru desc',
            label: 'Z-a',
        },
    ];

    function handleChange(value: string): void {
        setSelectedSort(value);
    }

    return (
        <Flex vertical gap={20} style={{ width: 300 }} className={css.select}>
            <Select
                placeholder="Выберите фильтр"
                onChange={handleChange}
                style={{ width: '100%' }}
                options={options}
            ></Select>
        </Flex>
    );
};
