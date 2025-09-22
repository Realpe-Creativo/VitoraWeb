import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroSlide } from '../types';
import { useViewportAspectRatio } from '../hooks/useViewportAspectRatio';

interface HeroSliderProps {
    slides: HeroSlide[];
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ slides }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const aspectRatio = useViewportAspectRatio();

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

    const getImageSrc = (slide: HeroSlide) => {
        switch (aspectRatio) {
            case 'square':
                return slide.images.square || slide.images.mobile;
            case 'mobile':
                return slide.images.mobile;
            default:
                return slide.images.desktop;
        }
    };

    const handleSlideClick = (link: string) => {
        // Verificar si el link es un ancla (empieza con #)
        if (link.startsWith('#')) {
            const element = document.querySelector(link);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Verificar si es una URL completa
            const isExternalLink = /^https?:\/\//.test(link); // Si el link empieza con http:// o https://
            if (isExternalLink || link.startsWith('/')) {
                // Si es una URL absoluta o relativa, redirige.
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
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-500 cursor-pointer ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={() => handleSlideClick(slide.link)} // Enlace click
                    role="button"
                    tabIndex={index === currentSlide ? 0 : -1}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleSlideClick(slide.link); // Manejo de click con teclado
                        }
                    }}
                    aria-label={`${slide.title}${slide.subtitle ? ` - ${slide.subtitle}` : ''}`}
                >
                    <img
                        src={getImageSrc(slide)}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                        loading={index === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <div className="text-center text-white px-4">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                            {slide.subtitle && (
                                <p className="text-lg md:text-xl opacity-90">{slide.subtitle}</p>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black ${
                                    index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
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
