import React from 'react';

interface PriceProps {
    amount: number;
    currency?: 'USD' | 'EUR' | 'COP'; // opcional si ya no lo usas
    className?: string;
}

export const Price: React.FC<PriceProps> = ({ amount, className = '' }) => {
    const formatter = new Intl.NumberFormat('es-CO', {
        minimumFractionDigits: 0,
    });

    return (
        <span className={className}>
      ${formatter.format(amount)}
    </span>
    );
};