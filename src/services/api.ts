import axios from 'axios';

// 1) Tomamos la variable de entorno (en Vite estará en import.meta.env.VITE_API_BASE_URL)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

export const api = axios.create({
    baseURL,
});

// ----------------- Tipos -----------------
export interface Debt {
    id: string;
    amount: number;
    date: string;
    concept: string;
    paymentUrl: string;
}

export interface DebtResponse {
    hasDebt: boolean;
    debt?: Debt;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

// Tipo para crear una orden de pago
export interface CreateOrderPayload {
    cliente_id: string;
    forma_cargue: string;
    valor_a_pagar: number;
    valor_parcial: number;
    fecha_vencimiento: string;
    tipo_identificacion: string;
    nombre_cliente: string;
}

// Tipo para actualizar una orden de pago
export interface UpdateOrderPayload {
    cliente_id: string;
    forma_cargue: string;
    valor_a_pagar: number;
    valor_parcial: number;
    fecha_vencimiento: string;
}

// Tipo que devuelve la API al crear/obtener una orden
export interface Order {
    order_id: number;
    cliente_id: string;
    forma_cargue: string;
    valor_a_pagar: number;
    valor_parcial: number;
    fecha_vencimiento: string;
}

// Resultado de carga masiva de órdenes
export interface BulkResult {
    created: number;
    errors: string[];
}

export interface CreateClientePayload {
    nombre_cliente: string;
    identificacion: string;
    tipo_identificacion: string;
}

export interface UpdateClientePayload {
    nombre_cliente: string;
    identificacion: string;
    tipo_identificacion: string;
}

export interface Cliente {
    id: string;
    nombre_cliente: string;
    identificacion: string;
    tipo_identificacion: string;
}

export interface SearchOrdersPayload {
    tipo_identificacion: string;
    identificacion: string;
    proceso: string;
}

// Tipado del usuario
export interface Usuario {
    id: string;
    nombre: string;
    email: string;
    rol: string;
    createdAt: string;
}

// Payload para creación de usuario
export interface CreateUsuarioPayload {
    nombre: string;
    email: string;
    rol: string;
    password: string;
}

export interface EstadoTransaccionResponse {
    message: string;
    nuevo_estado?: string;
    estado?: string;
    valor_de_pago?: number;
}

//Payload para la creación de una transacción
export interface CreateTransaccionPayload {
    valor_de_pago: number;
    id_orden_pago: number;
    estado_inicial: string;
    document_type: string;
    document_number: string;
    name1: string;
    last_name1: string;
    email: string;
    phone: string;
    cell_phone: string;
    address: string;
    state: string;
    city: string;
    medio_pago: string;
}

export interface TransaccionResponse {
    referencia: number;
    url_pasarela: string;
    res_cod: string;
}

export interface Transaccion {
    id_transaccion: number;
    referencia: string;
    valor_de_pago: number;
    createdAt: string;
    estadoActual?: {
        id_estado: number;
        nombre_estado: string;
        fecha_hora_estado: string;
    };
    estados?: {
        id_estado: number;
        nombre_estado: string;
        fecha_hora_estado: string;
    }[];
}


// ----------------- Funciones para Órdenes -----------------

export const login = async (
    credentials: LoginCredentials
): Promise<LoginResponse> => {
    const { data } = await api.post('/auth/login', credentials);
    return data;
};

export const createOrder = async (
    payload: CreateOrderPayload
): Promise<Order> => {
    console.log(JSON.stringify(payload, null, 2));
    const token = localStorage.getItem('token') || '';
    const { data } = await api.post<Order>('/ordenes-pago', payload, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export const updateOrder = async (
    id: string,
    payload: UpdateOrderPayload
): Promise<Order> => {
    const token = localStorage.getItem('token') || '';
    const { data } = await api.put<Order>(`/ordenes-pago/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export const uploadOrdersBulk = async (file: File): Promise<BulkResult> => {
    const token = localStorage.getItem('token') || '';
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.post<BulkResult>(
        '/ordenes-pago/bulk',
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return data;
};

/**
 * Crea un nuevo Cliente
 */
export const createCliente = async (
    payload: CreateClientePayload
): Promise<Cliente> => {
    const token = localStorage.getItem('token') || '';
    const { data } = await api.post<Cliente>(
        '/clientes',
        payload,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return data;
};

/**
 * Actualiza un Cliente existente
 */
export const updateCliente = async (
    id: string,
    payload: UpdateClientePayload
): Promise<Cliente> => {
    const token = localStorage.getItem('token') || '';
    const { data } = await api.put<Cliente>(
        `/clientes/${id}`,
        payload,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return data;
};

export const searchOrders = async (
    payload: SearchOrdersPayload
): Promise<Order[]> => {
    // Este endpoint es público, no necesita token:
    const { data } = await api.post<Order[]>('/ordenes-pago/search', payload);
    return data;
};

// Obtener todos los usuarios
export const getUsuarios = async (): Promise<Usuario[]> => {
    const token = localStorage.getItem('token') || '';
    const { data } = await api.get<Usuario[]>('/usuarios', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};

// Crear un nuevo usuario
export const createUsuario = async (
    payload: CreateUsuarioPayload
): Promise<Usuario> => {
    console.log("petición", payload)
    const token = localStorage.getItem('token') || '';
    const { data } = await api.post<Usuario>('/usuarios', payload, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};

export const clienteById = async (id: string) => {
    const token = localStorage.getItem('token') || '';
    const { data } = await axios.get(`/clientes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};


export const createTransaccion = async (
    payload: CreateTransaccionPayload
): Promise<TransaccionResponse> => {
    const token = localStorage.getItem('token') || '';
    const { data } = await api.post<TransaccionResponse>('/transacciones', payload, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};

export const consultarEstadoTransaccion = async (
    referencia: string | number
): Promise<EstadoTransaccionResponse> => {
    const { data } = await api.post<EstadoTransaccionResponse>(
        '/transacciones/consultar-estado',
        { referencia }
    );
    return data;
};

export const getTransaccionesByOrden = async (
    orderId: number
): Promise<Transaccion[]> => {
    const token = localStorage.getItem('token') || '';
    const { data } = await api.post<Transaccion[]>(
        '/transacciones/byOrder',
        { order_id: orderId },
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return data;
};