import type { Book } from '../../components/book-list/types.ts';
import book1 from '../../assets/images/book1.png';
import book2 from '../../assets/images/book2.png';
import book3 from '../../assets/images/book3.png';
import book4 from '../../assets/images/book4.png';

export const mockData: Book[] = [
    {
        title: 'PRIDE and PROTEST',
        author: 'NIKKI PAYNE',
        price: 15.5,
        discountPrice: 13.4,
        imageUrl: book1,
        description:
            "A gripping modern retelling of 'Pride and Prejudice,' where a determined activist clashes with a powerful CEO over gentrification in their neighborhood. Sparks fly as their professional rivalry slowly turns into an unexpected romance.",
        id: '',
    },
    {
        title: 'WANT A BETTER CATASTROPHE',
        author: 'MIDSAY BOTH',
        price: 18.99,
        discountPrice: 13.4,
        imageUrl: book2,
        description:
            'A philosophical exploration of resilience in the face of climate change and societal collapse. The book weaves personal narratives with deep reflections on how to find meaning and hope in turbulent times.',
        id: '',
    },
    {
        title: 'Forget a Mentor, Find a Sponsor',
        author: 'Sylvia Ann Hewlett',
        price: 12.75,
        discountPrice: 13.4,
        imageUrl: book3,
        description:
            'A groundbreaking guide to career advancement, revealing why sponsors—not just mentors—are crucial for success. Packed with real-world examples and actionable strategies, this book reshapes how we think about professional growth.',
        id: '',
    },
    {
        title: 'The MIDNIGHT LIBRARY',
        author: 'Matt Haig',
        price: 14.25,
        discountPrice: 13.4,
        imageUrl: book4,
        description:
            "Between life and death, there's a library filled with infinite books—each a different version of what your life could have been. Nora Seed must navigate these alternate realities to discover what truly makes life worth living.",
        id: '',
    },
];
