export type Book = {
    title: string;
    author: string;
    discountPrice: number;
    price: number;
    imageUrl: string;
    description: string;
    id: string;
};

export type CartBook = Pick<Book, 'title' | 'author' | 'price' | 'imageUrl'>;
