import React, {useEffect, useMemo, useState} from 'react';
import Sidebar from '../components/Sidebar';
import DataTable, {type Column} from '../components/Datatable';
import {
    getPedidos,
    type PedidoDTO,
    calcularTotalPedido,
    type GetPedidosParams,
    updatePedidoEstado,
} from '../services/pedidosApi';
import {Eye} from 'lucide-react';

const formatCOP = (n: number) =>
    new Intl.NumberFormat('es-CO', {style: 'currency', currency: 'COP'}).format(n);

// ⬇️ Colores del SELECT según tu requerimiento
const selectColorForEstado = (estado: string) => {
    const s = (estado || '').toUpperCase();
    if (s === 'PAGADO') return 'bg-blue-100 text-blue-700 border-blue-200';
    if (s === 'EN_PREPARACION') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    if (s === 'ENVIADO') return 'bg-green-100 text-green-700 border-green-200';
    if (s === 'CANCELADO') return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
};

// (opcional) si quieres seguir mostrando el badge en otros lados:
const BadgeTx: React.FC<{ estado?: string }> = ({estado}) => {
    const st = (estado || '').toUpperCase();
    const map: Record<string, string> = {
        APROBADO: 'bg-green-100 text-green-700',
        RECHAZADO: 'bg-red-100 text-red-700',
        ANULADO: 'bg-gray-200 text-gray-700',
        'EN PROCESO': 'bg-yellow-100 text-yellow-700',
    };
    const cls = map[st] || 'bg-gray-100 text-gray-700';
    return <span className={`px-2 py-0.5 text-xs rounded ${cls}`}>{st || '—'}</span>;
};

type ProductoItem = {
    nombre?: string;
    sku?: string;
    cantidad?: number;
    qty?: number;
    precio?: number;
    unitPrice?: number;
};

