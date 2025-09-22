import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import {Search, X, Instagram, MessageCircle} from 'lucide-react';
import {products} from '../data/products';
import {Product} from '../types';

export const Navbar: React.FC = () => {
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
            if (e.key === 'Escape' && isSearchOpen) {
                closeSearch();
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (searchModalRef.current && !searchModalRef.current.contains(e.target as Node)) {
                closeSearch();
            }
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

    const openSearch = () => {
        setIsSearchOpen(true);
    };

    const closeSearch = () => {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
    };

    const handleProductClick = () => {
        closeSearch();
    };

    return (
        <>
            <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left - Search */}
                        <div className="flex items-center">
                            <button
                                onClick={openSearch}
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                aria-label="Search products"
                            >
                                <Search className="w-5 h-5"/>
                            </button>
                        </div>

                        {/* Center - Logo */}
                        <div className="flex-1 flex justify-center">
                            <Link
                                to="/"
                                className="flex items-center space-x-2 text-xl font-bold text-gray-900  transition-colors"
                                aria-label="Ir al inicio"
                            >
                                <img
                                    src="/img/logos/logo_verde.png"
                                    alt="Vitora"
                                    className="h-8 w-auto object-contain"
                                    loading="eager"
                                    fetchPriority="high"
                                />
                                <span className="hidden sm:block sr-only">Vitora</span>
                            </Link>
                        </div>

                        {/* Right - Social Media */}
                        <div className="flex items-center space-x-2">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-gray-600 hover:text-pink-600 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                                aria-label="Follow us on Instagram"
                            >
                                <Instagram className="w-5 h-5"/>
                            </a>
                            <a
                                href="https://wa.me/1234567890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                aria-label="Contact us on WhatsApp"
                            >
                                <MessageCircle className="w-5 h-5"/>
                            </a>
                            <a
                                href="https://tiktok.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                aria-label="Follow us on TikTok"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.16 20.5a6.33 6.33 0 0 0 10.86-4.43V7.83a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.26z"/>
                                </svg>
                            </a>
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
                                        aria-label="Close search"
                                    >
                                        <X className="w-5 h-5"/>
                                    </button>
                                </div>

                                <div className="relative mb-4">
                                    <Search
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
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
                                                        <h4 className="text-sm font-medium text-gray-900 truncate">
                                                            {product.name}
                                                        </h4>
                                                        <p className="text-sm text-gray-500 truncate">
                                                            {product.category} • ${product.price}
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
        </>
    );
};