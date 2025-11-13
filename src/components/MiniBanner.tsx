import React from 'react';

interface MiniBannerProps {
    imageUrl: string;
    alt?: string;
    className?: string;
}

export const MiniBanner: React.FC<MiniBannerProps> = ({
                                                          imageUrl,
                                                          alt = 'Mini banner',
                                                          className = ''
                                                      }) => {
    return (
        <div className={`rounded-lg overflow-hidden flex justify-center items-center bg-black/5 ${className}`}>
            <img
                src={imageUrl}
                alt={alt}
                className="w-full h-auto object-contain rounded-lg"
                loading="lazy"
            />
        </div>
    );
};
