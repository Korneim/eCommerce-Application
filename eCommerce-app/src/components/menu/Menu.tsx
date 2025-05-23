import { FC, useCallback, useEffect, useState } from 'react';
import { Flex, TreeSelect, Typography } from 'antd';
import css from './menu.module.scss';
import { mapCategories, TreeNode } from '../../pages/catalog/mapCategories.ts';
import { getAllCategories } from '../../pages/catalog/getAllBooks.ts';

// type MenuItem = Required<MenuProps>['items'][number];

export const MenuFilter: FC = () => {
    const [category, setCategory] = useState<TreeNode[]>([]);

    const loadCategories = useCallback(async () => {
        try {
            const data = await getAllCategories();
            const mappedCategories = mapCategories(data);
            setCategory(mappedCategories);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
        }
    }, []);

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    // function handleChange(): void {}

    return (
        <Flex vertical className={css.container}>
            <Typography.Paragraph strong>Категории</Typography.Paragraph>
            <TreeSelect
                title="Категории"
                size="middle"
                treeCheckable
                placeholder="Выберите категории"
                // onChange={handleChange}
                treeData={category}
            />
        </Flex>
    );
};
