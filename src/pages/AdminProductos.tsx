import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import {
  getProductosAdmin,
  createProducto,
  updateProducto,
  deleteProducto,
  uploadImagen,
} from '../services/productosService';
import { Product } from '../types';

// ─── Types ────────────────────────────────────────────────────────────────────

type FormImg = { main: string; hover: string; gallery: string[]; videos: string[]; miniBanner: string; url_img: string };
type FV = { sku: string; nombre: string; talla: string; precio_variante: string };
type FF = { pregunta: string; respuesta: string };
type FS = { titulo: string; contenido: string };
type FG = { title: string; items: string[] };

interface PForm {
  id: string; nombre: string; nombre_corto: string; precio: string; descuento: string;
  moneda: string; categoria: string; descripcion: string; activo: boolean; orden: string;
  imagenes: FormImg;
  beneficiosTipo: 'simple' | 'grupos';
  beneficiosSimple: string[];
  beneficiosGrupos: FG[];
  ids_relacionados: string[];
  variantes: FV[];
  faqs: FF[];
  secciones_extra: FS[];
  shorts: string[];
}

const EMPTY_IMG: FormImg = { main: '', hover: '', gallery: [], videos: [], miniBanner: '', url_img: '' };

const EMPTY: PForm = {
  id: '', nombre: '', nombre_corto: '', precio: '0', descuento: '0', moneda: 'COP',
  categoria: '', descripcion: '', activo: true, orden: '0',
  imagenes: { ...EMPTY_IMG },
  beneficiosTipo: 'simple', beneficiosSimple: [], beneficiosGrupos: [],
  ids_relacionados: [], variantes: [], faqs: [], secciones_extra: [], shorts: [],
};

function toForm(p: Product & any): PForm {
  const hasGroups = Array.isArray(p.benefitsGroups) && p.benefitsGroups.length > 0;
  return {
    id: p.id,
    nombre: p.name,
    nombre_corto: p.short_name,
    precio: String(p.price),
    descuento: String(p.discount ?? 0),
    moneda: p.currency || 'COP',
    categoria: p.category || '',
    descripcion: p.description || '',
    activo: p.activo ?? true,
    orden: String(p.orden ?? 0),
    imagenes: p.images ? { ...EMPTY_IMG, ...p.images, videos: p.images.videos || [] } : { ...EMPTY_IMG },
    beneficiosTipo: hasGroups ? 'grupos' : 'simple',
    beneficiosSimple: p.benefits || [],
    beneficiosGrupos: p.benefitsGroups || [],
    ids_relacionados: p.alsoInterestedIds || [],
    variantes: (p.variants || []).map((v: any) => ({
      sku: v.sku || '', nombre: v.name || '', talla: v.size || '',
      precio_variante: v.price != null ? String(v.price) : '',
    })),
    faqs: (p.faqs || []).map((f: any) => ({ pregunta: f.question || '', respuesta: f.answer || '' })),
    secciones_extra: (p.extraSections || []).map((s: any) => ({ titulo: s.title || '', contenido: s.content || '' })),
    shorts: p.shorts || [],
  };
}

function toPayload(f: PForm, isCreate: boolean) {
  return {
    ...(isCreate ? { id: f.id } : {}),
    nombre: f.nombre, nombre_corto: f.nombre_corto,
    precio: Number(f.precio), descuento: Math.min(100, Math.max(0, Number(f.descuento) || 0)), moneda: f.moneda,
    categoria: f.categoria, descripcion: f.descripcion,
    activo: f.activo, orden: Number(f.orden),
    imagenes: f.imagenes,
    beneficios: f.beneficiosTipo === 'simple' && f.beneficiosSimple.length ? f.beneficiosSimple : null,
    grupos_beneficios: f.beneficiosTipo === 'grupos' && f.beneficiosGrupos.length ? f.beneficiosGrupos : null,
    ids_relacionados: f.ids_relacionados,
    variantes: f.variantes.map(v => ({ ...v, precio_variante: v.precio_variante ? Number(v.precio_variante) : null })),
    faqs: f.faqs,
    secciones_extra: f.secciones_extra,
    shorts: f.shorts,
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ImageField({ label, value, uploading, onChange, onFile }: {
  label: string; value: string; uploading: boolean;
  onChange: (u: string) => void; onFile: (f: File) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div>
      <p className="text-xs font-medium text-gray-600 mb-1">{label}</p>
      <div className="flex gap-3 items-start">
        <div className="w-24 h-24 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden flex-shrink-0 flex items-center justify-center">
          {value ? (
            <img src={value} alt={label} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-300 text-xs text-center px-1">Sin imagen</span>
          )}
        </div>
        <div className="flex-1 space-y-1">
          <input
            type="text" value={value} onChange={e => onChange(e.target.value)}
            placeholder="https://..."
            className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9acd65]"
          />
          <button
            type="button" disabled={uploading}
            onClick={() => ref.current?.click()}
            className="text-xs px-3 py-1.5 bg-[#9acd65] text-white rounded-lg hover:bg-[#8bc34a] disabled:opacity-50"
          >
            {uploading ? 'Subiendo…' : 'Subir archivo'}
          </button>
          <input ref={ref} type="file" accept="image/*" hidden
            onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f); e.target.value = ''; }}
          />
        </div>
      </div>
    </div>
  );
}

