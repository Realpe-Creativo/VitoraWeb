import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import DataTable, { type Column } from '../components/Datatable';
import {
    getTransacciones,
    type TransaccionDTO,
} from '../services/transaccionesApi';

const formatCOP = (n: number) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(n);

const BadgeEstado: React.FC<{ estado: string }> = ({ estado }) => {
    const map: Record<string, string> = {
        APROBADO: 'bg-green-100 text-green-700',
        EN_PROCESO: 'bg-yellow-100 text-yellow-700',
        RECHAZADO: 'bg-red-100 text-red-700',
        ANULADO: 'bg-gray-200 text-gray-700',
    };
    const cls = map[estado] || 'bg-gray-100 text-gray-700';
    return <span className={`px-2 py-0.5 text-xs rounded ${cls}`}>{estado}</span>;
};

const Transacciones: React.FC = () => {
    const [rows, setRows] = useState<TransaccionDTO[]>([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    // Filtros
    const [clienteId, setClienteId] = useState('');
    const [referencia, setReferencia] = useState('');
    const [estado, setEstado] = useState('');
    const [orderBy, setOrderBy] = useState('created_at');
    const [orderDir, setOrderDir] = useState<'ASC' | 'DESC'>('DESC');

    // Paginación
    const [limit, setLimit] = useState(20);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const totalPages = Math.max(1, Math.ceil(count / limit));

    const fetchData = async () => {
        try {
            setLoading(true);
            setErr(null);
            const params = { limit, offset, orderBy, orderDir, cliente_id: clienteId || undefined, referencia, estado };
            const data = await getTransacciones(params);
            setRows(data.rows || []);
            setCount(data.count || 0);
        } catch (e: any) {
            setErr(e?.message || 'Error cargando transacciones');
            setRows([]);
            setCount(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit, page, orderBy, orderDir]);

    const handleFiltrar = () => {
        setPage(1);
        fetchData();
    };

    const columns: Column<TransaccionDTO>[] = useMemo(() => [
        { header: 'ID', accessor: t => t.id_transaccion, align: 'center', width: '100px' },
        { header: 'Referencia', accessor: t => t.referencia, align: 'center', width: '140px' },
        { header: 'ID Wompi', accessor: t => t.id_wompi, align: 'center', width: '240px' },
        /*{
            header: 'Cliente',
            accessor: t => t.cliente?.nombre_cliente || '—',
            align: 'left',
            width: '200px',
        },
        {
            header: 'Email',
            accessor: t => t.cliente?.email || '—',
            align: 'left',
            width: '220px',
        },*/
        {
            header: 'Valor',
            accessor: t => formatCOP(Number(t.valor_de_pago || 0)),
            align: 'right',
            width: '140px',
        },
        {
            header: 'Estado',
            accessor: t => <BadgeEstado estado={t.estadoActual?.nombre_estado || '—'} />,
            align: 'center',
            width: '150px',
            disableSort: true,
        },
        {
            header: 'Fecha Creación',
            accessor: t => new Date(t.estadoActual?.fecha_hora_estado || '—').toLocaleString('es-CO'),
            align: 'center',
            width: '180px',
        },
        /*{
            header: '',
            accessor: t => (
                <button
                    onClick={() => alert(`Detalles de transacción #${t.referencia}`)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded"
                    title="Ver detalles"
                >
                    👁
                </button>
            ),
            align: 'center',
            width: '60px',
            disableSort: true,
            hideHeader: true,
        },*/
    ], []);

    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 p-6 bg-white overflow-x-hidden">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Gestión de Transacciones</h1>
                </div>

                {/* Filtros */}
                <div className="mb-4 p-4 bg-gray-50 border rounded flex flex-wrap items-end gap-3">
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Cliente ID</label>
                        <input
                            type="number"
                            value={clienteId}
                            onChange={(e) => setClienteId(e.target.value)}
                            className="border rounded px-3 py-2 w-40"
                            placeholder="Ej: 1"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Referencia</label>
                        <input
                            type="text"
                            value={referencia}
                            onChange={(e) => setReferencia(e.target.value)}
                            className="border rounded px-3 py-2 w-44"
                            placeholder="Ej: 1000000001"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Estado</label>
                        <select
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            className="border rounded px-3 py-2"
                        >
                            <option value="">Todos</option>
                            <option value="APROBADO">Aprobado</option>
                            <option value="RECHAZADO">Rechazado</option>
                            <option value="EN PROCESO">En proceso</option>
                            <option value="ANULADO">Anulado</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Ordenar por</label>
                        <select
                            value={orderBy}
                            onChange={(e) => setOrderBy(e.target.value)}
                            className="border rounded px-3 py-2"
                        >
                            <option value="created_at">Creado</option>
                            <option value="referencia">Referencia</option>
                            <option value="valor_de_pago">Valor</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Dirección</label>
                        <select
                            value={orderDir}
                            onChange={(e) => setOrderDir(e.target.value as any)}
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
                </div>

                {/* Tabla */}
                <div className="w-full overflow-x-auto">
                    {loading ? (
                        <div className="py-6 text-center text-gray-500">Cargando transacciones…</div>
                    ) : err ? (
                        <div className="px-4 py-3 text-center text-red-600">{err}</div>
                    ) : (
                        <DataTable columns={columns} data={rows} />
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
                Página {page} de {totalPages}
              </span>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page >= totalPages}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Transacciones;
