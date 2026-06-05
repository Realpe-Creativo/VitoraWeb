import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Play } from 'lucide-react';
import { Product } from '../types';

// ── Video helpers ────────────────────────────────────────────────────────────
type MediaItem = { type: 'image'; src: string } | { type: 'video'; url: string };

const ytId = (url: string): string | null => {
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
const isYouTube = (url: string) => /youtu\.be|youtube\.com/.test(url);
const ytEmbed = (url: string) => {
    const id = ytId(url);
    return id ? `https://www.youtube.com/embed/${id}?rel=0&playsinline=1` : null;
};
const ytThumb = (url: string) => {
    const id = ytId(url);
    return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
};
import { getProductoById, getProductos } from '../services/productosService';
import { ImageZoom } from '../components/ImageZoom';
import { Price } from '../components/Price';
import { QuantitySelector } from '../components/QuantitySelector';
import { AlsoInterested } from '../components/AlsoInterested';
import { MiniBanner } from '../components/MiniBanner';
import { ShortsCarousel } from '../components/ShortsCarousel';
import { HtmlContent, AccordionSection } from '../components/AccordionSection';

type CartItem = {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    currency: string;
    image: string;
    image_url: string;
    quantity: number;
    sku?: string;
};

const getCart = (): CartItem[] => {
    try {
        const raw = localStorage.getItem('cart');
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};
const setCart = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items));
    window.dispatchEvent(new Event('storage'));
};

