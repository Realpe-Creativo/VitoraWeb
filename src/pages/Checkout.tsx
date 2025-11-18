import React, {useState, useEffect} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import {ArrowLeft} from 'lucide-react';
import {products} from '../data/products';
import {Product, CheckoutData} from '../types';
import {Price} from '../components/Price';
import {personal_data, terms_and_conditions} from '../data/legal'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const CREATE_TX_URL = import.meta.env.VITE_CREATE_TX_URL as string;

type CartItem = {
    id: string;
    name: string;
    price: number;
    currency: string;
    image?: string;
    image_url: string;
    quantity: number;
    sku?: string;
};

const getCartFromLS = (): CartItem[] => {
    try {
        const raw = localStorage.getItem('cart');
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

export const Checkout: React.FC = () => {
    const [searchParams] = useSearchParams();

    // flujo 1 (unitario)
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSku, setSelectedSku] = useState('');

    // flujo 2 (carrito)
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    // ✅ NUEVO: estados de aceptación y modales
    const [acceptData, setAcceptData] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [openDataModal, setOpenDataModal] = useState(false);
    const [openTermsModal, setOpenTermsModal] = useState(false);

    // Estados para selects dependientes
    const [departments, setDepartments] = useState<Array<{ id: number; name: string }>>([]);
    const [cities, setCities] = useState<Array<{ id: number; name: string }>>([]);
    const [deptLoading, setDeptLoading] = useState(false);
    const [cityLoading, setCityLoading] = useState(false);
    const [geoError, setGeoError] = useState<string | null>(null);

    const [formData, setFormData] = useState<CheckoutData>({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        document: '',
        typeDocument: '',
        address: '',
        city: '',
        department: '',
        departmentId: '',
        notes: ''
    });

    // Detecta modo: query (unitario) o carrito
    useEffect(() => {
        const productId = searchParams.get('id');
        const sku = searchParams.get('sku') || '';
        const qty = parseInt(searchParams.get('qty') || '1', 10);

        if (productId) {
            // MODO UNITARIO
            const foundProduct = products.find(p => p.id === productId);
            if (foundProduct) {
                setProduct(foundProduct);
                setSelectedSku(sku || foundProduct.variants[0]?.sku || '');
                setQuantity(Number.isFinite(qty) && qty > 0 ? qty : 1);
            }
        } else {
            // MODO CARRITO
            const fromLS = getCartFromLS().filter(it => it.quantity > 0);
            setCartItems(fromLS);
        }
    }, [searchParams]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    useEffect(() => {
        const loadDepartments = async () => {
            try {
                setDeptLoading(true);
                setGeoError(null);
                const resp = await fetch('https://api-colombia.com/api/v1/Department');
                const data = await resp.json();
                setDepartments(
                    Array.isArray(data) ? data.map((d: any) => ({id: d.id, name: d.name})) : []
                );
            } catch (e: any) {
                setGeoError('No se pudieron cargar los departamentos');
            } finally {
                setDeptLoading(false);
            }
        };
        loadDepartments();
    }, []);

    useEffect(() => {
        const deptId = (formData as any).departmentId;
        if (!deptId) {
            setCities([]);
            return;
        }
        const loadCities = async () => {
            try {
                setCityLoading(true);
                setGeoError(null);
                const resp = await fetch(`https://api-colombia.com/api/v1/Department/${deptId}/cities`);
                const data = await resp.json();
                setCities(
                    Array.isArray(data) ? data.map((c: any) => ({id: c.id, name: c.name})) : []
                );
                if (!Array.isArray(data) || !data.some((c: any) => c.name === formData.city)) {
                    setFormData(prev => ({...prev, city: ''}));
                }
            } catch (e: any) {
                setGeoError('No se pudieron cargar las ciudades');
                setCities([]);
            } finally {
                setCityLoading(false);
            }
        };
        loadCities();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [(formData as any).departmentId]);

    const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const deptId = Number(e.target.value);
        const deptName = departments.find(d => d.id === deptId)?.name || '';
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setFormData(prev => ({
            ...prev,
            department: deptName,
            departmentId: deptId,
            city: ''
        }));
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cityName = e.target.value;
        setFormData(prev => ({...prev, city: cityName}));
    };

    // Totales según modo
    const isSingle = !!product;
    const singleUnitPrice = isSingle
        ? (product!.variants.find(v => v.sku === selectedSku)?.price ?? product!.price ?? 0)
        : 0;
    const singleTotal = isSingle ? singleUnitPrice * quantity : 0;

    const cartSubtotal = !isSingle
        ? cartItems.reduce((acc, it) => acc + (it.price || 0) * (it.quantity || 0), 0)
        : 0;

    const orderTotal = isSingle ? singleTotal : cartSubtotal;

    const buildProductosPayload = () => {
        if (product) {
            const unitPrice = product.variants.find(v => v.sku === selectedSku)?.price ?? product.price ?? 0;
            return [
                {
                    id: product.id,
                    sku: selectedSku || null,
                    nombre: product.name,
                    cantidad: quantity,
                    precio: unitPrice,
                    moneda: product.currency || 'COP',
                    imagen: product.images?.url_img || null
                }
            ];
        }
        return cartItems.map(it => ({
            id: it.id,
            sku: it.sku || null,
            nombre: it.name,
            cantidad: it.quantity,
            precio: it.price,
            moneda: it.currency || 'COP',
            imagen: it.image_url || null
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // ✅ NUEVO: bloqueo si no aceptó ambas
        if (!acceptData || !acceptTerms) {
            alert('Debes autorizar el tratamiento de datos y aceptar los términos y condiciones para continuar.');
            return;
        }

        if (orderTotal <= 0) {
            alert('No hay productos para pagar.');
            return;
        }

        const body = {
            valor_de_pago: orderTotal,
            estado_inicial: 'EN PROCESO',
            document_type: formData.typeDocument,
            document_number: formData.document,
            name1: formData.name,
            last_name1: formData.lastname,
            email: formData.email,
            phone: formData.phone,
            departamento: formData.department,
            ciudad: formData.city,
            direccion_envio: formData.address,
            productos: buildProductosPayload()
        };

        try {
            setIsSubmitting(true);
            if (!CREATE_TX_URL) throw new Error('VITE_CREATE_TX_URL no está definido');

            const resp = await fetch(CREATE_TX_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });

            const data = await resp.json();

            if (!resp.ok) {
                const msg = data?.message || 'No se pudo crear la transacción.';
                throw new Error(msg);
            }

            // 🧹 AQUÍ: vaciar carrito cuando la transacción se creó bien
            localStorage.removeItem('cart');
            setCartItems([]);

            if (data?.checkoutUrl) {
                window.location.href = data.checkoutUrl;
                return;
            }

            if (data?.wompi?.params && data?.wompi?.action) {
                const qs = new URLSearchParams(data.wompi.params).toString();
                window.location.href = `${data.wompi.action}?${qs}`;
                return;
            }

            throw new Error('La API no retornó una URL válida de checkout.');
        } catch (err: any) {
            console.error(err);
            alert(err.message || 'Error creando la transacción');
            setIsSubmitting(false);
        }
    };

    if (!product && cartItems.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">No hay productos para pagar</h2>
                    <Link to="/" className="text-blue-600 hover:text-blue-800">
                        Volver a la tienda
                    </Link>
                </div>
            </div>
        );
    }

    // @ts-ignore
    // @ts-ignore
    return (
        <div className="bg-gray-50 relative">
            {/* Overlay de bloqueo + spinner */}
            {isSubmitting && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <p className="mt-4 text-white font-medium">Redirigiendo a pasarela…</p>
                </div>
            )}

            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link
                        to={isSingle ? `/product/${product!.id}` : `/`}
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        {isSingle ? 'Volver al producto' : 'Volver a la tienda'}
                    </Link>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <div>
                        <h2 className="text-3xl font-avenir font-bold text-gray-900 mb-6">Resumen de tu compra</h2>
                        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                            {isSingle ? (
                                <div className="flex items-start space-x-4">
                                    <img
                                        src={product!.images.main}
                                        alt={product!.name}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{product!.name}</h3>
                                        <p className="text-sm text-gray-600">
                                            Cantidad: {quantity}
                                        </p>
                                    </div>
                                    <Price amount={singleUnitPrice} currency={product!.currency} className="font-semibold" />
                                </div>
                            ) : (
                                <>
                                    {cartItems.map((it) => (
                                        <div key={`${it.id}-${it.sku || ''}`} className="flex items-start space-x-4">
                                            <img
                                                src={it.image || '/img/placeholder.png'}
                                                alt={it.name}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900">{it.name}</h4>
                                                <p className="text-sm text-gray-600">
                                                    {it.sku ? `SKU: ${it.sku} • ` : ''}Cantidad: {it.quantity}
                                                </p>
                                            </div>
                                            <Price amount={it.price} currency={it.currency || 'COP'} className="font-medium" />
                                        </div>
                                    ))}
                                </>
                            )}

                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold">Total:</span>
                                    <Price
                                        amount={orderTotal}
                                        currency={isSingle ? product!.currency : (cartItems[0]?.currency || 'COP')}
                                        className="text-lg font-bold text-[#9acd65]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <div>
                        <h2 className="text-3xl font-avenir font-bold text-gray-900 mb-6">Información de pago</h2>
                        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nombre *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9acd65] focus:border-transparent disabled:opacity-60"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
                                        Apellido *
                                    </label>
                                    <input
                                        type="text"
                                        id="lastname"
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9acd65] focus:border-transparent disabled:opacity-60"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9acd65] focus:border-transparent disabled:opacity-60"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Teléfono *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9acd65] focus:border-transparent disabled:opacity-60"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="document" className="block text-sm font-medium text-gray-700 mb-1">
                                        Documento *
                                    </label>
                                    <input
                                        type="text"
                                        id="document"
                                        name="document"
                                        value={formData.document}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9acd65] focus:border-transparent disabled:opacity-60"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="typeDocument" className="block text-sm font-medium text-gray-700 mb-1">
                                        Tipo documento *
                                    </label>
                                    <select
                                        id="typeDocument"
                                        name="typeDocument"
                                        value={formData.typeDocument}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9acd65] focus:border-transparent disabled:opacity-60"
                                    >
                                        <option value="">Seleccionar</option>
                                        <option value="CC">(CC) Cédula de ciudadanía</option>
                                        <option value="CE">(CE) Cédula de extranjería</option>
                                        <option value="PAS">(PAS) Pasaporte</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                                        Departamento *
                                    </label>
                                    <select
                                        id="department"
                                        name="department"
                                        value={(formData as any).departmentId || ''} // controlado por id
                                        onChange={handleDepartmentChange}
                                        required
                                        disabled={isSubmitting || deptLoading}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9acd65] focus:border-transparent disabled:opacity-60"
                                    >
                                        <option value="">{deptLoading ? 'Cargando…' : 'Seleccionar'}</option>
                                        {departments.map((d) => (
                                            <option key={d.id} value={d.id}>{d.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                        Municipio / Ciudad *
                                    </label>
                                    <select
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleCityChange}
                                        required
                                        disabled={isSubmitting || !(formData as any).departmentId || cityLoading}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9acd65] focus:border-transparent disabled:opacity-60"
                                    >
                                        <option value="">
                                            {!(formData as any).departmentId ? 'Selecciona un departamento' : (cityLoading ? 'Cargando…' : 'Seleccionar')}
                                        </option>
                                        {cities.map((c) => (
                                            <option key={c.id} value={c.name}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {geoError && (
                                <p className="text-sm text-red-600 mt-1">{geoError}</p>
                            )}

                            <div className="gap-4 mb-4">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                    Dirección *
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isSubmitting}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9acd65] focus:border-transparent disabled:opacity-60"
                                />
                            </div>

                            {/* ✅ NUEVO: Checkboxes + modales */}
                            <div className="space-y-3 mb-5">
                                <label className="flex items-start gap-3 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={acceptData}
                                        onChange={(e) => setAcceptData(e.target.checked)}
                                        disabled={isSubmitting}
                                        className="mt-1 h-4 w-4 rounded border-gray-300 text-[#9acd65] focus:ring-[#9acd65]"
                                    />
                                    <span className="text-sm text-gray-700">
                    Autorizo el tratamiento de mis{' '}
                                        <button
                                            type="button"
                                            onClick={() => setOpenDataModal(true)}
                                            className="underline underline-offset-2 text-gray-900 hover:text-[#7fb448] focus:outline-none"
                                        >
                      datos personales
                    </button>.
                  </span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={acceptTerms}
                                        onChange={(e) => setAcceptTerms(e.target.checked)}
                                        disabled={isSubmitting}
                                        className="mt-1 h-4 w-4 rounded border-gray-300 text-[#9acd65] focus:ring-[#9acd65]"
                                    />
                                    <span className="text-sm text-gray-700">
                    Acepto los{' '}
                                        <button
                                            type="button"
                                            onClick={() => setOpenTermsModal(true)}
                                            className="underline underline-offset-2 text-gray-900 hover:text-[#7fb448] focus:outline-none"
                                        >
                      términos y condiciones
                    </button>.
                  </span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || !acceptData || !acceptTerms} // ✅ deshabilitado hasta aceptar ambas
                                className="w-full bg-[#9acd65] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#9acd65] disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-[#9acd65] focus:ring-offset-2"
                            >
                                {isSubmitting ? 'Procesando…' : 'Completar compra'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {openDataModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
                    onClick={() => setOpenDataModal(false)}
                >
                    <div
                        className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center border-b px-6 py-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Tratamiento de datos personales
                            </h3>
                            <button
                                type="button"
                                onClick={() => setOpenDataModal(false)}
                                className="text-gray-500 hover:text-gray-800 text-2xl leading-none focus:outline-none"
                            >
                                ×
                            </button>
                        </div>

                        {/* Contenido con scroll */}
                        <div
                            className="px-6 py-4 overflow-y-auto flex-1"
                            dangerouslySetInnerHTML={{ __html: personal_data }}
                        />

                        {/* Footer */}
                        <div className="flex justify-end gap-3 border-t px-6 py-4 bg-gray-50">
                            <button
                                type="button"
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                                onClick={() => setOpenDataModal(false)}
                            >
                                Cerrar
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 rounded-lg bg-[#9acd65] text-white hover:brightness-95"
                                onClick={() => setOpenDataModal(false)}
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {openTermsModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
                    onClick={() => setOpenTermsModal(false)}
                >
                    <div
                        className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center border-b px-6 py-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Términos y condiciones
                            </h3>
                            <button
                                type="button"
                                onClick={() => setOpenTermsModal(false)}
                                className="text-gray-500 hover:text-gray-800 text-2xl leading-none focus:outline-none"
                            >
                                ×
                            </button>
                        </div>

                        {/* Contenido con scroll */}
                        <div
                            className="px-6 py-4 overflow-y-auto flex-1 prose prose-sm max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{ __html: terms_and_conditions }}
                        />

                        {/* Footer */}
                        <div className="flex justify-end gap-3 border-t px-6 py-4 bg-gray-50">
                            <button
                                type="button"
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                                onClick={() => setOpenTermsModal(false)}
                            >
                                Cerrar
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 rounded-lg bg-[#9acd65] text-white hover:brightness-95"
                                onClick={() => setOpenTermsModal(false)}
                            >
                                Aceptar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};