const Pedidos: React.FC = () => {
    // Tabla
    const [rows, setRows] = useState<PedidoDTO[]>([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    // Controles de consulta
    const [clienteId, setClienteId] = useState<string>('');
    const [transaccionId, setTransaccionId] = useState<string>('');
    const [orderBy, setOrderBy] = useState<GetPedidosParams['orderBy']>('creado_en');
    const [orderDir, setOrderDir] = useState<GetPedidosParams['orderDir']>('DESC');

    // Paginación
    const [limit, setLimit] = useState(20);
    const [page, setPage] = useState(1); // 1-based
    const offset = (page - 1) * limit;

    // Modal productos
    const [showModal, setShowModal] = useState(false);
    const [pedidoSel, setPedidoSel] = useState<PedidoDTO | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setErr(null);

            const params: GetPedidosParams = {
                limit,
                offset,
                orderBy,
                orderDir,
            };
            if (clienteId) params.cliente_id = Number(clienteId);
            if (transaccionId) params.transaccion_id = Number(transaccionId);

            const data = await getPedidos(params);
            setRows(data.rows || []);
            setCount(data.count || 0);
        } catch (e: never) {
            setErr(e?.message || 'Error cargando pedidos');
            setRows([]);
            setCount(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit, page, orderBy, orderDir]); // filtros numéricos en botón "Filtrar"

    const handleFiltrar = () => {
        setPage(1);
        fetchData();
    };

    const onChangeEstado = async (row: PedidoDTO, nuevo: string) => {
        // Optimistic UI
        const prev = [...rows];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setRows(rs => rs.map(r => (r.id_pedido === row.id_pedido ? {...r, estado: nuevo} : r)));
        try {
            await updatePedidoEstado(row.id_pedido, nuevo);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
        } catch (e: never) {
            // revertir si falla
            setRows(prev);
            alert(e?.message || 'No se pudo actualizar el estado');
        }
    };

    const columns: Column<PedidoDTO>[] = useMemo(
        () => [
            {header: 'Pedido', accessor: p => p.id_pedido, align: 'center', width: '100px'},
            {header: 'Tipo ID', accessor: p => p.cliente?.tipo_identificacion || '—', align: 'center', width: '100px'},
            {
                header: 'Identificación',
                accessor: p => p.cliente?.identificacion || '—',
                align: 'center',
                width: '140px'
            },
            {header: 'Cliente', accessor: p => p.cliente?.nombre_cliente || '—', align: 'left', width: '240px'},
            {header: 'Email', accessor: p => p.cliente?.email || '—', align: 'left', width: '220px'},
            {header: 'Teléfono', accessor: p => p.cliente?.phone || '—', align: 'center', width: '120px'},
            {header: 'Departamento', accessor: p => p?.departamento || '—', align: 'left', width: '200px'},
            {header: 'Ciudad', accessor: p => p?.ciudad || '—', align: 'left', width: '200px'},
            {header: 'Dirección', accessor: p => p?.direccion_envio || '—', align: 'left', width: '220px'},
            {
                header: 'Total',
                accessor: p => formatCOP(calcularTotalPedido(p.productos)),
                align: 'right',
                width: '140px',
            },
            {
                header: 'Estado Pedido',
                accessor: p => (
                    <select
                        value={p.estado}
                        onChange={e => onChangeEstado(p, e.target.value)}
                        className={`border rounded px-2 py-1 text-sm ${selectColorForEstado(p.estado)}`}
                    >
                        <option value="PAGADO">PAGADO</option>
                        <option value="EN_PREPARACION">EN_PREPARACION</option>
                        <option value="ENVIADO">ENVIADO</option>
                        <option value="CANCELADO">CANCELADO</option>
                    </select>
                ),
                align: 'center',
                width: '190px',
                disableSort: true,
            },
            {
                header: 'Ref. Tx',
                accessor: p => p.transaccion?.referencia ?? '—',
                align: 'center',
                width: '140px',
            },
            {
                header: 'Estado Tx',
                accessor: p => <BadgeTx estado={p.transaccion?.estadoActual?.nombre_estado}/>,
                align: 'center',
                width: '140px',
                disableSort: true,
            },
            {
                header: 'Creado',
                accessor: p => new Date(p.creado_en).toLocaleString('es-CO'),
                align: 'center',
                width: '180px',
            },
            {
                header: 'Productos',
                accessor: p => (
                    <button
                        onClick={() => {
                            setPedidoSel(p);
                            setShowModal(true);
                        }}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 flex items-center gap-1"
                        title="Ver productos del pedido"
                    >
                        <Eye className="w-4 h-4"/>
                        Ver
                    </button>
                ),
                align: 'center',
                width: '110px',
                disableSort: true,
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    return (
        <div className="flex h-screen">
            <Sidebar/>

            <main className="flex-1 p-6 bg-white overflow-x-hidden">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Gestión de Pedidos</h1>
                </div>

                {/* ⬇️ Filtros y orden (no se toca nada de tu bloque) */}
                <div className="mb-4 p-4 bg-gray-50 border rounded flex flex-wrap items-end gap-3">
                    {/*<div>
                        <label className="block text-xs text-gray-600 mb-1">Cliente ID</label>
                        <input
                            type="number"
                            value={clienteId}
                            onChange={(e) => setClienteId(e.target.value)}
                            className="border rounded px-3 py-2 w-40"
                            placeholder="Ej: 123"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Transacción ID</label>
                        <input
                            type="number"
                            value={transaccionId}
                            onChange={(e) => setTransaccionId(e.target.value)}
                            className="border rounded px-3 py-2 w-44"
                            placeholder="Ej: 456"
                        />
                    </div>*/}
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Ordenar por</label>
                        <select
                            value={orderBy}
                            onChange={(e) => setOrderBy(e.target.value as never)}
                            className="border rounded px-3 py-2"
                        >
                            <option value="creado_en">Creado</option>
                            <option value="actualizado_en">Actualizado</option>
                            <option value="id_pedido">ID Pedido</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Dirección</label>
                        <select
                            value={orderDir}
                            onChange={(e) => setOrderDir(e.target.value as never)}
                            className="border rounded px-3 py-2"
                        >
                            <option value="DESC">DESC</option>
                            <option value="ASC">ASC</option>
                        </select>
                    </div>
                    <button
                        onClick={handleFiltrar}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Filtrar
                    </button>

                    <div className="ml-auto flex items-center gap-2">
                        <label className="text-xs text-gray-600">Por página:</label>
                        <select
                            value={limit}
                            onChange={(e) => {
                                setLimit(Number(e.target.value));
                                setPage(1);
                            }}
                            className="border rounded px-2 py-1"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                </div>

                {/* Tabla */}
                <div className="w-full overflow-x-auto">
                    {loading ? (
                        <div className="py-6 text-center text-gray-500">Cargando pedidos…</div>
                    ) : err ? (
                        <div className="px-4 py-3 text-center text-red-600">{err}</div>
                    ) : (
                        <DataTable columns={columns} data={rows}/>
                    )}
                </div>

                {/* Paginación */}
                {!loading && !err && (
                    <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Mostrando {rows.length} de {count} resultados
            </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page <= 1}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Anterior
                            </button>
                            <span className="text-sm text-gray-700">
                Página {page} de {Math.max(1, Math.ceil(count / limit))}
              </span>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                disabled={page >= Math.max(1, Math.ceil(count / limit))}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                )}
            </main>

            {/* Modal Productos */}
            {showModal && pedidoSel && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
                        <div className="flex items-center justify-between px-4 py-3 border-b">
                            <h3 className="text-lg font-semibold">Productos del Pedido #{pedidoSel.id_pedido}</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-700 text-xl"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="p-4 max-h-[70vh] overflow-y-auto">
                            {Array.isArray(pedidoSel.productos) && pedidoSel.productos.length > 0 ? (
                                <table className="w-full text-sm border">
                                    <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border px-2 py-1 text-left">Producto</th>
                                        <th className="border px-2 py-1 text-center">Cantidad</th>
                                        <th className="border px-2 py-1 text-right">Precio</th>
                                        <th className="border px-2 py-1 text-right">Subtotal</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {pedidoSel.productos.map((it: ProductoItem, idx) => {
                                        const qty = it.cantidad ?? it.qty ?? 0;
                                        const unit = it.precio ?? it.unitPrice ?? 0;
                                        return (
                                            <tr key={idx}>
                                                <td className="border px-2 py-1">{it.nombre || '-'}</td>
                                                <td className="border px-2 py-1 text-center">{qty}</td>
                                                <td className="border px-2 py-1 text-right">{formatCOP(unit)}</td>
                                                <td className="border px-2 py-1 text-right">{formatCOP(unit * qty)}</td>
                                            </tr>
                                        );
                                    })}

                                    {/* 🔹 Fila total */}
                                    <tr className="bg-gray-50 font-semibold">
                                        <td colSpan={3} className="border px-2 py-2 text-right">Total</td>
                                        <td className="border px-2 py-2 text-right text-green-700">
                                            {formatCOP(calcularTotalPedido(pedidoSel.productos))}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-gray-600">No hay productos registrados.</p>
                            )}
                        </div>

                        <div className="px-4 py-3 border-t flex justify-end">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pedidos;
