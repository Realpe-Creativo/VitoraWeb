import { api } from './api';
import { Product } from '../types';

function mapProducto(p: any): Product {
  return {
    id: p.id,
    name: p.nombre,
    short_name: p.nombre_corto,
    price: Number(p.precio),
    discount: Number(p.descuento ?? 0),
    currency: p.moneda as 'COP' | 'USD' | 'EUR',
    category: p.categoria,
    description: p.descripcion,
    images: { ...p.imagenes, videos: p.imagenes?.videos || [] },
    variants: (p.variantes || []).map((v: any) => ({
      sku: v.sku,
      name: v.nombre,
      size: v.talla || undefined,
      price: v.precio_variante != null ? Number(v.precio_variante) : undefined,
    })),
    benefits: p.beneficios ?? undefined,
    benefitsGroups: p.grupos_beneficios ?? undefined,
    faqs: (p.faqs || []).map((f: any) => ({
      question: f.pregunta,
      answer: f.respuesta,
    })),
    extraSections: (p.secciones_extra || []).map((s: any) => ({
      title: s.titulo,
      content: s.contenido,
    })),
    icons: p.iconos || [],
    alsoInterestedIds: p.ids_relacionados || [],
    shorts: (p.shorts || []).map((s: any) => s.url),
  };
}

const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem('token') || ''}` });

export const getProductos = async (): Promise<Product[]> => {
  const { data } = await api.get('/productos?activo=true');
  return (data as any[]).map(mapProducto);
};

export const getProductosAdmin = async (): Promise<Product[]> => {
  const { data } = await api.get('/productos');
  return (data as any[]).map(mapProducto);
};

export const getProductoById = async (id: string): Promise<Product> => {
  const { data } = await api.get(`/productos/${id}`);
  return mapProducto(data);
};

export const createProducto = async (payload: any): Promise<Product> => {
  const { data } = await api.post('/productos', payload, { headers: authHeader() });
  return mapProducto(data);
};

export const updateProducto = async (id: string, payload: any): Promise<Product> => {
  const { data } = await api.put(`/productos/${id}`, payload, { headers: authHeader() });
  return mapProducto(data);
};

export const deleteProducto = async (id: string): Promise<void> => {
  await api.delete(`/productos/${id}`, { headers: authHeader() });
};

export const uploadImagen = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post('/upload', formData, {
    headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' }
  });
  return data.url as string;
};
