import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { products } from '../data/products';
import { Product } from '../types';
import { ImageZoom } from '../components/ImageZoom';
import { Price } from '../components/Price';
import { QuantitySelector } from '../components/QuantitySelector';
//import { VariantSelect } from '../components/VariantSelect';
import { IconBenefitsRow } from '../components/IconBenefitsRow';
import { AlsoInterested } from '../components/AlsoInterested';
import { MiniBanner } from '../components/MiniBanner';
import { ShortsCarousel } from '../components/ShortsCarousel';
import { HtmlContent, AccordionSection } from '../components/AccordionSection';

type CartItem = {
    id: string;
    name: string;
    price: number;
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
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const foundProduct = products.find(p => p.id === id);
        if (foundProduct) {
            setProduct(foundProduct);
            setSelectedVariant(foundProduct.variants[0]?.sku || '');
        }
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
                    <Link to="/" className="text-blue-600 hover:text-blue-800">
                        Return to home
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
            const price = product.variants.find(v => v.sku === selectedVariant)?.price ?? product.price;
            const key = (item: CartItem) => `${item.id}__${item.sku || ''}`;
            const incoming: CartItem = {
                id: product.id,
                name: product.name,
                price,
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
        } catch (e) {
            console.error('No se pudo añadir al carrito', e);
        }
    };

    const selectedVariantData = product.variants.find(v => v.sku === selectedVariant);
    const finalPrice = selectedVariantData?.price || product.price;

    return (
        <div className="bg-white">
            {/* Breadcrumb */}
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
                {/* Product Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Images */}
                    <div>
                        <div className="aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
                            <ImageZoom
                                src={product.images.gallery[selectedImageIndex] || product.images.main}
                                alt={product.name}
                                className="w-full h-full"
                            />
                        </div>

                        {product.images.gallery.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {product.images.gallery.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImageIndex(index)}
                                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                                            selectedImageIndex === index
                                                ? 'border-[#9acd65] ring-2 ring-blue-200'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} view ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        <h1 className="text-3xl font-dunkin text-gray-900 mb-4">{product.name}</h1>
                        <Price
                            amount={finalPrice}
                            currency={product.currency}
                            className="text-3xl font-bold text-[#9acd65] mb-6"
                        />

                        <div className="space-y-6">
                            {/*<VariantSelect
                            variants={product.variants}
                            selectedSku={selectedVariant}
                            onVariantChange={setSelectedVariant}
                            label="Select variant"
                          />*/}

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
                                {/* ↑ En móvil no cambia; desde md: MUY angosto */}
                            </div>

                            {/* Comprar ahora */}
                            <button
                                onClick={handleBuyNow}
                                className="w-full bg-[#9acd65] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#9acd65] transition-colors flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#9acd65] focus:ring-offset-2"
                            >
                                <span>Comprar ahora</span>
                            </button>

                            {/* ➕ Añadir al carrito (debajo del botón Comprar) */}
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
                                {/* Características / Descripción */}
                                <AccordionSection title="Características" defaultOpen>
                                    <HtmlContent
                                        html={product.description}
                                        className="text-gray-600 leading-relaxed text-sm md:text-base"
                                    />
                                </AccordionSection>

                                {/* Beneficios */}
                                {/* Beneficios */}
                                {product.benefitsGroups && product.benefitsGroups.length > 0 ? (
                                    // Modo: acordeón dentro de acordeón
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
                                    // Modo: lista simple (como estaba antes)
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

                                {/* Preguntas frecuentes: acordeón dentro de acordeón */}
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

                {/* Product Features */}
                <IconBenefitsRow icons={product.icons} />

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

                {/* Video Reviews */}
                {product.shorts && product.shorts.length > 0 && (
                    <div className="py-12 border-t border-gray-200">
                        <ShortsCarousel shorts={product.shorts} />
                    </div>
                )}

                {/* Related Products */}
                <AlsoInterested
                    products={products}
                    currentProductId={product.id}
                    allProducts={products}
                />
            </div>
        </div>
    );
};