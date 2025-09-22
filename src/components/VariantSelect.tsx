import React from 'react';
import { Variant } from '../types';

interface VariantSelectProps {
  variants: Variant[];
  selectedSku: string;
  onVariantChange: (sku: string) => void;
  label?: string;
}

export const VariantSelect: React.FC<VariantSelectProps> = ({ 
  variants, 
  selectedSku, 
  onVariantChange, 
  label = 'Variant'
}) => {
  return (
    <div>
      <label htmlFor="variant-select" className="block text-sm font-medium text-gray-700 mb-2">
        {label}:
      </label>
      <select
        id="variant-select"
        value={selectedSku}
        onChange={(e) => onVariantChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {variants.map((variant) => (
          <option key={variant.sku} value={variant.sku}>
            {variant.name}
            {variant.size && ` (${variant.size})`}
            {variant.price && ` - $${variant.price}`}
          </option>
        ))}
      </select>
    </div>
  );
};