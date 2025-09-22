import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface AlsoInterestedProps {
  products: Product[];
  currentProductId: string;
  allProducts: Product[];
}

export const AlsoInterested: React.FC<AlsoInterestedProps> = ({
  currentProductId, 
  allProducts 
}) => {
  const currentProduct = allProducts.find(p => p.id === currentProductId);
  const relatedProductIds = currentProduct?.alsoInterestedIds || [];
  
  const relatedProducts = allProducts.filter(product => 
    relatedProductIds.includes(product.id)
  ).slice(0, 3);

  if (relatedProducts.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-3xl text-center font-dunkin mb-6">Tambien te podría interesar</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};