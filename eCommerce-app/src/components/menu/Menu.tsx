import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import { Flex, TreeSelect } from 'antd';
import css from './menu.module.scss';
import { mapCategories, TreeNode } from '../../pages/catalog/mapCategories.ts';
import { getAllCategories } from '../../pages/catalog/getAllBooks.ts';

type Props = {
    setSelectedIds: Dispatch<SetStateAction<string[]>>;
};

export const MenuFilter: FC<Props> = ({ setSelectedIds }) => {
    const [category, setCategory] = useState<TreeNode[]>([]);

    const loadCategories = useCallback(async () => {
        try {
            const data = await getAllCategories();
            const mappedCategories = mapCategories(data);
            console.log(mappedCategories);
            setCategory(mappedCategories);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
        }
    }, []);

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    function handleChange(selectedIds: string[]): void {
        setSelectedIds(selectedIds);
    }

    return (
        <Flex vertical className={css.container}>
            <TreeSelect
                title="Категории"
                size="middle"
                treeCheckable
                placeholder="Выберите категории"
                onChange={handleChange}
                treeData={category}
            />
        </Flex>
    );
};
