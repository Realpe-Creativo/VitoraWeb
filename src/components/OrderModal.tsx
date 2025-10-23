// src/components/OrderModal.tsx
import React from 'react';

export interface OrderType {
  order_id: string;
  cliente_id: string;
  forma_cargue: string;
  valor_a_pagar: number;
  fecha_creacion: string;
  updatedAt: string;
  valor_parcial: number;
  fecha_vencimiento: string;
  cliente: {
    id: string;
    nombre_cliente: string;
    identificacion: string;
    tipo_identificacion: string;
  };
  ultimo_intento_pago: any;
}

interface OrderModalProps {
  isOpen: boolean;
  editingOrder: OrderType | null;
  clienteId: string;
  onClienteIdChange: (v: string) => void;
  valorPagarInput: string;
  onValorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  valorParcialInput: string;
  onValorParcialChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fechaVencimiento: string;
  onFechaVencimientoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tipoDocumento: string;
  onTipoDocumentoChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  nombreCliente: string;
  onNombreClienteChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  errorMsg: string;
  successMsg: string;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  editingOrder,
  clienteId,
  onClienteIdChange,
  valorPagarInput,
  onValorChange,
  valorParcialInput,
  onValorParcialChange,
  fechaVencimiento,
  onFechaVencimientoChange,
  tipoDocumento,
  onTipoDocumentoChange,
  nombreCliente,
  onNombreClienteChange,
  isLoading,
  errorMsg,
  successMsg,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="relative z-10 bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingOrder ? 'Editar Orden de Pago' : 'Nueva Orden de Pago'}
        </h2>

        {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}
        {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}

        <form onSubmit={onSubmit}>

          {/* Nombre del Cliente */}
          <div className="mb-4">
            <label htmlFor="nombreCliente" className="block text-gray-700 mb-1">
              Nombre del Cliente
            </label>
            <input
              id="nombreCliente"
              type="text"
              value={nombreCliente}
              onChange={onNombreClienteChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Nombre completo"
              required
            />
          </div>

          {/* Tipo de Documento */}
          <div className="mb-4">
            <label htmlFor="tipoDocumento" className="block text-gray-700 mb-1">
              Tipo de Documento
            </label>
            <select
              id="tipoDocumento"
              value={tipoDocumento}
              onChange={onTipoDocumentoChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              required
            >
              <option value="">Seleccione...</option>
              <option value="CC">Cédula de Ciudadanía (CC)</option>
              <option value="CE">Cédula de Extranjería (CE)</option>
              <option value="PAS">Pasaporte (PAS)</option>
            </select>
          </div>

          {/* Identificación del Cliente */}
          <div className="mb-4">
            <label
              htmlFor="clienteId"
              className="block text-gray-700 mb-1"
            >
              Identificación del Cliente
            </label>
            <input
              id="clienteId"
              type="text"
              value={clienteId}
              onChange={e => onClienteIdChange(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Número de identificación"
              required
            />
          </div>

          {/* Valor a Pagar */}
          <div className="mb-4">
            <label
              htmlFor="valorPagar"
              className="block text-gray-700 mb-1"
            >
              Valor a Pagar
            </label>
            <input
              id="valorPagar"
              type="text"
              inputMode="numeric"
              value={valorPagarInput}
              onChange={onValorChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="0"
              required
            />
          </div>

          {/* Valor Parcial */}
          <div className="mb-4">
            <label
              htmlFor="valorParcial"
              className="block text-gray-700 mb-1"
            >
              Valor Parcial
            </label>
            <input
              id="valorParcial"
              type="text"
              inputMode="numeric"
              value={valorParcialInput}
              onChange={onValorParcialChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="0"
              required
            />
          </div>

          {/* Fecha de Vencimiento */}
          <div className="mb-4">
            <label
              htmlFor="fechaVencimiento"
              className="block text-gray-700 mb-1"
            >
              Fecha de Vencimiento
            </label>
            <input
              id="fechaVencimiento"
              type="date"
              value={fechaVencimiento}
              onChange={onFechaVencimientoChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          {/* Forma de Cargue */}
          <div className="mb-4">
            <label
              htmlFor="formaCargue"
              className="block text-gray-700 mb-1"
            >
              Forma de Cargue
            </label>
            <input
              id="formaCargue"
              type="text"
              value={(editingOrder?.forma_cargue.toUpperCase() ?? 'MANUAL')}
              readOnly
              className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 text-gray-600"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {isLoading && (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2" />
              )}
              {isLoading
                ? editingOrder
                  ? 'Actualizando...'
                  : 'Guardando...'
                : editingOrder
                  ? 'Actualizar Orden'
                  : 'Guardar Orden'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
