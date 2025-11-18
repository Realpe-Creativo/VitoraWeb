import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import {Search, X, Instagram, MessageCircle, ShoppingCart, Trash2} from 'lucide-react';
import {products} from '../data/products';
import {Product} from '../types';

type CartItem = {
    id: string;
    name: string;
    price: number;       // precio unitario
    quantity: number;
    image?: string;
    sku?: string;
    currency?: string;   // 'COP' por defecto
};

const CURRENCY = 'COP';

const formatMoney = (value: number, currency = CURRENCY) =>
    new Intl.NumberFormat('es-CO', {style: 'currency', currency}).format(value);

const getCartFromLS = (): CartItem[] => {
    try {
        const raw = localStorage.getItem('cart');
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const setCartToLS = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items));
    // Para forzar actualización en otras pestañas / componentes si lo usas
    window.dispatchEvent(new Event('storage'));
};

export const Navbar: React.FC = () => {
    // ====== SEARCH ======
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchModalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (searchQuery.trim()) {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(filtered);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isSearchOpen) closeSearch();
            if (e.key === 'Escape' && isCartOpen) closeCart();
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (isSearchOpen && searchModalRef.current && !searchModalRef.current.contains(e.target as Node)) {
                closeSearch();
            }
            // Cart se cierra con su propio backdrop; no necesitamos aquí
        };

        if (isSearchOpen) {
            document.addEventListener('keydown', handleEscape);
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isSearchOpen]);

    const openSearch = () => setIsSearchOpen(true);
    const closeSearch = () => {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
    };
    const handleProductClick = () => closeSearch();

    // ====== CART ======
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);

    const cartCount = cart.reduce((acc, it) => acc + (it.quantity || 0), 0);
    const cartSubtotal = cart.reduce((acc, it) => acc + (it.price || 0) * (it.quantity || 0), 0);

    // Cargar cart desde LS
    useEffect(() => {
        const items = getCartFromLS();
        setCart(Array.isArray(items) ? items : []);
        const onStorage = () => setCart(getCartFromLS());
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const openCart = () => {
        setIsCartOpen(true);
        document.body.style.overflow = 'hidden';
    };
    const closeCart = () => {
        setIsCartOpen(false);
        document.body.style.overflow = 'unset';
    };

    const incQty = (id: string) => {
        const next = cart.map(it => it.id === id ? {...it, quantity: (it.quantity || 0) + 1} : it);
        setCart(next);
        setCartToLS(next);
    };
    const decQty = (id: string) => {
        const next = cart
            .map(it => it.id === id ? {...it, quantity: Math.max(1, (it.quantity || 0) - 1)} : it)
            .filter(it => it.quantity > 0);
        setCart(next);
        setCartToLS(next);
    };
    const removeItem = (id: string) => {
        const next = cart.filter(it => it.id !== id);
        setCart(next);
        setCartToLS(next);
    };
    const clearCart = () => {
        setCart([]);
        setCartToLS([]);
    };

    return (
        <>
            <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left - Search + Cart */}
                        <div className="flex items-center space-x-1 w-20 md:w-auto">
                            <div className="hidden md:flex items-center space-x-1">

                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-gray-600 hover:text-pink-600 hover:bg-gray-100 rounded-lg transition-colors"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-7 h-7" />
                                </a>

                                <a
                                    href="https://wa.me/573158873641?text=Hola%20Vitora%20Colombia%2C%20estoy%20interesado%20en%20sus%20productos"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-lg transition-colors"
                                    aria-label="WhatsApp"
                                >
                                    <MessageCircle className="w-7 h-7" />
                                </a>

                                <a
                                    href="https://tiktok.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                    aria-label="TikTok"
                                >
                                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.16 20.5a6.33 6.33 0 0 0 10.86-4.43V7.83a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.26z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Center - Logo */}
                        <div className="flex-1 flex justify-center">
                            <Link
                                to="/"
                                className="flex items-center space-x-2 text-xl font-bold text-gray-900 transition-colors"
                                aria-label="Ir al inicio"
                            >
                                <img
                                    src="/img/logos/logo_verde.png"
                                    alt="Vitora"
                                    className="h-9 w-auto object-contain"
                                    loading="eager"
                                    fetchPriority="high"
                                />
                                <span className="hidden sm:block sr-only">Vitora</span>
                            </Link>
                        </div>

                        {/* Right - Social Media */}
                        <div className="flex items-center space-x-2">
                            {/* Search */}
                            <button
                                onClick={openSearch}
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                aria-label="Buscar productos"
                            >
                                <Search className="w-7 h-7"/>
                            </button>

                            {/* Cart */}
                            <button
                                onClick={openCart}
                                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                aria-label="Abrir carrito"
                            >
                                <ShoppingCart className="w-7 h-7"/>
                                {cartCount > 0 && (
                                    <span
                                        className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 text-[10px] leading-[18px] text-white bg-[#9acd65] rounded-full text-center">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Search Modal */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-full items-start justify-center p-4 text-center sm:p-0">
                        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"/>
                        <div
                            ref={searchModalRef}
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl"
                            role="search"
                            aria-label="Product search"
                        >
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Buscar productos</h3>
                                    <button
                                        onClick={closeSearch}
                                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        aria-label="Cerrar buscador"
                                    >
                                        <X className="w-5 h-5"/>
                                    </button>
                                </div>

                                <div className="relative mb-4">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"/>
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Buscar en nuestros productos"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        aria-label="Search input"
                                    />
                                </div>

                                <div className="max-h-96 overflow-y-auto">
                                    {searchQuery.trim() && searchResults.length === 0 && (
                                        <p className="text-center text-gray-500 py-8">No products found</p>
                                    )}

                                    {searchResults.length > 0 && (
                                        <div className="space-y-2">
                                            {searchResults.map((product) => (
                                                <Link
                                                    key={product.id}
                                                    to={`/product/${product.id}`}
                                                    onClick={handleProductClick}
                                                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <img
                                                        src={product.images.main}
                                                        alt={product.name}
                                                        className="w-12 h-12 object-cover rounded-lg"
                                                        loading="lazy"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-sm font-medium text-gray-900 truncate">{product.name}</h4>
                                                        <p className="text-sm text-gray-500 truncate">
                                                            {product.category} • {formatMoney(product.price)}
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Cart Drawer */}
            {isCartOpen && (
                <div className="fixed inset-0 z-50">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeCart}/>

                    {/* Panel */}
                    <aside
                        className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-xl flex flex-col"
                        role="dialog"
                        aria-label="Carrito de compras"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b">
                            <h3 className="text-lg font-semibold text-gray-900">Tu carrito</h3>
                            <button
                                onClick={closeCart}
                                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label="Cerrar carrito"
                            >
                                <X className="w-5 h-5"/>
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {cart.length === 0 ? (
                                <p className="text-gray-500 text-center py-10">Tu carrito está vacío</p>
                            ) : (
                                <ul className="space-y-3">
                                    {cart.map((item) => (
                                        <li key={`${item.id}-${item.sku || ''}`}
                                            className="flex items-center gap-3 p-3 border rounded-lg">
                                            <img
                                                src={item.image || '/img/placeholder.png'}
                                                alt={item.name}
                                                className="w-14 h-14 rounded-md object-cover"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 truncate">{item.name}</p>
                                                <p className="text-sm text-gray-500">
                                                    {item.sku ? `SKU: ${item.sku} • ` : ''}{formatMoney(item.price)}
                                                </p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button
                                                        onClick={() => decQty(item.id)}
                                                        className="w-7 h-7 rounded border text-gray-700 hover:bg-gray-100"
                                                        aria-label="Disminuir cantidad"
                                                    >−
                                                    </button>
                                                    <span className="w-6 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => incQty(item.id)}
                                                        className="w-7 h-7 rounded border text-gray-700 hover:bg-gray-100"
                                                        aria-label="Aumentar cantidad"
                                                    >+
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-1 text-gray-400 hover:text-red-600"
                                                    aria-label="Quitar del carrito"
                                                >
                                                    <Trash2 className="w-4 h-4"/>
                                                </button>
                                                <p className="mt-4 font-semibold text-gray-900">
                                                    {formatMoney((item.price || 0) * (item.quantity || 0))}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="border-t p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="text-lg font-semibold">{formatMoney(cartSubtotal)}</span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={clearCart}
                                    disabled={cart.length === 0}
                                    className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Vaciar
                                </button>
                                <Link
                                    to="/checkout"
                                    onClick={closeCart}
                                    className="flex-1 text-center bg-[#9acd65] text-white px-4 py-2 rounded-lg hover:bg-[#8bc34a]"
                                >
                                    Pagar
                                </Link>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                En el checkout podrás calcular envío e impuestos (si aplican).
                            </p>
                        </div>
                    </aside>
                </div>
            )}
        </>
    );
};