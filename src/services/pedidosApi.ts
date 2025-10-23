// src/services/pedidosApi.ts
import axios from 'axios';

export type ProductoItem = {
    id?: string;
    sku?: string;
    nombre?: string;
    cantidad: number;
    precio: number;     // unitario
    moneda?: string;    // 'COP' por defecto
    imagen?: string;
};

export type ClienteLite = {
    id: number;
    nombre_cliente: string;
    identificacion: string;
    tipo_identificacion: string;
    email?: string;
    phone?: string;
    departamento?: string;
    ciudad?: string;
    direccion_envio?: string;
};

export type EstadoTransaccionLite = {
    id_estado: number;
    nombre_estado: string;
    fecha_hora_estado: string;
};

export type TransaccionLite = {
    id_transaccion: number;
    referencia: number | string;
    valor_de_pago: string | number;
    id_wompi?: string | null;
    estadoActual?: EstadoTransaccionLite | null;
};

export type PedidoDTO = {
    id_pedido: number;
    cliente_id: number;
    transaccion_id?: number | null;
    productos: ProductoItem[];    // JSONB
    estado: 'INICIADO' | 'PAGO_PENDIENTE' | 'PAGADO' | 'EN_PREPARACION' | 'ENVIADO' | 'CANCELADO';
    departamento?: string | null;
    ciudad?: string | null;
    direccion_envio?: string | null;
    notas?: string | null;
    creado_en: string;
    actualizado_en: string;
    cliente?: ClienteLite;
    transaccion?: TransaccionLite | null;
};

export type GetPedidosParams = {
    cliente_id?: number;
    transaccion_id?: number;
    limit?: number;
    offset?: number;
    orderBy?: 'creado_en' | 'actualizado_en' | 'id_pedido';
    orderDir?: 'ASC' | 'DESC';
};

export type GetPedidosResponse = {
    count: number;
    rows: PedidoDTO[];
    limit: number;
    offset: number;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

export async function getPedidos(params: GetPedidosParams = {}): Promise<GetPedidosResponse> {
    // Armar query string
    const qs = new URLSearchParams(
        Object.entries(params).reduce((acc, [k, v]) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (v !== undefined && v !== null && v !== '') acc[k] = String(v);
            return acc;
        }, {} as Record<string, string>)
    ).toString();

    const url = `${API_BASE}/pedidos${qs ? `?${qs}` : ''}`;

    // Leer token desde localStorage
    const token = localStorage.getItem('token');

    
    try {
        const { data } = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
        });
        return data;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
    } catch (error: never) {
        if (error.response?.status === 401) {
            // Manejo básico de sesión expirada
            localStorage.removeItem('token');
            window.location.href = '/admin/login';
        }
        throw error;
    }
}

export function calcularTotalPedido(productos: ProductoItem[] = []): number {
    return productos.reduce((acc, it) => acc + Number(it.precio || 0) * Number(it.cantidad || 0), 0);
}

export async function updatePedidoEstado(id_pedido: number, estado: string) {
    const token = localStorage.getItem('token');
    const url = `${API_BASE}/pedidos/${id_pedido}/estado`;
    const { data } = await axios.put(
        url,
        { estado },
        {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            }
        }
    );
    return data;
}
