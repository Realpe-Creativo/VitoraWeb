import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Price } from './Price';

interface ProductCardProps {
    product: Product;
}

interface CartItem {
    id: string;
    name: string;
    price: number;
    currency: string;
    image: string;
    image_url: string;
    quantity: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [added, setAdded] = useState(false);

    const displayImage =
        isHovered && product.images.hover ? product.images.hover : product.images.main;

    // 🛒 Añadir producto al carrito
    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // evita que el <Link> se dispare

        try {
            const existing = JSON.parse(localStorage.getItem('cart') || '[]');
            const cart: CartItem[] = Array.isArray(existing) ? existing : [];

            const existingItem = cart.find((item) => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    currency: product.currency,
                    image: product.images.main,
                    image_url: product.images.url_img,
                    quantity: 1,
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            // Feedback visual
            setAdded(true);
            setTimeout(() => setAdded(false), 1500);

            // dispara un evento para que el Navbar actualice el contador
            window.dispatchEvent(new Event('storage'));
        } catch (err) {
            console.error('Error al agregar al carrito:', err);
        }
    };

    return (
        <div
            className="group block text-center bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to={`/product/${product.id}`}>
                <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                        src={displayImage}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                </div>
            </Link>

            <div className="p-4">
                <Link to={`/product/${product.id}`}>
                    <h3 className="font-avenir font-bold text-2xl text-gray-900 mb-2 line-clamp-2 group-hover:text-[#9acd65] transition-colors">
                        {product.short_name}
                    </h3>
                </Link>

                <Price
                    amount={product.price}
                    currency={product.currency}
                    className="text-3xl font-bold text-[#9acd65]"
                />

                <button
                    onClick={handleAddToCart}
                    className={`w-full mt-3 py-4 px-4 text-2xl rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        added
                            ? 'bg-green-600 text-white focus:ring-green-600'
                            : 'bg-[#9acd65] text-white hover:bg-[#014126] hover:scale-105 focus:ring-[#014126]'
                    }`}
                >
                    {added ? 'AGREGADO' : 'AGREGAR'}
                </button>
            </div>
        </div>
    );
};
