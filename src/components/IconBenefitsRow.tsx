import React from 'react';
import { ProductIcon } from '../types';

interface IconBenefitsRowProps {
  icons: ProductIcon[];
}

export const IconBenefitsRow: React.FC<IconBenefitsRowProps> = ({ icons }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-8 border-t border-gray-200">
      {icons.map((item, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl mb-2" role="img" aria-label={item.description}>
            {item.icon}
          </div>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  );
};