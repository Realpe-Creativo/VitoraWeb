import {Product, Branch, HeroSlide} from '../types';

export const heroSlides: HeroSlide[] = [
    {
        id: '1',
        images: {
            desktop: 'https://images.pexels.com/photos/934062/pexels-photo-934062.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800',
            mobile: 'https://images.pexels.com/photos/934062/pexels-photo-934062.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200',
            square: 'https://images.pexels.com/photos/934062/pexels-photo-934062.jpeg?auto=compress&cs=tinysrgb&w=800&h=800'
        },
        title: '',
        subtitle: '',
        link: '/product/1'
    },
    {
        id: '2',
        images: {
            desktop: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800',
            mobile: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200',
            square: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=800&h=800'
        },
        title: 'Summer Sale',
        subtitle: 'Up to 50% off selected items',
        link: '/product/1'
    },
    {
        id: '3',
        images: {
            desktop: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800',
            mobile: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200'
        },
        title: 'New Arrivals',
        subtitle: 'Fresh styles just landed',
        link: '#products'
    }
];

export const products: Product[] = [
    {
        id: '1',
        name: 'Citrato de Magnesio',
        price: 180000,
        currency: 'COP',
        images: {
            main: '/img/products/citrato_magnesio.jpg',
            hover: '/img/products/citrato_magnesio.jpg',
            gallery: [
                '/img/products/citrato_magnesio.jpg'
                /*'/img/products/citrato_magnesio.jpg',
                '/img/products/citrato_magnesio.jpg'*/
            ],
            miniBanner: "/img/logos/img.png",
            url_img: "https://res.cloudinary.com/dkqjmeqaa/image/upload/v1761251385/citrato_magnesio_o8tomv.jpg"
        },
        variants: [
            {sku: 'WH-001-BK', name: 'Black', size: 'Standard'},
        ],
        category: 'Nutrición',
        description: 'Experience crystal-clear sound with our premium wireless headphones featuring active noise cancellation and 30-hour battery life.',
        benefits: [
            'Active Noise Cancellation',
            '30-hour battery life',
            'Wireless charging case',
            'Premium sound quality',
            'Comfortable fit'
        ],
        usage: [
            'Perfect for commuting',
            'Great for work calls',
            'Ideal for music lovers',
            'Excellent for gaming'
        ],
        icons: [
            {icon: '🔊', description: 'Premium Sound'},
            {icon: '🔋', description: 'Long Battery'},
            {icon: '📶', description: 'Wireless'},
            {icon: '🎧', description: 'Comfort Fit'},
            {icon: '🛡️', description: 'Durable'}
        ],
        alsoInterestedIds: ['2', '3'],
        shorts: [
            'https://youtube.com/shorts/-Bj17T_mu0M?si=TXo4Txxn0k6OngO2',
            'https://youtube.com/shorts/-Bj17T_mu0M?si=TXo4Txxn0k6OngO2',
            'https://youtube.com/shorts/-Bj17T_mu0M?si=TXo4Txxn0k6OngO2',
            'https://youtube.com/shorts/-Bj17T_mu0M?si=TXo4Txxn0k6OngO2',
            'https://youtube.com/shorts/-Bj17T_mu0M?si=TXo4Txxn0k6OngO2',
            'https://youtube.com/shorts/-Bj17T_mu0M?si=TXo4Txxn0k6OngO2',
        ]
    },
    {
        id: '2',
        name: 'Ashwagandha',
        price: 120000,
        currency: 'COP',
        images: {
            main: '/img/products/ashwagandha.jpg',
            hover: 'https://images.pexels.com/photos/1466335/pexels-photo-1466335.jpeg?auto=compress&cs=tinysrgb&w=600',
            gallery: [
                '/img/products/ashwagandha.jpg',
                '/img/products/ashwagandha.jpg'
            ],
            miniBanner: "/img/logos/img.png",
            url_img:"https://res.cloudinary.com/dkqjmeqaa/image/upload/v1761251385/ashwagandha_h8x9ea.jpg"
        },
        variants: [
            {sku: 'SW-002-S', name: 'Small', size: '38mm'},
            {sku: 'SW-002-L', name: 'Large', size: '42mm'}
        ],
        category: 'Nutrición',
        description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and water resistance.',
        benefits: [
            'Heart rate monitoring',
            'Built-in GPS',
            'Water resistant',
            '7-day battery life',
            'Health tracking'
        ],
        usage: [
            'Daily fitness tracking',
            'Running and cycling',
            'Sleep monitoring',
            'Smart notifications'
        ],
        icons: [
            {icon: '❤️', description: 'Heart Rate'},
            {icon: '📍', description: 'GPS Tracking'},
            {icon: '💧', description: 'Water Resistant'},
            {icon: '⚡', description: 'Fast Charge'},
            {icon: '📱', description: 'Smart Features'}
        ],
        alsoInterestedIds: ['1', '3']
    },
    {
        id: '3',
        name: 'Colageno',
        price: 190000,
        currency: 'COP',
        images: {
            main: '/img/products/colageno.jpg',
            hover: '/img/products/colageno.jpg',
            gallery: [
                '/img/products/colageno.jpg',
                '/img/products/colageno.jpg'
            ],
            url_img:"https://res.cloudinary.com/dkqjmeqaa/image/upload/v1761251385/colageno_ftk6ck.jpg"
        },
        variants: [
            {sku: 'CAM-003-B', name: 'Body Only'},
            {sku: 'CAM-003-K', name: 'Kit with Lens', price: 1599}
        ],
        category: 'Photography',
        description: 'Capture professional-quality photos and videos with this advanced mirrorless camera system.',
        benefits: [
            '24MP sensor',
            '4K video recording',
            'Image stabilization',
            'Weather sealed',
            'Fast autofocus'
        ],
        usage: [
            'Professional photography',
            'Content creation',
            'Travel photography',
            'Wedding photography'
        ],
        icons: [
            {icon: '📷', description: 'High Resolution'},
            {icon: '🎥', description: '4K Video'},
            {icon: '🔄', description: 'Stabilization'},
            {icon: '🌧️', description: 'Weather Sealed'},
            {icon: '⚡', description: 'Fast Focus'}
        ],
        alsoInterestedIds: ['1', '2']
    },
    {
        id: '4',
        name: 'Creatina Monohidratada',
        price: 150000,
        currency: 'COP',
        images: {
            main: '/img/products/creatina_monohidratada.jpg',
            hover: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=600',
            gallery: [
                '/img/products/creatina_monohidratada.jpg',
                '/img/products/creatina_monohidratada.jpg'
            ],
            miniBanner: "/img/logos/img.png",
            url_img:"https://res.cloudinary.com/dkqjmeqaa/image/upload/v1761251385/creatina_monohidratada_ftmogo.jpg"
        },
        variants: [
            {sku: 'CH-004-BK', name: 'Black'},
            {sku: 'CH-004-GY', name: 'Gray'}
        ],
        category: 'Furniture',
        description: 'Experience ultimate comfort during long work sessions with this ergonomically designed office chair.',
        benefits: [
            'Lumbar support',
            'Adjustable height',
            'Breathable mesh',
            '360° swivel',
            'Premium materials'
        ],
        usage: [
            'Office work',
            'Home office',
            'Study sessions',
            'Gaming'
        ],
        icons: [
            {icon: '🪑', description: 'Ergonomic'},
            {icon: '🔄', description: 'Adjustable'},
            {icon: '💨', description: 'Breathable'},
            {icon: '🎯', description: 'Supportive'},
            {icon: '⭐', description: 'Premium'}
        ],
        alsoInterestedIds: ['5', '6']
    },
];

