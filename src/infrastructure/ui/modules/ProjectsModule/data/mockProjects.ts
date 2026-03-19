import { ProjectItem } from '@/infrastructure/ui/modules/ProjectsModule/interfaces'

export const mockProjects: ProjectItem[] = [
    {
        id: 1,
        title: 'Portfolio Website',
        description:
            'Personal portfolio built with Next.js and Material UI, featuring responsive design, dynamic theming, and server-side rendering.',
        image: 'https://picsum.photos/seed/portfolio/600/400',
        technologies: ['Next.js', 'TypeScript', 'MUI', 'Redux'],
        github_url: 'https://github.com/example/portfolio',
        demo_url: 'https://portfolio.example.com',
        show: true,
        order: 1,
    },
    {
        id: 2,
        title: 'E-commerce App',
        description:
            'Full-stack e-commerce platform with product catalog, shopping cart, payment integration, and order management.',
        image: 'https://picsum.photos/seed/ecommerce/600/400',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        github_url: 'https://github.com/example/ecommerce',
        demo_url: 'https://shop.example.com',
        show: true,
        order: 2,
    },
    {
        id: 3,
        title: 'Task Manager API',
        description:
            'RESTful API for task management with authentication, role-based access control, and real-time notifications.',
        image: 'https://picsum.photos/seed/taskapi/600/400',
        technologies: ['NestJS', 'TypeScript', 'PostgreSQL', 'JWT'],
        github_url: 'https://github.com/example/task-api',
        show: true,
        order: 3,
    },
    {
        id: 4,
        title: 'Weather Dashboard',
        description:
            'Interactive weather dashboard with location-based forecasts, charts, and historical data visualization.',
        image: 'https://picsum.photos/seed/weather/600/400',
        technologies: ['React', 'Chart.js', 'OpenWeather API', 'CSS Modules'],
        github_url: 'https://github.com/example/weather',
        demo_url: 'https://weather.example.com',
        show: true,
        order: 4,
    },
    {
        id: 5,
        title: 'Chat Application',
        description:
            'Real-time chat application with private messaging, group channels, file sharing, and message search.',
        image: 'https://picsum.photos/seed/chatapp/600/400',
        technologies: ['React', 'Socket.io', 'Express', 'Redis'],
        github_url: 'https://github.com/example/chat',
        demo_url: 'https://chat.example.com',
        show: true,
        order: 5,
    },
    {
        id: 6,
        title: 'Blog CMS',
        description:
            'Content management system for blogging with markdown editor, image uploads, SEO optimization, and analytics.',
        image: 'https://picsum.photos/seed/blogcms/600/400',
        technologies: ['Strapi', 'Next.js', 'TypeScript', 'AWS S3'],
        github_url: 'https://github.com/example/blog-cms',
        show: true,
        order: 6,
    },
]
