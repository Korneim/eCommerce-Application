import type { FC } from 'react';
import { Flex, Card, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import css from './about-us.module.scss';

const { Title, Paragraph, Text } = Typography;

interface TeamMember {
    name: string;
    role: string;
    bio: string;
    github: string;
    photo: string;
    contributions: string[];
}

const AboutUsPage: FC = () => {
    const teamMembers: TeamMember[] = [
        {
            name: 'Корнишин Михаил',
            role: 'Frontend Developer',
            bio: 'Увлеченный фронтенд-разработчик с огромным желанием учиться и расти в совместной командной среде. Руководил проектом разработки и выступил главным архитектором фронтенда.',
            github: 'https://github.com/Korneim',
            photo: 'https://sun9-22.userapi.com/impg/kAnJS92hK9ipM-oEkJJmyndDK1AvzYiXMM6YQA/mRS1lLfsLN4.jpg?size=605x652&quality=95&sign=6e46ec25988cf708119e4b5afce85b42&type=album',
            contributions: [
                'Разработал основную структуру приложения (роутинг, шаблоны страниц)',
                'Реализовал главную страницу с адаптивным дизайном',
                'Создал компоненты Header и Footer с навигацией',
                'Разработал каталог товаров с системой фильтрации и сортировки',
                'Реализовал функционал корзины с возможностью редактирования',
                'Настройка и управление доской задач на Яндекс Трекере',
                'Написал unit-тесты на Jest',
            ],
        },
        {
            name: 'Фархутдинов Динар',
            role: 'Frontend Developer',
            bio: 'Начинающий фронтенд-разработчик с готовностью к новым вызовам и стремлением совершенствовать свои навыки вместе с командой.',
            github: 'https://github.com/redinar',
            photo: 'https://sun9-11.userapi.com/impg/NWp_8Q7eUTGarnlD_coK7sMchdngswyTWwCxqw/-IXGXuYj21k.jpg?size=1530x1647&quality=95&sign=6f2d22595d357a6da872b468735c11b3&type=album',
            contributions: [
                'Разработал систему аутентификации (страница входа)',
                'Создал детальную страницу товара с интерактивным слайдером изображений',
                'Настроил интеграцию с commercetools (API, структура данных)',
                'Заполнил базу товаров и настроил категории',
                'Реализовал страницу "О команде" с адаптивным дизайном',
            ],
        },
    ];

    return (
        <div className={`${css['about-us-container']}`}>
            <Title level={2} className={`${css['about-us-title']}`}>
                Наша команда
            </Title>
            <Paragraph className={`${css['team-description']}`}>
                Мы разработали этот интернет-магазин в тесном сотрудничестве. Ежедневные обсуждения, ревью кода и
                командная работа помогли нам сделать проект качественным. Знакомьтесь с нашей командой!
            </Paragraph>

            <Flex gap="middle" wrap="wrap" justify="center" className={css['team-members-container']}>
                {teamMembers.map((member, index) => (
                    <Flex key={index} className={css['team-member-card']}>
                        <Card hoverable cover={<img alt={member.name} src={member.photo} />} className={css['card']}>
                            <Title level={4}>{member.name}</Title>
                            <Text type="secondary">{member.role}</Text>
                            <Paragraph>{member.bio}</Paragraph>

                            <div className={css['contributions']}>
                                <Text strong>Реализованные задачи:</Text>
                                <ul>
                                    {member.contributions.map((contribution, i) => (
                                        <li key={i}>{contribution}</li>
                                    ))}
                                </ul>
                            </div>

                            <a
                                href={member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={css['github-link']}
                            >
                                <GithubOutlined /> GitHub Profile
                            </a>
                        </Card>
                    </Flex>
                ))}
            </Flex>

            <div className={`${css['rsschool-logo']}`}>
                <a href="https://rs.school/" target="_blank">
                    <img
                        src="https://raw.githubusercontent.com/rolling-scopes-school/rs.school-site/758a8c4678563a5d0560d74b354b34c69428cbfc/docs/images/rs_school_js.svg"
                        alt="RS School Logo"
                        width="120"
                    />
                </a>
                <Paragraph className={`${css['rsschool-text']}`}>
                    Данный проект был выполнен в рамках курса RS School - JavaScript/Front-end 2024Q4.
                </Paragraph>
            </div>
        </div>
    );
};

export default AboutUsPage;
