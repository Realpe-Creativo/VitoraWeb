// src/graphql/queries.ts
import { gql } from '@apollo/client';

export const GET_ORDENES_PAGO = gql`
  query GetOrdenesPago {
    ordenesPago {
      order_id
      cliente_id
      forma_cargue
      valor_a_pagar
      valor_parcial
      fecha_creacion
      fecha_vencimiento,
      estado
      cliente {
        id
        nombre_cliente
        identificacion
        tipo_identificacion
      }
      usuario_cargue {
        id
        email
        nombre
      }
      ultimo_intento_pago {
        id_transaccion
        ultimo_estado
        valor_de_pago
        estados {
          id_estado
          nombre_estado
          fecha_hora_estado
        }
      }
    }
  }
`;

export const GET_CLIENTES = gql`
  query GetClientesConOrdenes {
    clientes {
      id
      nombre_cliente
      identificacion
      tipo_identificacion
      ordenesPago {
        order_id
        cliente_id
        forma_cargue
        valor_a_pagar
        fecha_creacion
        ultimo_intento_pago {
          id_transaccion
          ultimo_estado
          valor_de_pago
          estados {
            id_estado
            nombre_estado
            fecha_hora_estado
          }
        }
      }
    }
  }
`;

export const GET_TRANSACCIONES_POR_FECHA = gql`
  query GetTransacciones($fecha: String) {
    transacciones(fecha: $fecha) {
      id_transaccion
      referencia
      valor_de_pago
      id_orden_pago
      ordenPago {
        order_id
        valor_a_pagar
        valor_parcial
        fecha_vencimiento
        estado
        cliente {
          id
          nombre_cliente
          identificacion
          tipo_identificacion
        }
      }
      estadoActual {
        id_estado
        nombre_estado
        fecha_hora_estado
      }
      estados {
        id_estado
        nombre_estado
        fecha_hora_estado
      }
    }
  }
`;
