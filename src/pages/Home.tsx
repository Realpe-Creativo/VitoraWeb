import React from 'react';
import { HeroSlider } from '../components/HeroSlider';
import { ProductGrid } from '../components/ProductGrid';
import { ShortsCarousel } from '../components/ShortsCarousel';
import { BranchSelector } from '../components/BranchSelector';
import { heroSlides, products, branches } from '../data/products';

export const Home: React.FC = () => {
  // Get all unique shorts from products
  const allShorts = products.flatMap(product => product.shorts || []);

  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider slides={heroSlides} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Products Section */}
        <section className="py-16" id="products">
          <h2 className="text-4xl font-dunkin text-center mb-12">Nuestros productos</h2>
          <ProductGrid products={products} />
        </section>

        {/* Video Reviews Section */}
        {allShorts.length > 0 && (
          <section className="py-16 border-t border-gray-200">
            <ShortsCarousel shorts={allShorts} />
          </section>
        )}

        {/* Branches Section */}
        <section className="py-16 border-t border-gray-200">
          <BranchSelector branches={branches} />
        </section>
      </div>
    </div>
  );
};