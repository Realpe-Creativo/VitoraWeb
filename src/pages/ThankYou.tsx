import React, { useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const CONSULT_TX_URL = import.meta.env.VITE_CONSULT_TX_URL as string;

export const ThankYou: React.FC = () => {
    const [params] = useSearchParams();
    const id = params.get("id") || "";
    const [isLoading, setIsLoading] = useState(true);
    const [txData, setTxData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchedRef = useRef(false);

    useEffect(() => {
        const consultarEstado = async () => {
            if (!id) {
                setError("Referencia no encontrada en la URL");
                setIsLoading(false);
                return;
            }

            try {
                if (!CONSULT_TX_URL) throw new Error("VITE_CONSULT_TX_URL no está definido");

                const resp = await fetch(CONSULT_TX_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ referencia: id }),
                });

                const data = await resp.json();
                console.log("Response", JSON.stringify(data, null, 2));
                if (!resp.ok) throw new Error(data?.message || "No se pudo consultar el estado");
                setTxData(data);
            } catch (err: any) {
                setError(err.message || "Error consultando el estado de la transacción");
            } finally {
                setIsLoading(false);
            }
        };

        if (fetchedRef.current) return;
        fetchedRef.current = true;

        consultarEstado();
    }, [id]);

    const estado = txData?.nuevo_estado || txData?.estado || "EN PROCESO";
    const esAprobado = estado.toUpperCase() === "APROBADO";

    // Extraemos algunos campos del objeto Wompi si existen
    const wompiTx = txData?.wompi || {};
    const reference = (wompiTx.reference) || "";
    const valor = (wompiTx.amount_in_cents || 0) / 100;
    const documento = wompiTx.payment_method?.user_legal_id || "—";
    const metodo = wompiTx?.payment_method?.type || "—";
    const fecha = wompiTx.created_at
        ? new Date(wompiTx.created_at).toLocaleString("es-CO")
        : "—";

    return (
        <div className="bg-gray-50 min-h-screen relative">
            {/* Spinner */}
            {isLoading && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <p className="mt-4 text-white font-medium">Consultando transacción...</p>
                </div>
            )}

            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link
                        to="/"
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Volver a la tienda
                    </Link>
                </div>
            </div>

            {/* Contenido */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    {!isLoading && (
                        <div className="mb-6">
                            <div
                                className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                                    esAprobado ? "bg-green-100" : "bg-red-100"
                                }`}
                            >
                                {esAprobado ? (
                                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                                ) : (
                                    <XCircle className="w-12 h-12 text-red-600" />
                                )}
                            </div>
                            <h2
                                className={`text-2xl font-bold mb-2 ${
                                    esAprobado ? "text-green-700" : "text-red-700"
                                }`}
                            >
                                {esAprobado ? "¡Pago aprobado!" : "Pago no completado"}
                            </h2>
                            {esAprobado ? (
                                <>
                                    <p className="text-gray-600">
                                        Tu compra fue procesada exitosamente.
                                    </p>
                                    <p className="text-gray-600">
                                        Nuestro equipo se contactará contigo en el menor tiempo posible para darte los detalles del envío de tu pedido.
                                    </p>
                                </>
                            ) : (
                                <p className="text-gray-600">
                                    Hubo un problema al procesar el pago. Puedes intentar nuevamente o contactar soporte.
                                </p>
                            )}
                        </div>
                    )}

                    {/* Resumen tipo formulario */}
                    {!isLoading && (
                        <div className="bg-gray-50 rounded-lg p-6 text-left mb-6">
                            <h3 className="font-semibold text-lg mb-4 text-gray-800">
                                Detalle de la compra
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-500">Referencia</label>
                                    <p className="font-medium text-gray-800">{reference}</p>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-500">Estado</label>
                                    <p
                                        className={`font-medium ${
                                            esAprobado ? "text-green-600" : "text-red-600"
                                        }`}
                                    >
                                        {estado}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-500">Valor</label>
                                    <p className="font-medium text-gray-800">
                                        ${valor.toLocaleString("es-CO")}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-500">Método de pago</label>
                                    <p className="font-medium text-gray-800">
                                        {metodo.toUpperCase()}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-500">Documento</label>
                                    <p className="font-medium text-gray-800">{documento}</p>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-500">Fecha de creación</label>
                                    <p className="font-medium text-gray-800">{fecha}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Botones */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center px-6 py-3 bg-[#9acd65] text-white rounded-lg hover:bg-[#8bc34a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#9acd65] focus:ring-offset-2"
                        >
                            Seguir comprando
                        </Link>
                    </div>

                    {error && (
                        <p className="text-red-600 font-medium mt-6">❌ {error}</p>
                    )}
                </div>
            </div>
        </div>
    );
};
