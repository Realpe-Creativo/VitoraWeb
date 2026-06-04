import React from 'react';

interface PriceProps {
    amount: number;
    originalAmount?: number;
    discountPct?: number;
    currency?: 'USD' | 'EUR' | 'COP';
    className?: string;
}

export const Price: React.FC<PriceProps> = ({ amount, originalAmount, discountPct, className = '' }) => {
    const fmt = new Intl.NumberFormat('es-CO', { minimumFractionDigits: 0 });

    if (discountPct && discountPct > 0 && originalAmount && originalAmount > amount) {
        return (
            <span className="inline-flex flex-wrap items-center gap-1.5">
                <span className="text-gray-400 line-through text-sm font-normal">
                    ${fmt.format(originalAmount)}
                </span>
                <span className={className}>${fmt.format(amount)}</span>
                <span className="inline-block px-1.5 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
                    -{discountPct}%
                </span>
            </span>
        );
    }

    return <span className={className}>${fmt.format(amount)}</span>;
};
