// src/components/Sidebar.tsx
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    HomeIcon,
    /*UsersIcon,*/
    CurrencyDollarIcon,
    ArrowRightOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
    /*IdentificationIcon,*/
    ArrowsRightLeftIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
    onLogout?: () => void;
    logoSrc?: string;
}

export default function Sidebar({
                                    onLogout,
                                    logoSrc = '/img/logos/logo_verde.png',
                                }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        } else {
            localStorage.removeItem('token');
            navigate('/admin/login');
        }
    };

    return (
        <aside
            className={`
        bg-gray-100
        min-h-screen
        flex
        flex-col
        transition-all
        duration-300
        ${isOpen ? 'w-64 p-4' : 'w-16 p-2 items-center'}
      `}
        >
            {/* ↕ HEADER: logo (solo si está abierto) + botón de colapsar/expandir */}
            <div className="flex items-center justify-between mb-6">
                {isOpen && (
                    <img
                        src={logoSrc}
                        alt="Logo"
                        className="h-8"
                    />
                )}

                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                    {isOpen ? (
                        <XMarkIcon className="h-6 w-6"/>
                    ) : (
                        <Bars3Icon className="h-6 w-6"/>
                    )}
                </button>
            </div>

            {/* ↕ NAV: enlaces principales con iconos */}
            <nav className="flex-1 space-y-2">
                <a
                    href="/admin/home"
                    className="flex items-center gap-3 text-gray-700 hover:text-gray-900"
                >
                    <HomeIcon className="h-6 w-6"/>
                    {isOpen && <span>Dashboard</span>}
                </a>

                <a
                    href="/admin/pedidos"
                    className="flex items-center gap-3 text-gray-700 hover:text-gray-900"
                >
                    <CurrencyDollarIcon className="h-6 w-6"/>
                    {isOpen && <span>Pedidos</span>}
                </a>

                <a
                    href="/admin/trasactions"
                    className="flex items-center gap-3 text-gray-700 hover:text-gray-900"
                >
                    <ArrowsRightLeftIcon className="h-6 w-6"/>
                    {isOpen && <span>Transacciones</span>}
                </a>

                {/* <a
                    href="/client"
                    className="flex items-center gap-3 text-gray-700 hover:text-gray-900"
                >
                    <IdentificationIcon className="h-6 w-6" />
                    {isOpen && <span>Clientes</span>}
                </a>

                <a
                    href="/users"
                    className="flex items-center gap-3 text-gray-700 hover:text-gray-900"
                >
                    <UsersIcon className="h-6 w-6" />
                    {isOpen && <span>Usuarios</span>}
                </a>*/}
            </nav>

            {/* ↕ FOOTER: botón de “Cerrar sesión” con icono */}
            <button
                onClick={handleLogout}
                className={`
                          mt-auto
                          flex
                          items-center
                          gap-3
                          text-gray-700
                          hover:text-gray-900
                          focus:outline-none
                          ${isOpen ? '' : 'justify-center'}
                `}
            >
                <ArrowRightOnRectangleIcon className="h-6 w-6"/>
                {isOpen && <span>Cerrar sesión</span>}
            </button>
        </aside>
    );
}
