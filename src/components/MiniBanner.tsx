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
        <div className={`rounded-lg overflow-hidden ${className}`}>
            <img
                src={imageUrl}
                alt={alt}
                className="w-full h-40 object-cover rounded-lg"
                loading="lazy"
            />
        </div>
    );
};
