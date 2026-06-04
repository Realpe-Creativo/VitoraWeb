import React, { useState, useEffect } from 'react';
import { HeroSlider } from '../components/HeroSlider';
import { ProductGrid } from '../components/ProductGrid';
import { ShortsCarousel } from '../components/ShortsCarousel';
import { BranchSelector } from '../components/BranchSelector';
import { heroSlides } from '../data/heroSlides';
import { branches } from '../data/branches';
import NewsSlider from '../components/NewsSlider.tsx';
import { blogData, BlogItem } from '../data/blog.ts';
import { getProductos } from '../services/productosService';
import { Product } from '../types';
import { shorts } from '../data/shorts';

export const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [posts] = useState<BlogItem[]>(blogData);

    useEffect(() => {
        getProductos()
            .then(setProducts)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <HeroSlider slides={heroSlides} />

            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <section className="py-16" id="products">
                    <h2 className="text-5xl font-avenir font-bold text-center mb-12">Nuestros productos</h2>
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="w-10 h-10 border-4 border-[#9acd65] border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : (
                        <ProductGrid products={products} />
                    )}
                </section>

                {shorts.length > 0 && (
                    <section className="py-16 border-t border-gray-200">
                        <ShortsCarousel shorts={shorts} />
                    </section>
                )}

                <section className="py-16 border-t border-gray-200">
                    <BranchSelector branches={branches} />
                </section>

                <section className="py-16 border-t border-gray-200">
                    <NewsSlider posts={posts} />
                </section>
            </div>
        </div>
    );
};
