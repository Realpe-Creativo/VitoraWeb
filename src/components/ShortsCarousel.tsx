import React, {useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface ShortsCarouselProps {
    shorts: string[]; // puede mezclar YouTube y TikTok URLs
}

type Provider = 'youtube' | 'tiktok' | 'other';

const getProvider = (url: string): Provider => {
    try {
        const u = new URL(url);
        if (/youtu\.be|youtube\.com/.test(u.hostname)) return 'youtube';
        if (/tiktok\.com/.test(u.hostname)) return 'tiktok';
    } catch { /* empty */ }
    return 'other';
};

const getYouTubeId = (url: string) => {
    try {
        const u = new URL(url);
        if (u.hostname === 'youtu.be') return u.pathname.slice(1);
        if (u.searchParams.get('v')) return u.searchParams.get('v');
        const m = u.pathname.match(/\/(shorts|embed)\/([^/?#]+)/);
        if (m) return m[2];
    } catch { /* empty */ }
    const m = url.match(/(?:v=|\/shorts\/|\/embed\/|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
    return m ? m[1] : null;
};

const getYouTubeEmbed = (url: string) => {
    const id = getYouTubeId(url);
    if (!id) return null;
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const params = new URLSearchParams({
        enablejsapi: '1',
        origin,
        playsinline: '1',
        rel: '0',
        modestbranding: '1',
    });
    return `https://www.youtube.com/embed/${id}?${params.toString()}`;
};

const getYouTubeThumb = (url: string) => {
    const id = getYouTubeId(url);
    return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
};

const getTikTokId = (url: string) => {
    const m = url.match(/\/video\/(\d+)/);
    return m ? m[1] : null;
};

// TikTok v2 embed (no API de pausa → solución es desmontar el iframe)
const getTikTokEmbed = (url: string) => {
    const id = getTikTokId(url);
    return id ? `https://www.tiktok.com/embed/v2/${id}` : null;
};

export const ShortsCarousel: React.FC<ShortsCarouselProps> = ({ shorts }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState<number | null>(null); // solo este renderiza iframe
    const itemsPerView = 4;
    const maxIndex = Math.max(shorts.length - itemsPerView, 0);

    const nextSlide = () => setCurrentIndex((p) => (p >= maxIndex ? 0 : p + 1));
    const prevSlide = () => setCurrentIndex((p) => (p <= 0 ? maxIndex : p - 1));

    const transform = `translateX(-${(currentIndex * 100) / itemsPerView}%)`;

    if (!shorts?.length) return null;

    return (
        <div className="relative mx-auto max-w-7xl">
            <h2 className="text-3xl text-center font-dunkin mb-6">Nuestras recetas</h2>

            <div className="relative overflow-hidden rounded-lg bg-gray-100">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform }}
                >
                    {shorts.map((url, index) => {
                        const provider = getProvider(url);
                        const isActive = index === activeIndex;

                        // Embed URLs (solo se usan si isActive)
                        const embedSrc =
                            provider === 'youtube'
                                ? getYouTubeEmbed(url)
                                : provider === 'tiktok'
                                    ? getTikTokEmbed(url)
                                    : null;

                        // Thumbnails (YouTube tiene fácil; TikTok no expone uno estable sin oEmbed → usamos placeholder)
                        const poster =
                            provider === 'youtube'
                                ? getYouTubeThumb(url)
                                : null;

                        return (
                            <div key={index} className="w-1/4 flex-shrink-0 px-2">
                                <div className="relative aspect-[9/16] overflow-hidden rounded-lg bg-black/5">
                                    {isActive && embedSrc ? (
                                        // Renderizamos SOLO el iframe activo → los otros se desmontan y se detienen
                                        <iframe
                                            key={`active-${index}`} // fuerza remount al cambiar
                                            src={embedSrc}
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            title={`Short ${index + 1}`}
                                        />
                                    ) : (
                                        // Poster “silencioso”. Al click → activamos este y desmontamos el anterior
                                        <button
                                            type="button"
                                            onClick={() => setActiveIndex(index)}
                                            className="group w-full h-full relative"
                                            aria-label={`Reproducir short ${index + 1}`}
                                        >
                                            {poster ? (
                                                <img
                                                    src={poster}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                                      <span className="text-sm text-gray-600">
                                                        {provider === 'tiktok' ? 'TikTok' : 'Short'}
                                                      </span>
                                                </div>
                                            )}

                                            {/* overlay play */}
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="rounded-full p-3 bg-white/90 shadow group-hover:scale-110 transition-transform">
                                                    <Play className="w-5 h-5" />
                                                </div>
                                            </div>
                                        </button>
                                    )}

                                    {/* Marca del provider */}
                                    <div className="absolute top-2 right-2 text-xs px-2 py-1 rounded bg-black/60 text-white">
                                        {provider === 'youtube' ? 'YouTube' : provider === 'tiktok' ? 'TikTok' : 'Video'}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {shorts.length > itemsPerView && (
                    <>
                        <button
                            onClick={() => {
                                prevSlide();
                                // si el activo quedó fuera de la vista, lo desactivamos para que no siga sonando
                                if (
                                    activeIndex !== null &&
                                    (activeIndex < currentIndex || activeIndex >= currentIndex + itemsPerView)
                                ) {
                                    setActiveIndex(null);
                                }
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
                            aria-label="Anterior"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <button
                            onClick={() => {
                                nextSlide();
                                if (
                                    activeIndex !== null &&
                                    (activeIndex < currentIndex || activeIndex >= currentIndex + itemsPerView)
                                ) {
                                    setActiveIndex(null);
                                }
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
                            aria-label="Siguiente"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};