import React from 'react';
import {Product} from '../types';
import {ProductCard} from './ProductCard';

interface ProductGridProps {
    products: Product[];
    className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({products, className = ''}) => {
    return (
        /*<div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
            {products.map((product, index) => {
                const isFourthOfFour = products.length === 4 && index === 3;

                if (isFourthOfFour) {
                    return (
                        <React.Fragment key={product.id}>
                            {/!* Espaciador: ocupa la 1ª columna de la última fila solo en desktop *!/}
                            <div className="hidden lg:block" aria-hidden="true" />

                            {/!* El 4º producto caerá en la 2ª columna (centrado) con el mismo tamaño *!/}
                            <div className="flex justify-center">
                                <ProductCard product={product} />
                            </div>
                        </React.Fragment>
                    );
                }

                return (
                    <div key={product.id} className="flex justify-center">
                        <ProductCard product={product} />
                    </div>
                );
            })}
        </div>*/
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
            {products.map((product) => (
                <div key={product.id} className="flex justify-center">
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
};