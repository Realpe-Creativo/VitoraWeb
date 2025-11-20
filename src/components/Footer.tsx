import React from 'react';
import {Link} from 'react-router-dom';
import {Instagram, MessageCircle} from 'lucide-react';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col items-center space-y-8">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center space-x-2 text-xl font-bold hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1"
                    >
                        <img
                            src="/img/logos/logo_blanco.png"
                            alt="Vitora"
                            className="h-14 w-auto object-contain"
                            loading="eager"
                            fetchPriority="high"
                        />
                    </Link>

                    {/* Social Media */}
                    <div className="flex items-center space-x-6">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-pink-400 hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                            aria-label="Follow us on Instagram"
                        >
                            <Instagram className="w-6 h-6"/>
                        </a>
                        <a
                            href="https://wa.me/1234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-green-400 hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                            aria-label="Contact us on WhatsApp"
                        >
                            <MessageCircle className="w-6 h-6"/>
                        </a>
                        <a
                            href="https://tiktok.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                            aria-label="Follow us on TikTok"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.16 20.5a6.33 6.33 0 0 0 10.86-4.43V7.83a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.26z"/>
                            </svg>
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className="text-center text-gray-400 text-sm border-t border-gray-800 pt-8 w-full">
                        <p>© {currentYear} Vitora. Todos los derechos reservados.</p>
                        <Link
                            to="/admin/login"
                            className="mt-2 block text-xs text-gray-600 hover:text-gray-400 opacity-40 hover:opacity-80
                        transition-opacity"
                        >
                            Ingresar
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
        ;
};