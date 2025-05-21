import book1 from '../../assets/images/newsbook1.png';
import book2 from '../../assets/images/newsbook2.png';
import book3 from '../../assets/images/newsbook3.png';
import book4 from '../../assets/images/newsbook4.png';
import type { Data } from './types.ts';

export const data: Data[] = [
    {
        title: 'Что нам ждать в 2025 году?',
        subtitle: 'Что нам ждать в 2025 году?',
        imageUrl: book1,
        imageUrl2: book2,
        description:
            'Самые свежие работы, поднимающие вопросы о будущем искусственного интеллекта, освоении космоса и влиянии технологий на человечество.',
    },
    {
        title: 'Акцент на экранизацию',
        subtitle: 'Книга оживает на экране!',
        imageUrl: book3,
        imageUrl2: book4,
        description:
            'Студия RS анонсировала адаптацию популярной книги "Как я стал дизайнером вместо программиста?" А в книжных магазинах уже появился долгожданный новый том "Stay Calm During Git Merges" – не пропустите!',
    },
];
