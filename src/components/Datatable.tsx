import React, { useState, useMemo, useEffect } from 'react';

export interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string;
  disableFilter?: boolean;
  disableSort?: boolean;
  hideHeader?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

// ... (imports y definición de interfaces sin cambios)

function DataTable<T>({ columns, data }: DataTableProps<T>) {
  const [filters, setFilters] = useState<string[]>(() => columns.map(() => ''));
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [columnWidths, setColumnWidths] = useState<string[]>(
    () => columns.map(c => c.width ?? '150px')
  );

  useEffect(() => {
    setFilters(columns.map(() => ''));
    setColumnWidths(columns.map(c => c.width ?? '150px'));
    setCurrentPage(1);
  }, [columns]);

  const filteredData = useMemo(() => {
    return data.filter(row =>
      columns.every((col, idx) => {
        if (col.disableFilter) return true;
        const cell = col.accessor(row);
        const text =
          typeof cell === 'string' || typeof cell === 'number'
            ? cell.toString()
            : '';
        return text.toLowerCase().includes(filters[idx].trim().toLowerCase());
      })
    );
  }, [data, columns, filters]);

  const pageCount = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  const exportToCSV = () => {
    if (!data || data.length === 0) return;

    const headers = columns.map(col => col.header);
    const rows = data.map(row =>
      columns.map(col => {
        const cell = col.accessor(row);
        if (cell === null || cell === undefined) return '';
        let value = typeof cell === 'string' || typeof cell === 'number'
          ? cell.toString()
          : '';
        value = value
          .replace(/\r?\n|\r/g, ' ')
          .replace(/;/g, ',')
          .replace(/"/g, '')
          .trim();
        return value;
      })
    );

    const csvContent = [headers, ...rows].map(r => r.join(';')).join('\n');
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'export-datos.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFilterChange = (idx: number, value: string) => {
    setFilters(prev => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
    setCurrentPage(1);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleMouseDown = (colIdx: number, e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = parseInt(columnWidths[colIdx], 10);
    const onMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX;
      const newWidth = startWidth + delta;
      setColumnWidths(prev => {
        const next = [...prev];
        next[colIdx] = `${newWidth}px`;
        return next;
      });
    };
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div className="w-full">
      {/* Controles */}
      <div className="flex items-center justify-between mb-2 px-4 py-2">
        <div className="flex items-center">
          <label className="mr-2 text-sm">Mostrar</label>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="border px-2 py-1 text-sm rounded"
          >
            {[10, 20, 50, 100].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <span className="ml-2 text-sm">elementos</span>
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded"
        >
          {/* icono CSV */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v6m0 0l-3-3m3 3l3-3M12 4v8"
            />
          </svg>
          Exportar CSV
        </button>
      </div>

      {/* Tabla con scroll */}
      {/* Tabla con scroll vertical y horizontal */}
<div className="w-full overflow-x-auto border border-gray-200 rounded-lg">
  <div className="">
    <table className="table-auto w-full" style={{ tableLayout: 'fixed' }}>
      <thead className="bg-gray-100 sticky top-0 z-10">
        <tr>
          {columns.map((col, idx) => (
            <th
              key={idx}
              style={{
                width: columnWidths[idx],
                minWidth: columnWidths[idx],
                maxWidth: columnWidths[idx]
              }}
              className={[
                'relative px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100',
                col.align === 'right'
                  ? 'text-right'
                  : col.align === 'center'
                    ? 'text-center'
                    : 'text-left'
              ].join(' ')}
            >
              {!col.hideHeader && (
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    {col.header}
                    {!col.disableSort && (
                      <svg
                        className="w-4 h-4 ms-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="m8 15 4 4 4-4m0-6-4-4-4 4" />
                      </svg>
                    )}
                  </span>
                  <div
                    onMouseDown={e => handleMouseDown(idx, e)}
                    className="absolute right-0 top-0 h-full w-1 cursor-col-resize"
                  />
                </div>
              )}
            </th>
          ))}
        </tr>
        <tr className="bg-white">
          {columns.map((col, idx) => (
            <th
              key={idx}
              style={{
                width: columnWidths[idx],
                minWidth: columnWidths[idx],
                maxWidth: columnWidths[idx]
              }}
              className="px-4 py-2"
            >
              {!col.disableFilter && (
                <input
                  type="text"
                  placeholder={`Filtrar ${col.header}`}
                  value={filters[idx]}
                  onChange={e => handleFilterChange(idx, e.target.value)}
                  className="block w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 text-sm"
                />
              )}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {currentData.length === 0 ? (
          <tr>
            <td
              className="px-4 py-3 text-center text-gray-500"
              colSpan={columns.length}
            >
              No se encontraron registros.
            </td>
          </tr>
        ) : (
          currentData.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-gray-50">
              {columns.map((col, colIdx) => (
                <td
                  key={colIdx}
                  style={{
                    width: columnWidths[colIdx],
                    maxWidth: columnWidths[colIdx]
                  }}
                  className={[
                    'px-4 py-2 text-sm text-gray-800',
                    col.align === 'right'
                      ? 'text-right'
                      : col.align === 'center'
                        ? 'text-center'
                        : 'text-left'
                  ].join(' ')}
                >
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>

      {/* Paginación */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Anterior
        </button>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={[
              'px-3 py-1 border rounded',
              page === currentPage ? 'bg-blue-600 text-white' : ''
            ].join(' ')}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(p => Math.min(pageCount, p + 1))}
          disabled={currentPage === pageCount}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default DataTable;
