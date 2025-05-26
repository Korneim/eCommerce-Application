import type { Category } from '@commercetools/platform-sdk';

export interface TreeNode {
    title: string;
    value: string;
    key: string;
    children?: TreeNode[];
}

export const mapCategories = (data: Category[] = []): TreeNode[] => {
    const resultObject: Record<string, TreeNode> = {};

    const filteredParentArray = data.filter((el) => !el.parent);
    console.log(filteredParentArray, 'asd');

    filteredParentArray.map((el) => {
        const node: TreeNode = {
            title: el.name.ru || el.name['ru-RU'],
            value: el.id,
            key: el.id,
            children: [],
        };
        resultObject[el.id] = node;
    });

    const filteredChildrenArray = data.filter((el) => el.parent);
    filteredChildrenArray.map((el) => {
        const parentId = el.parent?.id;
        const childrenNode: TreeNode = {
            title: el.name.ru || el.name['ru-RU'],
            value: el.id,
            key: el.id,
        };
        if (parentId) {
            resultObject[parentId]?.children?.push(childrenNode);
        }
    });

    return Object.values(resultObject);
};
