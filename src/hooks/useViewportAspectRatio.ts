import { useState, useEffect } from 'react';

export const useViewportAspectRatio = () => {
  const [aspectRatio, setAspectRatio] = useState<'desktop' | 'mobile' | 'square'>('desktop');

  useEffect(() => {
    const updateAspectRatio = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const ratio = width / height;

      if (width >= 1024) {
        setAspectRatio('desktop');
      } else if (Math.abs(ratio - 1) < 0.2) {
        setAspectRatio('square');
      } else {
        setAspectRatio('mobile');
      }
    };

    updateAspectRatio();

    let timeoutId: NodeJS.Timeout;
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateAspectRatio, 150);
    };

    window.addEventListener('resize', debouncedUpdate);
    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      clearTimeout(timeoutId);
    };
  }, []);

  return aspectRatio;
};