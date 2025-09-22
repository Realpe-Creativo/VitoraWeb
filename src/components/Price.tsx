import React from 'react';

interface PriceProps {
  amount: number;
  currency: 'USD' | 'EUR' | 'COP';
  className?: string;
}

export const Price: React.FC<PriceProps> = ({ amount, currency, className = '' }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  });

  return <span className={className}>{formatter.format(amount)}</span>;
};