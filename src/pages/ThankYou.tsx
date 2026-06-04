import React, { useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle, Clock, Truck } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const CONSULT_TX_URL = import.meta.env.VITE_CONSULT_TX_URL as string;

const WA_LINK = "https://wa.me/573158873641?text=Hola%20Vitora%2C%20acabo%20de%20realizar%20un%20pedido%20y%20necesito%20ayuda";

const ThankYouMessage: React.FC = () => (
    <div className="space-y-5 text-left">
        <div className="flex items-start gap-3">
            <span className="text-2xl">📦</span>
            <p className="text-gray-700">En el transcurso de <strong>1 día hábil</strong> recibirás la guía de la transportadora para que puedas realizar el seguimiento de tu envío.</p>
        </div>
        <div className="flex items-start gap-3">
            <span className="text-2xl">📞</span>
            <p className="text-gray-700">Adicionalmente, uno de nuestros asesores se comunicará contigo en el menor tiempo posible para confirmar la recepción del pedido y brindarte acompañamiento durante el proceso.</p>
        </div>
        <p className="text-center font-semibold text-[#7fb448] pt-2">¡Gracias por confiar en Vitora!</p>
    </div>
);

const ThankYouActions: React.FC = () => (
    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
        <Link
            to="/"
            className="px-6 py-3 bg-[#9acd65] text-white rounded-lg hover:bg-[#8bc34a] font-semibold text-center transition-colors"
        >
            Seguir comprando
        </Link>
        <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#1ebe5d] font-semibold text-center flex items-center justify-center gap-2 transition-colors"
        >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Contactar soporte
        </a>
    </div>
);

const ThankYouCOD: React.FC<{ pedidoId: string }> = ({ pedidoId }) => (
    <div className="bg-gray-50 min-h-screen">
        <div className="bg-white border-b">
            <div className="max-w-4xl mx-auto px-4 py-4">
                <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Volver a la tienda
                </Link>
            </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-10">
            <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="text-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <Truck className="w-11 h-11 text-green-600" />
                    </div>
                    <p className="text-3xl mb-1">🎉</p>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">¡Gracias por tu compra!</h2>
                    <p className="text-gray-600">Hemos recibido tu pedido correctamente y ya estamos preparando el despacho.</p>
                </div>

                <div className="bg-[#f6ffed] border border-[#b7eb8f] rounded-lg p-4 mb-6 text-sm text-gray-600 space-y-0.5">
                    <p><strong>Pedido:</strong> #{pedidoId}</p>
                    <p><strong>Método de pago:</strong> Contraentrega — pagas cuando recibas</p>
                </div>

                <ThankYouMessage />
                <ThankYouActions />
            </div>
        </div>
    </div>
);

export const ThankYou: React.FC = () => {
    const [params] = useSearchParams();
    const isCod = params.get("cod") === "1";
    const pedidoRef = params.get("ref") || "";
    const id = params.get("id") || "";

    const [isLoading, setIsLoading] = useState(true);
    const [txData, setTxData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const fetchedRef = useRef(false);

    useEffect(() => {
        if (isCod) { setIsLoading(false); return; }

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
    }, [id, isCod]);

    if (isCod) return <ThankYouCOD pedidoId={pedidoRef} />;

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

            <div className="max-w-2xl mx-auto px-4 py-10">
                <div className="bg-white rounded-lg shadow-sm p-8">

                    {/* Ícono + título de estado */}
                    {!isLoading && (
                        <div className="text-center mb-6">
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                                esAprobado ? "bg-green-100" : esEnProceso ? "bg-yellow-100" : "bg-red-100"
                            }`}>
                                {esAprobado ? (
                                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                                ) : esEnProceso ? (
                                    <Clock className="w-12 h-12 text-yellow-600" />
                                ) : (
                                    <XCircle className="w-12 h-12 text-red-600" />
                                )}
                            </div>

                            {esAprobado && (
                                <>
                                    <p className="text-3xl mb-1">🎉</p>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-1">¡Gracias por tu compra!</h2>
                                    <p className="text-gray-600">Hemos recibido tu pedido correctamente y ya estamos preparando el despacho.</p>
                                </>
                            )}
                            {esEnProceso && (
                                <>
                                    <h2 className="text-2xl font-bold text-yellow-700 mb-2">Pago en proceso</h2>
                                    <p className="text-yellow-700 font-medium">
                                        Por favor espera unos minutos y vuelve a recargar esta página, esperamos que nuestro aliado transaccional nos cuente el estado de tu transacción.
                                    </p>
                                </>
                            )}
                            {!esAprobado && !esEnProceso && (
                                <>
                                    <h2 className="text-2xl font-bold text-red-700 mb-2">Pago no completado</h2>
                                    <p className="text-gray-600">Hubo un problema al procesar el pago. Puedes intentar nuevamente o contactar soporte.</p>
                                </>
                            )}
                        </div>
                    )}

                    {/* Detalle de transacción */}
                    {!isLoading && (
                        <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 space-y-0.5 mb-6">
                            <p><strong>Referencia:</strong> {reference}</p>
                            <p><strong>Estado:</strong> {estado}</p>
                            <p><strong>Valor:</strong> ${valor.toLocaleString("es-CO")}</p>
                            <p><strong>Método:</strong> {metodo.toUpperCase()}</p>
                            <p><strong>Documento:</strong> {documento}</p>
                            <p><strong>Fecha:</strong> {fecha}</p>
                        </div>
                    )}

                    {/* Mensaje de seguimiento solo si está aprobado */}
                    {!isLoading && esAprobado && <ThankYouMessage />}

                    {/* Botones */}
                    {!isLoading && <ThankYouActions />}

                    {error && <p className="text-red-600 mt-6 text-center">❌ {error}</p>}
                </div>
            </div>
        </div>
    );
};