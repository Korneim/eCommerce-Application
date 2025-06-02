jest.mock('../assets/images/defaultBook.png', () => 'mock-image-url');

import type { DiscountedPrice, Image, Price, ProductProjection, ProductVariant } from '@commercetools/platform-sdk';
import { mapCatalogData } from '../pages/catalog/mapCatalogData';

const createDiscountedPrice = (): DiscountedPrice => ({
    value: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 800,
        fractionDigits: 2,
    },
    discount: {
        typeId: 'product-discount',
        id: 'discount-1',
    },
});

const createPrice = (overrides: Partial<Price> = {}): Price => ({
    id: 'price-1',
    value: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 1000,
        fractionDigits: 2,
    },
    ...overrides,
});

const createImage = (overrides: Partial<Image> = {}): Image => ({
    url: 'http://test.com/image.jpg',
    dimensions: { w: 100, h: 150 },
    ...overrides,
});

const createVariant = (overrides: Partial<ProductVariant> = {}): ProductVariant => ({
    id: 1,
    sku: 'test-sku',
    prices: [createPrice()],
    images: [createImage()],
    attributes: [],
    ...overrides,
});

const createProductProjection = (overrides: Partial<ProductProjection> = {}): ProductProjection => ({
    id: '123',
    version: 1,
    createdAt: '2023-01-01T00:00:00.000Z',
    lastModifiedAt: '2023-01-01T00:00:00.000Z',
    productType: { typeId: 'product-type', id: 'product-type-1' },
    name: { ru: 'Test Book' },
    description: { ru: 'Test Description' },
    slug: { ru: 'test-book' },
    categories: [],
    masterVariant: createVariant(),
    variants: [],
    searchKeywords: {},
    hasStagedChanges: false,
    published: true,
    taxCategory: { typeId: 'tax-category', id: 'tax-category-1' },
    ...overrides,
});

describe('mapCatalogData', () => {
    it('should return empty array when input is empty array', () => {
        const result = mapCatalogData([]);
        expect(result).toEqual([]);
    });

    it('should return default book when masterVariant is missing', () => {
        const input = [createProductProjection({ masterVariant: undefined })];

        const result = mapCatalogData(input);
        expect(result[0]).toEqual({
            title: 'Без названия',
            author: 'Неизвестный автор',
            price: 0,
            discountPrice: 0,
            imageUrl: 'mock-image-url',
            description: 'Нет описания',
            id: '',
        });
    });

    it('should handle non-string author attribute', () => {
        const input = [
            createProductProjection({
                masterVariant: createVariant({
                    attributes: [{ name: 'author', value: 123 }],
                }),
            }),
        ];

        const result = mapCatalogData(input);
        expect(result[0].author).toBe('Неизвестный автор');
    });

    it('should handle discounted price', () => {
        const input = [
            createProductProjection({
                masterVariant: createVariant({
                    prices: [
                        createPrice({
                            discounted: createDiscountedPrice(),
                        }),
                    ],
                }),
            }),
        ];

        const result = mapCatalogData(input);
        expect(result[0].discountPrice).toBe(8);
    });
});