export const branches: Branch[] = [
    {
        id: '1',
        name: 'La Calera',
        city: 'Bogotá',
        address: 'Carrera 123 # 2-23',
        phone: '+57 3211234567',
        hours: 'Lunes a viernes: 9AM-8PM, Sábados: 10AM-6PM'
    },
    {
        id: '2',
        name: 'Centro Comercial',
        city: 'Bogotá',
        address: 'Carrera 123 # 2-23',
        phone: '+57 3211234567',
        hours: 'Lunes a viernes: 9AM-8PM, Sábados: 10AM-6PM'
    },
    {
        id: '3',
        name: 'Ciudad Jardín',
        city: 'Cali',
        address: 'Carrera 123 # 2-23',
        phone: '+57 3211234567',
        hours: 'Lunes a viernes: 9AM-8PM, Sábados: 10AM-6PM'
    },
    {
        id: '4',
        name: 'Chipichape',
        city: 'Cali',
        address: 'Carrera 123 # 2-23',
        phone: '+57 3211234567',
        hours: 'Lunes a viernes: 9AM-8PM, Sábados: 10AM-6PM'
    },
    {
        id: '5',
        name: 'Unicentro',
        city: 'Cali',
        address: 'Carrera 123 # 2-23',
        phone: '+57 3211234567',
        hours: 'Lunes a viernes: 9AM-8PM, Sábados: 10AM-6PM'
    },
    {
        id: '6',
        name: 'Provenza',
        city: 'Medellin',
        address: 'Carrera 123 # 2-23',
        phone: '+57 3211234567',
        hours: 'Lunes a viernes: 9AM-8PM, Sábados: 10AM-6PM'
    },
    {
        id: '7',
        name: 'Parque Lleras',
        city: 'Medellin',
        address: 'Carrera 123 # 2-23',
        phone: '+57 3211234567',
        hours: 'Lunes a viernes: 9AM-8PM, Sábados: 10AM-6PM'
    },
];