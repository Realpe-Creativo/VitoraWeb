import React, { useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle, Clock } from "lucide-react";

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
                const resp = await fetch(CONSULT_TX_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ referencia: id }),
                });

                const data = await resp.json();
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

    const estado = (txData?.nuevo_estado || txData?.estado || "EN PROCESO").toUpperCase();

    const esAprobado = estado === "APROBADO";
    const esEnProceso = estado === "EN PROCESO";

    const wompiTx = txData?.wompi || {};
    const reference = wompiTx.reference || "";
    const valor = (wompiTx.amount_in_cents || 0) / 100;
    const documento = wompiTx.payment_method?.user_legal_id || "—";
    const metodo = wompiTx?.payment_method?.type || "—";
    const fecha = wompiTx.created_at
        ? new Date(wompiTx.created_at).toLocaleString("es-CO")
        : "—";

    return (
        <div className="bg-gray-50 min-h-screen relative">
            {isLoading && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <p className="mt-4 text-white font-medium">Consultando transacción...</p>
                </div>
            )}

            <div className="bg-white border-b">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Volver a la tienda
                    </Link>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-10">
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    {!isLoading && (
                        <div className="mb-6">
                            <div
                                className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                                    esAprobado
                                        ? "bg-green-100"
                                        : esEnProceso
                                            ? "bg-yellow-100"
                                            : "bg-red-100"
                                }`}
                            >
                                {esAprobado ? (
                                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                                ) : esEnProceso ? (
                                    <Clock className="w-12 h-12 text-yellow-600" />
                                ) : (
                                    <XCircle className="w-12 h-12 text-red-600" />
                                )}
                            </div>

                            <h2
                                className={`text-2xl font-bold mb-2 ${
                                    esAprobado
                                        ? "text-green-700"
                                        : esEnProceso
                                            ? "text-yellow-700"
                                            : "text-red-700"
                                }`}
                            >
                                {esAprobado
                                    ? "¡Pago aprobado!"
                                    : esEnProceso
                                        ? "Pago en proceso"
                                        : "Pago no completado"}
                            </h2>

                            {esAprobado && (
                                <>
                                    <p className="text-gray-600">Tu compra fue procesada exitosamente.</p>
                                </>
                            )}

                            {esEnProceso && (
                                <p className="text-yellow-700 font-medium">
                                    Por favor espera unos minutos y vuelve a recargar esta página, esperamos que nuestro aliado transaccional nos cuente el estado de tu transacción
                                </p>
                            )}

                            {!esAprobado && !esEnProceso && (
                                <p className="text-gray-600">
                                    Hubo un problema al procesar el pago. Puedes intentar nuevamente o contactar soporte.
                                </p>
                            )}
                        </div>
                    )}

                    {!isLoading && (
                        <div className="bg-gray-50 rounded-lg p-6 text-left mb-6">
                            <h3 className="font-semibold text-lg mb-4 text-gray-800">
                                Detalle de la compra
                            </h3>

                            <p><strong>Referencia:</strong> {reference}</p>
                            <p><strong>Estado:</strong> {estado}</p>
                            <p><strong>Valor:</strong> ${valor.toLocaleString("es-CO")}</p>
                            <p><strong>Método:</strong> {metodo.toUpperCase()}</p>
                            <p><strong>Documento:</strong> {documento}</p>
                            <p><strong>Fecha:</strong> {fecha}</p>
                        </div>
                    )}

                    <div className="flex justify-center">
                        <Link
                            to="/"
                            className="px-6 py-3 bg-[#9acd65] text-white rounded-lg hover:bg-[#8bc34a]"
                        >
                            Seguir comprando
                        </Link>
                    </div>

                    {error && <p className="text-red-600 mt-6">❌ {error}</p>}
                </div>
            </div>
        </div>
    );
};