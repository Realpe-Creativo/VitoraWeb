import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Product} from '../types';
import {Price} from './Price';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({product}) => {
    const [isHovered, setIsHovered] = useState(false);

    const displayImage = isHovered && product.images.hover ? product.images.hover : product.images.main;

    return (
        <Link
            to={`/product/${product.id}`}
            className="group block bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                    src={displayImage}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
            </div>
            <div className="p-4">
                <h3 className="font-dunkin text-gray-900 mb-2 line-clamp-2 group-hover:text-[#9acd65] transition-colors">
                    {product.name}
                </h3>
                <Price
                    amount={product.price}
                    currency={product.currency}
                    className="text-lg font-bold text-[#9acd65]"
                />
                <button
                    className="w-full bg-[#9acd65] text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 hover:bg-[#014126] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#014126]"
                >
                    Comprar
                </button>
            </div>
        </Link>
    );
};