const TABS = ['Básico', 'Imágenes', 'Variantes', 'Beneficios', 'FAQs', 'Secciones extra', 'Shorts', 'Relacionados'];

// ─── Main component ───────────────────────────────────────────────────────────

export default function AdminProductos() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<(Product & any)[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState<PForm>({ ...EMPTY });
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const notify = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/admin/login');
  }, [navigate]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setProducts(await getProductosAdmin());
    } catch { notify('Error cargando productos', false); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => {
    setForm({ ...EMPTY, imagenes: { ...EMPTY_IMG } });
    setEditingId(null);
    setTab(0);
    setIsOpen(true);
  };

  const openEdit = (p: Product & any) => {
    setForm(toForm(p));
    setEditingId(p.id);
    setTab(0);
    setIsOpen(true);
  };

  const set = (k: keyof PForm, v: any) => setForm(prev => ({ ...prev, [k]: v }));
  const setImg = (k: keyof FormImg, v: string) =>
    setForm(prev => ({ ...prev, imagenes: { ...prev.imagenes, [k]: v } }));

  const handleUpload = async (field: keyof FormImg, file: File) => {
    setUploadingField(field);
    try {
      const url = await uploadImagen(file);
      setImg(field, url);
    } catch { notify('Error subiendo imagen', false); }
    finally { setUploadingField(null); }
  };

  const handleGalleryUpload = async (file: File) => {
    setUploadingField('gallery');
    try {
      const url = await uploadImagen(file);
      setForm(prev => ({ ...prev, imagenes: { ...prev.imagenes, gallery: [...prev.imagenes.gallery, url] } }));
    } catch { notify('Error subiendo imagen', false); }
    finally { setUploadingField(null); }
  };

  const handleSave = async () => {
    if (!form.nombre.trim()) { notify('El nombre es obligatorio', false); return; }
    setSaving(true);
    try {
      if (editingId) {
        await updateProducto(editingId, toPayload(form, false));
        notify('Producto actualizado');
      } else {
        await createProducto(toPayload(form, true));
        notify('Producto creado');
      }
      setIsOpen(false);
      await load();
    } catch (e: any) {
      notify(e?.response?.data?.error || 'Error guardando producto', false);
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Eliminar este producto? Esta acción no se puede deshacer.')) return;
    setDeletingId(id);
    try {
      await deleteProducto(id);
      notify('Producto eliminado');
      await load();
    } catch { notify('Error eliminando producto', false); }
    finally { setDeletingId(null); }
  };

  // ── Array helpers ──
  const arrAdd = <T,>(k: keyof PForm, item: T) =>
    setForm(prev => ({ ...prev, [k]: [...(prev[k] as T[]), item] }));
  const arrRemove = (k: keyof PForm, i: number) =>
    setForm(prev => ({ ...prev, [k]: (prev[k] as any[]).filter((_, j) => j !== i) }));
  const arrUpdate = (k: keyof PForm, i: number, patch: any) =>
    setForm(prev => ({
      ...prev,
      [k]: (prev[k] as any[]).map((item, j) => j === i ? { ...item, ...patch } : item)
    }));

  // ── Benefit simple helpers ──
  const addSimple = () => set('beneficiosSimple', [...form.beneficiosSimple, '']);
  const updateSimple = (i: number, v: string) =>
    set('beneficiosSimple', form.beneficiosSimple.map((s, j) => j === i ? v : s));
  const removeSimple = (i: number) =>
    set('beneficiosSimple', form.beneficiosSimple.filter((_, j) => j !== i));

  // ── Benefit grupo helpers ──
  const addGrupo = () => set('beneficiosGrupos', [...form.beneficiosGrupos, { title: '', items: [''] }]);
  const updateGrupoTitle = (i: number, v: string) =>
    set('beneficiosGrupos', form.beneficiosGrupos.map((g, j) => j === i ? { ...g, title: v } : g));
  const removeGrupo = (i: number) =>
    set('beneficiosGrupos', form.beneficiosGrupos.filter((_, j) => j !== i));
  const addGrupoItem = (gi: number) =>
    set('beneficiosGrupos', form.beneficiosGrupos.map((g, j) =>
      j === gi ? { ...g, items: [...g.items, ''] } : g));
  const updateGrupoItem = (gi: number, ii: number, v: string) =>
    set('beneficiosGrupos', form.beneficiosGrupos.map((g, j) =>
      j === gi ? { ...g, items: g.items.map((it, k) => k === ii ? v : it) } : g));
  const removeGrupoItem = (gi: number, ii: number) =>
    set('beneficiosGrupos', form.beneficiosGrupos.map((g, j) =>
      j === gi ? { ...g, items: g.items.filter((_, k) => k !== ii) } : g));

  const toggleRelacionado = (id: string) =>
    set('ids_relacionados', form.ids_relacionados.includes(id)
      ? form.ids_relacionados.filter(x => x !== id)
      : [...form.ids_relacionados, id]);

  // ── Shared input style ──
  const inp = 'w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9acd65]';
  const btnGreen = 'text-xs px-3 py-1.5 bg-[#9acd65] text-white rounded-lg hover:bg-[#8bc34a]';
  const btnGray = 'text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200';
  const btnRed = 'text-xs px-2 py-1 text-red-500 hover:text-red-700';
  const label = 'block text-xs font-medium text-gray-600 mb-1';

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
          <button onClick={openCreate}
            className="px-4 py-2 bg-[#9acd65] text-white rounded-lg font-semibold hover:bg-[#8bc34a] text-sm">
            + Nuevo producto
          </button>
        </div>

        {/* Toast */}
        {toast && (
          <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-sm text-white ${toast.ok ? 'bg-green-600' : 'bg-red-600'}`}>
            {toast.msg}
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#9acd65] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Imagen</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Nombre</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Precio</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Categoría</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Activo</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-10 text-gray-400">No hay productos</td></tr>
                )}
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {p.images?.main ? (
                        <img src={p.images.main} alt={p.name}
                          className="w-12 h-12 object-cover rounded-lg border border-gray-200" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-gray-300 text-xs">N/A</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{p.name}</p>
                      <p className="text-gray-400 text-xs">ID: {p.id}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {Number(p.price).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{p.category || '—'}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${p.activo !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {p.activo !== false ? 'Sí' : 'No'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => openEdit(p)}
                          className="px-3 py-1.5 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 font-medium">
                          Editar
                        </button>
                        <button onClick={() => handleDelete(p.id)}
                          disabled={deletingId === p.id}
                          className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium disabled:opacity-50">
                          {deletingId === p.id ? '…' : 'Eliminar'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* ─── Modal ─── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => !saving && setIsOpen(false)} />
          <div className="relative m-auto w-full max-w-4xl max-h-[95vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">
                {editingId ? `Editar producto (${editingId})` : 'Nuevo producto'}
              </h2>
              <button onClick={() => setIsOpen(false)} disabled={saving}
                className="text-gray-400 hover:text-gray-700 text-2xl leading-none">×</button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 overflow-x-auto flex-shrink-0">
              {TABS.map((t, i) => (
                <button key={t} onClick={() => setTab(i)}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${tab === i
                    ? 'border-[#9acd65] text-[#7fb448]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                  {t}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">

              {/* ── TAB: Básico ── */}
              {tab === 0 && (
                <>
                  {!editingId && (
                    <div>
                      <label className={label}>ID del producto *</label>
                      <input className={inp} value={form.id} onChange={e => set('id', e.target.value)}
                        placeholder="ej: 7" />
                      <p className="text-xs text-gray-400 mt-1">Debe ser único. Aparece en la URL del producto.</p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={label}>Nombre completo *</label>
                      <input className={inp} value={form.nombre} onChange={e => set('nombre', e.target.value)} />
                    </div>
                    <div>
                      <label className={label}>Nombre corto *</label>
                      <input className={inp} value={form.nombre_corto} onChange={e => set('nombre_corto', e.target.value)} />
                    </div>
                    <div>
                      <label className={label}>Precio base (COP)</label>
                      <input type="number" min="0" className={inp} value={form.precio} onChange={e => set('precio', e.target.value)} />
                    </div>
                    <div>
                      <label className={label}>Descuento (%)</label>
                      <input
                        type="number" min="0" max="100" className={inp}
                        value={form.descuento} onChange={e => set('descuento', e.target.value)}
                        placeholder="0"
                      />
                      {Number(form.descuento) > 0 && Number(form.precio) > 0 && (
                        <p className="text-xs text-green-700 mt-1">
                          Precio final: ${Math.round(Number(form.precio) * (1 - Number(form.descuento) / 100)).toLocaleString('es-CO')} COP
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={label}>Moneda</label>
                      <select className={inp} value={form.moneda} onChange={e => set('moneda', e.target.value)}>
                        <option value="COP">COP</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </div>
                    <div>
                      <label className={label}>Categoría</label>
                      <input className={inp} value={form.categoria} onChange={e => set('categoria', e.target.value)} />
                    </div>
                    <div>
                      <label className={label}>Orden</label>
                      <input type="number" className={inp} value={form.orden} onChange={e => set('orden', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className={label}>Descripción (HTML permitido)</label>
                    <textarea rows={5} className={inp} value={form.descripcion}
                      onChange={e => set('descripcion', e.target.value)} />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.activo} onChange={e => set('activo', e.target.checked)}
                      className="w-4 h-4 accent-[#9acd65]" />
                    <span className="text-sm text-gray-700">Producto activo (visible en la tienda)</span>
                  </label>
                </>
              )}

              {/* ── TAB: Imágenes ── */}
              {tab === 1 && (
                <div className="space-y-6">
                  <ImageField label="Imagen principal"
                    value={form.imagenes.main} uploading={uploadingField === 'main'}
                    onChange={v => setImg('main', v)} onFile={f => handleUpload('main', f)} />
                  <ImageField label="Imagen hover"
                    value={form.imagenes.hover} uploading={uploadingField === 'hover'}
                    onChange={v => setImg('hover', v)} onFile={f => handleUpload('hover', f)} />
                  <ImageField label="Mini banner"
                    value={form.imagenes.miniBanner} uploading={uploadingField === 'miniBanner'}
                    onChange={v => setImg('miniBanner', v)} onFile={f => handleUpload('miniBanner', f)} />
                  <div>
                    <label className={label}>URL imagen Cloudinary (url_img)</label>
                    <input className={inp} value={form.imagenes.url_img}
                      onChange={e => setImg('url_img', e.target.value)} placeholder="https://res.cloudinary.com/…" />
                  </div>

                  {/* Gallery */}
                  <div>
                    <label className={label}>Galería de imágenes</label>
                    <div className="flex flex-wrap gap-3 mt-2">
                      {form.imagenes.gallery.map((url, i) => (
                        <div key={i} className="relative w-24 h-24">
                          <img src={url} alt={`gallery-${i}`}
                            className="w-full h-full object-cover rounded-lg border border-gray-200" />
                          <button onClick={() => setForm(prev => ({ ...prev, imagenes: { ...prev.imagenes, gallery: prev.imagenes.gallery.filter((_, j) => j !== i) } }))}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs leading-none flex items-center justify-center">
                            ×
                          </button>
                        </div>
                      ))}
                      <label className={`w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#9acd65] transition-colors ${uploadingField === 'gallery' ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {uploadingField === 'gallery' ? (
                          <div className="w-5 h-5 border-2 border-[#9acd65] border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <span className="text-gray-400 text-2xl">+</span>
                            <span className="text-gray-400 text-xs">Agregar</span>
                          </>
                        )}
                        <input type="file" accept="image/*" hidden disabled={uploadingField === 'gallery'}
                          onChange={e => { const f = e.target.files?.[0]; if (f) handleGalleryUpload(f); e.target.value = ''; }} />
                      </label>
                    </div>
                  </div>

                  {/* Videos */}
                  <div>
                    <label className={label}>Videos del producto (YouTube)</label>
                    <div className="space-y-2 mt-2">
                      {form.imagenes.videos.map((url, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <input
                            className={`${inp} flex-1`}
                            value={url}
                            onChange={e => setForm(prev => ({
                              ...prev,
                              imagenes: { ...prev.imagenes, videos: prev.imagenes.videos.map((v, j) => j === i ? e.target.value : v) }
                            }))}
                            placeholder="https://www.youtube.com/watch?v=..."
                          />
                          <button
                            type="button"
                            onClick={() => setForm(prev => ({ ...prev, imagenes: { ...prev.imagenes, videos: prev.imagenes.videos.filter((_, j) => j !== i) } }))}
                            className="text-red-500 hover:text-red-700 text-lg leading-none px-1"
                          >×</button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, imagenes: { ...prev.imagenes, videos: [...prev.imagenes.videos, ''] } }))}
                        className={btnGreen}
                      >+ Agregar video</button>
                    </div>
                  </div>
                </div>
              )}

              {/* ── TAB: Variantes ── */}
              {tab === 2 && (
                <div className="space-y-3">
                  {form.variantes.map((v, i) => (
                    <div key={i} className="grid grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg relative">
                      <div><label className={label}>SKU</label><input className={inp} value={v.sku} onChange={e => arrUpdate('variantes', i, { sku: e.target.value })} /></div>
                      <div><label className={label}>Nombre</label><input className={inp} value={v.nombre} onChange={e => arrUpdate('variantes', i, { nombre: e.target.value })} /></div>
                      <div><label className={label}>Talla</label><input className={inp} value={v.talla} onChange={e => arrUpdate('variantes', i, { talla: e.target.value })} /></div>
                      <div><label className={label}>Precio variante</label><input type="number" className={inp} value={v.precio_variante} onChange={e => arrUpdate('variantes', i, { precio_variante: e.target.value })} /></div>
                      <button onClick={() => arrRemove('variantes', i)} className={`${btnRed} absolute top-2 right-2`}>✕</button>
                    </div>
                  ))}
                  <button onClick={() => arrAdd('variantes', { sku: '', nombre: '', talla: '', precio_variante: '' })} className={btnGreen}>
                    + Agregar variante
                  </button>
                </div>
              )}

              {/* ── TAB: Beneficios ── */}
              {tab === 3 && (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    {(['simple', 'grupos'] as const).map(t => (
                      <button key={t} onClick={() => set('beneficiosTipo', t)}
                        className={`px-4 py-2 text-sm rounded-lg font-medium border ${form.beneficiosTipo === t ? 'bg-[#9acd65] text-white border-[#9acd65]' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}>
                        {t === 'simple' ? 'Lista simple' : 'Por grupos'}
                      </button>
                    ))}
                  </div>

                  {form.beneficiosTipo === 'simple' && (
                    <div className="space-y-2">
                      {form.beneficiosSimple.map((b, i) => (
                        <div key={i} className="flex gap-2">
                          <input className={`${inp} flex-1`} value={b} onChange={e => updateSimple(i, e.target.value)} placeholder="Beneficio…" />
                          <button onClick={() => removeSimple(i)} className={btnRed}>✕</button>
                        </div>
                      ))}
                      <button onClick={addSimple} className={btnGreen}>+ Agregar beneficio</button>
                    </div>
                  )}

                  {form.beneficiosTipo === 'grupos' && (
                    <div className="space-y-4">
                      {form.beneficiosGrupos.map((g, gi) => (
                        <div key={gi} className="p-4 bg-gray-50 rounded-xl space-y-3">
                          <div className="flex gap-2">
                            <input className={`${inp} flex-1`} value={g.title} onChange={e => updateGrupoTitle(gi, e.target.value)} placeholder="Título del grupo…" />
                            <button onClick={() => removeGrupo(gi)} className={btnRed}>✕</button>
                          </div>
                          {g.items.map((it, ii) => (
                            <div key={ii} className="flex gap-2 pl-4">
                              <input className={`${inp} flex-1`} value={it} onChange={e => updateGrupoItem(gi, ii, e.target.value)} placeholder="Ítem…" />
                              <button onClick={() => removeGrupoItem(gi, ii)} className={btnRed}>✕</button>
                            </div>
                          ))}
                          <button onClick={() => addGrupoItem(gi)} className={`${btnGray} ml-4`}>+ Ítem</button>
                        </div>
                      ))}
                      <button onClick={addGrupo} className={btnGreen}>+ Agregar grupo</button>
                    </div>
                  )}
                </div>
              )}

              {/* ── TAB: FAQs ── */}
              {tab === 4 && (
                <div className="space-y-3">
                  {form.faqs.map((f, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-xl space-y-2 relative">
                      <button onClick={() => arrRemove('faqs', i)} className={`${btnRed} absolute top-2 right-2`}>✕</button>
                      <div><label className={label}>Pregunta</label><input className={inp} value={f.pregunta} onChange={e => arrUpdate('faqs', i, { pregunta: e.target.value })} /></div>
                      <div><label className={label}>Respuesta</label><textarea rows={2} className={inp} value={f.respuesta} onChange={e => arrUpdate('faqs', i, { respuesta: e.target.value })} /></div>
                    </div>
                  ))}
                  <button onClick={() => arrAdd('faqs', { pregunta: '', respuesta: '' })} className={btnGreen}>+ Agregar FAQ</button>
                </div>
              )}

              {/* ── TAB: Secciones extra ── */}
              {tab === 5 && (
                <div className="space-y-3">
                  {form.secciones_extra.map((s, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-xl space-y-2 relative">
                      <button onClick={() => arrRemove('secciones_extra', i)} className={`${btnRed} absolute top-2 right-2`}>✕</button>
                      <div><label className={label}>Título</label><input className={inp} value={s.titulo} onChange={e => arrUpdate('secciones_extra', i, { titulo: e.target.value })} /></div>
                      <div><label className={label}>Contenido (HTML permitido)</label><textarea rows={4} className={inp} value={s.contenido} onChange={e => arrUpdate('secciones_extra', i, { contenido: e.target.value })} /></div>
                    </div>
                  ))}
                  <button onClick={() => arrAdd('secciones_extra', { titulo: '', contenido: '' })} className={btnGreen}>+ Agregar sección</button>
                </div>
              )}

              {/* ── TAB: Shorts ── */}
              {tab === 6 && (
                <div className="space-y-2">
                  {form.shorts.map((url, i) => (
                    <div key={i} className="flex gap-2">
                      <input className={`${inp} flex-1`} value={url}
                        onChange={e => set('shorts', form.shorts.map((s, j) => j === i ? e.target.value : s))}
                        placeholder="https://youtube.com/shorts/…" />
                      <button onClick={() => set('shorts', form.shorts.filter((_, j) => j !== i))} className={btnRed}>✕</button>
                    </div>
                  ))}
                  <button onClick={() => set('shorts', [...form.shorts, ''])} className={btnGreen}>+ Agregar Short</button>
                </div>
              )}

              {/* ── TAB: Relacionados ── */}
              {tab === 7 && (
                <div>
                  <p className="text-sm text-gray-500 mb-4">Selecciona los productos relacionados que aparecerán en la sección "También te puede interesar".</p>
                  <div className="grid grid-cols-2 gap-3">
                    {products.filter(p => p.id !== editingId).map(p => (
                      <label key={p.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${form.ids_relacionados.includes(p.id) ? 'border-[#9acd65] bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="checkbox" checked={form.ids_relacionados.includes(p.id)}
                          onChange={() => toggleRelacionado(p.id)}
                          className="w-4 h-4 accent-[#9acd65]" />
                        {p.images?.main && (
                          <img src={p.images.main} alt={p.name} className="w-10 h-10 object-cover rounded-lg" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-800">{p.name}</p>
                          <p className="text-xs text-gray-400">ID: {p.id}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button onClick={() => setIsOpen(false)} disabled={saving} className="px-5 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100">
                Cancelar
              </button>
              <button onClick={handleSave} disabled={saving || !!uploadingField}
                className="px-5 py-2 text-sm bg-[#9acd65] text-white rounded-lg font-semibold hover:bg-[#8bc34a] disabled:opacity-50">
                {saving ? 'Guardando…' : editingId ? 'Guardar cambios' : 'Crear producto'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
