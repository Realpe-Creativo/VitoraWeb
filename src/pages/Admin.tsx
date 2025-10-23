import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
/*
import { useQuery } from '@apollo/client';
import { GET_ORDENES_PAGO } from '../graphql/queries';
*/

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  /*const { data, loading, error } = useQuery(GET_ORDENES_PAGO);*/

  /*const ordenes = data?.ordenesPago || [];*/

  /*const total = ordenes.length;
  const pagadas = ordenes.filter((o: any) => o.estado?.toLowerCase() === 'pagado').length;
  const activas = ordenes.filter((o: any) => {
    const vencimiento = new Date(o.fecha_vencimiento);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); 
    return vencimiento > hoy;
  }).length;

  const dataActivas = {
    labels: ['Activas', 'No activas'],
    datasets: [
      {
        data: [activas, total - activas],
        backgroundColor: ['#3b82f6', '#e5e7eb']
      }
    ]
  };

  const dataPagadas = {
    labels: ['Pagadas', 'No pagadas'],
    datasets: [
      {
        data: [pagadas, total - pagadas],
        backgroundColor: ['#10b981', '#e5e7eb']
      }
    ]
  };*/

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Bienvenido al portal administrativo</h1>
        <p className="text-gray-600 mb-6 text-center">Selecciona una opción del menú para comenzar.</p>

        {/*{loading && <p className="text-gray-500 text-center">Cargando estadísticas...</p>}
        {error && <p className="text-red-600 text-center">Error al cargar órdenes.</p>}

        {!loading && !error && (
          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-2">Órdenes Activas</h2>
              <Pie data={dataActivas} />
            </div>

            <div className="text-center">
              <h2 className="text-lg font-semibold mb-2">Órdenes Pagadas</h2>
              <Pie data={dataPagadas} />
            </div>
          </div>
        )}*/}
      </main>
    </div>
  );
}
