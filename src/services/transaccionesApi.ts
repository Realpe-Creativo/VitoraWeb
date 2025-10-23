// src/services/transaccionesApi.ts
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const API_BASE = import.meta.env.VITE_API_BASE_URL as string;
const TOKEN_KEY = 'token';

export type GetTransaccionesParams = {
    limit?: number;
    offset?: number;
    orderBy?: 'created_at' | 'referencia' | 'valor_de_pago' | 'id_transaccion' | string;
    orderDir?: 'ASC' | 'DESC';
    cliente_id?: number;
    referencia?: string | number;
    estado?: 'APROBADO' | 'RECHAZADO' | 'EN PROCESO' | 'ANULADO' | string;
};

export type ClienteDTO = {
    id: number;
    nombre_cliente: string;
    identificacion: string;
    tipo_identificacion: string;
    email?: string | null;
    phone?: string | null;
};

export type EstadoTransaccionDTO = {
    id_estado: number;
    id_transaccion: number;
    nombre_estado: string;         // APROBADO | RECHAZADO | EN PROCESO | ANULADO | ...
    fecha_hora_estado: string;     // ISO
};

export type TransaccionDTO = {
    id_transaccion: number;
    referencia: number | string;
    id_wompi?: string | null;
    valor_de_pago: string | number; // puede venir decimal(string) o number
    estadoActual?: EstadoTransaccionDTO | null;
    cliente?: ClienteDTO | null;
};

export type GetTransaccionesResponse = {
    rows: TransaccionDTO[];
    count: number;
};

function authHeaders() {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getTransacciones(
    params: GetTransaccionesParams = {}
): Promise<GetTransaccionesResponse> {
    // Construimos querystring ignorando undefined / null / ''.
    const qs = new URLSearchParams(
        Object.entries(params).reduce((acc, [k, v]) => {
            if (v !== undefined && v !== null && v !== '') acc[k] = String(v);
            return acc;
        }, {} as Record<string, string>)
    ).toString();

    const url = `${API_BASE}/transacciones${qs ? `?${qs}` : ''}`;
    console.log(url);
    const { data } = await axios.get(url, {
        headers: {
            ...authHeaders(),
        },
    });

    // Esperamos { rows, count } desde el backend
    return data as GetTransaccionesResponse;
}