export const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setNotFound(false);
        setSelectedMediaIndex(0);

        Promise.all([getProductoById(id), getProductos()])
            .then(([prod, all]) => {
                setProduct(prod);
                setAllProducts(all);
                setSelectedVariant(prod.variants[0]?.sku || '');
            })
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#9acd65] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (notFound || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h2>
                    <Link to="/" className="text-blue-600 hover:text-blue-800">
                        Volver a la tienda
                    </Link>
                </div>
            </div>
        );
    }

    const handleBuyNow = () => {
        const searchParams = new URLSearchParams({
            id: product.id,
            sku: selectedVariant,
            qty: quantity.toString()
        });
        window.location.href = `/checkout?${searchParams.toString()}`;
    };

    const handleAddToCart = () => {
        try {
            const cart = getCart();
            const variantBasePrice = product.variants.find(v => v.sku === selectedVariant)?.price ?? product.price;
            const effectivePrice = product.discount > 0
                ? Math.round(variantBasePrice * (1 - product.discount / 100))
                : variantBasePrice;
            const key = (item: CartItem) => `${item.id}__${item.sku || ''}`;
            const incoming: CartItem = {
                id: product.id,
                name: product.name,
                price: effectivePrice,
                ...(product.discount > 0 ? { originalPrice: variantBasePrice, discount: product.discount } : {}),
                currency: product.currency,
                image: product.images.main,
                image_url: product.images.url_img,
                quantity,
                sku: selectedVariant || undefined
            };

            const idx = cart.findIndex(i => key(i) === key(incoming));
            if (idx >= 0) {
                cart[idx].quantity += quantity;
            } else {
                cart.push(incoming);
            }

            setCart(cart);
            setAdded(true);
            setTimeout(() => setAdded(false), 1500);
            window.dispatchEvent(new Event('openCart'));
        } catch (e) {
            console.error('No se pudo añadir al carrito', e);
        }
    };

    const mediaItems: MediaItem[] = [
        ...(product.images.gallery || []).map(src => ({ type: 'image' as const, src })),
        ...(product.images.videos || []).map(url => ({ type: 'video' as const, url })),
    ];
    const selectedMedia = mediaItems[selectedMediaIndex] ?? { type: 'image' as const, src: product.images.main };

    const selectedVariantData = product.variants.find(v => v.sku === selectedVariant);
    const basePrice = selectedVariantData?.price || product.price;
    const finalPrice = product.discount > 0
        ? Math.round(basePrice * (1 - product.discount / 100))
        : basePrice;

    return (
        <div className="bg-white">
            <div className="bg-gray-50 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link
                        to="/"
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors p-1"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Volver a la tienda
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Media (imágenes + videos) */}
                    <div>
                        {/* Visor principal */}
                        <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-black">

                            {selectedMedia.type === 'image' ? (
                                <ImageZoom
                                    src={selectedMedia.src}
                                    alt={product.name}
                                    className="w-full h-full"
                                />
                            ) : isYouTube(selectedMedia.url) ? (
                                <iframe
                                    src={ytEmbed(selectedMedia.url) || ''}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={`Video ${selectedMediaIndex + 1}`}
                                />
                            ) : (
                                <video
                                    src={selectedMedia.url}
                                    controls
                                    className="w-full h-full object-contain"
                                />
                            )}
                        </div>

                        {/* Strip de miniaturas */}
                        {mediaItems.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {mediaItems.map((item, index) => {
                                    const isSelected = selectedMediaIndex === index;
                                    const thumb = item.type === 'video'
                                        ? (isYouTube(item.url) ? ytThumb(item.url) : null)
                                        : null;
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedMediaIndex(index)}
                                            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                                                isSelected ? 'border-[#9acd65] ring-2 ring-[#9acd65]/30' : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            {item.type === 'image' ? (
                                                <img
                                                    src={item.src}
                                                    alt={`${product.name} ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            ) : thumb ? (
                                                <>
                                                    <img src={thumb} alt={`Video ${index + 1}`} className="w-full h-full object-cover" loading="lazy" />
                                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                                        <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                                                            <Play className="w-4 h-4 text-gray-800 ml-0.5" />
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                                    <Play className="w-6 h-6 text-white" />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        <h1 className="text-4xl font-avenir font-bold text-gray-900 mb-4">{product.name}</h1>
                        <Price
                            amount={finalPrice}
                            originalAmount={product.discount > 0 ? basePrice : undefined}
                            discountPct={product.discount > 0 ? product.discount : undefined}
                            currency={product.currency}
                            className="text-3xl font-bold text-[#9acd65] mb-6"
                        />

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cantidad:
                                </label>
                                <div
                                    className="
                                    w-fit inline-block
                                    md:[&_input]:w-[3ch]
                                    md:[&_input]:text-sm
                                    md:[&_button]:px-1 md:[&_button]:py-1
                                    md:[&_svg]:w-10 md:[&_svg]:h-3
                                    md:[&_div]:rounded-md
                                  "
                                >
                                    <QuantitySelector
                                        quantity={quantity}
                                        onQuantityChange={setQuantity}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleBuyNow}
                                className="w-full bg-[#9acd65] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#9acd65] transition-colors flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#9acd65] focus:ring-offset-2"
                            >
                                <span>Comprar ahora</span>
                            </button>

                            <button
                                onClick={handleAddToCart}
                                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2
                                    ${added
                                    ? 'bg-green-600 text-white focus:ring-green-600'
                                    : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 focus:ring-gray-300'}`}
                                aria-label="Añadir al carrito"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                <span>{added ? 'Agregado' : 'Agregar al carrito'}</span>
                            </button>
                        </div>

                        <div className="mt-8 space-y-6">
                            <div className="space-y-4">
                                <AccordionSection title="Características" defaultOpen>
                                    <HtmlContent
                                        html={product.description}
                                        className="text-gray-600 leading-relaxed text-sm md:text-base"
                                    />
                                </AccordionSection>

                                {product.benefitsGroups && product.benefitsGroups.length > 0 ? (
                                    <AccordionSection title="Beneficios">
                                        <div className="space-y-2">
                                            {product.benefitsGroups.map((group, index) => (
                                                <AccordionSection
                                                    key={index}
                                                    title={group.title}
                                                    defaultOpen={index === 0}
                                                >
                                                    <ul className="space-y-2">
                                                        {group.items.map((item, i) => (
                                                            <li key={i} className="flex items-start">
                                                                <span className="text-green-500 mr-2 mt-1">✓</span>
                                                                <HtmlContent
                                                                    html={item}
                                                                    className="text-gray-600 text-sm md:text-base"
                                                                />
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </AccordionSection>
                                            ))}
                                        </div>
                                    </AccordionSection>
                                ) : (
                                    product.benefits && product.benefits.length > 0 && (
                                        <AccordionSection title="Beneficios">
                                            <ul className="space-y-2">
                                                {product.benefits.map((benefit, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <span className="text-green-500 mr-2 mt-1">✓</span>
                                                        <HtmlContent
                                                            html={benefit}
                                                            className="text-gray-600 text-sm md:text-base"
                                                        />
                                                    </li>
                                                ))}
                                            </ul>
                                        </AccordionSection>
                                    )
                                )}

                                {product.faqs && product.faqs.length > 0 && (
                                    <AccordionSection title="Preguntas frecuentes">
                                        <div className="space-y-2">
                                            {product.faqs.map((faq, index) => (
                                                <AccordionSection
                                                    key={index}
                                                    title={faq.question}
                                                    defaultOpen={index === 0}
                                                >
                                                    <HtmlContent
                                                        html={faq.answer}
                                                        className="text-gray-600 text-sm md:text-base"
                                                    />
                                                </AccordionSection>
                                            ))}
                                        </div>
                                    </AccordionSection>
                                )}
                            </div>

                            <MiniBanner imageUrl={product.images.miniBanner || ''} />
                        </div>
                    </div>
                </div>

                {product.extraSections && product.extraSections.length > 0 && (
                    <div className="mt-10 border-t border-gray-200 pt-8">
                        <div className="max-w-3xl mx-auto space-y-4">
                            {product.extraSections.map((section, index) => (
                                <AccordionSection
                                    key={index}
                                    title={section.title}
                                    defaultOpen={index === 0}
                                >
                                    <HtmlContent
                                        html={section.content}
                                        className="text-gray-700 text-sm md:text-base leading-relaxed"
                                    />
                                </AccordionSection>
                            ))}
                        </div>
                    </div>
                )}

                {product.shorts && product.shorts.length > 0 && (
                    <div className="py-12 border-t border-gray-200">
                        <ShortsCarousel shorts={product.shorts} />
                    </div>
                )}

                <AlsoInterested
                    products={allProducts}
                    currentProductId={product.id}
                    allProducts={allProducts}
                />
            </div>
        </div>
    );
};
