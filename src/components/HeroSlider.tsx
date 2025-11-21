import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroSlide } from '../types';

interface HeroSliderProps {
    slides: HeroSlide[];
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ slides }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    const goToSlide = useCallback((index: number) => {
        setCurrentSlide(index);
    }, []);

    useEffect(() => {
        if (!isPaused && slides.length > 1) {
            const interval = setInterval(nextSlide, 5000);
            return () => clearInterval(interval);
        }
    }, [nextSlide, isPaused, slides.length]);

    const handleSlideClick = (link: string) => {
        if (!link) return;

        if (link.startsWith('#')) {
            const element = document.querySelector(link);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            const isExternalLink = /^https?:\/\//.test(link);
            if (isExternalLink || link.startsWith('/')) {
                window.location.href = link;
            }
        }
    };

    return (
        <div
            className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            role="region"
            aria-label="Hero image carousel"
        >
            {/* CONTENEDOR DESLIZABLE */}
            <div
                className="flex h-full transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                    willChange: 'transform',
                }}
            >
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="w-full h-full flex-shrink-0 cursor-pointer relative"
                        onClick={() => handleSlideClick(slide.link)}
                    >
                        <picture>
                            <source media="(max-width: 767px)" srcSet={slide.images.mobile} />
                            <source media="(min-width: 768px)" srcSet={slide.images.desktop} />
                            <img
                                src={slide.images.desktop}
                                alt={slide.title}
                                className="w-full h-full object-cover select-none"
                                draggable={false}
                            />
                        </picture>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-white px-4">
                                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                                    {slide.title}
                                </h2>
                                {slide.subtitle && (
                                    <p className="text-lg md:text-xl opacity-90">
                                        {slide.subtitle}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* CONTROLES */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            prevSlide();
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 z-20"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            nextSlide();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 z-20"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* INDICADORES */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                    index === currentSlide
                                        ? 'bg-white'
                                        : 'bg-white bg-opacity-50'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};