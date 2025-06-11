export type Book = {
    title: string;
    author: string;
    discountPrice: number;
    price: number;
    imageUrl: string;
    description: string;
    id: string;
    version: number;
};

export type CartBook = Pick<Book, 'title' | 'author' | 'price' | 'imageUrl'>;
