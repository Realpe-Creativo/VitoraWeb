import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {login} from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import {Eye, EyeOff} from "lucide-react";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await login({email, password});
            localStorage.setItem('token', response.token);
            navigate('/admin/home');
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError('Credenciales inválidas');
        } finally {
            setLoading(false);
        }
    };
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">

                {/* Logo encima */}
                <div className="flex justify-center mb-6">
                    <img
                        src="/img/logos/logo_verde.png"
                        alt="Logo"
                        className="h-16"
                    />
                </div>

                <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="email">
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-gray-700 mb-2" htmlFor="password">
                            Contraseña
                        </label>

                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 pr-10"
                            required
                        />

                        {/* Botón del ojo */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[52px] transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? (
                                <EyeOff size={20}/>
                            ) : (
                                <Eye size={20}/>
                            )}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:bg-green-300"
                    >
                        {loading ? <LoadingSpinner/> : 'Entrar'}
                    </button>

                    {error && (
                        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
                            {error}
                        </div>
                    )}
                </form>

                {/* Botón cancelar */}
                <button
                    onClick={() => navigate('/')}
                    className="mt-6 w-full text-sm text-gray-500 hover:underline"
                >
                    Cancelar y volver al inicio
                </button>
            </div>
        </div>
    );
}
